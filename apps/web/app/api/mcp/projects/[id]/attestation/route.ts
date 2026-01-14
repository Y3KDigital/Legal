import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

interface AttestationResponse {
  projectId: string;
  projectName: string;
  attestationTimestamp: string;
  attestationHash: string;
  gates: {
    gateId: string;
    gateName: string;
    status: string;
    completedAt: string | null;
    artifacts: {
      artifactId: string;
      name: string;
      type: string;
      hash: string;
      uploadedAt: string;
      uploadedBy: string;
    }[];
    approvals: {
      approvalId: string;
      role: string;
      approvedBy: string;
      approvedAt: string;
      signature: string | null;
    }[];
  }[];
  deploymentSummary: {
    totalGates: number;
    completedGates: number;
    totalArtifacts: number;
    totalApprovals: number;
    finalApprovalDate: string | null;
    complianceScore: number;
  };
  multisigAttestation: {
    requiredSignatures: number;
    currentSignatures: number;
    signers: string[];
    attestationSignature: string;
  };
}

/**
 * GET /api/mcp/projects/[id]/attestation
 * 
 * Generates a comprehensive attestation document for a project's deployment readiness.
 * Fetches all gates, artifacts, and approvals, computes SHA-256 hashes, and generates
 * a multisig attestation signature.
 * 
 * This endpoint is used to create an immutable record of compliance before deployment.
 * 
 * Path parameters:
 * - id: Project ID
 * 
 * Response:
 * - projectId, projectName: Project identifiers
 * - attestationTimestamp: ISO timestamp of attestation generation
 * - attestationHash: SHA-256 hash of entire attestation document
 * - gates: Array of gates with their artifacts and approvals, each with SHA-256 hashes
 * - deploymentSummary: High-level metrics (gate completion, artifact count, compliance score)
 * - multisigAttestation: Signatures required for deployment approval
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;

    // TODO: Verify user has permission to view attestation for this project
    // const session = await getServerSession();
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // Fetch project with all related data
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        gates: {
          include: {
            artifacts: {
              include: {
                uploadedByUser: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
              },
            },
            approvals: {
              include: {
                approver: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Generate attestation timestamp
    const attestationTimestamp = new Date().toISOString();

    // Process gates and compute hashes
    const gates = project.gates.map(gate => {
      // Process artifacts with SHA-256 hashes
      const artifacts = gate.artifacts.map(artifact => {
        // Generate hash from artifact metadata
        const artifactData = JSON.stringify({
          name: artifact.name,
          type: artifact.type,
          url: artifact.url,
          metadata: artifact.metadata,
          uploadedAt: artifact.uploadedAt,
        });
        const hash = crypto.createHash('sha256').update(artifactData).digest('hex');

        return {
          artifactId: artifact.id,
          name: artifact.name,
          type: artifact.type,
          hash,
          uploadedAt: artifact.uploadedAt.toISOString(),
          uploadedBy: artifact.uploadedByUser.name || artifact.uploadedByUser.email,
        };
      });

      // Process approvals with signatures
      const approvals = gate.approvals.map(approval => ({
        approvalId: approval.id,
        role: approval.approver.role,
        approvedBy: approval.approver.name || approval.approver.email,
        approvedAt: approval.createdAt.toISOString(),
        signature: approval.signature,
      }));

      return {
        gateId: gate.id,
        gateName: gate.name,
        status: gate.status,
        completedAt: gate.completedAt?.toISOString() || null,
        artifacts,
        approvals,
      };
    });

    // Calculate deployment summary
    const totalGates = gates.length;
    const completedGates = gates.filter(g => g.status === 'COMPLETED').length;
    const totalArtifacts = gates.reduce((sum, g) => sum + g.artifacts.length, 0);
    const totalApprovals = gates.reduce((sum, g) => sum + g.approvals.length, 0);
    
    // Find final approval date (latest approval across all gates)
    const allApprovalDates = gates
      .flatMap(g => g.approvals)
      .map(a => new Date(a.approvedAt))
      .sort((a, b) => b.getTime() - a.getTime());
    const finalApprovalDate = allApprovalDates[0]?.toISOString() || null;

    // Calculate compliance score (0-100)
    const complianceScore = totalGates > 0 
      ? Math.round((completedGates / totalGates) * 100)
      : 0;

    const deploymentSummary = {
      totalGates,
      completedGates,
      totalArtifacts,
      totalApprovals,
      finalApprovalDate,
      complianceScore,
    };

    // Generate multisig attestation
    // In production, this would integrate with a multisig wallet or HSM
    const requiredSignatures = 3; // Require 3-of-N signatures (Founder, Lawyer, Engineer)
    const currentSignatures = gates
      .flatMap(g => g.approvals)
      .filter(a => a.signature !== null)
      .length;

    const signers = gates
      .flatMap(g => g.approvals)
      .map(a => a.approvedBy);

    // Generate attestation document hash
    const attestationData = JSON.stringify({
      projectId: project.id,
      projectName: project.name,
      attestationTimestamp,
      gates,
      deploymentSummary,
    });
    const attestationHash = crypto.createHash('sha256').update(attestationData).digest('hex');

    // Generate multisig attestation signature (mock for now)
    // In production, this would call a multisig contract or HSM
    const multisigData = JSON.stringify({
      attestationHash,
      requiredSignatures,
      currentSignatures,
      signers,
      timestamp: attestationTimestamp,
    });
    const attestationSignature = crypto
      .createHash('sha256')
      .update(multisigData)
      .digest('hex');

    const response: AttestationResponse = {
      projectId: project.id,
      projectName: project.name,
      attestationTimestamp,
      attestationHash,
      gates,
      deploymentSummary,
      multisigAttestation: {
        requiredSignatures,
        currentSignatures,
        signers,
        attestationSignature,
      },
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('Attestation generation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate attestation',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
