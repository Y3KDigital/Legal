# 📊 MCP AI Law Firm - Visual Directory Structure

> **Complete repository organization with color-coded sections, flow diagrams, and architectural maps**

---

## 🎨 Color-Coded Directory Legend

```
Legal/
├── 📚 DOCUMENTATION LAYER      [Blue] - Institutional documentation and frameworks
├── ⚖️ MCP IMPLEMENTATION      [Purple] - Multi-agent control plane server
├── 🌐 APPLICATION LAYER        [Cyan] - Web application (Next.js)
├── 📦 SHARED PACKAGES          [Yellow] - Reusable runtime components
├── 🧪 TESTING SUITE            [Red] - Comprehensive test coverage
└── 🔧 DEVOPS & CONFIG          [Gray] - CI/CD and infrastructure
```

---

## 📁 Complete Directory Tree

```
Legal/
│
├── 📚 docs/                                          [DOCUMENTATION LAYER - 24 files]
│   │
│   ├── 🏢 ayg-platform/                              [Blue: Original Platform - 14 files]
│   │   ├── 01-program-overview/
│   │   │   ├── program-architecture.md               ✅ Program structure
│   │   │   ├── executive-summary.md                  ✅ High-level overview
│   │   │   └── stakeholder-roles.md                  ✅ Role definitions
│   │   │
│   │   ├── 02-legal-compliance/
│   │   │   ├── compliance-framework.md               ✅ Howey/ERISA/Banking
│   │   │   ├── securities-analysis.md                ✅ SEC compliance
│   │   │   ├── erisa-analysis.md                     ✅ Plan asset rules
│   │   │   └── banking-regulations.md                ✅ Custody requirements
│   │   │
│   │   ├── 03-economic-model/
│   │   │   ├── economic-structure.md                 ✅ Revenue flows
│   │   │   ├── distribution-mechanisms.md            ✅ Payment logic
│   │   │   └── valuation-methodology.md              ✅ NAV calculation
│   │   │
│   │   ├── 04-capital-structure/
│   │   │   ├── capital-stack.md                      ✅ Token economics
│   │   │   ├── supply-caps.md                        ✅ Supply controls
│   │   │   └── governance-model.md                   ✅ Multisig setup
│   │   │
│   │   └── 05-bank-submission/
│   │       ├── bank-package.md                       ✅ Complete submission
│   │       └── compliance-checklist.md               ✅ Pre-submission review
│   │
│   ├── 🌍 70-rwa-frameworks/                         [Green: Global Frameworks - 8 files]
│   │   ├── asset-class-registry.md                   ✅ 11 asset classes
│   │   │   └── Classes: Treasuries, Private Credit, Real Estate, Commodities,
│   │   │       Trade Finance, Carbon Credits, Receivables, Equity, Art,
│   │   │       Royalties, Infrastructure
│   │   │
│   │   ├── execution-playbooks.md                    ✅ 3 detailed playbooks
│   │   │   ├── Playbook 1: Treasuries & MMF         [Low Risk]
│   │   │   ├── Playbook 2: Private Credit           [Medium Risk]
│   │   │   └── Playbook 3: Real Estate              [Medium-High Risk]
│   │   │
│   │   ├── control-matrix.md                         ✅ 58 controls
│   │   │   ├── Legal Controls (12)
│   │   │   ├── Finance Controls (8)
│   │   │   ├── Technical Controls (10)
│   │   │   ├── Custody Controls (7)
│   │   │   ├── Banking Controls (6)
│   │   │   ├── Audit Controls (5)
│   │   │   ├── Governance Controls (4)
│   │   │   ├── Reporting Controls (3)
│   │   │   ├── Risk Controls (2)
│   │   │   └── Incident Response (1)
│   │   │
│   │   ├── legal-cpa-smart-contract-framework.md     ✅ Professional roles
│   │   │   ├── Legal Counsel Mandate
│   │   │   ├── CPA/Auditor Mandate
│   │   │   ├── Smart Contract Engineer Mandate
│   │   │   └── Howey/Reves Analysis Framework
│   │   │
│   │   ├── smart-contract-compliance-cheatsheets.md  ✅ 13 quick references
│   │   │   ├── Cheat Sheet 1: Prohibited Patterns
│   │   │   ├── Cheat Sheet 2: Required Features
│   │   │   ├── Cheat Sheet 3: ERC-20 Compliance
│   │   │   ├── Cheat Sheet 4: Access Controls
│   │   │   ├── Cheat Sheet 5: Pause Mechanisms
│   │   │   ├── Cheat Sheet 6: Supply Caps
│   │   │   ├── Cheat Sheet 7: Transfer Restrictions
│   │   │   ├── Cheat Sheet 8: Event Emissions
│   │   │   ├── Cheat Sheet 9: Multisig Governance
│   │   │   ├── Cheat Sheet 10: Upgrade Patterns
│   │   │   ├── Cheat Sheet 11: Gas Optimization
│   │   │   ├── Cheat Sheet 12: Security Audits
│   │   │   └── Cheat Sheet 13: Deployment Checklist
│   │   │
│   │   ├── smart-contract-deployment-checklist.md    ✅ 26-item gate
│   │   │   └── Requires 9 signatures before deployment
│   │   │
│   │   ├── mcp-ai-lawfirm-architecture.md            ✅ 11 agents, 3 clusters
│   │   │   ├── Legal Cluster: SEC-A, ERISA-A, TAX-A, BANK-A, STRUCT-A
│   │   │   ├── Finance Cluster: CPA-A, AUDIT-A, VAL-A
│   │   │   └── Tech Cluster: SC-A, GOV-A, OBS-A
│   │   │
│   │   └── mcp-implementation-specification.md       ✅ Complete MCP spec
│   │       ├── Agent Prompts (2 complete, 9 templates)
│   │       ├── Workflows (NEW_RWA_REQUEST)
│   │       ├── I/O Contracts
│   │       └── Security Model
│   │
│   └── 🏗️ 80-platform-build/                        [Orange: Build Specs - 2 files]
│       ├── platform-architecture.md                  ✅ Complete blueprint
│       │   ├── Three-layer architecture
│       │   ├── Complete page map (50+ routes)
│       │   ├── 4 detailed user workflows
│       │   ├── 5 API contracts
│       │   ├── Data model (5 object types)
│       │   ├── RBAC security (6 roles)
│       │   ├── Technical stack
│       │   └── 30/60/90-day phased plan
│       │
│       └── technical-implementation-guide.md         ✅ Step-by-step dev guide
│           ├── Project structure
│           ├── Phase 1: MCP runtime
│           ├── Phase 2: Website
│           ├── Phase 3: CI/CD
│           ├── Database schema (Prisma)
│           ├── API routes (TypeScript)
│           ├── React components
│           └── Deployment instructions
│
├── ⚖️ mcp-server/                                    [MCP IMPLEMENTATION - 6 files]
│   ├── mcp-server-config.json                        ✅ Orchestrator config
│   │   ├── Orchestrator Rules (4 fail-closed rules)
│   │   ├── Agent Registry (11 agents with permissions)
│   │   ├── Workflows (NEW_RWA_REQUEST: 8-step sequence)
│   │   ├── Evidence Store (Git + optional IPFS)
│   │   ├── Audit Traceability
│   │   └── Security Model
│   │
│   ├── prompts/
│   │   ├── sec-a-prompt.txt                          ✅ Securities Counsel Agent
│   │   │   ├── Role: Draft securities memos
│   │   │   ├── Constraints: Cannot approve/deploy
│   │   │   ├── Mandate: Howey 4 prongs + Reves Test
│   │   │   ├── Output: Structured Markdown memo
│   │   │   └── Tone: Conservative, regulator-minded
│   │   │
│   │   └── sc-a-prompt.txt                           ✅ Smart Contract Compliance
│   │       ├── Role: Review contracts against 26-item checklist
│   │       ├── Constraints: Cannot code or approve
│   │       ├── Prohibited Patterns (8): yield, payouts, dividends, etc.
│   │       ├── Required Features (8): pause, cap, restrictions, etc.
│   │       └── Output: Compliance report with PASS/FAIL
│   │
│   ├── examples/
│   │   ├── example-new-rwa-request.json              ✅ Test workflow input
│   │   │   ├── RWA Type: Real estate-backed revenue token
│   │   │   ├── Jurisdiction: US (Delaware)
│   │   │   ├── Legal Wrapper: Delaware Statutory Trust
│   │   │   ├── Distribution: Reg D 506(c)
│   │   │   ├── Asset Details: $130M commercial properties
│   │   │   ├── Economic Terms: Quarterly distributions
│   │   │   ├── Custody: Independent corporate trustee
│   │   │   ├── Banking: First Republic Bank
│   │   │   └── Attestation: Big 4 quarterly reports
│   │   │
│   │   └── example-smart-contract.sol                ✅ Compliant Solidity
│   │       ├── ERC-20 compliant
│   │       ├── Pausable mechanism
│   │       ├── AccessControl (multisig 3-of-5)
│   │       ├── MAX_SUPPLY = 1.3M (hardcapped)
│   │       ├── Allowlist enforcement
│   │       ├── Jurisdictional blocks
│   │       ├── Event emissions (AllowlistAdded, TokensMinted, etc.)
│   │       ├── No yield logic
│   │       ├── No automated payouts
│   │       ├── No dividend distribution
│   │       └── Deployment metadata for audit trail
│   │
│   └── README.md                                     ✅ Implementation guide
│       ├── Overview
│       ├── Configuration details
│       ├── Usage instructions
│       ├── Deployment options (3: VS Code MCP, custom, framework)
│       └── Architecture notes
│
├── 🌐 apps/                                          [APPLICATION LAYER - TO BE BUILT]
│   └── web/                                          [Next.js 14 Web Application]
│       ├── app/                                      [Next.js App Router]
│       │   ├── (public)/                             [Public pages - no auth]
│       │   │   ├── page.tsx                          ⏳ Homepage
│       │   │   │   ├── Hero section
│       │   │   │   ├── Features overview
│       │   │   │   ├── How it works
│       │   │   │   └── CTA
│       │   │   │
│       │   │   ├── learn/                            ⏳ Learning hub
│       │   │   │   ├── page.tsx                      Learning hub home
│       │   │   │   ├── rwa-atlas/
│       │   │   │   │   ├── page.tsx                  RWA Atlas overview
│       │   │   │   │   └── [asset-class]/
│       │   │   │   │       └── page.tsx              11 asset class pages
│       │   │   │   │
│       │   │   │   ├── compliance/
│       │   │   │   │   ├── page.tsx                  Compliance hub
│       │   │   │   │   ├── howey/page.tsx            Howey Test explainer
│       │   │   │   │   ├── erisa/page.tsx            ERISA rules
│       │   │   │   │   └── banking/page.tsx          Banking regulations
│       │   │   │   │
│       │   │   │   ├── smart-contracts/
│       │   │   │   │   ├── page.tsx                  Smart contract hub
│       │   │   │   │   ├── compliance/page.tsx       Compliance guide
│       │   │   │   │   └── prohibited/page.tsx       Prohibited patterns
│       │   │   │   │
│       │   │   │   └── roles/
│       │   │   │       ├── page.tsx                  Role guides overview
│       │   │   │       ├── legal/page.tsx            Legal counsel guide
│       │   │   │       ├── cpa/page.tsx              CPA/auditor guide
│       │   │   │       └── engineering/page.tsx      Engineering guide
│       │   │   │
│       │   │   └── docs/
│       │   │       └── page.tsx                      ⏳ Documentation portal
│       │   │
│       │   ├── (auth)/                               [Authenticated pages]
│       │   │   ├── app/                              [Main application]
│       │   │   │   ├── dashboard/
│       │   │   │   │   └── page.tsx                  ⏳ Dashboard (stats, projects, activity)
│       │   │   │   │
│       │   │   │   ├── projects/
│       │   │   │   │   ├── page.tsx                  ⏳ Project list
│       │   │   │   │   ├── new/
│       │   │   │   │   │   └── page.tsx              ⏳ New project wizard (8 steps)
│       │   │   │   │   └── [id]/
│       │   │   │   │       ├── page.tsx              ⏳ Project overview
│       │   │   │   │       ├── legal/page.tsx        ⏳ Legal tab (SEC, ERISA, TAX, BANK memos)
│       │   │   │   │       ├── finance/page.tsx      ⏳ Finance tab (CPA, AUDIT, VAL reports)
│       │   │   │   │       ├── contracts/page.tsx    ⏳ Contracts tab (SC, GOV reports)
│       │   │   │   │       ├── audit/page.tsx        ⏳ Audit tab (Evidence trail)
│       │   │   │   │       └── approvals/page.tsx    ⏳ Approvals tab (Signature collection)
│       │   │   │   │
│       │   │   │   └── settings/
│       │   │   │       └── page.tsx                  ⏳ User settings
│       │   │   │
│       │   │   └── observer/                         [Observer portal - read-only]
│       │   │       ├── page.tsx                      ⏳ Observer dashboard
│       │   │       └── projects/
│       │   │           ├── page.tsx                  ⏳ Approved projects list
│       │   │           └── [id]/
│       │   │               ├── page.tsx              ⏳ Project summary
│       │   │               ├── audit-trail/page.tsx  ⏳ Complete audit trail
│       │   │               └── attestations/page.tsx ⏳ Attestation documents
│       │   │
│       │   ├── api/                                  [API Routes]
│       │   │   ├── auth/                             ⏳ NextAuth routes
│       │   │   │   └── [...nextauth]/route.ts        Authentication handler
│       │   │   │
│       │   │   ├── mcp/                              ⏳ MCP proxy API
│       │   │   │   ├── event/
│       │   │   │   │   └── route.ts                  POST /api/mcp/event
│       │   │   │   ├── projects/
│       │   │   │   │   └── [id]/route.ts             GET /api/mcp/projects/{id}
│       │   │   │   ├── approve/
│       │   │   │   │   └── route.ts                  POST /api/mcp/approve
│       │   │   │   ├── scan-contract/
│       │   │   │   │   └── route.ts                  POST /api/mcp/scan-contract
│       │   │   │   └── attestation/
│       │   │   │       └── route.ts                  GET /api/mcp/projects/{id}/attestation
│       │   │   │
│       │   │   └── webhooks/                         ⏳ Webhook handlers
│       │   │       ├── github/route.ts               GitHub webhook (contract PRs)
│       │   │       └── mcp/route.ts                  MCP workflow completion
│       │   │
│       │   └── layout.tsx                            Root layout
│       │
│       ├── components/                               [React Components]
│       │   ├── ui/                                   ⏳ shadcn/ui components
│       │   │   ├── button.tsx
│       │   │   ├── card.tsx
│       │   │   ├── dialog.tsx
│       │   │   ├── form.tsx
│       │   │   ├── input.tsx
│       │   │   ├── select.tsx
│       │   │   ├── table.tsx
│       │   │   └── tabs.tsx
│       │   │
│       │   ├── dashboard/                            ⏳ Dashboard components
│       │   │   ├── stats.tsx                         Stats cards
│       │   │   ├── project-list.tsx                  Project table
│       │   │   ├── activity-feed.tsx                 Recent activity
│       │   │   └── quick-actions.tsx                 Quick action buttons
│       │   │
│       │   ├── projects/                             ⏳ Project components
│       │   │   ├── overview.tsx                      Project header/summary
│       │   │   ├── tabs.tsx                          Tab navigation
│       │   │   ├── gate-status.tsx                   Gate status visualizer
│       │   │   ├── approval-form.tsx                 Approval submission form
│       │   │   └── artifact-viewer.tsx               Memo/report viewer
│       │   │
│       │   ├── learn/                                ⏳ Learning components
│       │   │   ├── asset-class-card.tsx              Asset class cards
│       │   │   ├── compliance-explainer.tsx          Interactive explainers
│       │   │   └── flow-diagram.tsx                  Workflow diagrams
│       │   │
│       │   └── observer/                             ⏳ Observer components
│       │       ├── audit-trail.tsx                   Audit trail viewer
│       │       ├── attestations.tsx                  Attestation display
│       │       └── project-summary.tsx               Project summary card
│       │
│       ├── lib/                                      [Utilities]
│       │   ├── api/                                  ⏳ API client
│       │   │   └── client.ts                         Axios/fetch wrapper
│       │   ├── mcp/                                  ⏳ MCP client
│       │   │   └── client.ts                         MCP API interface
│       │   ├── auth/                                 ⏳ Auth utilities
│       │   │   └── auth-options.ts                   NextAuth configuration
│       │   └── utils.ts                              ⏳ General utilities
│       │
│       ├── prisma/                                   [Database]
│       │   ├── schema.prisma                         ⏳ Database schema
│       │   │   ├── Models: User, Project, Gate, Artifact, Approval, Attestation
│       │   │   └── Enums: Role, ProjectStatus, GateStatus, ApprovalDecision
│       │   │
│       │   └── migrations/                           Database migrations
│       │
│       ├── public/                                   [Static Assets]
│       │   ├── images/
│       │   ├── fonts/
│       │   └── favicon.ico
│       │
│       └── styles/                                   [Global Styles]
│           └── globals.css                           Tailwind CSS
│
├── 📦 packages/                                      [SHARED PACKAGES - TO BE BUILT]
│   ├── mcp-runtime/                                  [MCP Orchestrator Runtime]
│   │   ├── src/
│   │   │   ├── orchestrator.ts                       ⏳ Main orchestrator
│   │   │   │   ├── class MCPOrchestrator
│   │   │   │   ├── executeWorkflow()
│   │   │   │   ├── loadAgents()
│   │   │   │   └── fail-closed enforcement
│   │   │   │
│   │   │   ├── agents/                               ⏳ Agent implementations
│   │   │   │   ├── base.ts                           Base agent class
│   │   │   │   ├── sec-a.ts                          Securities Counsel Agent
│   │   │   │   ├── erisa-a.ts                        ERISA Counsel Agent
│   │   │   │   ├── tax-a.ts                          Tax Counsel Agent
│   │   │   │   ├── bank-a.ts                         Banking Counsel Agent
│   │   │   │   ├── struct-a.ts                       Structuring Agent
│   │   │   │   ├── cpa-a.ts                          CPA/Accounting Agent
│   │   │   │   ├── audit-a.ts                        Audit Agent
│   │   │   │   ├── val-a.ts                          Valuation Agent
│   │   │   │   ├── sc-a.ts                           Smart Contract Agent
│   │   │   │   ├── gov-a.ts                          Governance Agent
│   │   │   │   └── obs-a.ts                          Chain Observer Agent
│   │   │   │
│   │   │   ├── workflows/                            ⏳ Workflow definitions
│   │   │   │   ├── new-rwa-request.ts                NEW_RWA_REQUEST workflow
│   │   │   │   └── contract-review.ts                Smart contract review workflow
│   │   │   │
│   │   │   ├── evidence-store/                       ⏳ Evidence storage
│   │   │   │   ├── index.ts                          Evidence store interface
│   │   │   │   ├── git-store.ts                      Git implementation
│   │   │   │   └── ipfs-store.ts                     IPFS implementation (optional)
│   │   │   │
│   │   │   └── types.ts                              TypeScript types
│   │   │
│   │   └── package.json
│   │
│   ├── types/                                        [Shared TypeScript Types]
│   │   └── index.ts                                  ⏳ Type definitions
│   │       ├── Project types
│   │       ├── Gate types
│   │       ├── Agent types
│   │       ├── Workflow types
│   │       └── API types
│   │
│   └── config/                                       [Shared Configuration]
│       └── index.ts                                  ⏳ Config utilities
│
├── 🧪 tests/                                         [TESTING SUITE - TO BE BUILT]
│   ├── unit/                                         [Unit Tests - Jest]
│   │   ├── agents/                                   ⏳ Agent logic tests
│   │   │   ├── sec-a.test.ts
│   │   │   ├── sc-a.test.ts
│   │   │   └── ...
│   │   ├── workflows/                                ⏳ Workflow tests
│   │   │   └── new-rwa-request.test.ts
│   │   └── utils/                                    ⏳ Utility function tests
│   │
│   ├── integration/                                  [Integration Tests - Jest]
│   │   ├── api/                                      ⏳ API endpoint tests
│   │   │   ├── event.test.ts
│   │   │   ├── projects.test.ts
│   │   │   └── approve.test.ts
│   │   ├── database/                                 ⏳ Database operation tests
│   │   │   ├── projects.test.ts
│   │   │   └── gates.test.ts
│   │   └── mcp/                                      ⏳ MCP orchestrator tests
│   │       └── orchestrator.test.ts
│   │
│   └── e2e/                                          [E2E Tests - Playwright]
│       ├── auth.spec.ts                              ⏳ Authentication flows
│       ├── projects.spec.ts                          ⏳ Project management
│       ├── approvals.spec.ts                         ⏳ Approval workflows
│       └── deployment.spec.ts                        ⏳ Deployment gates
│
├── 🔧 .github/                                       [DEVOPS & CI/CD]
│   ├── workflows/                                    [GitHub Actions]
│   │   ├── smart-contract-compliance.yml             ⏳ Smart contract gate
│   │   │   ├── Trigger: PR on contracts/**
│   │   │   ├── Actions: Install deps, run MCP scan, check result
│   │   │   └── Output: PR comment with PASS/FAIL
│   │   │
│   │   ├── ci.yml                                    ⏳ CI pipeline
│   │   │   ├── Trigger: Push to main, PRs
│   │   │   ├── Actions: Lint, typecheck, test
│   │   │   └── Coverage: Upload to Codecov
│   │   │
│   │   └── deploy.yml                                ⏳ Deployment pipeline
│   │       ├── Trigger: Push to main
│   │       ├── Actions: Build, deploy to Vercel/Railway
│   │       └── Notifications: Slack/Discord
│   │
│   ├── CODEOWNERS                                    ⏳ Code ownership
│   ├── PULL_REQUEST_TEMPLATE.md                      ⏳ PR template
│   └── ISSUE_TEMPLATE/                               ⏳ Issue templates
│       ├── bug_report.md
│       └── feature_request.md
│
├── 📄 Configuration Files                            [Root Configuration]
│   ├── .env.example                                  ⏳ Environment variables template
│   │   ├── DATABASE_URL
│   │   ├── NEXTAUTH_URL
│   │   ├── NEXTAUTH_SECRET
│   │   ├── OPENAI_API_KEY
│   │   ├── GITHUB_TOKEN
│   │   └── REDIS_URL
│   │
│   ├── .gitignore                                    ✅ Git ignore rules
│   ├── package.json                                  ✅ Root package.json
│   ├── pnpm-workspace.yaml                           ⏳ pnpm workspace config
│   ├── turbo.json                                    ⏳ Turborepo config
│   ├── tsconfig.json                                 ⏳ TypeScript config
│   ├── prettier.config.js                            ⏳ Code formatting
│   ├── eslint.config.js                              ⏳ Linting rules
│   └── LICENSE                                       ✅ MIT License
│
└── 📖 README.md                                      ✅ This file
```

---

## 🎨 Status Legend

| Symbol | Status | Description |
|--------|--------|-------------|
| ✅ | **Complete** | Fully implemented and documented |
| 🚧 | **In Progress** | Currently being developed |
| ⏳ | **Planned** | Designed but not yet implemented |
| 🔮 | **Future** | Roadmap item for future phases |
| ❌ | **Deprecated** | No longer in use |

---

## 📊 File Count Summary

| Layer | Status | Files |
|-------|--------|-------|
| 📚 Documentation | ✅ Complete | 24 files |
| ⚖️ MCP Server | ✅ Complete | 6 files |
| 🌐 Web Application | ⏳ Planned | ~150 files |
| 📦 Shared Packages | ⏳ Planned | ~30 files |
| 🧪 Testing Suite | ⏳ Planned | ~50 files |
| 🔧 DevOps & Config | ⏳ Planned | ~15 files |
| **Total** | | **~275 files** |

---

## 🌳 Flow Tree: Document Dependencies

```
                    ┌──────────────────────────┐
                    │   README.md              │
                    │   (Start Here)           │
                    └────────────┬─────────────┘
                                 │
                 ┌───────────────┼───────────────┐
                 │               │               │
                 ▼               ▼               ▼
    ┌────────────────┐  ┌─────────────────┐  ┌──────────────────┐
    │ AYG Platform   │  │ RWA Frameworks  │  │ Platform Build   │
    │ (14 files)     │  │ (8 files)       │  │ (2 files)        │
    └────────┬───────┘  └────────┬────────┘  └────────┬─────────┘
             │                   │                     │
             └───────────────────┼─────────────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │   MCP Implementation     │
                    │   (6 files)              │
                    └────────────┬─────────────┘
                                 │
                 ┌───────────────┼───────────────┐
                 │               │               │
                 ▼               ▼               ▼
    ┌────────────────┐  ┌─────────────────┐  ┌──────────────────┐
    │ Web App        │  │ MCP Runtime     │  │ Testing Suite    │
    │ (Next.js)      │  │ (Orchestrator)  │  │ (Unit/Int/E2E)   │
    └────────────────┘  └─────────────────┘  └──────────────────┘
```

---

## 🔗 Critical Path: Phase 1 → Phase 2 → Phase 3

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
├── Public learning layer                                        ⏳
│   ├── Homepage                                                 ⏳
│   ├── RWA Atlas (11 asset classes)                             ⏳
│   ├── Compliance Hub (Howey, ERISA, banking)                   ⏳
│   └── Role Guides                                              ⏳
├── Authenticated workspace                                      ⏳
│   ├── Dashboard                                                ⏳
│   ├── Project management                                       ⏳
│   ├── New project wizard                                       ⏳
│   └── Approval workflows                                       ⏳
└── API layer                                                    ⏳
    ├── Event submission API                                     ⏳
    ├── Project state API                                        ⏳
    ├── Approval API                                             ⏳
    ├── Smart contract scan API                                  ⏳
    └── Attestation API                                          ⏳

Phase 3: Enforcement & Scale (Days 61-90)                        📅 PLANNED
├── CI/CD Integration                                            ⏳
│   ├── GitHub Actions smart contract gate                       ⏳
│   ├── Pre-commit hooks                                         ⏳
│   └── Automated deployment attestation                         ⏳
├── Observer Portal                                              ⏳
│   ├── Read-only project views                                  ⏳
│   ├── Audit trail visualization                                ⏳
│   └── Bank/regulator dashboards                                ⏳
├── Performance & Scale                                          ⏳
│   ├── Database optimization                                    ⏳
│   ├── Redis caching                                            ⏳
│   ├── CDN configuration                                        ⏳
│   └── Load testing                                             ⏳
└── Security Hardening                                           ⏳
    ├── External security audit                                  ⏳
    ├── Penetration testing                                      ⏳
    └── SOC 2 preparation                                        ⏳
```

---

## 📈 Lines of Code Estimate

```
┌─────────────────────────┬──────────┬──────────┬───────────┐
│ Component               │   LoC    │  Files   │  Status   │
├─────────────────────────┼──────────┼──────────┼───────────┤
│ 📚 Documentation        │  12,000+ │    24    │    ✅     │
│ ⚖️ MCP Server           │   1,500+ │     6    │    ✅     │
│ 🌐 Web Application      │  15,000  │   ~150   │    ⏳     │
│ 📦 MCP Runtime          │   5,000  │    ~30   │    ⏳     │
│ 🧪 Testing Suite        │   8,000  │    ~50   │    ⏳     │
│ 🔧 Config & DevOps      │   1,000  │    ~15   │    ⏳     │
├─────────────────────────┼──────────┼──────────┼───────────┤
│ **Total**               │ **42,500**│  **~275**│           │
└─────────────────────────┴──────────┴──────────┴───────────┘
```

---

## 🎯 Navigation Quick Reference

### For Legal Professionals
```
Start: docs/70-rwa-frameworks/legal-cpa-smart-contract-framework.md
→ Read: docs/70-rwa-frameworks/asset-class-registry.md
→ Review: mcp-server/prompts/sec-a-prompt.txt
→ Explore: docs/80-platform-build/platform-architecture.md
```

### For CPAs/Auditors
```
Start: docs/70-rwa-frameworks/legal-cpa-smart-contract-framework.md
→ Read: docs/70-rwa-frameworks/control-matrix.md
→ Review: docs/ayg-platform/03-economic-model/
→ Explore: mcp-server/mcp-server-config.json (CPA-A, AUDIT-A agents)
```

### For Engineers
```
Start: docs/80-platform-build/technical-implementation-guide.md
→ Read: mcp-server/README.md
→ Review: mcp-server/prompts/sc-a-prompt.txt
→ Explore: mcp-server/examples/example-smart-contract.sol
```

### For Founders/Operators
```
Start: README.md
→ Read: docs/80-platform-build/platform-architecture.md
→ Review: docs/70-rwa-frameworks/execution-playbooks.md
→ Explore: docs/70-rwa-frameworks/asset-class-registry.md
```

### For Developers (New Contributors)
```
Start: README.md
→ Read: docs/80-platform-build/technical-implementation-guide.md
→ Setup: Follow "Quick Start" section
→ Review: mcp-server/ (existing implementation)
→ Build: apps/web/ (Phase 2 implementation)
```

---

**This visual directory structure provides complete navigation for all stakeholders across 275+ files spanning documentation, implementation, and testing.**
