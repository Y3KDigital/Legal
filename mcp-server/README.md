# Legal MCP Server

Model Context Protocol server providing domain-separated AI tools for legal, tax, and contract workflows.

## Architecture

- **Orchestrator**: Routes queries to domain agents based on `routing_policy.yaml`
- **Securities Agent**: Securities characterization, offering checklists
- **Tax Agent**: Tax memo outlines, withholding analysis
- **Contracts Agent**: Smart contract specs, audit checklists
- **Jurisdiction Agent**: Jurisdiction summaries and regulatory lookups

## Running

```bash
docker-compose up -d
```

Services will be available at:
- Orchestrator: http://localhost:8080
- Securities: http://localhost:8081
- Tax: http://localhost:8082
- Contracts: http://localhost:8083
- Jurisdiction: http://localhost:8084

## Usage

### Health Check
```bash
curl http://localhost:8080/health
```

### List Tools
```bash
curl -X POST http://localhost:8081/mcp/tools
```

### Call Tool
```bash
curl -X POST http://localhost:8081/mcp/call \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "securities_characterization_draft",
    "arguments": {
      "tokenDescription": "Revenue-sharing token backed by real estate",
      "jurisdictions": ["US", "EU"]
    }
  }'
```

## Development

```bash
cd mcp-server
npm install
npm run dev
```

## Notes

- All outputs are **drafts** requiring human review
- Tools enforce separation: securities tools cannot provide tax advice
- Escalation rules in `routing_policy.yaml` define when human review is required
