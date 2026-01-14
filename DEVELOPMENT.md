# Development Guide

## Prerequisites

- **Docker** (for MCP services)
- **Node.js 20+** (for MCP server development)
- **Python 3.11+** (for validation scripts)
- **Foundry** (for Solidity testing)
- **Git**

## Repo Structure

```
lawfirm-ai-compliance-repo/
├── docs/                    # Human-readable documentation
│   ├── 00-vision/          # Vision and principles
│   ├── 20-jurisdictions/   # Jurisdiction packs
│   ├── 30-product-flows/   # Product lifecycle flows
│   └── 40-contracts/       # Contract specifications
├── compliance/              # Machine-readable compliance data
│   ├── state_machines/     # Lifecycle state machines
│   ├── controls/           # Reusable controls
│   ├── policy_packs/       # Jurisdiction-specific overrides
│   └── schema/             # Schema definitions
├── agents/                  # AI agent separation
│   ├── orchestrator/       # Routing logic
│   ├── securities/         # Securities agent
│   ├── tax/                # Tax agent
│   ├── contracts/          # Contracts agent
│   └── jurisdiction/       # Jurisdiction agent
├── contracts/               # Smart contracts
│   ├── ethereum/           # Solidity contracts
│   ├── solana/             # Solana programs
│   ├── cosmos/             # Cosmos modules
│   └── polkadot/           # Substrate pallets
├── integrations/            # External system integrations
│   ├── chainlink/
│   ├── swift/
│   ├── agora/
│   └── fnality/
├── layer1/                  # Custom L1 blockchain design
│   ├── modules/            # Blockchain modules
│   └── genesis-spec.json   # Genesis configuration
├── mcp-server/              # MCP AI server (TypeScript)
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml       # Docker orchestration
└── .github/                 # GitHub workflows

```

## Development Workflows

### 1. Adding a New Jurisdiction

1. Create `docs/20-jurisdictions/<code>/` folder
2. Add `overview.md` and `sources.md`
3. Create `compliance/policy_packs/<code>.yaml`
4. Update jurisdiction matrix: `docs/20-jurisdictions/jurisdiction-matrix.template.csv`
5. PR with legal review

### 2. Adding a State Machine

1. Create `compliance/state_machines/<name>.yaml`
2. Define states, evidence, controls, transitions
3. Reference existing controls or create new ones in `compliance/controls/`
4. Add corresponding flow doc in `docs/30-product-flows/`
5. Validate YAML schema
6. PR with legal + compliance review

### 3. Adding a Smart Contract

1. Write spec in `docs/40-contracts/`
2. Implement in `contracts/<chain>/`
3. Add tests
4. Map contract functions to compliance controls
5. Security audit (external)
6. PR with engineering + legal review

### 4. Adding an AI Agent Tool

1. Define tool in `mcp-server/src/index.ts` → `getAvailableTools()`
2. Implement tool logic
3. Update agent config in `agents/<domain>/config.yaml`
4. Add safety/escalation rules
5. Test tool execution
6. PR with AI + legal review

## Running Tests

### Compliance Validation
```bash
python scripts/validate_state_machines.py
```

### MCP Server
```bash
cd mcp-server
npm test
```

### Smart Contracts (Ethereum)
```bash
cd contracts/ethereum
forge test
```

## Style Guidelines

### Markdown
- Use ATX headers (`#`, `##`, etc.)
- Keep lines < 200 chars
- Link to primary sources only

### YAML
- 2-space indentation
- Use `description` fields liberally
- Always include `version` field

### Solidity
- Follow OpenZeppelin style
- Use NatSpec comments
- Prefer explicit over implicit

## Git Workflow

1. Create feature branch from `main`
2. Make changes
3. Run linters/tests
4. Commit with descriptive messages
5. Push and open PR
6. Request review from legal/tax/engineering as needed
7. Merge after approvals

## Legal Review Process

Changes affecting:
- Jurisdiction claims
- Securities characterization
- Compliance state machines
- Transfer restrictions

**Require** legal review before merge.

Use PR template to flag required reviewers.
