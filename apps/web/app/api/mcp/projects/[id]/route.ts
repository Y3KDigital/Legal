import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ProjectDetailResponse } from '@mcp-law/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        founder: true,
        gates: {
          orderBy: { createdAt: 'asc' },
        },
        artifacts: {
          orderBy: { createdAt: 'desc' },
        },
        approvals: {
          include: {
            user: true,
          },
          orderBy: { approvedAt: 'desc' },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    const response: ProjectDetailResponse = {
      project: {
        id: project.id,
        status: project.status,
        assetClass: project.assetClass,
        jurisdiction: project.jurisdiction,
        legalWrapper: project.legalWrapper,
        distributionStrategy: project.distributionStrategy,
        assetDescription: project.assetDescription,
        assetValue: project.assetValue,
        economicTerms: project.economicTerms as Record<string, any>,
        custodyModel: project.custodyModel as Record<string, any>,
        bankingRelationships: project.bankingRelationships as Record<string, any>,
        attestationPlan: project.attestationPlan as Record<string, any>,
        founderId: project.founderId,
        workflowId: project.workflowId,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      },
      gates: project.gates.map((gate) => ({
        id: gate.id,
        projectId: gate.projectId,
        name: gate.name,
        status: gate.status,
        agentId: gate.agentId,
        memoPath: gate.memoPath,
        failureReason: gate.failureReason,
        executedAt: gate.executedAt,
        createdAt: gate.createdAt,
        updatedAt: gate.updatedAt,
      })),
      artifacts: project.artifacts.map((artifact) => ({
        id: artifact.id,
        projectId: artifact.projectId,
        type: artifact.type,
        filePath: artifact.filePath,
        gitCommitSha: artifact.gitCommitSha,
        ipfsCid: artifact.ipfsCid,
        generatedBy: artifact.generatedBy,
        createdAt: artifact.createdAt,
      })),
      approvals: project.approvals.map((approval) => ({
        id: approval.id,
        projectId: approval.projectId,
        gateName: approval.gateName,
        decision: approval.decision,
        comments: approval.comments,
        signature: approval.signature,
        approvedBy: approval.approvedBy,
        approvedAt: approval.approvedAt,
      })),
      workflow: null, // TODO: Fetch from MCP server
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Project fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
