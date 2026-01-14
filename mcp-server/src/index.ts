import express from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import YAML from 'yaml';
import { createLogger, format, transports } from 'winston';

const app = express();
const PORT = process.env.PORT || 8080;
const SERVICE_NAME = process.env.SERVICE_NAME || 'unknown';

// Logger setup
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  defaultMeta: { service: SERVICE_NAME },
  transports: [new transports.Console()]
});

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: SERVICE_NAME, timestamp: new Date().toISOString() });
});

// MCP endpoints
app.post('/mcp/tools', (req, res) => {
  const tools = getAvailableTools();
  res.json({ tools });
});

app.post('/mcp/call', async (req, res) => {
  const { tool, arguments: args } = req.body;
  
  try {
    const result = await executeTool(tool, args);
    res.json({ result });
  } catch (error: any) {
    logger.error('Tool execution failed', { tool, error: error.message });
    res.status(500).json({ error: error.message });
  }
});

// Domain-specific endpoints based on SERVICE_NAME
if (SERVICE_NAME === 'orchestrator') {
  app.post('/route', async (req, res) => {
    const { query } = req.body;
    const routing = routeQuery(query);
    res.json(routing);
  });
}

function getAvailableTools(): any[] {
  const basePath = '/app/compliance';
  
  switch (SERVICE_NAME) {
    case 'securities':
      return [
        {
          name: 'securities_characterization_draft',
          description: 'Generate a securities characterization draft memo for a token across specified jurisdictions',
          inputSchema: {
            type: 'object',
            properties: {
              tokenDescription: { type: 'string' },
              jurisdictions: { type: 'array', items: { type: 'string' } },
              useCase: { type: 'string' }
            },
            required: ['tokenDescription', 'jurisdictions']
          }
        },
        {
          name: 'offering_checklist',
          description: 'Generate offering process checklist based on jurisdiction and offering type',
          inputSchema: {
            type: 'object',
            properties: {
              jurisdiction: { type: 'string' },
              offeringType: { type: 'string', enum: ['public', 'private', 'reg_d', 'reg_s', 'other'] }
            },
            required: ['jurisdiction', 'offeringType']
          }
        }
      ];
      
    case 'tax':
      return [
        {
          name: 'tax_memo_outline',
          description: 'Generate tax memo outline for token structure',
          inputSchema: {
            type: 'object',
            properties: {
              entityType: { type: 'string' },
              tokenType: { type: 'string' },
              jurisdictions: { type: 'array', items: { type: 'string' } }
            },
            required: ['entityType', 'tokenType', 'jurisdictions']
          }
        },
        {
          name: 'withholding_analysis',
          description: 'Analyze withholding requirements for cross-border token distributions',
          inputSchema: {
            type: 'object',
            properties: {
              sourceJurisdiction: { type: 'string' },
              distributionType: { type: 'string' }
            },
            required: ['sourceJurisdiction', 'distributionType']
          }
        }
      ];
      
    case 'contracts':
      return [
        {
          name: 'contract_spec_generator',
          description: 'Generate smart contract specification from requirements',
          inputSchema: {
            type: 'object',
            properties: {
              productType: { type: 'string', enum: ['rwa', 'stablecoin', 'other'] },
              chain: { type: 'string' },
              controls: { type: 'array', items: { type: 'string' } }
            },
            required: ['productType', 'chain']
          }
        },
        {
          name: 'audit_checklist',
          description: 'Generate security audit checklist',
          inputSchema: {
            type: 'object',
            properties: {
              contractType: { type: 'string' },
              chain: { type: 'string' }
            },
            required: ['contractType', 'chain']
          }
        }
      ];
      
    case 'jurisdiction':
      return [
        {
          name: 'jurisdiction_summary',
          description: 'Retrieve jurisdiction regulatory summary',
          inputSchema: {
            type: 'object',
            properties: {
              jurisdiction: { type: 'string' },
              topic: { type: 'string', enum: ['securities', 'stablecoins', 'licensing', 'tax', 'all'] }
            },
            required: ['jurisdiction']
          }
        }
      ];
      
    default:
      return [];
  }
}

async function executeTool(tool: string, args: any): Promise<any> {
  logger.info('Executing tool', { tool, args });
  
  // Tool implementation stubs - wire to actual logic
  switch (tool) {
    case 'securities_characterization_draft':
      return generateSecuritiesDraft(args);
    case 'offering_checklist':
      return generateOfferingChecklist(args);
    case 'tax_memo_outline':
      return generateTaxMemo(args);
    case 'contract_spec_generator':
      return generateContractSpec(args);
    case 'jurisdiction_summary':
      return getJurisdictionSummary(args);
    default:
      throw new Error(`Unknown tool: ${tool}`);
  }
}

function routeQuery(query: string): any {
  const routingPath = process.env.ROUTING_CONFIG || '/app/agents/orchestrator/routing_policy.yaml';
  
  try {
    const routingConfig = YAML.parse(readFileSync(routingPath, 'utf8'));
    
    for (const rule of routingConfig.rules) {
      const keywords = rule.match?.contains_any || [];
      if (keywords.some((kw: string) => query.toLowerCase().includes(kw.toLowerCase()))) {
        return {
          route_to: rule.route_to,
          escalation: rule.escalation,
          confidence: 'high'
        };
      }
    }
    
    return { route_to: 'orchestrator', escalation: { required_human_role: 'legal' }, confidence: 'low' };
  } catch (error: any) {
    logger.error('Routing failed', { error: error.message });
    return { route_to: 'orchestrator', escalation: { required_human_role: 'legal' }, confidence: 'error' };
  }
}

// Stub implementations
function generateSecuritiesDraft(args: any): any {
  return {
    type: 'draft_memo',
    content: '# Securities Characterization Draft\n\n**DRAFT - REQUIRES COUNSEL REVIEW**\n\n## Token Description\n' + args.tokenDescription + '\n\n## Jurisdictions\n' + args.jurisdictions.join(', ') + '\n\n## Analysis\n[Counsel to complete]\n\n## Open Questions\n1. Exact distribution mechanics?\n2. Economic rights attached?\n3. Control/voting rights?',
    metadata: { requires_review: true, jurisdictions: args.jurisdictions }
  };
}

function generateOfferingChecklist(args: any): any {
  return {
    type: 'checklist',
    items: [
      'Determine offering exemption',
      'Prepare disclosure documents',
      'File required notices',
      'Implement transfer restrictions',
      'Set up investor verification'
    ],
    jurisdiction: args.jurisdiction,
    offeringType: args.offeringType
  };
}

function generateTaxMemo(args: any): any {
  return {
    type: 'memo_outline',
    sections: [
      'Entity classification',
      'Token characterization for tax purposes',
      'Income recognition',
      'Withholding obligations',
      'Reporting requirements'
    ],
    metadata: { requires_cpa_review: true }
  };
}

function generateContractSpec(args: any): any {
  return {
    type: 'contract_spec',
    productType: args.productType,
    chain: args.chain,
    recommended_patterns: ['AccessControl', 'Pausable', 'ComplianceHooks'],
    spec_outline: 'See contracts/ethereum/' + args.productType + '/README.md'
  };
}

function getJurisdictionSummary(args: any): any {
  const jPath = `/app/docs/jurisdictions/${args.jurisdiction}/overview.md`;
  try {
    const content = readFileSync(jPath, 'utf8');
    return { jurisdiction: args.jurisdiction, summary: content, status: 'draft' };
  } catch {
    return { jurisdiction: args.jurisdiction, summary: 'Not yet documented', status: 'missing' };
  }
}

app.listen(PORT, () => {
  logger.info(`${SERVICE_NAME} MCP server listening`, { port: PORT });
});
