# MCP Law Platform — Technical Implementation Guide

**Document Status:** Technical Specification  
**Version:** 1.0  
**Last Updated:** January 13, 2026  
**Audience:** Engineering Team

---

## Purpose

This document provides **step-by-step technical implementation instructions** for building the MCP Law Platform.

Use this in conjunction with:
- `platform-architecture.md` (overall architecture, page map, workflows)
- `../70-rwa-frameworks/mcp-implementation-specification.md` (MCP server spec)
- `../../mcp-server/` (MCP server implementation files)

---

## System Overview

```
┌─────────────────────────────────────────────────────┐
│              NEXT.JS FRONTEND                       │
│  (Public Site + Authenticated Workspace + API)      │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│              API LAYER                              │
│  (Next.js API Routes / Express)                     │
└──────────────────────┬──────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
┌──────────────┐  ┌────────────┐  ┌──────────────┐
│   DATABASE   │  │ MCP SERVER │  │ GIT EVIDENCE │
│  (Postgres)  │  │(Orchestrator)│  │    STORE     │
└──────────────┘  └────────────┘  └──────────────┘
```

---

## Tech Stack

### Frontend
- **Framework:** Next.js 14.2+ (App Router)
- **Language:** TypeScript 5.4+
- **Styling:** Tailwind CSS 3.4+
- **State:** React Query + Zustand
- **Auth:** NextAuth.js 5+
- **Forms:** React Hook Form + Zod
- **UI Components:** shadcn/ui or Radix UI

### Backend
- **API:** Next.js API Routes
- **Database:** PostgreSQL 16+
- **ORM:** Prisma 5+
- **Cache:** Redis 7+
- **Queue:** BullMQ (Redis-based)
- **MCP Runtime:** Custom (Node.js + OpenAI/Claude API)

### Infrastructure
- **Hosting:** Vercel (frontend), Railway/Fly.io (MCP server)
- **Database:** Supabase or Neon (managed Postgres)
- **Git:** GitHub (evidence store)
- **CDN:** Vercel Edge Network
- **Monitoring:** Sentry + Vercel Analytics

---

## Development Environment Setup

### Prerequisites

```bash
# Required versions
node >= 20.10.0
pnpm >= 8.15.0
postgres >= 16
redis >= 7
git >= 2.40
```

### Initial Setup

```bash
# Clone repository
git clone https://github.com/Y3KDigital/Legal.git
cd Legal

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Setup database
pnpm db:setup

# Run development server
pnpm dev
```

---

## Project Structure

```
Legal/
├── docs/                      # Documentation (existing)
├── mcp-server/               # MCP implementation (existing)
├── apps/
│   └── web/                  # Next.js web application
│       ├── app/              # Next.js 14 App Router
│       │   ├── (public)/     # Public pages (no auth)
│       │   │   ├── page.tsx             # Homepage
│       │   │   ├── learn/              # Learning hub
│       │   │   └── docs/               # Documentation
│       │   ├── (auth)/       # Authenticated pages
│       │   │   ├── app/                # Application routes
│       │   │   │   ├── dashboard/
│       │   │   │   ├── projects/
│       │   │   │   └── settings/
│       │   │   └── observer/           # Observer portal
│       │   ├── api/          # API routes
│       │   │   ├── auth/              # NextAuth routes
│       │   │   ├── mcp/               # MCP proxy API
│       │   │   └── webhooks/          # Webhook handlers
│       │   └── layout.tsx    # Root layout
│       ├── components/       # React components
│       │   ├── ui/                    # shadcn/ui components
│       │   ├── dashboard/             # Dashboard components
│       │   ├── projects/              # Project components
│       │   └── learn/                 # Learning components
│       ├── lib/              # Utilities
│       │   ├── api/                   # API client
│       │   ├── mcp/                   # MCP client
│       │   ├── auth/                  # Auth utilities
│       │   └── utils.ts               # General utilities
│       ├── prisma/           # Database schema
│       │   ├── schema.prisma
│       │   └── migrations/
│       ├── public/           # Static assets
│       └── styles/           # Global styles
├── packages/
│   ├── mcp-runtime/          # MCP orchestrator runtime
│   │   ├── src/
│   │   │   ├── orchestrator.ts
│   │   │   ├── agents/
│   │   │   ├── workflows/
│   │   │   └── evidence-store/
│   │   └── package.json
│   ├── types/                # Shared TypeScript types
│   └── config/               # Shared configuration
├── pnpm-workspace.yaml       # pnpm workspace config
├── turbo.json                # Turborepo config
└── package.json              # Root package.json
```

---

## Phase 1 Implementation: MCP Foundation (Days 0-30)

### Week 1-2: MCP Runtime

#### Task 1.1: Create MCP Runtime Package

```bash
# Create package
mkdir -p packages/mcp-runtime/src
cd packages/mcp-runtime
pnpm init
```

**File:** `packages/mcp-runtime/src/orchestrator.ts`

```typescript
import { Agent } from './agents/base';
import { WorkflowDefinition, WorkflowState } from './types';
import { EvidenceStore } from './evidence-store';

export class MCPOrchestrator {
  private agents: Map<string, Agent>;
  private evidenceStore: EvidenceStore;

  constructor(config: MCPConfig) {
    this.agents = new Map();
    this.evidenceStore = new EvidenceStore(config.gitRepo);
    this.loadAgents(config.agents);
  }

  async executeWorkflow(
    workflowId: string,
    projectId: string,
    input: any
  ): Promise<WorkflowState> {
    const workflow = this.getWorkflow(workflowId);
    const state: WorkflowState = {
      projectId,
      workflowId,
      status: 'RUNNING',
      gates: {},
      artifacts: [],
      startedAt: new Date(),
    };

    for (const step of workflow.steps) {
      try {
        const agent = this.agents.get(step.agent);
        if (!agent) throw new Error(`Agent ${step.agent} not found`);

        // Execute agent
        const result = await agent.execute(input, state);

        // Update state
        state.gates[step.agent] = {
          status: result.status,
          memo_path: result.memo_path,
          blocking_issues: result.blocking_issues,
        };

        // Store artifact
        await this.evidenceStore.store(result.artifact);
        state.artifacts.push(result.artifact);

        // Check for failure
        if (result.status === 'FAIL' && step.blocking_on_fail) {
          state.status = 'FAILED';
          break;
        }
      } catch (error) {
        state.status = 'FAILED';
        state.error = error.message;
        break;
      }
    }

    if (state.status === 'RUNNING') {
      state.status = 'COMPLETED';
    }

    state.completedAt = new Date();
    return state;
  }
}
```

#### Task 1.2: Implement Agent Base Class

**File:** `packages/mcp-runtime/src/agents/base.ts`

```typescript
import OpenAI from 'openai';
import { WorkflowState, AgentResult } from '../types';

export abstract class Agent {
  constructor(
    protected id: string,
    protected name: string,
    protected promptPath: string,
    protected openai: OpenAI
  ) {}

  abstract execute(input: any, state: WorkflowState): Promise<AgentResult>;

  protected async generateWithPrompt(
    systemPrompt: string,
    userInput: string
  ): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userInput },
      ],
      temperature: 0.3,
    });

    return response.choices[0].message.content || '';
  }
}
```

#### Task 1.3: Implement SEC-A Agent

**File:** `packages/mcp-runtime/src/agents/sec-a.ts`

```typescript
import { Agent } from './base';
import { WorkflowState, AgentResult } from '../types';
import fs from 'fs/promises';

export class SecuritiesCounselAgent extends Agent {
  async execute(input: any, state: WorkflowState): Promise<AgentResult> {
    // Load prompt
    const promptPath = path.join(__dirname, '../../../mcp-server/prompts/sec-a-prompt.txt');
    const systemPrompt = await fs.readFile(promptPath, 'utf-8');

    // Prepare user input
    const userInput = `
# RWA Analysis Request

RWA Type: ${input.rwa_type}
Jurisdiction: ${input.jurisdiction}
Legal Wrapper: ${input.legal_wrapper}
Distribution: ${input.distribution}

Asset Details:
${JSON.stringify(input.asset_details, null, 2)}

Economic Terms:
${JSON.stringify(input.economic_terms, null, 2)}

Smart Contract Summary:
${input.smart_contract_summary}

Please generate a Securities Classification Memo following the structured format.
    `;

    // Generate memo
    const memo = await this.generateWithPrompt(systemPrompt, userInput);

    // Parse status from memo
    const status = memo.includes('Status: PASS') ? 'PASS' : 'FAIL';
    const blocking_issues = this.extractBlockingIssues(memo);

    // Create artifact
    const artifact = {
      type: 'memo',
      name: 'Securities Classification Memo',
      content: memo,
      hash: this.hash(memo),
      created_at: new Date(),
      created_by: this.id,
    };

    return {
      status,
      memo_path: `docs/memos/${state.projectId}/securities-classification-memo.md`,
      blocking_issues,
      artifact,
    };
  }

  private extractBlockingIssues(memo: string): string[] {
    // Simple extraction logic - can be improved with regex
    const match = memo.match(/BLOCKING ISSUES.*?\n(.*?)\n---/s);
    if (match) {
      return match[1].split('\n').filter(l => l.trim().startsWith('-')).map(l => l.replace(/^-\s*/, ''));
    }
    return [];
  }

  private hash(content: string): string {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(content).digest('hex');
  }
}
```

#### Task 1.4: Evidence Store (Git Integration)

**File:** `packages/mcp-runtime/src/evidence-store/index.ts`

```typescript
import simpleGit, { SimpleGit } from 'simple-git';
import fs from 'fs/promises';
import path from 'path';

export class EvidenceStore {
  private git: SimpleGit;
  private repoPath: string;

  constructor(repoPath: string) {
    this.repoPath = repoPath;
    this.git = simpleGit(repoPath);
  }

  async store(artifact: Artifact): Promise<void> {
    const filePath = path.join(this.repoPath, artifact.path);

    // Ensure directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    // Write file
    await fs.writeFile(filePath, artifact.content);

    // Git add + commit
    await this.git.add(filePath);
    await this.git.commit(
      `feat(memos): add ${artifact.name} for ${artifact.project_id}`,
      [filePath]
    );

    console.log(`[Evidence Store] Stored: ${artifact.path}`);
  }

  async retrieve(filePath: string): Promise<string> {
    const fullPath = path.join(this.repoPath, filePath);
    return await fs.readFile(fullPath, 'utf-8');
  }

  async getCommitHash(filePath: string): Promise<string> {
    const log = await this.git.log({ file: filePath, maxCount: 1 });
    return log.latest?.hash || '';
  }
}
```

---

### Week 3-4: API Layer

#### Task 2.1: Database Schema (Prisma)

**File:** `apps/web/prisma/schema.prisma`

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String?
  role          Role
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  projects      ProjectMember[]
  approvals     Approval[]
}

enum Role {
  FOUNDER
  LEGAL_COUNSEL
  CPA_AUDITOR
  ENGINEER
  OBSERVER
  ADMIN
}

model Project {
  id                String   @id @default(cuid())
  name              String
  rwaType           String
  jurisdiction      String
  legalWrapper      String
  status            ProjectStatus
  workflowId        String
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  createdBy         String
  members           ProjectMember[]
  gates             Gate[]
  artifacts         Artifact[]
  approvals         Approval[]
  attestation       Attestation?
}

enum ProjectStatus {
  INITIATED
  LEGAL_REVIEW
  FINANCE_REVIEW
  CONTRACT_REVIEW
  AUDIT_REVIEW
  AWAITING_APPROVAL
  APPROVED
  BLOCKED
  COMPLETED
}

model ProjectMember {
  id        String   @id @default(cuid())
  projectId String
  userId    String
  role      Role
  project   Project  @relation(fields: [projectId], references: [id])
  user      User     @relation(fields: [userId], references: [id])
  @@unique([projectId, userId])
}

model Gate {
  id              String   @id @default(cuid())
  projectId       String
  gateName        String   // "securities", "erisa", "tax", etc.
  status          GateStatus
  agentId         String
  memoPath        String?
  approvedBy      String?
  approvedAt      DateTime?
  blockingIssues  Json?
  project         Project  @relation(fields: [projectId], references: [id])
  @@unique([projectId, gateName])
}

enum GateStatus {
  LOCKED
  PENDING
  PASS
  FAIL
}

model Artifact {
  id          String   @id @default(cuid())
  projectId   String
  type        ArtifactType
  name        String
  contentPath String
  hash        String
  ipfsHash    String?
  createdAt   DateTime @default(now())
  createdBy   String   // agent_id or user_id
  project     Project  @relation(fields: [projectId], references: [id])
}

enum ArtifactType {
  MEMO
  REPORT
  CHECKLIST
  ATTESTATION
  CONTRACT
}

model Approval {
  id              String   @id @default(cuid())
  projectId       String
  gateName        String
  decision        ApprovalDecision
  userId          String
  role            Role
  signature       String
  comments        String?
  blockingIssues  Json?
  timestamp       DateTime @default(now())
  project         Project  @relation(fields: [projectId], references: [id])
  user            User     @relation(fields: [userId], references: [id])
}

enum ApprovalDecision {
  APPROVE
  BLOCK
}

model Attestation {
  id              String   @id @default(cuid())
  projectId       String   @unique
  attestationType String
  contentPath     String
  hash            String
  ipfsHash        String?
  signatures      Json     // Array of {role, signer, signature, timestamp}
  createdAt       DateTime @default(now())
  project         Project  @relation(fields: [projectId], references: [id])
}
```

#### Task 2.2: API Routes

**File:** `apps/web/app/api/mcp/event/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { MCPOrchestrator } from '@mcp-runtime/orchestrator';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { event_type, payload } = body;

  if (event_type === 'NEW_RWA_REQUEST') {
    // Create project in database
    const project = await prisma.project.create({
      data: {
        name: `${payload.rwa_type} - ${payload.jurisdiction}`,
        rwaType: payload.rwa_type,
        jurisdiction: payload.jurisdiction,
        legalWrapper: payload.legal_wrapper,
        status: 'INITIATED',
        workflowId: 'WF-001-NEW_RWA_REQUEST',
        createdBy: session.user.id,
      },
    });

    // Initialize gates
    const gateNames = ['securities', 'erisa', 'tax', 'banking', 'accounting', 'smart_contract', 'audit', 'governance'];
    for (const gateName of gateNames) {
      await prisma.gate.create({
        data: {
          projectId: project.id,
          gateName,
          status: gateName === 'securities' ? 'PENDING' : 'LOCKED',
          agentId: `${gateName.toUpperCase()}-A`,
        },
      });
    }

    // Trigger MCP workflow (async)
    const orchestrator = new MCPOrchestrator(config);
    orchestrator.executeWorkflow('NEW_RWA_REQUEST', project.id, payload).then(async (state) => {
      // Update project status based on workflow result
      await prisma.project.update({
        where: { id: project.id },
        data: { status: state.status === 'COMPLETED' ? 'LEGAL_REVIEW' : 'BLOCKED' },
      });

      // Update gates
      for (const [gateName, gateState] of Object.entries(state.gates)) {
        await prisma.gate.update({
          where: { projectId_gateName: { projectId: project.id, gateName } },
          data: {
            status: gateState.status,
            memoPath: gateState.memo_path,
          },
        });
      }

      // Store artifacts
      for (const artifact of state.artifacts) {
        await prisma.artifact.create({
          data: {
            projectId: project.id,
            type: artifact.type.toUpperCase(),
            name: artifact.name,
            contentPath: artifact.path,
            hash: artifact.hash,
            createdBy: artifact.created_by,
          },
        });
      }
    });

    return NextResponse.json({
      status: 'SUCCESS',
      project_id: project.id,
      workflow_id: project.workflowId,
      message: 'Workflow initiated. Legal review in progress.',
    });
  }

  return NextResponse.json({ error: 'Unknown event type' }, { status: 400 });
}
```

**File:** `apps/web/app/api/mcp/projects/[id]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: {
      gates: true,
      artifacts: true,
      approvals: true,
    },
  });

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  // Format response
  const response = {
    project_id: project.id,
    workflow_id: project.workflowId,
    status: project.status,
    created_at: project.createdAt,
    updated_at: project.updatedAt,
    gates: project.gates.reduce((acc, gate) => {
      acc[gate.gateName] = {
        status: gate.status,
        agent: gate.agentId,
        memo_path: gate.memoPath,
        approved_by: gate.approvedBy,
        approved_at: gate.approvedAt,
      };
      return acc;
    }, {} as any),
    artifacts: project.artifacts.map(a => ({
      type: a.type.toLowerCase(),
      name: a.name,
      path: a.contentPath,
      hash: a.hash,
      created_at: a.createdAt,
    })),
  };

  return NextResponse.json(response);
}
```

---

## Phase 2 Implementation: Website & Workspace (Days 31-60)

### Week 5-6: Public Learning Layer

#### Task 3.1: Homepage

**File:** `apps/web/app/(public)/page.tsx`

```typescript
import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { HowItWorks } from '@/components/landing/how-it-works';
import { CTA } from '@/components/landing/cta';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
    </main>
  );
}
```

#### Task 3.2: RWA Atlas

**File:** `apps/web/app/(public)/learn/rwa-atlas/page.tsx`

```typescript
import { assetClasses } from '@/lib/data/asset-classes';
import { AssetClassCard } from '@/components/learn/asset-class-card';

export default function RWAAtlasPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">RWA Asset Class Atlas</h1>
      <p className="text-xl text-muted-foreground mb-12">
        Comprehensive guide to tokenizing real-world assets with institutional compliance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assetClasses.map((assetClass) => (
          <AssetClassCard key={assetClass.id} assetClass={assetClass} />
        ))}
      </div>
    </div>
  );
}
```

**File:** `apps/web/lib/data/asset-classes.ts`

```typescript
export const assetClasses = [
  {
    id: 'treasuries-mmf',
    name: 'Treasuries & Money Market Funds',
    description: 'US government obligations and high-quality money market instruments',
    legalWrapper: 'Regulated fund or SPV',
    custodyModel: 'Qualified custodian (bank or broker-dealer)',
    settlementModel: 'T+0 or T+1 via DTC or direct custody',
    attestationStandard: 'Daily NAV + monthly audit',
    riskLevel: 'low',
  },
  {
    id: 'private-credit',
    name: 'Private Credit & Loan Participations',
    description: 'Direct lending, senior secured loans, trade finance',
    legalWrapper: 'SPV or credit fund',
    custodyModel: 'Loan servicer + document custodian',
    settlementModel: 'Monthly or event-driven',
    attestationStandard: 'Quarterly proof-of-debt + independent valuation',
    riskLevel: 'medium',
  },
  // ... other asset classes
];
```

---

### Week 7-8: Authenticated Workspace

#### Task 4.1: Dashboard

**File:** `apps/web/app/(auth)/app/dashboard/page.tsx`

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { DashboardStats } from '@/components/dashboard/stats';
import { ProjectList } from '@/components/dashboard/project-list';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { QuickActions } from '@/components/dashboard/quick-actions';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  // Fetch user's projects
  const projects = await prisma.project.findMany({
    where: {
      members: {
        some: { userId: session.user.id },
      },
    },
    include: {
      gates: true,
    },
    orderBy: { updatedAt: 'desc' },
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <DashboardStats projects={projects} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <ProjectList projects={projects} />
        </div>
        <div>
          <QuickActions />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
```

#### Task 4.2: Project Detail Page

**File:** `apps/web/app/(auth)/app/projects/[id]/page.tsx`

```typescript
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ProjectOverview } from '@/components/projects/overview';
import { ProjectTabs } from '@/components/projects/tabs';

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: {
      gates: true,
      artifacts: true,
      approvals: true,
      members: {
        include: { user: true },
      },
    },
  });

  if (!project) notFound();

  // Check permission
  const isMember = project.members.some(m => m.userId === session.user.id);
  if (!isMember) notFound();

  return (
    <div className="container mx-auto py-8">
      <ProjectOverview project={project} />
      <ProjectTabs project={project} userRole={session.user.role} />
    </div>
  );
}
```

---

## Phase 3 Implementation: Enforcement & Scale (Days 61-90)

### Week 9-10: CI/CD Integration

#### Task 5.1: GitHub Action for Smart Contract Gate

**File:** `.github/workflows/smart-contract-compliance.yml`

```yaml
name: Smart Contract Compliance Gate

on:
  pull_request:
    paths:
      - 'contracts/**'

jobs:
  compliance-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run MCP Compliance Scan
        run: |
          npx mcp-cli scan-contract \
            --project-id ${{ github.event.pull_request.head.ref }} \
            --contract-path contracts/*.sol \
            --api-url ${{ secrets.MCP_API_URL }} \
            --api-key ${{ secrets.MCP_API_KEY }}
      
      - name: Check Scan Result
        run: |
          if [ -f mcp-scan-result.json ]; then
            STATUS=$(jq -r '.status' mcp-scan-result.json)
            if [ "$STATUS" = "FAIL" ]; then
              echo "::error::Smart contract compliance check FAILED"
              jq -r '.blocking_issues[]' mcp-scan-result.json
              exit 1
            fi
          fi
      
      - name: Post Comment on PR
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const result = JSON.parse(fs.readFileSync('mcp-scan-result.json'));
            
            let comment = '## Smart Contract Compliance Scan\n\n';
            if (result.status === 'PASS') {
              comment += '✅ **PASS** - All compliance checks passed\n\n';
            } else {
              comment += '❌ **FAIL** - Compliance violations detected\n\n';
              comment += '### Blocking Issues:\n';
              result.blocking_issues.forEach(issue => {
                comment += `- ${issue}\n`;
              });
            }
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
```

---

### Week 11-12: Observer Portal & Production

#### Task 6.1: Observer Portal

**File:** `apps/web/app/(observer)/observer/projects/[id]/page.tsx`

```typescript
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { AuditTrail } from '@/components/observer/audit-trail';
import { Attestations } from '@/components/observer/attestations';
import { ProjectSummary } from '@/components/observer/project-summary';

export default async function ObserverProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await prisma.project.findUnique({
    where: { id: params.id, status: 'APPROVED' }, // Only approved projects
    include: {
      gates: true,
      artifacts: true,
      approvals: true,
      attestation: true,
    },
  });

  if (!project) notFound();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Project: {project.name}</h1>
      
      <ProjectSummary project={project} />
      
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AuditTrail project={project} />
        <Attestations project={project} />
      </div>
    </div>
  );
}
```

---

## Deployment

### Vercel Deployment (Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Railway Deployment (MCP Server)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

---

## Environment Variables

**File:** `apps/web/.env.example`

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mcp_law"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-random-secret"

# OpenAI (for MCP agents)
OPENAI_API_KEY="sk-..."

# GitHub (for evidence store)
GITHUB_TOKEN="ghp_..."
GITHUB_REPO_PATH="/path/to/Legal/docs/memos"

# Redis
REDIS_URL="redis://localhost:6379"

# MCP Server
MCP_SERVER_URL="http://localhost:3001"
MCP_API_KEY="generate-api-key"
```

---

## Testing

```bash
# Unit tests
pnpm test

# Integration tests
pnpm test:integration

# E2E tests (Playwright)
pnpm test:e2e

# Type checking
pnpm typecheck

# Linting
pnpm lint
```

---

## Monitoring & Observability

### Sentry Setup

```typescript
// apps/web/sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

### Logging

```typescript
// packages/mcp-runtime/src/logger.ts
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});
```

---

## Security Checklist

- [ ] Environment variables never committed
- [ ] API routes protected with authentication
- [ ] RBAC enforced on all actions
- [ ] SQL injection prevented (Prisma parameterized queries)
- [ ] XSS prevented (React escaping)
- [ ] CSRF tokens on forms
- [ ] Rate limiting on API routes
- [ ] Content Security Policy headers
- [ ] HTTPS enforced in production
- [ ] Secrets stored in Vercel/Railway secrets

---

## Performance Optimization

- [ ] Database indexes on foreign keys
- [ ] API route caching with Redis
- [ ] Static page generation where possible
- [ ] Image optimization (Next.js Image component)
- [ ] Code splitting (Next.js automatic)
- [ ] CDN for static assets (Vercel Edge)
- [ ] Database connection pooling (Prisma)
- [ ] Lazy loading for heavy components

---

## Documentation

- [ ] API documentation (OpenAPI spec)
- [ ] Component documentation (Storybook)
- [ ] Architecture decision records (ADRs)
- [ ] Deployment runbooks
- [ ] Incident response playbooks

---

## Support & Maintenance

**Development Team Contact:**
- Lead: kevan@y3kdigital.com
- Repository: https://github.com/Y3KDigital/Legal
- Docs: See `/docs` directory

---

**This guide provides the complete technical foundation for building the MCP Law Platform. Follow the phased approach, and adjust as needed based on team size and priorities.**
