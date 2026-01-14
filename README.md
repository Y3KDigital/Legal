# 🏛️ MCP AI Law Firm Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)](https://www.postgresql.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> **Institutional-grade RWA tokenization compliance platform powered by multi-agent control plane**

Transform real-world assets into compliant digital securities through an AI-orchestrated legal operations system that enforces institutional controls, maintains regulator-legible audit trails, and blocks non-compliant deployments automatically.

---

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [🏗️ Architecture](#️-architecture)
- [📊 Visual Diagrams](#-visual-diagrams)
- [🗺️ Repository Structure](#️-repository-structure)
- [🚀 Quick Start](#-quick-start)
- [📚 Documentation](#-documentation)
- [🔧 Development](#-development)
- [🧪 Testing](#-testing)
- [🚢 Deployment](#-deployment)
- [🔐 Security](#-security)
- [📈 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 Overview

### What is MCP AI Law Firm?

The **MCP (Multi-Agent Control Plane) AI Law Firm** is a production-ready platform that:

1. **🎓 Educates** stakeholders on RWA compliance requirements
2. **⚖️ Enforces** institutional legal controls through AI agents
3. **📜 Documents** every decision with blockchain-level audit trails
4. **🚫 Blocks** non-compliant deployments automatically

### Problem Statement

Traditional RWA tokenization suffers from:
- ❌ **Compliance drift** (legal review happens once, code changes daily)
- ❌ **Opaque audit trails** (decisions documented in email threads)
- ❌ **Manual gate enforcement** (lawyers review PDFs, not smart contracts)
- ❌ **Jurisdictional fragmentation** (every market has different rules)

### Solution

```
┌─────────────────────────────────────────────────────────────┐
│                    MCP AI LAW FIRM                          │
│                                                             │
│  🌐 Website Layer        ⚖️ Legal Layer      🔗 Chain Layer │
│  ↓                       ↓                    ↓             │
│  • Public learning      • 11 AI agents       • Compliant   │
│  • Auth workspace       • Orchestrator       • Attestations│
│  • Role-based UI        • Evidence store     • Deployment  │
│                                              • Gates        │
└─────────────────────────────────────────────────────────────┘
```

**Core Principle:** *Website explains. MCP decides. Humans approve.*

---

## 🏗️ Architecture

### Three-Layer System

```
┌─────────────────────────────────────────────────────────────────┐
│                    LAYER 1: PUBLIC LEARNING                     │
│  No authentication • Educational content • Open access          │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  RWA Atlas   │  │ Compliance   │  │ Role Guides  │         │
│  │  11 classes  │  │ Howey/ERISA  │  │ Legal/CPA/Eng│         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│               LAYER 2: AUTHENTICATED WORKSPACE                  │
│  Role-based access • Project management • Approval workflows    │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Dashboard   │  │  Projects    │  │  Approvals   │         │
│  │  Stats/Feed  │  │  Legal/Fin/  │  │  Signatures  │         │
│  │              │  │  Contracts   │  │  Collection  │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  LAYER 3: MCP CONTROL PLANE                     │
│  Backend only • AI orchestration • Fail-closed enforcement      │
│                                                                 │
│  ┌──────────────┬──────────────┬──────────────┐               │
│  │ Legal Cluster│Finance Cluster│ Tech Cluster │               │
│  │ SEC, ERISA   │ CPA, AUDIT   │ SC, GOV, OBS │               │
│  │ TAX, BANK    │ VAL          │              │               │
│  │ STRUCT       │              │              │               │
│  └──────┬───────┴──────┬───────┴──────┬───────┘               │
│         │              │              │                        │
│         └──────────────┼──────────────┘                        │
│                        │                                        │
│                  ┌─────▼─────┐                                 │
│                  │Orchestrator│                                │
│                  └─────┬─────┘                                 │
│                        │                                        │
│         ┌──────────────┼──────────────┐                        │
│         │              │              │                        │
│    ┌────▼────┐   ┌────▼────┐   ┌────▼────┐                   │
│    │Git Store│   │PostgreSQL│   │  Redis  │                   │
│    │Evidence │   │State DB  │   │  Cache  │                   │
│    └─────────┘   └─────────┘   └─────────┘                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Visual Diagrams

### Data Flow: New RWA Project

```
        ┌─────────────┐
        │   Founder   │ (Authenticated user)
        └──────┬──────┘
               │ 1. Fills web form
               │    (RWA type, jurisdiction, legal wrapper, etc.)
               ▼
┌───────────────────────────────────────────────────────────┐
│              EVENT SUBMISSION API                         │
│  POST /api/mcp/event                                      │
│  {                                                        │
│    "event_type": "NEW_RWA_REQUEST",                       │
│    "payload": { ... }                                     │
│  }                                                        │
└──────┬────────────────────────────────────────────────────┘
       │ 2. Creates project record
       │    Initializes 8 gates (securities → PENDING, others → LOCKED)
       ▼
┌───────────────────────────────────────────────────────────┐
│              MCP ORCHESTRATOR                             │
│  Triggers: NEW_RWA_REQUEST workflow                       │
└──────┬────────────────────────────────────────────────────┘
       │ 3. Executes 8-step sequential workflow
       ▼
┌───────────────────────────────────────────────────────────┐
│ Step 1: SEC-A   → Securities Classification Memo          │
│         Input:  RWA details, jurisdictions, structure     │
│         Output: Memo with Howey/Reves analysis            │
│         Status: PASS → Unlock ERISA gate                  │
│                 FAIL → Block workflow                     │
├───────────────────────────────────────────────────────────┤
│ Step 2: ERISA-A → Plan Asset Contamination Analysis       │
│         Input:  Securities memo + investor profile        │
│         Output: ERISA risk assessment                     │
│         Status: PASS → Unlock TAX gate                    │
├───────────────────────────────────────────────────────────┤
│ Step 3: TAX-A   → Tax Characterization Memo               │
│         Input:  Legal structure + economic terms          │
│         Output: Tax classification + withholding          │
│         Status: PASS → Unlock BANK gate                   │
├───────────────────────────────────────────────────────────┤
│ Step 4: BANK-A  → Banking Custody Risk Report             │
│         Input:  Custody model + banking relationships     │
│         Output: Banking risk analysis                     │
│         Status: PASS → Unlock CPA gate                    │
├───────────────────────────────────────────────────────────┤
│ Step 5: CPA-A   → Accounting Treatment Memo               │
│         Input:  Economic model + revenue flows            │
│         Output: GAAP/IFRS accounting guidance             │
│         Status: PASS → Unlock SC gate                     │
├───────────────────────────────────────────────────────────┤
│ Step 6: SC-A    → Smart Contract Compliance Report        │
│         Input:  Solidity code + compliance checklist      │
│         Output: 26-item compliance scan (PASS/FAIL)       │
│         Status: PASS → Unlock AUDIT gate                  │
│                 FAIL → Block with specific violations     │
├───────────────────────────────────────────────────────────┤
│ Step 7: AUDIT-A → Attestation Planning Report             │
│         Input:  All prior memos + asset details           │
│         Output: Attestation schedule + requirements       │
│         Status: PASS → Unlock GOV gate                    │
├───────────────────────────────────────────────────────────┤
│ Step 8: GOV-A   → Multisig Governance Configuration       │
│         Input:  Signers + threshold requirements          │
│         Output: Governance setup recommendation           │
│         Status: PASS → Workflow complete                  │
└──────┬────────────────────────────────────────────────────┘
       │ 4. All artifacts stored in Git
       │    (SHA-256 hash + optional IPFS)
       ▼
┌───────────────────────────────────────────────────────────┐
│              EVIDENCE STORE (GIT)                         │
│  docs/memos/{project_id}/                                 │
│  ├── securities-classification-memo.md                    │
│  ├── erisa-plan-asset-memo.md                             │
│  ├── tax-characterization-memo.md                         │
│  ├── banking-custody-report.md                            │
│  ├── accounting-treatment-memo.md                         │
│  ├── smart-contract-compliance-report.md                  │
│  ├── attestation-planning-report.md                       │
│  └── governance-configuration.md                          │
│                                                           │
│  • Every file: Git commit + timestamp + SHA-256          │
│  • Optional: IPFS CID for immutability proof             │
└──────┬────────────────────────────────────────────────────┘
       │ 5. Project status → LEGAL_REVIEW
       │    UI shows all 8 memos for human review
       ▼
┌───────────────────────────────────────────────────────────┐
│              APPROVAL WORKFLOW                            │
│  Legal Counsel:  Reviews legal memos → APPROVE/BLOCK     │
│  CPA/Auditor:    Reviews finance memos → APPROVE/BLOCK   │
│  Engineer:       Reviews contract scan → APPROVE/BLOCK   │
│                                                           │
│  9 Signatures Required:                                  │
│  • 3 Legal (SEC, ERISA, Banking)                         │
│  • 2 Finance (CPA, Auditor)                              │
│  • 2 Tech (Smart Contract, Governance)                   │
│  • 2 Management (Founder, Admin)                         │
└──────┬────────────────────────────────────────────────────┘
       │ 6. All approvals collected
       │    Project status → APPROVED
       ▼
┌───────────────────────────────────────────────────────────┐
│              DEPLOYMENT ATTESTATION                       │
│  Final artifact generated:                               │
│  • Project summary                                        │
│  • Gate statuses (8/8 PASS)                              │
│  • Approvals (9 signatures with timestamps)              │
│  • Artifact hashes (Git SHA + IPFS CID)                  │
│  • Deployment timestamp                                   │
│  • Multisig attestation signature                        │
│                                                           │
│  Delivered to:                                           │
│  • Bank (for non-objection letter)                       │
│  • Regulator (for inspection readiness)                  │
│  • Auditor (for quarterly attestation)                   │
└───────────────────────────────────────────────────────────┘
```

### Fail-Closed Enforcement Model

```
┌─────────────────────────────────────────────────────────┐
│              FAIL-CLOSED RULES                          │
│                                                         │
│  RULE 1: If MCP orchestrator is offline                │
│          → All deployments BLOCKED                      │
│          → Website shows "System unavailable"           │
│                                                         │
│  RULE 2: If any gate returns FAIL                       │
│          → Workflow STOPS immediately                   │
│          → Subsequent gates remain LOCKED               │
│          → Project status → BLOCKED                     │
│                                                         │
│  RULE 3: If any approval is BLOCK                       │
│          → Deployment CANNOT proceed                    │
│          → Project requires remediation                 │
│          → New workflow run required after fixes        │
│                                                         │
│  RULE 4: AI agents can only DRAFT                       │
│          → Agents CANNOT approve                        │
│          → Agents CANNOT deploy                         │
│          → Agents CANNOT commit capital                 │
│          → Only humans can sign approvals               │
└─────────────────────────────────────────────────────────┘

Examples:

✅ PASS Scenario:
   SEC-A: PASS → ERISA-A: PASS → TAX-A: PASS → ... → GOV-A: PASS
   Result: All 8 gates PASS, workflow complete, ready for human approval

❌ FAIL Scenario 1 (Gate Failure):
   SEC-A: PASS → ERISA-A: FAIL (plan asset contamination detected)
   Result: Workflow STOPS, TAX-A never runs, project BLOCKED

❌ FAIL Scenario 2 (Smart Contract Violation):
   SEC-A: PASS → ... → SC-A: FAIL (prohibited pattern: dividend logic found)
   Result: Workflow STOPS, remaining gates LOCKED, contract must be fixed

❌ FAIL Scenario 3 (Human Blocks):
   All gates PASS → Legal Counsel reviews → BLOCK (concern about jurisdiction)
   Result: Deployment BLOCKED, project requires legal revision
```

### Gate State Machine

```
         ┌───────────┐
         │  LOCKED   │ ← Initial state (all gates except first)
         └─────┬─────┘
               │
               │ Event: Previous gate PASS
               │
               ▼
         ┌───────────┐
         │  PENDING  │ ← Agent executing analysis
         └─────┬─────┘
               │
        ┌──────┴──────┐
        │             │
        ▼             ▼
  ┌─────────┐   ┌─────────┐
  │  PASS   │   │  FAIL   │
  └────┬────┘   └────┬────┘
       │             │
       │             └──→ [WORKFLOW BLOCKED]
       │                  [PROJECT STATUS = BLOCKED]
       │                  [NEXT GATES = LOCKED]
       │
       └──→ [UNLOCK NEXT GATE]
            [CONTINUE WORKFLOW]

State Transitions:

LOCKED → PENDING:    When previous gate passes
PENDING → PASS:      Agent analysis complete, no issues found
PENDING → FAIL:      Agent detects blocking issues
PASS → LOCKED:       Never (gates don't revert)
FAIL → PENDING:      Only after remediation + new workflow run
```

### Permission Matrix (RBAC)

```
┌──────────────────┬─────────┬────────┬─────────┬──────────┬──────────┬───────┐
│ Action           │ Founder │ Lawyer │  CPA    │ Engineer │ Observer │ Admin │
├──────────────────┼─────────┼────────┼─────────┼──────────┼──────────┼───────┤
│ Create Project   │    ✅   │   ❌   │   ❌    │    ❌    │    ❌    │  ✅   │
│ View Project     │    ✅   │   ✅   │   ✅    │    ✅    │    ✅    │  ✅   │
│ Edit Project     │    ✅   │   ❌   │   ❌    │    ❌    │    ❌    │  ✅   │
│ View Memos       │    ✅   │   ✅   │   ✅    │    ✅    │    ✅    │  ✅   │
│ Approve Legal    │    ❌   │   ✅   │   ❌    │    ❌    │    ❌    │  ❌   │
│ Approve Finance  │    ❌   │   ❌   │   ✅    │    ❌    │    ❌    │  ❌   │
│ Submit Contract  │    ❌   │   ❌   │   ❌    │    ✅    │    ❌    │  ❌   │
│ Deploy           │    ❌   │   ❌   │   ❌    │    ❌    │    ❌    │  ✅   │
│ View Attestation │    ✅   │   ✅   │   ✅    │    ✅    │    ✅    │  ✅   │
│ Block Deployment │    ❌   │   ✅   │   ✅    │    ✅    │    ❌    │  ✅   │
│ Manage Users     │    ❌   │   ❌   │   ❌    │    ❌    │    ❌    │  ✅   │
└──────────────────┴─────────┴────────┴─────────┴──────────┴──────────┴───────┘

Principle: Separation of Duties
• Lawyers cannot deploy contracts (but can BLOCK)
• Engineers cannot approve legal memos (but can BLOCK)
• CPAs cannot edit smart contracts (but can BLOCK)
• Observers have read-only access (no approvals)
• Only Admin role can execute final deployment
```

---

## 🗺️ Repository Structure

### High-Level Organization

```
Legal/
├── 📚 docs/                    [24 files] ✅ Documentation Layer
│   ├── 🏢 ayg-platform/        [14 files] AYG institutional docs
│   ├── 🌍 70-rwa-frameworks/   [8 files]  Global RWA frameworks
│   └── 🏗️ 80-platform-build/   [2 files]  Platform build specs
│
├── ⚖️ mcp-server/              [6 files] ✅ MCP Implementation
│   ├── mcp-server-config.json  Orchestrator + 11 agents
│   ├── prompts/                SEC-A, SC-A prompts
│   └── examples/               Test data + compliant contract
│
├── 🌐 apps/                    [~150 files] ⏳ Web Application (TO BE BUILT)
│   └── web/                    Next.js frontend + API
│
├── 📦 packages/                [~30 files] ⏳ Shared Packages (TO BE BUILT)
│   ├── mcp-runtime/            MCP orchestrator runtime
│   ├── types/                  Shared TypeScript types
│   └── config/                 Shared configuration
│
├── 🧪 tests/                   [~50 files] ⏳ Testing Suite (TO BE BUILT)
│   ├── unit/                   Agent logic tests
│   ├── integration/            API + database tests
│   └── e2e/                    Playwright E2E tests
│
└── 🔧 .github/                 [~15 files] ⏳ DevOps (TO BE BUILT)
    └── workflows/              CI/CD pipelines
```

### Color-Coded Legend

| Color | Category | Status | Description |
|-------|----------|--------|-------------|
| 📚 **Blue** | Documentation | ✅ Complete | 24 institutional documents |
| ⚖️ **Purple** | MCP Server | ✅ Complete | AI orchestrator implementation |
| 🌐 **Cyan** | Web Application | ⏳ Planned | Next.js frontend + API (Phase 2) |
| 📦 **Yellow** | Shared Packages | ⏳ Planned | MCP runtime + types (Phase 2) |
| 🧪 **Red** | Testing | ⏳ Planned | Unit/integration/E2E tests (Phase 3) |
| 🔧 **Gray** | DevOps | ⏳ Planned | CI/CD + deployment (Phase 3) |

📄 **[Complete Visual Directory Structure →](docs/DIRECTORY_STRUCTURE.md)** (275+ files mapped)

---

## 🚀 Quick Start

### Prerequisites

```bash
# Required
node >= 20.10.0
pnpm >= 8.15.0
postgres >= 16
redis >= 7
git >= 2.40

# Optional (for MCP agents)
openai_api_key  # For GPT-4 (SEC-A, ERISA-A, etc.)
anthropic_api_key  # Alternative: Claude 3
```

### Installation (Phase 1 - MCP Server)

```bash
# Clone repository
git clone https://github.com/Y3KDigital/Legal.git
cd Legal

# Navigate to MCP server
cd mcp-server

# Install dependencies
npm install

# Configure environment
export OPENAI_API_KEY="sk-..."
export GITHUB_REPO_PATH="/path/to/Legal/docs/memos"

# Run orchestrator
node src/orchestrator.js
```

### Test Workflow

```bash
# Submit test RWA request
curl -X POST http://localhost:3001/api/mcp/event \
  -H "Content-Type: application/json" \
  -d @mcp-server/examples/example-new-rwa-request.json

# Expected output:
# {
#   "status": "SUCCESS",
#   "project_id": "proj_abc123",
#   "workflow_id": "WF-001-NEW_RWA_REQUEST",
#   "message": "Workflow initiated. Legal review in progress."
# }
```

### Installation (Phase 2 - Full Platform)

```bash
# Clone repository
git clone https://github.com/Y3KDigital/Legal.git
cd Legal

# Install all dependencies
pnpm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your database, Redis, OpenAI keys

# Setup database
pnpm db:setup

# Run development server
pnpm dev

# Access platform:
# - Web: http://localhost:3000
# - API: http://localhost:3000/api
# - MCP: http://localhost:3001
```

---

## 📚 Documentation

### Complete Documentation Index

| Layer | Document | Description | Status |
|-------|----------|-------------|--------|
| **🏢 AYG Platform** | | Original institutional documentation | |
| | [Program Architecture](docs/ayg-platform/01-program-overview/program-architecture.md) | Executive summary | ✅ |
| | [Legal Compliance](docs/ayg-platform/02-legal-compliance/compliance-framework.md) | Howey/ERISA/Banking | ✅ |
| | [Economic Model](docs/ayg-platform/03-economic-model/economic-structure.md) | Revenue flows | ✅ |
| | [Capital Structure](docs/ayg-platform/04-capital-structure/capital-stack.md) | Token economics | ✅ |
| | [Bank Submission](docs/ayg-platform/05-bank-submission/bank-package.md) | Complete package | ✅ |
| **🌍 RWA Frameworks** | | Global frameworks and playbooks | |
| | [Asset Class Registry](docs/70-rwa-frameworks/asset-class-registry.md) | 11 asset classes | ✅ |
| | [Execution Playbooks](docs/70-rwa-frameworks/execution-playbooks.md) | 3 detailed playbooks | ✅ |
| | [Control Matrix](docs/70-rwa-frameworks/control-matrix.md) | 58 controls | ✅ |
| | [Professional Framework](docs/70-rwa-frameworks/legal-cpa-smart-contract-framework.md) | Role definitions | ✅ |
| | [Smart Contract Cheat Sheets](docs/70-rwa-frameworks/smart-contract-compliance-cheatsheets.md) | 13 quick references | ✅ |
| | [Deployment Checklist](docs/70-rwa-frameworks/smart-contract-deployment-checklist.md) | 26-item gate | ✅ |
| | [MCP Architecture](docs/70-rwa-frameworks/mcp-ai-lawfirm-architecture.md) | 11 agents, 3 clusters | ✅ |
| | [MCP Implementation](docs/70-rwa-frameworks/mcp-implementation-specification.md) | Complete spec | ✅ |
| **🏗️ Platform Build** | | Website and implementation guides | |
| | [Platform Architecture](docs/80-platform-build/platform-architecture.md) | Complete blueprint | ✅ |
| | [Technical Implementation](docs/80-platform-build/technical-implementation-guide.md) | Dev guide | ✅ |
| **⚖️ MCP Server** | | Implementation files | |
| | [Server Config](mcp-server/mcp-server-config.json) | Orchestrator config | ✅ |
| | [SEC-A Prompt](mcp-server/prompts/sec-a-prompt.txt) | Securities agent | ✅ |
| | [SC-A Prompt](mcp-server/prompts/sc-a-prompt.txt) | Contract agent | ✅ |
| | [Example Workflow](mcp-server/examples/example-new-rwa-request.json) | Test case | ✅ |
| | [Example Contract](mcp-server/examples/example-smart-contract.sol) | Compliant Solidity | ✅ |

### Quick Navigation

**📖 Start Here:**
- New to RWA compliance? → [Platform Architecture](docs/80-platform-build/platform-architecture.md)
- Developer onboarding? → [Technical Implementation Guide](docs/80-platform-build/technical-implementation-guide.md)
- Legal professional? → [MCP Implementation Spec](docs/70-rwa-frameworks/mcp-implementation-specification.md)
- Engineer? → [Smart Contract Cheat Sheets](docs/70-rwa-frameworks/smart-contract-compliance-cheatsheets.md)

---

## 🔧 Development

### Tech Stack

```yaml
Frontend:
  Framework: Next.js 14.2+ (App Router)
  Language: TypeScript 5.4+
  Styling: Tailwind CSS 3.4+
  State: React Query + Zustand
  Auth: NextAuth.js 5+
  Forms: React Hook Form + Zod
  Components: shadcn/ui

Backend:
  API: Next.js API Routes
  Database: PostgreSQL 16+
  ORM: Prisma 5+
  Cache: Redis 7+
  Queue: BullMQ
  MCP: Custom Node.js runtime

Infrastructure:
  Hosting: Vercel (web) + Railway (MCP)
  Database: Supabase / Neon
  Git: GitHub (evidence store)
  CDN: Vercel Edge Network
  Monitoring: Sentry + Vercel Analytics
```

### Development Workflow

```bash
# Start all services
pnpm dev

# Start specific services
pnpm dev:web      # Next.js web app (port 3000)
pnpm dev:mcp      # MCP orchestrator (port 3001)
pnpm dev:db       # Database (Docker)

# Build for production
pnpm build

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Format code
pnpm format
```

### Database Operations

```bash
# Create migration
pnpm db:migrate:create

# Apply migrations
pnpm db:migrate:deploy

# Reset database (dev only)
pnpm db:reset

# Generate Prisma client
pnpm db:generate

# Open Prisma Studio
pnpm db:studio
```

---

## 🧪 Testing

### Test Structure

```
tests/
├── unit/              # Jest unit tests (80% coverage goal)
│   ├── agents/        # Agent logic tests
│   ├── workflows/     # Workflow tests
│   └── utils/         # Utility function tests
├── integration/       # Jest integration tests (70% coverage goal)
│   ├── api/           # API endpoint tests
│   ├── database/      # Database operation tests
│   └── mcp/           # MCP orchestrator tests
└── e2e/               # Playwright E2E tests (100% critical paths)
    ├── auth.spec.ts
    ├── projects.spec.ts
    ├── approvals.spec.ts
    └── deployment.spec.ts
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run unit tests
pnpm test:unit

# Run integration tests
pnpm test:integration

# Run E2E tests
pnpm test:e2e

# Run with coverage
pnpm test:coverage

# Watch mode
pnpm test:watch
```

---

## 🚢 Deployment

### Vercel Deployment (Web)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

### Railway Deployment (MCP Server)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up
```

### Environment Variables

```bash
# .env.local (local development)
DATABASE_URL="postgresql://user:pass@localhost:5432/mcp_law"
REDIS_URL="redis://localhost:6379"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-random-secret-min-32-chars"
OPENAI_API_KEY="sk-..."
GITHUB_TOKEN="ghp_..."
GITHUB_REPO_PATH="/path/to/Legal/docs/memos"
MCP_SERVER_URL="http://localhost:3001"

# Production (Vercel + Railway)
# Set via dashboard or CLI
```

---

## 🔐 Security

### Security Principles

```
1. Deny by Default
   → All actions require explicit permission
   → Unknown roles have zero access

2. Separation of Duties
   → Lawyers cannot deploy contracts
   → Engineers cannot approve legal memos
   → CPAs cannot edit smart contracts

3. AI Authority Boundaries
   → AI agents can only DRAFT artifacts
   → AI agents CANNOT approve or deploy
   → Humans must sign all approvals

4. Immutable Audit Trails
   → Every decision recorded in Git
   → SHA-256 hashes prevent tampering
   → Optional IPFS for public verifiability

5. Fail-Closed Enforcement
   → If MCP offline, deployments blocked
   → If gate fails, workflow stops
   → If approval blocked, cannot proceed

6. Zero Trust Architecture
   → All API requests authenticated
   → JWT tokens with short expiry
   → Role-based access control (RBAC)
```

### Security Checklist

- [ ] All API routes require authentication
- [ ] RBAC enforced on all actions
- [ ] Environment variables never committed
- [ ] Database credentials rotated quarterly
- [ ] HTTPS enforced in production
- [ ] CSP headers configured
- [ ] Rate limiting on API endpoints
- [ ] Audit logs reviewed weekly
- [ ] Security patches applied within 48h
- [ ] Dependencies scanned (Snyk/Dependabot)

---

## 📈 Roadmap

```
Phase 1: MCP Foundation (Days 0-30)                              ✅ COMPLETE
├── MCP server configuration                                     ✅
├── Orchestrator with fail-closed rules                          ✅
├── 11 agent definitions                                         ✅
├── NEW_RWA_REQUEST workflow                                     ✅
├── Evidence store (Git integration)                             ✅
├── SEC-A and SC-A agent prompts                                 ✅
└── Example workflow and contract                                ✅

Phase 2: Website & Workspace (Days 31-60)                        🚧 IN PROGRESS
├── Public learning layer (Homepage, RWA Atlas, Compliance Hub)  ⏳
├── Authenticated workspace (Dashboard, Projects, Approvals)     ⏳
├── API layer (5 endpoints)                                      ⏳
└── Database schema (Prisma)                                     ⏳

Phase 3: Enforcement & Scale (Days 61-90)                        📅 PLANNED
├── CI/CD Integration (GitHub Actions smart contract gate)       ⏳
├── Observer Portal (Bank/regulator dashboards)                  ⏳
├── Performance & Scale (Redis caching, CDN, load testing)       ⏳
└── Security Hardening (External audit, pen testing, SOC 2)      ⏳

Phase 4: Production Launch (Days 91-120)                         🔮 FUTURE
├── Beta launch (10 pilot projects)                              🔮
├── Bank partner onboarding                                      🔮
├── Regulator engagement (SEC, FINRA)                            🔮
└── Public documentation site                                    🔮

Phase 5: Expansion (Days 121+)                                   🔮 FUTURE
├── Additional agent prompts (9 remaining)                       🔮
├── Multi-jurisdiction support (EU, UK, Singapore)               🔮
├── Additional asset classes (commodities, carbon credits)       🔮
└── API for third-party integrations                             🔮
```

---

## 🤝 Contributing

We welcome contributions from legal professionals, compliance experts, engineers, and open source enthusiasts!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Run tests** (`pnpm test`)
5. **Commit with conventional commits** (`git commit -m 'feat: add amazing feature'`)
6. **Push to branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Contribution Areas

- 🧑‍⚖️ **Legal:** Additional agent prompts, jurisdiction-specific rules
- 💼 **Finance:** Accounting treatment memos, valuation methodologies
- 💻 **Engineering:** Smart contract compliance patterns, gas optimization
- 📚 **Documentation:** Tutorials, case studies, explainer videos
- 🎨 **Design:** UI/UX improvements, wireframes, accessibility
- 🧪 **Testing:** Unit tests, integration tests, E2E tests

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) for details.

### Open Source Philosophy

This platform is open source because **compliance should be transparent and verifiable**. By making the source code public:

1. **Regulators** can inspect the control logic
2. **Lawyers** can verify legal reasoning
3. **Engineers** can audit smart contract gates
4. **Community** can contribute improvements

---

## 📞 Contact & Support

- **Email:** kevan@y3kdigital.com
- **GitHub:** https://github.com/Y3KDigital/Legal
- **Website:** https://mcp-law.com (coming soon)
- **Issues:** [GitHub Issues](https://github.com/Y3KDigital/Legal/issues)
- **Discussions:** [GitHub Discussions](https://github.com/Y3KDigital/Legal/discussions)

---

<div align="center">

**🏛️ Building the future of institutional RWA compliance**

[![Star on GitHub](https://img.shields.io/github/stars/Y3KDigital/Legal?style=social)](https://github.com/Y3KDigital/Legal)

Made with ⚖️ by [Y3K Digital](https://y3kdigital.com)

</div>
