# 📊 MCP AI Law Firm - Visual Flow Diagrams

> **Complete system flow visualizations, workflow maps, and architectural diagrams**

---

## 📋 Table of Contents

- [System Architecture](#system-architecture)
- [Agent Orchestration](#agent-orchestration)
- [Workflow Sequences](#workflow-sequences)
- [Data Flow Maps](#data-flow-maps)
- [State Machines](#state-machines)
- [Integration Patterns](#integration-patterns)

---

## System Architecture

### Three-Layer Architecture

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                    LAYER 1: PUBLIC LEARNING                         ┃
┃                    No Authentication Required                       ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                              │
                              │ User browses educational content
                              │ Learns about RWA compliance
                              │ Understands role requirements
                              │
                              ▼
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃              LAYER 2: AUTHENTICATED WORKSPACE                       ┃
┃              Role-Based Access Control (RBAC)                       ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                              │
                              │ User submits project request
                              │ Triggers MCP workflow via API
                              │ Receives real-time status updates
                              │
                              ▼
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                  LAYER 3: MCP CONTROL PLANE                         ┃
┃                  Backend AI Orchestration                           ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### Component Interaction Map

```
┌─────────────────────────────────────────────────────────────────────┐
│                         END USER (Browser)                          │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               │ HTTPS (443)
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    NEXT.JS WEB APPLICATION                          │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │              FRONTEND (React Components)                     │  │
│  │  • Public pages (/, /learn/*, /docs)                         │  │
│  │  • Auth pages (/app/dashboard, /app/projects/*)             │  │
│  │  • Observer pages (/observer/*)                              │  │
│  └────────────────────────┬─────────────────────────────────────┘  │
│                           │                                         │
│                           │ Internal API Calls                      │
│                           │                                         │
│  ┌────────────────────────▼─────────────────────────────────────┐  │
│  │              API ROUTES (Next.js API)                        │  │
│  │  • POST /api/mcp/event                                       │  │
│  │  • GET  /api/mcp/projects/{id}                               │  │
│  │  • POST /api/mcp/approve                                     │  │
│  │  • POST /api/mcp/scan-contract                               │  │
│  │  • GET  /api/mcp/projects/{id}/attestation                   │  │
│  └────────────────────────┬─────────────────────────────────────┘  │
└───────────────────────────┼─────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│  POSTGRESQL   │   │ MCP ORCHESTR. │   │   REDIS       │
│               │   │               │   │               │
│  • Users      │   │  • Agents     │   │  • Sessions   │
│  • Projects   │   │  • Workflows  │   │  • Cache      │
│  • Gates      │   │  • Evidence   │   │  • Queue      │
│  • Artifacts  │   │    Store      │   │               │
│  • Approvals  │   │               │   │               │
└───────────────┘   └───────┬───────┘   └───────────────┘
                            │
                            │ Stores Evidence
                            │
                            ▼
                    ┌───────────────┐
                    │  GIT REPO     │
                    │               │
                    │  • Commits    │
                    │  • SHA-256    │
                    │  • IPFS CID   │
                    └───────────────┘
```

---

## Agent Orchestration

### 11-Agent Topology

```
                    ┌──────────────────────┐
                    │   MCP ORCHESTRATOR   │
                    │  (Fail-Closed Rules) │
                    └───────────┬──────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
                ▼               ▼               ▼
    ┌───────────────────┐ ┌─────────────┐ ┌─────────────┐
    │  LEGAL CLUSTER    │ │FIN CLUSTER  │ │TECH CLUSTER │
    │  (5 agents)       │ │(3 agents)   │ │(3 agents)   │
    └───────────────────┘ └─────────────┘ └─────────────┘
            │                   │               │
    ┌───────┼───────┐       ┌───┼───┐       ┌──┼──┐
    │   │   │   │   │       │   │   │       │  │  │
    ▼   ▼   ▼   ▼   ▼       ▼   ▼   ▼       ▼  ▼  ▼
┌─────┬────┬────┬────┬─────┬────┬────┬─────┬────┬────┬────┐
│SEC-A│ERIS│TAX │BANK│STRUC│CPA │AUDI│VAL  │SC  │GOV │OBS │
│     │A-A │-A  │-A  │T-A  │-A  │T-A │-A   │-A  │-A  │-A  │
└─────┴────┴────┴────┴─────┴────┴────┴─────┴────┴────┴────┘
  │     │    │    │     │     │    │     │    │    │    │
  │     │    │    │     │     │    │     │    │    │    │
  └─────┴────┴────┴─────┴─────┴────┴─────┴────┴────┴────┘
                          │
                          ▼
              ┌─────────────────────┐
              │   EVIDENCE STORE    │
              │   (Git + IPFS)      │
              └─────────────────────┘
```

### Agent Communication Flow

```
Workflow: NEW_RWA_REQUEST
Sequential execution with dependency chain

Step 1: SEC-A
┌─────────────────────────────────────┐
│ Input:  Project details             │
│ Output: Securities memo             │
│ Status: PASS → Unlock ERISA-A       │
│         FAIL → BLOCK workflow       │
└──────────────┬──────────────────────┘
               │
               │ If PASS
               ▼
Step 2: ERISA-A
┌─────────────────────────────────────┐
│ Input:  SEC-A memo + investor data  │
│ Output: ERISA analysis              │
│ Status: PASS → Unlock TAX-A         │
│         FAIL → BLOCK workflow       │
└──────────────┬──────────────────────┘
               │
               │ If PASS
               ▼
Step 3: TAX-A
┌─────────────────────────────────────┐
│ Input:  SEC-A + ERISA-A memos       │
│ Output: Tax characterization        │
│ Status: PASS → Unlock BANK-A        │
│         FAIL → BLOCK workflow       │
└──────────────┬──────────────────────┘
               │
               │ If PASS
               ▼
Step 4: BANK-A
┌─────────────────────────────────────┐
│ Input:  All legal memos             │
│ Output: Banking risk report         │
│ Status: PASS → Unlock CPA-A         │
│         FAIL → BLOCK workflow       │
└──────────────┬──────────────────────┘
               │
               │ If PASS
               ▼
Step 5: CPA-A
┌─────────────────────────────────────┐
│ Input:  All legal + banking memos   │
│ Output: Accounting treatment        │
│ Status: PASS → Unlock SC-A          │
│         FAIL → BLOCK workflow       │
└──────────────┬──────────────────────┘
               │
               │ If PASS
               ▼
Step 6: SC-A (CRITICAL GATE)
┌─────────────────────────────────────┐
│ Input:  Solidity code + all memos   │
│ Output: 26-item compliance scan     │
│ Status: PASS → Unlock AUDIT-A       │
│         FAIL → BLOCK (list issues)  │
└──────────────┬──────────────────────┘
               │
               │ If PASS
               ▼
Step 7: AUDIT-A
┌─────────────────────────────────────┐
│ Input:  All artifacts               │
│ Output: Attestation plan            │
│ Status: PASS → Unlock GOV-A         │
│         FAIL → BLOCK workflow       │
└──────────────┬──────────────────────┘
               │
               │ If PASS
               ▼
Step 8: GOV-A
┌─────────────────────────────────────┐
│ Input:  All artifacts + signers     │
│ Output: Governance config           │
│ Status: PASS → Workflow COMPLETE    │
│         FAIL → BLOCK workflow       │
└──────────────┬──────────────────────┘
               │
               │ If PASS
               ▼
         ┌──────────────┐
         │  WORKFLOW    │
         │  COMPLETE    │
         │  (8/8 PASS)  │
         └──────────────┘
```

---

## Workflow Sequences

### User Flow 1: Founder Creates New Project

```
┌─────────────┐
│  Founder    │ (Authenticated user, role=FOUNDER)
└──────┬──────┘
       │
       │ 1. Navigate to /app/projects/new
       │
       ▼
┌─────────────────────────────────────────┐
│   NEW PROJECT WIZARD (8 steps)          │
│                                         │
│   Step 1: RWA Type Selection            │
│   • Treasuries, Private Credit, etc.    │
│                                         │
│   Step 2: Jurisdiction                  │
│   • US (Federal + State)                │
│   • EU, UK, Singapore, etc.             │
│                                         │
│   Step 3: Legal Wrapper                 │
│   • Delaware Statutory Trust            │
│   • SPV, Fund, etc.                     │
│                                         │
│   Step 4: Distribution Strategy         │
│   • Reg D 506(c)                        │
│   • Reg S, Reg A+, etc.                 │
│                                         │
│   Step 5: Asset Details                 │
│   • Description, value, location        │
│                                         │
│   Step 6: Economic Terms                │
│   • Revenue share, distributions        │
│                                         │
│   Step 7: Custody & Banking             │
│   • Custodian, bank relationships       │
│                                         │
│   Step 8: Attestation Plan              │
│   • Auditor, frequency, scope           │
└──────┬──────────────────────────────────┘
       │
       │ 2. Submit form
       │
       ▼
┌─────────────────────────────────────────┐
│   API: POST /api/mcp/event              │
│   {                                     │
│     "event_type": "NEW_RWA_REQUEST",    │
│     "payload": { ... }                  │
│   }                                     │
└──────┬──────────────────────────────────┘
       │
       │ 3. Creates project in database
       │    project_id = "proj_abc123"
       │    status = "INITIATED"
       │
       ▼
┌─────────────────────────────────────────┐
│   MCP Orchestrator triggers workflow    │
│   Workflow: NEW_RWA_REQUEST             │
└──────┬──────────────────────────────────┘
       │
       │ 4. Executes 8 agents sequentially
       │    (See Agent Communication Flow)
       │
       ▼
┌─────────────────────────────────────────┐
│   Workflow completes (2-5 minutes)      │
│   • 8 memos generated                   │
│   • All stored in Git                   │
│   • Project status → LEGAL_REVIEW       │
└──────┬──────────────────────────────────┘
       │
       │ 5. Founder receives email notification
       │    "Your project is ready for review"
       │
       ▼
┌─────────────────────────────────────────┐
│   Founder navigates to project detail   │
│   /app/projects/proj_abc123             │
│   • Views all 8 memos                   │
│   • Sees gate statuses (8/8 PASS)       │
│   • Can invite team members             │
└─────────────────────────────────────────┘
```

### User Flow 2: Lawyer Reviews & Approves

```
┌─────────────┐
│  Lawyer     │ (Authenticated user, role=LEGAL_COUNSEL)
└──────┬──────┘
       │
       │ 1. Receives email: "Project ready for legal review"
       │
       ▼
┌─────────────────────────────────────────┐
│   Lawyer logs in to /app/dashboard      │
│   • Sees pending approvals (3 projects) │
│   • Clicks project: proj_abc123         │
└──────┬──────────────────────────────────┘
       │
       │ 2. Navigate to /app/projects/proj_abc123
       │
       ▼
┌─────────────────────────────────────────┐
│   PROJECT DETAIL PAGE                   │
│                                         │
│   Tabs:                                 │
│   • Overview (project summary)          │
│   • Legal (4 memos: SEC, ERISA, TAX,    │
│     BANK)                               │
│   • Finance (3 reports: CPA, AUDIT, VAL)│
│   • Contracts (2: SC, GOV)              │
│   • Audit (evidence trail)              │
│   • Approvals (signature collection)    │
└──────┬──────────────────────────────────┘
       │
       │ 3. Click "Legal" tab
       │
       ▼
┌─────────────────────────────────────────┐
│   LEGAL TAB                             │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │ SEC-A: Securities Memo          │   │
│   │ Status: PASS                    │   │
│   │ [View Memo] [Download PDF]      │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │ ERISA-A: Plan Asset Memo        │   │
│   │ Status: PASS                    │   │
│   │ [View Memo] [Download PDF]      │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │ TAX-A: Tax Characterization     │   │
│   │ Status: PASS                    │   │
│   │ [View Memo] [Download PDF]      │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │ BANK-A: Banking Risk Report     │   │
│   │ Status: PASS                    │   │
│   │ [View Memo] [Download PDF]      │   │
│   └─────────────────────────────────┘   │
└──────┬──────────────────────────────────┘
       │
       │ 4. Lawyer reads all memos carefully
       │    (30-60 minutes)
       │
       ▼
┌─────────────────────────────────────────┐
│   Decision: APPROVE or BLOCK            │
│                                         │
│   If APPROVE:                           │
│   • Click "Approve Legal Review"        │
│   • Modal: "Enter approval comments"    │
│   • Sign with digital signature         │
│                                         │
│   If BLOCK:                             │
│   • Click "Block Deployment"            │
│   • Modal: "Enter blocking reasons"     │
│   • List specific issues                │
│   • Sign with digital signature         │
└──────┬──────────────────────────────────┘
       │
       │ 5. Submit approval/block decision
       │
       ▼
┌─────────────────────────────────────────┐
│   API: POST /api/mcp/approve            │
│   {                                     │
│     "project_id": "proj_abc123",        │
│     "gate_name": "legal",               │
│     "decision": "APPROVE",              │
│     "comments": "...",                  │
│     "signature": "0x..."                │
│   }                                     │
└──────┬──────────────────────────────────┘
       │
       │ 6. Approval recorded in database
       │    • Approval table: new row
       │    • Project updated: legal_approved_by
       │
       ▼
┌─────────────────────────────────────────┐
│   Lawyer sees confirmation              │
│   "Your approval has been recorded"     │
│                                         │
│   Next: Wait for CPA and Engineer       │
│         approvals (9 total required)    │
└─────────────────────────────────────────┘
```

### User Flow 3: Engineer Submits Smart Contract

```
┌─────────────┐
│  Engineer   │ (Authenticated user, role=ENGINEER)
└──────┬──────┘
       │
       │ 1. Develops smart contract locally
       │    (ERC-20 with compliance features)
       │
       ▼
┌─────────────────────────────────────────┐
│   Engineer navigates to project         │
│   /app/projects/proj_abc123/contracts   │
└──────┬──────────────────────────────────┘
       │
       │ 2. Click "Upload Smart Contract"
       │
       ▼
┌─────────────────────────────────────────┐
│   SMART CONTRACT UPLOAD MODAL           │
│                                         │
│   • Drag & drop Solidity file (.sol)    │
│   • Or paste code directly              │
│   • Select compiler version             │
│   • Add deployment notes                │
│                                         │
│   [Upload & Scan]                       │
└──────┬──────────────────────────────────┘
       │
       │ 3. Submit contract for scanning
       │
       ▼
┌─────────────────────────────────────────┐
│   API: POST /api/mcp/scan-contract      │
│   {                                     │
│     "project_id": "proj_abc123",        │
│     "contract_code": "...",             │
│     "compiler_version": "0.8.20"        │
│   }                                     │
└──────┬──────────────────────────────────┘
       │
       │ 4. MCP SC-A agent executes scan
       │    (26-item checklist)
       │
       ▼
┌─────────────────────────────────────────┐
│   SCAN RESULTS (30-60 seconds)          │
│                                         │
│   ✅ PASS: Compliance check successful  │
│                                         │
│   Prohibited Patterns (0 found):        │
│   • No yield logic                      │
│   • No automated payouts                │
│   • No dividend distribution            │
│   • No permissionless transfers         │
│   • No participant tracking             │
│   • No economic upgrades                │
│   • No custody logic                    │
│   • No direct payments                  │
│                                         │
│   Required Features (8/8 present):      │
│   ✅ Pausable mechanism                 │
│   ✅ Supply cap (hardcoded)             │
│   ✅ Restricted minting                 │
│   ✅ Transfer restrictions              │
│   ✅ Event emissions                    │
│   ✅ Multisig governance                │
│   ✅ Immutable economics                │
│   ✅ Reconciliation support             │
│                                         │
│   26-Item Checklist: 26/26 PASS        │
│                                         │
│   [Download Report] [View Details]      │
└──────┬──────────────────────────────────┘
       │
       │ 5. Engineer reviews scan report
       │    If PASS: Proceeds to deployment
       │    If FAIL: Fixes issues & re-scans
       │
       ▼
┌─────────────────────────────────────────┐
│   Contract stored in project artifacts  │
│   • Git commit with SHA-256 hash        │
│   • Optional IPFS upload                │
│   • Scan report linked                  │
└─────────────────────────────────────────┘
```

---

## Data Flow Maps

### Event Submission Flow

```
Browser                 API Route              Database            MCP Server            Git Store
   │                       │                      │                    │                    │
   │  POST /api/mcp/event  │                      │                    │                    │
   ├──────────────────────>│                      │                    │                    │
   │                       │                      │                    │                    │
   │                       │  Create project      │                    │                    │
   │                       ├─────────────────────>│                    │                    │
   │                       │                      │                    │                    │
   │                       │  project_id          │                    │                    │
   │                       │<─────────────────────┤                    │                    │
   │                       │                      │                    │                    │
   │                       │  Initialize 8 gates  │                    │                    │
   │                       ├─────────────────────>│                    │                    │
   │                       │                      │                    │                    │
   │                       │  Trigger workflow    │                    │                    │
   │                       ├───────────────────────────────────────────>│                    │
   │                       │                      │                    │                    │
   │  Response (project_id)│                      │                    │  Execute agents    │
   │<──────────────────────┤                      │                    │  (8 sequential)    │
   │                       │                      │                    │                    │
   │                       │                      │                    │  Store artifact    │
   │                       │                      │                    ├───────────────────>│
   │                       │                      │                    │                    │
   │                       │                      │                    │  Git commit        │
   │                       │                      │                    │  + SHA-256 hash    │
   │                       │                      │                    │<───────────────────┤
   │                       │                      │                    │                    │
   │                       │                      │  Update gate       │                    │
   │                       │                      │<────────────────────┤                    │
   │                       │                      │  status = PASS     │                    │
   │                       │                      │  memo_path = ...   │                    │
   │                       │                      │                    │                    │
   │                       │                      │  Create artifact   │                    │
   │                       │                      │  record with hash  │                    │
   │                       │                      │<────────────────────┤                    │
   │                       │                      │                    │                    │
   │  WebSocket update     │                      │                    │                    │
   │<══════════════════════════════════════════════════════════════════│                    │
   │  "Gate 1 complete"    │                      │                    │                    │
```

### Approval Flow

```
Browser                 API Route              Database            Email Service
   │                       │                      │                    │
   │  View project page    │                      │                    │
   │  /app/projects/{id}   │                      │                    │
   │                       │                      │                    │
   │  GET project data     │                      │                    │
   ├──────────────────────>│                      │                    │
   │                       │                      │                    │
   │                       │  Fetch project       │                    │
   │                       │  + gates + artifacts │                    │
   │                       ├─────────────────────>│                    │
   │                       │                      │                    │
   │                       │  Project data        │                    │
   │                       │<─────────────────────┤                    │
   │                       │                      │                    │
   │  Project + artifacts  │                      │                    │
   │<──────────────────────┤                      │                    │
   │                       │                      │                    │
   │  User reviews memos   │                      │                    │
   │  (30-60 minutes)      │                      │                    │
   │                       │                      │                    │
   │  Click "Approve"      │                      │                    │
   │  Enter signature      │                      │                    │
   │                       │                      │                    │
   │  POST /api/mcp/approve│                      │                    │
   ├──────────────────────>│                      │                    │
   │                       │                      │                    │
   │                       │  Verify RBAC         │                    │
   │                       │  (user has role?)    │                    │
   │                       ├─────────────────────>│                    │
   │                       │                      │                    │
   │                       │  Verification OK     │                    │
   │                       │<─────────────────────┤                    │
   │                       │                      │                    │
   │                       │  Create approval     │                    │
   │                       │  record              │                    │
   │                       ├─────────────────────>│                    │
   │                       │                      │                    │
   │                       │  Update gate         │                    │
   │                       │  approved_by = user  │                    │
   │                       │  approved_at = now   │                    │
   │                       ├─────────────────────>│                    │
   │                       │                      │                    │
   │                       │  Check: All approved?│                    │
   │                       │  (9/9 signatures?)   │                    │
   │                       ├─────────────────────>│                    │
   │                       │                      │                    │
   │                       │  Yes: status→APPROVED│                    │
   │                       │<─────────────────────┤                    │
   │                       │                      │                    │
   │                       │  Send notification   │                    │
   │                       ├────────────────────────────────────────────>│
   │                       │  "Project approved"  │                    │
   │                       │  To: admin@company   │                    │
   │                       │                      │                    │
   │  Response (success)   │                      │                    │
   │<──────────────────────┤                      │                    │
   │                       │                      │                    │
   │  UI updates:          │                      │                    │
   │  "Approval recorded"  │                      │                    │
```

---

## State Machines

### Project Status State Machine

```
      ┌──────────────┐
      │  INITIATED   │ ← Initial state (form submitted)
      └──────┬───────┘
             │
             │ MCP workflow starts
             │
             ▼
      ┌──────────────┐
      │   RUNNING    │ ← Agents executing (2-5 minutes)
      └──────┬───────┘
             │
       ┌─────┴─────┐
       │           │
       ▼           ▼
┌─────────────┐ ┌─────────────┐
│LEGAL_REVIEW │ │   BLOCKED   │
└──────┬──────┘ └──────┬──────┘
       │               │
       │               │ Fix issues
       │               │
       │               └──────────┐
       │                          │
       │ Approvals collected      │
       │                          │
       ▼                          ▼
┌─────────────┐            ┌─────────────┐
│  APPROVED   │            │ RERUNNING   │
└──────┬──────┘            └──────┬──────┘
       │                          │
       │ Deployment initiated     │
       │                          │
       ▼                          ▼
┌─────────────┐            ┌─────────────┐
│  DEPLOYED   │            │LEGAL_REVIEW │
└─────────────┘            └─────────────┘
    (Final)                  (Re-enter)

State Transition Rules:

INITIATED → RUNNING:        When workflow starts
RUNNING → LEGAL_REVIEW:     When all 8 gates PASS
RUNNING → BLOCKED:          When any gate FAIL
LEGAL_REVIEW → APPROVED:    When 9/9 approvals collected
LEGAL_REVIEW → BLOCKED:     When any approval is BLOCK
BLOCKED → RERUNNING:        When fixes applied & re-submitted
RERUNNING → LEGAL_REVIEW:   When workflow completes (all PASS)
RERUNNING → BLOCKED:        When workflow fails again
APPROVED → DEPLOYED:        When admin executes deployment
```

### Gate Status State Machine

```
      ┌──────────────┐
      │   LOCKED     │ ← Initial state (except first gate)
      └──────┬───────┘
             │
             │ Previous gate passes
             │
             ▼
      ┌──────────────┐
      │   PENDING    │ ← Agent executing analysis
      └──────┬───────┘
             │
       ┌─────┴─────┐
       │           │
       ▼           ▼
┌─────────────┐ ┌─────────────┐
│    PASS     │ │    FAIL     │
└──────┬──────┘ └──────┬──────┘
       │               │
       │ Unlock next   │ Block workflow
       │ gate          │
       │               │
       ▼               ▼
[Next gate      [Project status
 PENDING]        → BLOCKED]

No reversions:
• LOCKED → PENDING → PASS (one-way)
• LOCKED → PENDING → FAIL (terminal for this workflow run)
• PASS never reverts to PENDING or LOCKED
• FAIL can only be fixed by re-running entire workflow
```

---

## Integration Patterns

### GitHub Integration (Smart Contract PR Review)

```
Developer                  GitHub                MCP Server             API Route
    │                         │                      │                    │
    │  Push contract code     │                      │                    │
    ├────────────────────────>│                      │                    │
    │                         │                      │                    │
    │  Create PR              │                      │                    │
    ├────────────────────────>│                      │                    │
    │                         │                      │                    │
    │                         │  Trigger webhook     │                    │
    │                         ├─────────────────────────────────────────>│
    │                         │  POST /api/webhooks/ │                    │
    │                         │  github              │                    │
    │                         │                      │                    │
    │                         │                      │  Fetch contract    │
    │                         │                      │  from PR           │
    │                         │<─────────────────────┤                    │
    │                         │                      │                    │
    │                         │  Contract code       │                    │
    │                         ├─────────────────────>│                    │
    │                         │                      │                    │
    │                         │                      │  SC-A agent scans  │
    │                         │                      │  (26-item checklist)│
    │                         │                      │                    │
    │                         │  Scan result         │                    │
    │                         │<─────────────────────┤                    │
    │                         │  (PASS/FAIL)         │                    │
    │                         │                      │                    │
    │                         │                      │  Post PR comment   │
    │                         │                      ├───────────────────>│
    │                         │                      │  with scan report  │
    │                         │                      │                    │
    │                         │  PR comment appears  │                    │
    │                         │<─────────────────────────────────────────┤
    │                         │                      │                    │
    │  Email: PR check result │                      │                    │
    │<────────────────────────┤                      │                    │
    │                         │                      │                    │
    │  View PR comment        │                      │                    │
    │  with compliance report │                      │                    │

PR Comment Format:
┌──────────────────────────────────────────────────────────────┐
│ ## Smart Contract Compliance Scan                            │
│                                                              │
│ ✅ **PASS** - All compliance checks passed                   │
│                                                              │
│ ### Prohibited Patterns                                      │
│ ✅ No yield logic found                                      │
│ ✅ No automated payouts found                                │
│ ✅ No dividend distribution found                            │
│                                                              │
│ ### Required Features                                        │
│ ✅ Pausable mechanism present                                │
│ ✅ Supply cap hardcoded                                      │
│ ✅ Transfer restrictions implemented                         │
│                                                              │
│ ### 26-Item Checklist                                        │
│ ✅ 26/26 checks passed                                       │
│                                                              │
│ [View Full Report](https://mcp-law.com/scan/xyz)            │
└──────────────────────────────────────────────────────────────┘
```

---

**This document provides complete visual flow diagrams for all major system interactions. Use these diagrams for stakeholder presentations, developer onboarding, and architectural reviews.**
