import { NextRequest, NextResponse } from 'next/server';
import { MCPOrchestratorClient } from '@mcp-law/mcp-runtime';
import { EventSubmissionRequest } from '@mcp-law/types';

const mcpClient = new MCPOrchestratorClient(
  process.env.MCP_ORCHESTRATOR_URL || 'http://localhost:3001'
);

interface ScanContractRequest {
  projectId: string;
  contractText: string;
  contractType: 'subscription' | 'transfer' | 'custodial' | 'operating' | 'other';
  jurisdiction?: string;
  assetType?: string;
}

interface ComplianceViolation {
  item: string;
  category: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  recommendation: string;
}

interface ScanContractResponse {
  status: 'pass' | 'fail' | 'warning';
  checklistResults: {
    total: number;
    passed: number;
    failed: number;
    warnings: number;
  };
  violations: ComplianceViolation[];
  summary: string;
  scanId: string;
  timestamp: string;
}

/**
 * POST /api/mcp/scan-contract
 * 
 * Submits a smart contract for compliance scanning using the SC-A (Smart Contract Analyzer) agent.
 * Executes the 26-item compliance checklist and returns violations with pass/fail status.
 * 
 * Request body:
 * - projectId: ID of the project this contract belongs to
 * - contractText: Full text of the smart contract to analyze
 * - contractType: Type of contract (subscription, transfer, custodial, operating, other)
 * - jurisdiction: Optional jurisdiction code (e.g., "US", "US-NY", "EU-MiFID")
 * - assetType: Optional asset type (e.g., "equity", "debt", "fund", "commodity")
 * 
 * Response:
 * - status: Overall pass/fail/warning status
 * - checklistResults: Summary counts of passed/failed/warning items
 * - violations: Array of compliance violations with severity and recommendations
 * - summary: Human-readable summary of findings
 * - scanId: Unique identifier for this scan
 * - timestamp: ISO timestamp of scan
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ScanContractRequest;

    // Validate required fields
    if (!body.projectId || !body.contractText || !body.contractType) {
      return NextResponse.json(
        { error: 'Missing required fields: projectId, contractText, contractType' },
        { status: 400 }
      );
    }

    // TODO: Verify user has permission to scan contracts for this project
    // const session = await getServerSession();
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // Construct MCP event for SC-A agent
    const event: EventSubmissionRequest = {
      eventType: 'smart_contract_scan',
      workflowType: 'compliance_check',
      data: {
        projectId: body.projectId,
        contractText: body.contractText,
        contractType: body.contractType,
        jurisdiction: body.jurisdiction || 'US',
        assetType: body.assetType || 'unknown',
        checklistVersion: '1.0.0',
        requestedChecks: [
          // Securities law compliance
          'reg-d-506b',
          'reg-d-506c',
          'reg-s',
          'reg-a',
          'accredited-investor-verification',
          'bad-actor-disqualification',
          
          // Transfer restrictions
          'transfer-restrictions',
          'lockup-periods',
          'resale-restrictions',
          'right-of-first-refusal',
          
          // Investor protections
          'anti-dilution',
          'voting-rights',
          'information-rights',
          'tag-along-drag-along',
          
          // Operational requirements
          'cap-table-management',
          'dividend-distribution',
          'corporate-actions',
          'compliance-monitoring',
          
          // Technical security
          'access-control',
          'pausability',
          'upgradeability',
          'emergency-procedures',
          
          // Audit trail
          'event-logging',
          'compliance-reporting',
          'attestation-signatures',
          'immutable-records',
        ],
      },
      priority: 'high',
    };

    // Submit to MCP orchestrator
    const mcpResponse = await mcpClient.submitEvent(event);

    // Parse SC-A agent output
    const agentOutput = mcpResponse.workflow?.output || {};
    const violations: ComplianceViolation[] = agentOutput.violations || [];
    const checklistResults = agentOutput.checklistResults || {
      total: 26,
      passed: 0,
      failed: 0,
      warnings: 0,
    };

    // Determine overall status
    let status: 'pass' | 'fail' | 'warning' = 'pass';
    if (checklistResults.failed > 0) {
      status = 'fail';
    } else if (checklistResults.warnings > 0) {
      status = 'warning';
    }

    // Generate summary
    const criticalCount = violations.filter(v => v.severity === 'critical').length;
    const highCount = violations.filter(v => v.severity === 'high').length;
    
    let summary = '';
    if (status === 'pass') {
      summary = `Contract passed all ${checklistResults.total} compliance checks. No violations found.`;
    } else if (status === 'fail') {
      summary = `Contract failed ${checklistResults.failed} of ${checklistResults.total} compliance checks. Found ${criticalCount} critical and ${highCount} high severity violations.`;
    } else {
      summary = `Contract passed ${checklistResults.passed} of ${checklistResults.total} checks with ${checklistResults.warnings} warnings. Review recommended.`;
    }

    const response: ScanContractResponse = {
      status,
      checklistResults,
      violations,
      summary,
      scanId: mcpResponse.workflow?.id || crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('Contract scan error:', error);
    return NextResponse.json(
      {
        error: 'Failed to scan contract',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
