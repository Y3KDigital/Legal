# MCP Law Platform — Website Architecture & Build Plan

**Document Status:** Platform Build Specification  
**Version:** 1.0  
**Last Updated:** January 13, 2026  
**Classification:** Internal / Technical

---

## Executive Summary

This document defines the **complete platform architecture** for the MCP AI Law Firm website and application.

This is not a brochure or wiki. This is a **living compliance system** with the MCP AI Law Firm embedded end-to-end.

---

## 1. WHAT THE PLATFORM IS

The platform serves three simultaneous functions:

1. **Institutional learning environment** (public)
2. **Guided compliance workspace** (authenticated)
3. **Live legal-operations control plane** (MCP-powered)

**Critical Principle:** This is **workflow-first**, not content-first.

---

## 2. THREE-LAYER ARCHITECTURE

### Layer 1: Public Learning Layer (No Authentication)

**Purpose:** Education, transparency, institutional literacy

**Target Audience:**
- Founders exploring RWA
- Developers learning compliance
- Banks conducting diligence
- Regulators reviewing approach
- Students studying securities law
- External counsel reviewing methodology

**Characteristics:**
- No decision-making
- No AI opinions
- Pure education backed by documentation
- Bank-safe, regulator-legible
- No proprietary information exposure

---

### Layer 2: Authenticated Workspace (Login Required)

**Purpose:** Execute compliant RWA workflows

**User Roles:**
- Founder / Operator (project management)
- Legal Counsel (review & approval)
- CPA / Auditor (attestation & verification)
- Engineer (smart contract compliance)
- Bank / Regulator (read-only observer)

**Characteristics:**
- Role-based views (different interfaces per role)
- Task-driven (MCP assigns work)
- Approval gates (explicit human decisions)
- Separation of duties enforced
- Audit trail automatic

---

### Layer 3: MCP Control Plane (Backend)

**Purpose:** Decision orchestration, compliance enforcement

**Components:**
- MCP Orchestrator (workflow engine)
- Agent Registry (11 specialized agents)
- Evidence Store (Git + optional IPFS)
- Human Approval Gates (multisig)

**Characteristics:**
- Never visible to end users
- Source of truth for all decisions
- Fail-closed by design
- Immutable audit trail
- No UI bypass possible

---

## 3. COMPLETE PAGE MAP

### A. Public Layer (No Login Required)

```
/ 
  └─ Home
      • Value proposition
      • How it works (high-level)
      • Who it's for (founders, banks, regulators)
      • Call-to-action: Learn More / Sign Up

/learn
  └─ Learning Hub Overview
      • RWA education
      • Compliance frameworks
      • Role-based guides
      • Smart contract compliance

/learn/rwa-atlas
  └─ Interactive RWA Asset Class Atlas
      • 11 asset classes documented
      • For each: legal wrapper, custody, settlement, attestation
      • Compare asset classes (table view)
      • Jurisdiction selector

/learn/rwa-atlas/[asset-class]
  └─ Detailed Asset Class Pages
      • Treasuries & Money Market Funds
      • Private Credit & Loan Participations
      • Real Estate (Commercial, Residential)
      • Commodities & Precious Metals
      • Carbon Credits
      • Corporate Bonds
      • Trade Receivables
      • Structured Products
      • IP & Royalties
      • Tokenized Funds (ETFs, Mutual Funds)
      • ERISA Benefits (highly restricted)

/learn/compliance
  └─ Compliance Framework Hub
      • Securities law overview
      • ERISA fundamentals
      • Banking & custody
      • Tax considerations

/learn/compliance/howey
  └─ Howey Test Deep Dive
      • 4-prong framework
      • Interactive examples
      • Mitigation strategies
      • Case law citations

/learn/compliance/erisa
  └─ ERISA & Plan Assets
      • What is plan asset contamination?
      • Prohibited patterns
      • Aggregate vs participant-level
      • Safe harbor structures

/learn/compliance/banking
  └─ Banking & Custody Risk
      • Qualified custodian requirements
      • AML/KYC obligations
      • Bank risk committee considerations
      • Payments law (Reg E, money transmission)

/learn/smart-contracts
  └─ Smart Contract Compliance Hub
      • Law vs code responsibility split
      • Prohibited patterns (with code examples)
      • Required features
      • Deployment checklist overview

/learn/smart-contracts/compliance
  └─ Compliance Patterns Explorer
      • Toggle "yield logic" → see why it fails
      • Toggle "permissionless transfers" → see risk
      • Interactive compliance checker

/learn/smart-contracts/prohibited-patterns
  └─ Prohibited Pattern Library
      • Yield-bearing logic
      • Automated payouts
      • Dividend distribution
      • Code examples (Solidity)
      • Why each pattern fails

/learn/roles
  └─ Role-Based Guides Hub
      • What lawyers care about
      • What CPAs care about
      • What banks care about
      • What engineers must not do

/learn/roles/legal
  └─ Legal Role Guide
      • Securities counsel responsibilities
      • ERISA counsel responsibilities
      • Tax counsel responsibilities
      • Banking counsel responsibilities
      • Deliverables for each role

/learn/roles/cpa
  └─ CPA & Accounting Role Guide
      • Consolidation analysis
      • Revenue recognition
      • Fair value measurement
      • Attestation requirements

/learn/roles/engineering
  └─ Engineering Role Guide
      • What smart contracts can do
      • What smart contracts cannot do
      • Mandatory compliance features
      • Deployment gate requirements

/docs
  └─ Documentation Library (Read-Only)
      • Link to GitHub repo
      • Download documentation packages
      • API documentation (for MCP integration)
```

---

### B. Authenticated Workspace (Login Required)

```
/app
  └─ Application Root (redirect to dashboard)

/app/dashboard
  └─ Role-Based Dashboard
      • For Founders: project status, pending tasks
      • For Lawyers: assigned reviews, approval queue
      • For CPAs: attestation requests, audit tasks
      • For Engineers: contract review status, violations
      • Activity feed (what's happening)
      • Quick actions (start project, review task)

/app/projects
  └─ Project List
      • All projects (filtered by role)
      • Status indicators (LEGAL_REVIEW, AUDIT, APPROVED, BLOCKED)
      • Search & filter
      • Create new project button

/app/projects/new
  └─ New Project Wizard
      • Step 1: RWA Type Selection (from atlas)
      • Step 2: Jurisdiction & Legal Wrapper
      • Step 3: Distribution Posture
      • Step 4: Asset Details
      • Step 5: Economic Terms
      • Step 6: Custody Model
      • Step 7: Banking Relationship
      • Step 8: Submit to MCP
      • Creates NEW_RWA_REQUEST event

/app/projects/[project-id]
  └─ Project Detail (tabs)
      • Overview tab (default)
      • Legal tab
      • Finance tab
      • Contracts tab
      • Audit tab
      • Approvals tab

/app/projects/[project-id]/overview
  └─ Project Overview Tab
      • Project metadata (name, type, jurisdiction)
      • Status timeline (visual workflow)
      • Gate status (red/yellow/green)
        - Securities Review
        - ERISA Review
        - Tax Review
        - Banking Review
        - Accounting Review
        - Smart Contract Compliance
        - Audit Attestation
        - Governance Approval
      • Recent activity
      • Key contacts (who's assigned what)

/app/projects/[project-id]/legal
  └─ Legal Tab (Role-Gated)
      • Securities Classification Memo (view/review)
      • ERISA Boundary Memo (view/review)
      • Tax Treatment Memo (view/review)
      • Bank Risk Memo (view/review)
      • Structure Memo (view/review)
      • Lawyer Actions:
        - Approve memo
        - Block with reason
        - Request revisions
      • Version history (Git-backed diffs)

/app/projects/[project-id]/finance
  └─ Finance Tab (Role-Gated)
      • Accounting Treatment Memo
      • Consolidation Analysis
      • Valuation Methodology
      • Attestation Plan
      • CPA Actions:
        - Approve analysis
        - Block with reason
        - Request additional documentation

/app/projects/[project-id]/contracts
  └─ Smart Contracts Tab (Role-Gated)
      • Upload contract code
      • Automated compliance scan results
      • Prohibited pattern detection (highlighted)
      • Required feature verification (checklist)
      • 26-item deployment checklist (interactive)
      • Violation details (line numbers, code snippets)
      • Engineer Actions:
        - Resubmit after fixes
        - View compliance report
        - Download approved contract templates

/app/projects/[project-id]/audit
  └─ Audit Tab (Role-Gated)
      • Proof-of-reserves requirements
      • Attestation schedule
      • Reconciliation process
      • Evidence pack generation
      • Auditor Actions:
        - Approve attestation plan
        - Upload audit reports
        - Sign attestation

/app/projects/[project-id]/approvals
  └─ Approvals Tab (All Roles View)
      • Human approval checklist:
        - Legal Approval (General Counsel signature)
        - Compliance Approval (CCO signature)
        - Governance Approval (Multisig 3-of-5)
      • Approval timestamps
      • Signature verification
      • Deployment Attestation (generated after all approvals)
      • Audit evidence pack (downloadable)
```

---

### C. Observer Portal (Read-Only for Banks/Regulators)

```
/observer
  └─ Observer Dashboard
      • Projects visible to observer
      • High-level compliance status
      • No drafts, no internal debate
      • Final artifacts only

/observer/projects
  └─ Observer Project List
      • Approved projects only
      • Public compliance posture
      • Attestation availability

/observer/projects/[project-id]
  └─ Observer Project Detail
      • Final memos (no drafts)
      • Deployment attestation
      • Audit trail (timestamps, approvals)
      • Evidence hashes (IPFS if enabled)
      • No edit capability
      • No task views

/observer/projects/[project-id]/audit-trail
  └─ Complete Audit Trail
      • Workflow execution log
      • Agent outputs (final only)
      • Human approvals (with timestamps)
      • Git commit hashes
      • Reviewer attribution
      • Regulator-legible format

/observer/projects/[project-id]/attestations
  └─ Attestation Repository
      • Deployment attestation
      • Proof-of-reserves reports
      • Independent audit reports
      • All signatures verified
```

---

## 4. CORE USER WORKFLOWS

### Workflow 1: Start New RWA Project (Founder)

**Steps:**

1. **Login** → Navigate to `/app/dashboard`
2. **Click "New Project"** → Navigate to `/app/projects/new`
3. **Complete wizard** (8 steps):
   - Select RWA type (real estate)
   - Choose jurisdiction (US)
   - Define legal wrapper (Delaware Statutory Trust)
   - Specify distribution posture (Institutional, Reg D 506(c))
   - Enter asset details ($130M properties)
   - Define economic terms (quarterly distributions)
   - Describe custody model (independent trustee)
   - Confirm banking relationship (institutional KYC)
4. **Submit** → Website sends `NEW_RWA_REQUEST` event to MCP
5. **MCP Response:**
   - Creates project ID
   - Initializes workflow
   - Sets all gates to LOCKED or PENDING
   - Assigns tasks to legal agents
6. **Redirect** → `/app/projects/[project-id]/overview`
7. **Founder sees:**
   - Status timeline (Legal Review phase)
   - All gates RED (pending)
   - "Waiting for legal review" message
   - No actions available (locked)

**Time:** 10-15 minutes  
**Outcome:** Project initiated, compliance workflow started

---

### Workflow 2: Legal Review & Approval (Lawyer)

**Steps:**

1. **Login** → Navigate to `/app/dashboard`
2. **See notification:** "New project assigned: Commercial RE Token"
3. **Click notification** → Navigate to `/app/projects/[project-id]/legal`
4. **Review memos:**
   - Securities Classification Memo (SEC-A generated)
   - ERISA Boundary Memo (ERISA-A generated)
   - Tax Treatment Memo (TAX-A generated)
   - Bank Risk Memo (BANK-A generated)
5. **For each memo:**
   - Read analysis
   - Check citations
   - Verify conclusions
   - Make decision
6. **Actions:**
   - Click "Approve Securities Memo" → sends approval to MCP
   - Click "Approve ERISA Memo" → sends approval to MCP
   - Click "Approve Tax Memo" → sends approval to MCP
   - Click "Approve Bank Risk Memo" → sends approval to MCP
7. **MCP Response:**
   - Records approvals (timestamps, identity)
   - Updates gate status (Legal → GREEN)
   - Unlocks next phase (Finance Review)
   - Notifies CPA
8. **Lawyer sees:**
   - Status updated to "Approved"
   - Audit trail updated
   - Next phase unlocked

**Time:** 2-4 hours (review time)  
**Outcome:** Legal gates cleared, finance phase unlocked

---

### Workflow 3: Smart Contract Review (Engineer)

**Steps:**

1. **Login** → Navigate to `/app/projects/[project-id]/contracts`
2. **Upload contract:** Click "Upload Contract" → select `.sol` file
3. **MCP scans contract:**
   - Runs Smart Contract Compliance Agent (SC-A)
   - Checks prohibited patterns
   - Verifies required features
   - Generates compliance report
4. **Engineer sees results:**
   - **If violations found:**
     - RED alerts with line numbers
     - "Yield logic detected at line 142"
     - "Missing pause mechanism"
     - Code snippets highlighted
     - Status: BLOCKED
   - **If compliant:**
     - GREEN checkmarks
     - All required features present
     - No prohibited patterns
     - Status: PASS
5. **If BLOCKED:**
   - Engineer fixes contract
   - Re-uploads
   - MCP re-scans
   - Repeat until PASS
6. **If PASS:**
   - MCP updates gate (Smart Contract Compliance → GREEN)
   - Unlocks Audit phase
   - Generates compliance report

**Time:** 1-3 days (development time), 5 minutes (scan time)  
**Outcome:** Compliant contract approved, audit phase unlocked

---

### Workflow 4: Final Approval & Deployment (Governance)

**Steps:**

1. **All gates GREEN:**
   - Securities ✅
   - ERISA ✅
   - Tax ✅
   - Banking ✅
   - Accounting ✅
   - Smart Contract ✅
   - Audit ✅
2. **Navigate to:** `/app/projects/[project-id]/approvals`
3. **Governance approval process:**
   - **Legal Sign-Off Required:**
     - General Counsel reviews complete audit pack
     - Clicks "Approve for Deployment"
     - Digital signature recorded
   - **Compliance Sign-Off Required:**
     - Chief Compliance Officer reviews checklist
     - Clicks "Approve for Deployment"
     - Digital signature recorded
   - **Governance Sign-Off Required:**
     - Multisig (3-of-5 required)
     - Each signatory approves on-chain or via secure signing
     - Threshold met
4. **MCP Response:**
   - Validates all signatures
   - Generates Deployment Attestation
   - Creates complete audit pack
   - Commits to Git (with hash)
   - Optionally anchors to IPFS
   - Updates project status: APPROVED FOR DEPLOYMENT
5. **All roles see:**
   - Status: APPROVED
   - Deployment attestation available
   - Download audit pack
   - Observer portal updated (banks/regulators can now view)

**Time:** 1-2 days (coordination time)  
**Outcome:** Project approved, deployment authorized, evidence created

---

## 5. API CONTRACTS (WEBSITE ⇄ MCP)

### A. Event Submission API

**Endpoint:** `POST /api/mcp/event`

**Purpose:** Submit events to MCP workflow orchestrator

**Request:**
```json
{
  "event_type": "NEW_RWA_REQUEST",
  "user_id": "uuid-of-initiating-user",
  "timestamp": "2026-01-13T12:00:00Z",
  "payload": {
    "rwa_type": "Real Estate-Backed Revenue Token",
    "jurisdiction": "US",
    "legal_wrapper": "Delaware Statutory Trust",
    "distribution": "Institutional",
    "asset_details": {
      "total_valuation": 130000000,
      "custody_model": "Independent Corporate Trustee"
    },
    "economic_terms": {
      "distribution_frequency": "Quarterly",
      "redemption": "Quarterly windows, 10% max per quarter"
    },
    "smart_contract_summary": "ERC-20, transfer restrictions, no yield logic",
    "banking_relationship": "Institutional KYC, OFAC screening"
  }
}
```

**Response (Success):**
```json
{
  "status": "SUCCESS",
  "project_id": "uuid-generated-by-mcp",
  "workflow_id": "WF-001-NEW_RWA_REQUEST",
  "gates": {
    "securities": "PENDING",
    "erisa": "PENDING",
    "tax": "PENDING",
    "banking": "PENDING",
    "accounting": "LOCKED",
    "smart_contract": "LOCKED",
    "audit": "LOCKED",
    "governance": "LOCKED"
  },
  "message": "Workflow initiated. Legal review in progress."
}
```

**Response (Failure):**
```json
{
  "status": "ERROR",
  "error_code": "INVALID_JURISDICTION",
  "message": "Jurisdiction 'Mars' not supported",
  "blocking_issues": ["Unsupported jurisdiction"]
}
```

---

### B. Project State API

**Endpoint:** `GET /api/mcp/projects/{project-id}`

**Purpose:** Retrieve current project state and gate status

**Response:**
```json
{
  "project_id": "uuid",
  "workflow_id": "WF-001-NEW_RWA_REQUEST",
  "status": "LEGAL_REVIEW",
  "created_at": "2026-01-13T12:00:00Z",
  "updated_at": "2026-01-13T14:30:00Z",
  "gates": {
    "securities": {
      "status": "PASS",
      "agent": "SEC-A",
      "memo_path": "docs/memos/project-uuid/securities-classification-memo.md",
      "approved_by": "general.counsel@example.com",
      "approved_at": "2026-01-13T13:00:00Z"
    },
    "erisa": {
      "status": "PASS",
      "agent": "ERISA-A",
      "memo_path": "docs/memos/project-uuid/erisa-boundary-memo.md",
      "approved_by": "general.counsel@example.com",
      "approved_at": "2026-01-13T13:30:00Z"
    },
    "tax": {
      "status": "PASS",
      "agent": "TAX-A",
      "memo_path": "docs/memos/project-uuid/tax-treatment-memo.md",
      "approved_by": "tax.counsel@example.com",
      "approved_at": "2026-01-13T14:00:00Z"
    },
    "banking": {
      "status": "PENDING",
      "agent": "BANK-A",
      "memo_path": null,
      "approved_by": null,
      "approved_at": null
    },
    "accounting": {
      "status": "LOCKED",
      "reason": "Waiting for banking gate",
      "agent": "CPA-A"
    },
    "smart_contract": {
      "status": "LOCKED",
      "reason": "Waiting for legal gates",
      "agent": "SC-A"
    },
    "audit": {
      "status": "LOCKED",
      "reason": "Waiting for smart contract gate",
      "agent": "AUDIT-A"
    },
    "governance": {
      "status": "LOCKED",
      "reason": "Waiting for all gates",
      "agent": "GOV-A"
    }
  },
  "artifacts": [
    {
      "type": "memo",
      "name": "Securities Classification Memo",
      "path": "docs/memos/project-uuid/securities-classification-memo.md",
      "hash": "sha256:abc123...",
      "created_at": "2026-01-13T12:30:00Z"
    }
  ],
  "pending_tasks": [
    {
      "task_id": "uuid",
      "assigned_to": "banking.counsel@example.com",
      "task_type": "REVIEW_MEMO",
      "gate": "banking",
      "due_date": "2026-01-14T12:00:00Z"
    }
  ]
}
```

---

### C. Approval API (Human-in-the-Loop)

**Endpoint:** `POST /api/mcp/approve`

**Purpose:** Submit human approval for a specific gate

**Request:**
```json
{
  "project_id": "uuid",
  "gate": "securities",
  "decision": "APPROVE",
  "user_id": "general.counsel@example.com",
  "role": "Legal Counsel",
  "signature": "digital-signature-hash",
  "comments": "Analysis complete. Classification as security confirmed. Reg D 506(c) posture acceptable.",
  "timestamp": "2026-01-13T13:00:00Z"
}
```

**Response (Success):**
```json
{
  "status": "SUCCESS",
  "project_id": "uuid",
  "gate": "securities",
  "gate_status": "PASS",
  "approval_recorded": true,
  "next_action": "Proceed to ERISA review",
  "workflow_updated": true
}
```

**Request (Block):**
```json
{
  "project_id": "uuid",
  "gate": "securities",
  "decision": "BLOCK",
  "user_id": "general.counsel@example.com",
  "role": "Legal Counsel",
  "blocking_issues": [
    "Howey prong 4 (efforts of others) analysis insufficient",
    "Need clearer mitigation strategy for profit expectation"
  ],
  "timestamp": "2026-01-13T13:00:00Z"
}
```

**Response (Block):**
```json
{
  "status": "BLOCKED",
  "project_id": "uuid",
  "gate": "securities",
  "gate_status": "FAIL",
  "workflow_terminated": true,
  "blocking_issues": [
    "Howey prong 4 (efforts of others) analysis insufficient",
    "Need clearer mitigation strategy for profit expectation"
  ],
  "required_action": "Address blocking issues and resubmit"
}
```

---

### D. Smart Contract Scan API

**Endpoint:** `POST /api/mcp/scan-contract`

**Purpose:** Submit smart contract for compliance scanning

**Request:**
```json
{
  "project_id": "uuid",
  "contract_code": "pragma solidity ^0.8.20; ...",
  "contract_name": "RealEstateToken",
  "commit_hash": "abc123def456",
  "submitted_by": "engineer@example.com",
  "timestamp": "2026-01-13T15:00:00Z"
}
```

**Response (PASS):**
```json
{
  "status": "PASS",
  "project_id": "uuid",
  "scan_id": "uuid",
  "prohibited_patterns": [],
  "required_features": [
    {"feature": "Pause mechanism", "present": true, "line": 45},
    {"feature": "Supply cap", "present": true, "line": 23},
    {"feature": "Restricted minting", "present": true, "line": 67},
    {"feature": "Transfer restrictions", "present": true, "line": 89},
    {"feature": "Multisig governance", "present": true, "line": 35},
    {"feature": "Event emissions", "present": true, "line": 110},
    {"feature": "Immutable economics", "present": true, "line": 23},
    {"feature": "Reconciliation support", "present": true, "line": 145}
  ],
  "checklist_complete": true,
  "compliance_report_path": "docs/memos/project-uuid/smart-contract-compliance-report.md",
  "gate_status": "PASS",
  "message": "Contract passes all compliance checks"
}
```

**Response (FAIL):**
```json
{
  "status": "FAIL",
  "project_id": "uuid",
  "scan_id": "uuid",
  "prohibited_patterns": [
    {
      "pattern": "Yield-bearing logic",
      "detected": true,
      "line": 142,
      "code_snippet": "function calculateYield() public returns (uint256) { ... }",
      "severity": "CRITICAL",
      "reason": "Violates Howey Test - creates expectation of profit from efforts of others"
    },
    {
      "pattern": "Automated payouts",
      "detected": true,
      "line": 198,
      "code_snippet": "function distributeDividends() public { ... }",
      "severity": "CRITICAL",
      "reason": "Violates securities law - automated distributions indicate security"
    }
  ],
  "required_features": [
    {"feature": "Pause mechanism", "present": false, "line": null}
  ],
  "checklist_complete": false,
  "gate_status": "FAIL",
  "blocking_issues": [
    "Yield-bearing logic detected (line 142)",
    "Automated payout function detected (line 198)",
    "Missing pause mechanism"
  ],
  "message": "Contract BLOCKED. Fix violations and resubmit."
}
```

---

### E. Deployment Attestation API

**Endpoint:** `GET /api/mcp/projects/{project-id}/attestation`

**Purpose:** Retrieve deployment attestation (after all approvals)

**Response:**
```json
{
  "project_id": "uuid",
  "attestation_id": "uuid",
  "status": "APPROVED",
  "attestation_path": "docs/attestations/project-uuid-deployment-attestation.md",
  "attestation_hash": "sha256:xyz789...",
  "ipfs_hash": "Qm...",
  "created_at": "2026-01-13T16:00:00Z",
  "signatures": [
    {
      "role": "General Counsel",
      "signer": "general.counsel@example.com",
      "signature": "0x...",
      "timestamp": "2026-01-13T15:30:00Z"
    },
    {
      "role": "Chief Compliance Officer",
      "signer": "cco@example.com",
      "signature": "0x...",
      "timestamp": "2026-01-13T15:35:00Z"
    },
    {
      "role": "CEO",
      "signer": "ceo@example.com",
      "signature": "0x...",
      "timestamp": "2026-01-13T15:40:00Z"
    },
    {
      "role": "CFO",
      "signer": "cfo@example.com",
      "signature": "0x...",
      "timestamp": "2026-01-13T15:42:00Z"
    },
    {
      "role": "CTO",
      "signer": "cto@example.com",
      "signature": "0x...",
      "timestamp": "2026-01-13T15:45:00Z"
    },
    {
      "role": "Smart Contract Architect",
      "signer": "architect@example.com",
      "signature": "0x...",
      "timestamp": "2026-01-13T15:47:00Z"
    },
    {
      "role": "Securities Counsel",
      "signer": "sec.counsel@example.com",
      "signature": "0x...",
      "timestamp": "2026-01-13T15:50:00Z"
    },
    {
      "role": "Governance Chair",
      "signer": "gov.chair@example.com",
      "signature": "0x...",
      "timestamp": "2026-01-13T15:52:00Z"
    },
    {
      "role": "Controller",
      "signer": "controller@example.com",
      "signature": "0x...",
      "timestamp": "2026-01-13T15:55:00Z"
    }
  ],
  "audit_pack": {
    "path": "docs/audit-packs/project-uuid/",
    "hash": "sha256:pack123...",
    "files": [
      "securities-classification-memo.md",
      "erisa-boundary-memo.md",
      "tax-treatment-memo.md",
      "bank-risk-memo.md",
      "accounting-treatment-memo.md",
      "smart-contract-compliance-report.md",
      "attestation-plan.md",
      "governance-action-log.md",
      "deployment-attestation.md",
      "approvals.json"
    ]
  }
}
```

---

## 6. DATA MODEL & EVIDENCE ARCHITECTURE

### Stored Objects

**Projects**
```json
{
  "id": "uuid",
  "name": "string",
  "rwa_type": "string",
  "jurisdiction": "string",
  "legal_wrapper": "string",
  "status": "enum",
  "created_at": "timestamp",
  "updated_at": "timestamp",
  "created_by": "user_id",
  "metadata": {}
}
```

**Events**
```json
{
  "id": "uuid",
  "project_id": "uuid",
  "event_type": "string",
  "payload": {},
  "user_id": "uuid",
  "timestamp": "timestamp"
}
```

**Artifacts** (Memos, Reports, Checklists)
```json
{
  "id": "uuid",
  "project_id": "uuid",
  "type": "enum (memo, report, checklist, attestation)",
  "name": "string",
  "content_path": "string (Git path)",
  "hash": "sha256",
  "ipfs_hash": "string (optional)",
  "created_at": "timestamp",
  "created_by": "agent_id or user_id"
}
```

**Approvals**
```json
{
  "id": "uuid",
  "project_id": "uuid",
  "gate": "string",
  "decision": "enum (APPROVE, BLOCK)",
  "user_id": "uuid",
  "role": "string",
  "signature": "string",
  "comments": "text",
  "blocking_issues": ["array"],
  "timestamp": "timestamp"
}
```

**Attestations**
```json
{
  "id": "uuid",
  "project_id": "uuid",
  "attestation_type": "deployment",
  "content_path": "string",
  "hash": "sha256",
  "ipfs_hash": "string (optional)",
  "signatures": [
    {
      "role": "string",
      "signer": "string",
      "signature": "string",
      "timestamp": "timestamp"
    }
  ],
  "created_at": "timestamp"
}
```

---

### Evidence Properties

**Immutability:**
- All artifacts stored in Git (versioned, immutable history)
- Optional IPFS anchoring for regulatory proof
- SHA-256 hashes for all documents

**Traceability:**
- Every action timestamped (ISO 8601)
- Every action attributed (user ID + role)
- Every approval signed (digital signature)

**Auditability:**
- Complete workflow replay possible
- Regulator can reconstruct all decisions
- No gaps in evidence chain

---

## 7. SECURITY & PERMISSIONS

### Role-Based Access Control (RBAC)

**Roles:**
1. Founder / Operator
2. Legal Counsel
3. CPA / Auditor
4. Engineer
5. Observer (Bank / Regulator)
6. System Admin

**Permissions Matrix:**

| Action | Founder | Legal | CPA | Engineer | Observer | Admin |
|--------|---------|-------|-----|----------|----------|-------|
| Create project | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ |
| View own projects | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| View all projects | ❌ | ✅ | ✅ | ❌ | ✅ | ✅ |
| Approve legal gate | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Approve finance gate | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Upload contract | ✅ | ❌ | ❌ | ✅ | ❌ | ✅ |
| Approve deployment | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| View audit trail | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Download attestation | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Modify MCP config | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

---

### Security Principles

1. **Deny by Default:** No action permitted unless explicitly granted
2. **Separation of Duties:** No role can complete full workflow alone
3. **Least Privilege:** Users only see what they need for their role
4. **No Cross-Role Overrides:** Legal cannot approve engineering, etc.
5. **Observer Cannot Influence:** Read-only access strictly enforced
6. **Audit Everything:** All actions logged, no deletions possible

---

## 8. TECHNICAL ARCHITECTURE

### Frontend Stack

**Framework:** Next.js 14+ (React 18+)
**Language:** TypeScript
**Styling:** Tailwind CSS
**State Management:** React Query + Zustand
**Authentication:** NextAuth.js
**Forms:** React Hook Form + Zod validation

**Key Libraries:**
- `@tanstack/react-query` (API state management)
- `zustand` (client state management)
- `react-hook-form` (forms)
- `zod` (validation)
- `tailwindcss` (styling)
- `recharts` (data visualization)
- `react-diff-viewer` (memo diffs)
- `react-markdown` (document rendering)

---

### Backend Stack

**MCP Layer:**
- MCP Server (custom orchestrator)
- Agent execution environment (OpenAI API / Claude API)
- Workflow engine (sequential + parallel execution)
- Evidence store (Git integration)

**API Layer:**
- Next.js API Routes (or separate Express server)
- RESTful API + webhooks
- WebSocket for real-time updates

**Database:**
- PostgreSQL (projects, users, approvals, audit log)
- Redis (caching, session management)

**File Storage:**
- Git (primary evidence store)
- S3 or similar (contract uploads, artifacts)
- Optional IPFS (immutability proofs)

---

### Infrastructure

**Hosting:**
- Vercel (Next.js frontend + API)
- AWS / GCP (MCP orchestrator, database)
- GitHub (evidence store)

**CI/CD:**
- GitHub Actions (automated testing, deployment)
- MCP compliance gates in deployment pipeline

**Monitoring:**
- Sentry (error tracking)
- DataDog / New Relic (performance monitoring)
- Custom audit log dashboard

---

## 9. PHASED BUILD PLAN (30/60/90 DAYS)

### Phase 1: Foundation (Days 0-30)

**Goal:** MCP server operational, first workflow end-to-end

**Deliverables:**

**Week 1-2: MCP Core**
- [ ] MCP server implementation complete
- [ ] Agent registry configured (11 agents)
- [ ] Orchestrator rules engine implemented
- [ ] NEW_RWA_REQUEST workflow tested
- [ ] Git evidence store integrated
- [ ] Agent prompts finalized (all 11)

**Week 3-4: API Layer**
- [ ] Event submission API (`POST /api/mcp/event`)
- [ ] Project state API (`GET /api/mcp/projects/{id}`)
- [ ] Approval API (`POST /api/mcp/approve`)
- [ ] Contract scan API (`POST /api/mcp/scan-contract`)
- [ ] Attestation API (`GET /api/mcp/projects/{id}/attestation`)
- [ ] Database schema complete
- [ ] Authentication system (NextAuth)

**Success Criteria:**
- Internal team can run complete NEW_RWA_REQUEST workflow
- All agents produce expected outputs
- Evidence committed to Git automatically
- API endpoints functional

**Demo:** Internal walkthrough with mock project

---

### Phase 2: Website & Workspace (Days 31-60)

**Goal:** Public site live, authenticated workspace functional

**Deliverables:**

**Week 5-6: Public Learning Layer**
- [ ] Homepage (`/`)
- [ ] Learning hub (`/learn`)
- [ ] RWA Atlas (`/learn/rwa-atlas` + 11 asset class pages)
- [ ] Compliance hub (`/learn/compliance` + sub-pages)
- [ ] Smart contract compliance explorer (`/learn/smart-contracts`)
- [ ] Role guides (`/learn/roles` + sub-pages)
- [ ] Documentation library (`/docs`)
- [ ] SEO optimization
- [ ] Responsive design (mobile, tablet, desktop)

**Week 7-8: Authenticated Workspace**
- [ ] User authentication & authorization
- [ ] Dashboard (`/app/dashboard` - role-based)
- [ ] Project list (`/app/projects`)
- [ ] New project wizard (`/app/projects/new`)
- [ ] Project detail pages (`/app/projects/[id]/*`)
- [ ] Legal tab (memo review, approvals)
- [ ] Finance tab (CPA review)
- [ ] Contracts tab (upload, scan, violations)
- [ ] Audit tab (attestation planning)
- [ ] Approvals tab (signature collection)
- [ ] Real-time status updates (WebSocket)

**Success Criteria:**
- Public site live and navigable
- External users can explore RWA Atlas
- Authenticated users can create projects
- Role-based views working
- Approval flow functional

**Demo:** External demo with bank partners and counsel

---

### Phase 3: Enforcement & Scale (Days 61-90)

**Goal:** Production-ready, CI/CD integration, observer portal

**Deliverables:**

**Week 9-10: CI/CD Integration**
- [ ] Smart contract deployment gate (GitHub Actions)
- [ ] MCP compliance check in CI pipeline
- [ ] Automated deployment attestation generation
- [ ] Build failure on FAIL status
- [ ] Slack/Discord notifications for workflow events
- [ ] Monitoring & alerting (Sentry, DataDog)

**Week 11-12: Observer Portal & Scale**
- [ ] Observer dashboard (`/observer`)
- [ ] Observer project list (approved only)
- [ ] Observer project detail (final artifacts only)
- [ ] Audit trail viewer (regulator-legible)
- [ ] Attestation repository
- [ ] Performance optimization
- [ ] Load testing
- [ ] Security audit
- [ ] Documentation for external users
- [ ] Onboarding guides

**Success Criteria:**
- Platform handles 10+ concurrent projects
- CI/CD blocks non-compliant deployments
- Banks and regulators can observe without login friction
- First production RWA launch approved
- Zero high-risk audit findings

**Demo:** Production readiness review with banks, regulators, counsel

---

## 10. SUCCESS METRICS (INSTITUTIONAL)

### Efficiency Metrics
- **Time to bank non-objection:** Target <30 days (vs 90+ days industry)
- **Mean approval cycle time:** Target <7 days per gate
- **Contract compliance pass rate:** Target >80% first submission

### Quality Metrics
- **Blocked non-compliant deployments:** Track count (higher = system working)
- **Audit findings (high-risk):** Target = 0
- **Regulator objections:** Target = 0
- **Legal memo quality:** External counsel review rating

### Adoption Metrics
- **Projects initiated:** Track growth
- **User roles activated:** Founders, lawyers, CPAs, engineers
- **Bank observers:** Track bank participation
- **Regulator observers:** Track regulatory engagement

---

## 11. FINAL OPERATING PRINCIPLES

### Principle 1: Website Explains, MCP Decides, Humans Approve

**Website Role:**
- Display information
- Collect inputs
- Render outputs
- Enable approvals

**MCP Role:**
- Orchestrate workflows
- Enforce sequencing
- Generate evidence
- Block violations

**Human Role:**
- Review analysis
- Make judgments
- Sign approvals
- Deploy contracts

---

### Principle 2: Evidence Persists, Decisions Are Traceable

Every action produces:
- A document
- A hash
- A timestamp
- An approver identity

This creates **regulator-legible audit trails**.

---

### Principle 3: Fail-Closed Design

If MCP is offline → nothing ships.

If any gate fails → workflow terminates.

If evidence missing → deployment blocked.

---

### Principle 4: Separation of Duties Enforced

No single role can:
- Structure AND approve
- Approve AND deploy
- Deploy AND attest

This mirrors institutional controls.

---

## 12. CONCLUSION

This document defines the **complete blueprint** for building the MCP AI Law Firm platform as a live, dynamic, institutional-grade website and application.

**What makes this rare:**

1. **Workflow-first, not content-first**
2. **Compliance as infrastructure, not policy**
3. **Evidence-driven, not assurance-based**
4. **Fail-closed by design**

This is not a brochure. This is **operational legal infrastructure**.

---

**Next Steps:**

- **Phase 1 execution** (30 days)
- **Public site design** (wireframes, components)
- **MCP runtime hardening** (production config)
- **Bank partner engagement** (demo scheduling)

---

**Document Control:**

* **Prepared by:** Y3K Digital / Legal Infrastructure Team
* **Reviewed by:** [Pending]
* **Approved by:** [Pending]
* **Next Review Date:** [30 days from approval]

---

*This document is not legal advice. It describes operational systems design for legal workflow automation and institutional RWA compliance platforms.*
