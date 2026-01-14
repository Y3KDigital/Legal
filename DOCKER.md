# Docker Setup

Run the full MCP AI system + compliance infrastructure locally or in production.

## Quick Start

```bash
# Build and start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f mcp-orchestrator

# Stop services
docker-compose down
```

## Services

| Service | Port | Description |
|---------|------|-------------|
| mcp-orchestrator | 8080 | Routes queries to domain agents |
| mcp-securities | 8081 | Securities characterization + offering checklists |
| mcp-tax | 8082 | Tax memo outlines + withholding analysis |
| mcp-contracts | 8083 | Smart contract specs + audit checklists |
| mcp-jurisdiction | 8084 | Jurisdiction summaries + regulatory lookups |

## Configuration

Edit service environment variables in `docker-compose.yml`:

- `LOG_LEVEL`: `debug`, `info`, `warn`, `error`
- `SERVICE_NAME`: Service identifier
- `DOMAIN_CONFIG`: Path to domain config YAML

## Volumes

Services mount read-only volumes:
- `./agents` — Agent configs and prompts
- `./compliance` — State machines and controls
- `./docs` — Jurisdiction docs

Changes to these folders require service restart:

```bash
docker-compose restart
```

## Development

To develop the MCP server locally:

```bash
cd mcp-server
npm install
npm run dev
```

This runs the server with hot-reload outside Docker.

## Production

For production:

1. Use Docker Compose or Kubernetes
2. Store secrets in environment variables (not in code)
3. Enable HTTPS/TLS
4. Set up monitoring (Prometheus + Grafana)
5. Back up state machines and policy packs regularly

## Troubleshooting

### Services won't start
- Check `docker-compose logs <service>`
- Ensure ports 8080-8084 are available
- Verify YAML config files are valid

### Tools returning errors
- Check service logs
- Verify file paths in volume mounts
- Ensure state machines/controls exist

### Authentication issues
- MCP server has no auth by default
- Add API keys/tokens in production (update `index.ts`)
