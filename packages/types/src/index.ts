// User & Authentication Types
export enum Role {
  FOUNDER = 'FOUNDER',
  LEGAL_COUNSEL = 'LEGAL_COUNSEL',
  CPA = 'CPA',
  ENGINEER = 'ENGINEER',
  OBSERVER = 'OBSERVER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Project Types
export enum ProjectStatus {
  INITIATED = 'INITIATED',
  RUNNING = 'RUNNING',
  LEGAL_REVIEW = 'LEGAL_REVIEW',
  BLOCKED = 'BLOCKED',
  APPROVED = 'APPROVED',
  DEPLOYED = 'DEPLOYED',
  RERUNNING = 'RERUNNING',
}

export enum RWAAssetClass {
  US_TREASURIES = 'US_TREASURIES',
  PRIVATE_CREDIT = 'PRIVATE_CREDIT',
  REAL_ESTATE = 'REAL_ESTATE',
  COMMODITIES = 'COMMODITIES',
  CARBON_CREDITS = 'CARBON_CREDITS',
  FINE_ART = 'FINE_ART',
  COLLECTIBLES = 'COLLECTIBLES',
  EQUIPMENT_LEASING = 'EQUIPMENT_LEASING',
  ROYALTY_STREAMS = 'ROYALTY_STREAMS',
  LITIGATION_FINANCE = 'LITIGATION_FINANCE',
  INSURANCE_LINKED = 'INSURANCE_LINKED',
}

export enum Jurisdiction {
  US_FEDERAL = 'US_FEDERAL',
  US_DELAWARE = 'US_DELAWARE',
  US_WYOMING = 'US_WYOMING',
  EU = 'EU',
  UK = 'UK',
  SINGAPORE = 'SINGAPORE',
  UAE = 'UAE',
  SWITZERLAND = 'SWITZERLAND',
}

export enum LegalWrapper {
  DELAWARE_STATUTORY_TRUST = 'DELAWARE_STATUTORY_TRUST',
  WYOMING_DAO_LLC = 'WYOMING_DAO_LLC',
  CAYMAN_SPV = 'CAYMAN_SPV',
  LUXEMBOURG_SICAV = 'LUXEMBOURG_SICAV',
  UK_LIMITED_PARTNERSHIP = 'UK_LIMITED_PARTNERSHIP',
}

export enum DistributionStrategy {
  REG_D_506C = 'REG_D_506C',
  REG_D_506B = 'REG_D_506B',
  REG_S = 'REG_S',
  REG_A_PLUS = 'REG_A_PLUS',
  REG_CF = 'REG_CF',
}

export interface Project {
  id: string;
  status: ProjectStatus;
  assetClass: RWAAssetClass;
  jurisdiction: Jurisdiction;
  legalWrapper: LegalWrapper;
  distributionStrategy: DistributionStrategy;
  assetDescription: string;
  assetValue: number;
  economicTerms: Record<string, any>;
  custodyModel: Record<string, any>;
  bankingRelationships: Record<string, any>;
  attestationPlan: Record<string, any>;
  founderId: string;
  workflowId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Gate Types
export enum GateStatus {
  LOCKED = 'LOCKED',
  PENDING = 'PENDING',
  PASS = 'PASS',
  FAIL = 'FAIL',
}

export enum GateName {
  SECURITIES = 'SECURITIES',
  ERISA = 'ERISA',
  TAX = 'TAX',
  BANKING = 'BANKING',
  CPA = 'CPA',
  SMART_CONTRACT = 'SMART_CONTRACT',
  AUDIT = 'AUDIT',
  GOVERNANCE = 'GOVERNANCE',
}

export interface Gate {
  id: string;
  projectId: string;
  name: GateName;
  status: GateStatus;
  agentId: string;
  memoPath: string | null;
  failureReason: string | null;
  executedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Artifact Types
export enum ArtifactType {
  SECURITIES_MEMO = 'SECURITIES_MEMO',
  ERISA_MEMO = 'ERISA_MEMO',
  TAX_MEMO = 'TAX_MEMO',
  BANKING_REPORT = 'BANKING_REPORT',
  CPA_MEMO = 'CPA_MEMO',
  SC_REPORT = 'SC_REPORT',
  AUDIT_REPORT = 'AUDIT_REPORT',
  GOVERNANCE_CONFIG = 'GOVERNANCE_CONFIG',
  SMART_CONTRACT = 'SMART_CONTRACT',
  ATTESTATION = 'ATTESTATION',
}

export interface Artifact {
  id: string;
  projectId: string;
  type: ArtifactType;
  filePath: string;
  gitCommitSha: string;
  ipfsCid: string | null;
  generatedBy: string; // Agent ID or user ID
  createdAt: Date;
}

// Approval Types
export enum ApprovalDecision {
  APPROVE = 'APPROVE',
  BLOCK = 'BLOCK',
}

export interface Approval {
  id: string;
  projectId: string;
  gateName: GateName;
  decision: ApprovalDecision;
  comments: string | null;
  signature: string;
  approvedBy: string; // User ID
  approvedAt: Date;
}

// MCP Workflow Types
export enum WorkflowType {
  NEW_RWA_REQUEST = 'NEW_RWA_REQUEST',
  CONTRACT_SCAN = 'CONTRACT_SCAN',
  DEPLOYMENT_ATTESTATION = 'DEPLOYMENT_ATTESTATION',
}

export enum WorkflowStatus {
  INITIATED = 'INITIATED',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export interface Workflow {
  id: string;
  type: WorkflowType;
  status: WorkflowStatus;
  projectId: string | null;
  triggeredBy: string; // User ID
  startedAt: Date;
  completedAt: Date | null;
  steps: WorkflowStep[];
}

export interface WorkflowStep {
  agentId: string;
  status: GateStatus;
  startedAt: Date | null;
  completedAt: Date | null;
  output: Record<string, any> | null;
}

// API Request/Response Types
export interface EventSubmissionRequest {
  event_type: WorkflowType;
  payload: Record<string, any>;
}

export interface EventSubmissionResponse {
  status: 'SUCCESS' | 'ERROR';
  project_id?: string;
  workflow_id?: string;
  message: string;
  error?: string;
}

export interface ProjectDetailResponse {
  project: Project;
  gates: Gate[];
  artifacts: Artifact[];
  approvals: Approval[];
  workflow: Workflow | null;
}

export interface ApprovalRequest {
  project_id: string;
  gate_name: GateName;
  decision: ApprovalDecision;
  comments?: string;
  signature: string;
}

export interface ApprovalResponse {
  status: 'SUCCESS' | 'ERROR';
  message: string;
  approval_id?: string;
}

export interface ContractScanRequest {
  project_id: string;
  contract_code: string;
  compiler_version: string;
}

export interface ContractScanResponse {
  status: 'PASS' | 'FAIL';
  scan_id: string;
  violations: Array<{
    rule: string;
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    description: string;
    line: number | null;
  }>;
  checklist: Array<{
    item: string;
    status: 'PASS' | 'FAIL';
  }>;
}

export interface AttestationResponse {
  project_id: string;
  attestation_id: string;
  summary: {
    gates_passed: number;
    total_gates: number;
    approvals_collected: number;
    required_approvals: number;
  };
  artifacts: Array<{
    type: ArtifactType;
    git_sha: string;
    ipfs_cid: string | null;
  }>;
  signatures: Array<{
    role: Role;
    signer: string;
    timestamp: Date;
    signature: string;
  }>;
  deployment_timestamp: Date;
  multisig_attestation: string | null;
}

// Permission Types
export type Permission =
  | 'CREATE_PROJECT'
  | 'VIEW_PROJECT'
  | 'EDIT_PROJECT'
  | 'VIEW_MEMOS'
  | 'APPROVE_LEGAL'
  | 'APPROVE_FINANCE'
  | 'SUBMIT_CONTRACT'
  | 'DEPLOY'
  | 'VIEW_ATTESTATION'
  | 'BLOCK_DEPLOYMENT'
  | 'MANAGE_USERS';

export const RolePermissions: Record<Role, Permission[]> = {
  [Role.FOUNDER]: [
    'CREATE_PROJECT',
    'VIEW_PROJECT',
    'EDIT_PROJECT',
    'VIEW_MEMOS',
    'VIEW_ATTESTATION',
  ],
  [Role.LEGAL_COUNSEL]: [
    'VIEW_PROJECT',
    'VIEW_MEMOS',
    'APPROVE_LEGAL',
    'VIEW_ATTESTATION',
    'BLOCK_DEPLOYMENT',
  ],
  [Role.CPA]: [
    'VIEW_PROJECT',
    'VIEW_MEMOS',
    'APPROVE_FINANCE',
    'VIEW_ATTESTATION',
    'BLOCK_DEPLOYMENT',
  ],
  [Role.ENGINEER]: [
    'VIEW_PROJECT',
    'VIEW_MEMOS',
    'SUBMIT_CONTRACT',
    'VIEW_ATTESTATION',
    'BLOCK_DEPLOYMENT',
  ],
  [Role.OBSERVER]: [
    'VIEW_PROJECT',
    'VIEW_MEMOS',
    'VIEW_ATTESTATION',
  ],
  [Role.ADMIN]: [
    'CREATE_PROJECT',
    'VIEW_PROJECT',
    'EDIT_PROJECT',
    'VIEW_MEMOS',
    'DEPLOY',
    'VIEW_ATTESTATION',
    'BLOCK_DEPLOYMENT',
    'MANAGE_USERS',
  ],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return RolePermissions[role].includes(permission);
}
