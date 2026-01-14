import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { MCPOrchestratorClient } from '@mcp-law/mcp-runtime';
import {
  EventSubmissionRequest,
  EventSubmissionResponse,
  ProjectStatus,
  GateStatus,
  GateName,
} from '@mcp-law/types';

const mcpClient = new MCPOrchestratorClient({
  baseURL: process.env.MCP_SERVER_URL || 'http://localhost:3001',
});

export async function POST(request: NextRequest) {
  try {
    const body: EventSubmissionRequest = await request.json();

    // Validate request
    if (!body.event_type || !body.payload) {
      return NextResponse.json(
        {
          status: 'ERROR',
          message: 'Missing required fields: event_type, payload',
        } as EventSubmissionResponse,
        { status: 400 }
      );
    }

    // Create project in database
    const project = await prisma.project.create({
      data: {
        status: ProjectStatus.INITIATED,
        assetClass: body.payload.assetClass,
        jurisdiction: body.payload.jurisdiction,
        legalWrapper: body.payload.legalWrapper,
        distributionStrategy: body.payload.distributionStrategy,
        assetDescription: body.payload.assetDescription,
        assetValue: parseFloat(body.payload.assetValue),
        economicTerms: body.payload.economicTerms || {},
        custodyModel: body.payload.custodyModel || {},
        bankingRelationships: body.payload.bankingRelationships || {},
        attestationPlan: body.payload.attestationPlan || {},
        founderId: body.payload.founderId,
      },
    });

    // Initialize 8 gates
    const gateNames = [
      GateName.SECURITIES,
      GateName.ERISA,
      GateName.TAX,
      GateName.BANKING,
      GateName.CPA,
      GateName.SMART_CONTRACT,
      GateName.AUDIT,
      GateName.GOVERNANCE,
    ];

    await Promise.all(
      gateNames.map((name, index) =>
        prisma.gate.create({
          data: {
            projectId: project.id,
            name,
            status: index === 0 ? GateStatus.PENDING : GateStatus.LOCKED,
            agentId: `${name.toLowerCase()}-a`,
          },
        })
      )
    );

    // Trigger MCP workflow (async)
    mcpClient
      .submitEvent({
        event_type: body.event_type,
        payload: {
          ...body.payload,
          project_id: project.id,
        },
      })
      .then(async (mcpResponse) => {
        if (mcpResponse.status === 'SUCCESS' && mcpResponse.workflow_id) {
          await prisma.project.update({
            where: { id: project.id },
            data: {
              workflowId: mcpResponse.workflow_id,
              status: ProjectStatus.RUNNING,
            },
          });
        }
      })
      .catch((error) => {
        console.error('MCP workflow submission failed:', error);
      });

    return NextResponse.json({
      status: 'SUCCESS',
      project_id: project.id,
      workflow_id: null, // Will be updated async
      message: 'Project created. MCP workflow initiated.',
    } as EventSubmissionResponse);
  } catch (error: any) {
    console.error('Event submission error:', error);
    return NextResponse.json(
      {
        status: 'ERROR',
        message: 'Internal server error',
        error: error.message,
      } as EventSubmissionResponse,
      { status: 500 }
    );
  }
}
