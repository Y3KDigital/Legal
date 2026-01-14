import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  ApprovalRequest,
  ApprovalResponse,
  ApprovalDecision,
  ProjectStatus,
} from '@mcp-law/types';

export async function POST(request: NextRequest) {
  try {
    const body: ApprovalRequest = await request.json();

    // Validate request
    if (!body.project_id || !body.gate_name || !body.decision || !body.signature) {
      return NextResponse.json(
        {
          status: 'ERROR',
          message: 'Missing required fields: project_id, gate_name, decision, signature',
        } as ApprovalResponse,
        { status: 400 }
      );
    }

    // TODO: Get user from session
    const userId = 'user_placeholder'; // Replace with actual auth

    // Create approval record
    const approval = await prisma.approval.create({
      data: {
        projectId: body.project_id,
        gateName: body.gate_name,
        decision: body.decision,
        comments: body.comments,
        signature: body.signature,
        approvedBy: userId,
      },
    });

    // Update gate status
    await prisma.gate.updateMany({
      where: {
        projectId: body.project_id,
        name: body.gate_name,
      },
      data: {
        status: body.decision === ApprovalDecision.APPROVE ? 'PASS' : 'FAIL',
      },
    });

    // Check if all approvals collected
    const approvalCount = await prisma.approval.count({
      where: {
        projectId: body.project_id,
        decision: ApprovalDecision.APPROVE,
      },
    });

    const blockCount = await prisma.approval.count({
      where: {
        projectId: body.project_id,
        decision: ApprovalDecision.BLOCK,
      },
    });

    // Update project status
    if (blockCount > 0) {
      await prisma.project.update({
        where: { id: body.project_id },
        data: { status: ProjectStatus.BLOCKED },
      });
    } else if (approvalCount >= 9) {
      // 9 required signatures
      await prisma.project.update({
        where: { id: body.project_id },
        data: { status: ProjectStatus.APPROVED },
      });
    }

    return NextResponse.json({
      status: 'SUCCESS',
      message: 'Approval recorded',
      approval_id: approval.id,
    } as ApprovalResponse);
  } catch (error: any) {
    console.error('Approval submission error:', error);
    return NextResponse.json(
      {
        status: 'ERROR',
        message: 'Internal server error',
      } as ApprovalResponse,
      { status: 500 }
    );
  }
}
