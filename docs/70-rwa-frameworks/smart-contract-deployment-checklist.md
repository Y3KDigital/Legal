# Smart Contract Compliance: Pre-Deployment Checklist & Templates

> **Scope Notice**
>
> This document operationalizes smart contract compliance frameworks into deploy-time controls. It provides mandatory pre-deployment checklists, approved contract patterns, prohibited patterns, and attestation requirements for institutional RWA tokenization projects. No smart contract may be deployed without completing this checklist. This document does not constitute legal or technical advice. Each deployment requires independent professional review.

## Purpose

This document provides:

1. **Mandatory pre-deployment checklist** with sign-offs and evidence requirements
2. **Standard contract templates/patterns** (approved for institutional use)
3. **Explicit prohibited patterns** (automatic deployment failure)
4. **Howey + ERISA tests translated into code-level rules**
5. **Audit & evidence matrix** suitable for bank, regulator, and counsel review
6. **Deployment attestation block** for compliance records

**Critical Rule:**
> No contract may be deployed to any environment (testnet or mainnet) without every checklist item marked **PASS** or an approved written exception.

---

## SECTION A — PRE-DEPLOYMENT COMPLIANCE CHECKLIST (MANDATORY)

### A1. Legal & Regulatory Gate

**Requirement:** All legal analyses completed and approved before any code deployment.

- [ ] **Securities classification memo approved**
  - Howey Test analysis completed
  - Reves Test analysis (if debt instrument)
  - SEC Digital Asset Framework considered
  - Conclusion documented: Security / Not a Security / Uncertain
  - **Owner:** Securities Counsel
  - **Evidence:** Securities classification memo (15-30 pages)

- [ ] **Exemption or distribution posture documented**
  - If security: Exemption relied upon (Reg D 506(b), 506(c), Reg S, institutional-only)
  - If not security: Basis for classification documented
  - Transfer restrictions aligned with exemption requirements
  - **Owner:** Securities Counsel
  - **Evidence:** Exemption reliance memo (10-20 pages)

- [ ] **ERISA non-plan-asset confirmation (if applicable)**
  - Plan asset analysis completed (25% test, exceptions)
  - Confirmation that RWAs ≠ plan assets
  - No participant-level tracking in contract
  - **Owner:** ERISA Counsel
  - **Evidence:** ERISA non-plan-asset opinion (10-15 pages)

- [ ] **Tax characterization memo reviewed**
  - Income characterization determined (interest, dividends, capital gains)
  - Tokenization confirmed as tax-neutral (no change to treatment)
  - Withholding and reporting obligations identified
  - **Owner:** Tax Counsel
  - **Evidence:** Tax characterization memo (15-25 pages)

- [ ] **Banking non-custody posture confirmed**
  - Confirmation that smart contract creates no custody risk
  - No fiat or digital asset custody in contract
  - Banking risk memo prepared (if seeking banking relationship)
  - **Owner:** Regulatory/Banking Counsel
  - **Evidence:** Banking risk posture memo (5-10 pages)

**Status:** ☐ PASS  ☐ FAIL  ☐ EXCEPTION (attach written approval)

**Sign-Off:**
* Securities Counsel: _________________ Date: _______
* ERISA Counsel (if applicable): _________________ Date: _______
* Tax Counsel: _________________ Date: _______
* Regulatory Counsel: _________________ Date: _______

---

### A2. Functional Scope Gate

**Requirement:** Smart contract design must comply with institutional constraints.

- [ ] **Contract creates no legal rights**
  - Legal rights arise from offering documents, not contract code
  - Litmus test passed: Removing contract does not change legal rights
  - **Owner:** Lead Transaction Counsel + Smart Contract Architect

- [ ] **Contract creates no entitlement to cash flows**
  - No payment distribution logic
  - No yield calculation logic
  - Cash flows determined by legal agreements only
  - **Owner:** Securities Counsel + CPA

- [ ] **Contract creates no yield, profit, or ROI logic**
  - No functions with names like: `claimYield()`, `distributeProfit()`, `calculateROI()`
  - No state variables like: `interestRate`, `yieldRate`, `expectedReturn`
  - **Owner:** Securities Counsel + Smart Contract Architect

- [ ] **Contract does not custody fiat or digital assets**
  - No `receive()` or `fallback()` functions accepting payments
  - No asset custody logic
  - No integration with payment rails (fiat or crypto)
  - **Owner:** Regulatory Counsel + Smart Contract Architect

- [ ] **Contract functions as constraint & mirror only**
  - Purpose: Enforce transfer restrictions, supply caps, governance controls
  - Purpose: Mirror off-chain state (custody balances, attestations)
  - Purpose: NOT to create economic promises or control assets
  - **Owner:** Smart Contract Architect + Lead Counsel

**Status:** ☐ PASS  ☐ FAIL  ☐ EXCEPTION (attach written approval)

**Sign-Off:**
* Lead Transaction Counsel: _________________ Date: _______
* Smart Contract Architect: _________________ Date: _______

---

### A3. Supply & Issuance Controls

**Requirement:** Token supply must be controlled and auditable.

- [ ] **Hard supply cap set and immutable**
  ```solidity
  uint256 public immutable maxSupply;
  ```
  - Cap defined in legal agreements
  - Cap enforced in contract code
  - No upgrade path to change cap
  - **Owner:** Smart Contract Architect

- [ ] **Minting restricted to authorized issuer role**
  ```solidity
  modifier onlyIssuer() {
      require(msg.sender == issuer, "Not authorized");
      _;
  }
  function mint(address to, uint256 amount) external onlyIssuer { }
  ```
  - Single issuer address (or multisig)
  - No public mint functions
  - **Owner:** Smart Contract Architect

- [ ] **No algorithmic or discretionary mint paths**
  - Minting only upon verified off-chain issuance (subscription funded)
  - No bonding curves, rewards, or algorithmic issuance
  - **Owner:** Smart Contract Architect

- [ ] **Burn logic (if any) documented and role-restricted**
  ```solidity
  function burn(address from, uint256 amount) external onlyAuthorized {
      _burn(from, amount);
  }
  ```
  - Burn only after redemption confirmed
  - Authorization required
  - Audit trail maintained
  - **Owner:** Smart Contract Architect

**Status:** ☐ PASS  ☐ FAIL  ☐ EXCEPTION (attach written approval)

**Sign-Off:**
* Smart Contract Architect: _________________ Date: _______
* CFO (supply cap approval): _________________ Date: _______

---

### A4. Transfer & Distribution Controls

**Requirement:** Transfer restrictions must align with securities law exemptions.

- [ ] **Allowlist / permissioning enforced**
  ```solidity
  mapping(address => bool) public allowlist;
  require(allowlist[to], "Transfer not permitted");
  ```
  - Only allowlisted addresses can receive tokens
  - KYC/AML verification required before allowlist addition
  - **Owner:** Securities Counsel + Compliance Officer

- [ ] **Jurisdictional blocks implemented (if required)**
  ```solidity
  mapping(address => bool) public blockedJurisdictions;
  require(!blockedJurisdictions[to], "Jurisdiction blocked");
  ```
  - OFAC-sanctioned countries blocked
  - Other restricted jurisdictions identified
  - **Owner:** Compliance Officer

- [ ] **Transfers disabled when paused**
  ```solidity
  modifier whenNotPaused() {
      require(!paused, "Contract paused");
      _;
  }
  ```
  - Emergency pause capability implemented
  - All transfer functions include `whenNotPaused` modifier
  - **Owner:** Smart Contract Architect

- [ ] **Secondary transfers aligned with legal restrictions**
  - Lock-up periods enforced (if applicable)
  - Investor count limits enforced (if 3(c)(1) or 3(c)(7))
  - Resale restrictions documented and enforced
  - **Owner:** Securities Counsel

**Status:** ☐ PASS  ☐ FAIL  ☐ EXCEPTION (attach written approval)

**Sign-Off:**
* Securities Counsel: _________________ Date: _______
* Compliance Officer: _________________ Date: _______

---

### A5. Governance & Emergency Controls

**Requirement:** Admin controls must be secure and transparent.

- [ ] **Pause/unpause implemented**
  ```solidity
  function pause() external onlyGovernance;
  function unpause() external onlyGovernance;
  ```
  - Emergency stop capability
  - Clear governance authorization
  - Events emitted
  - **Owner:** Smart Contract Architect

- [ ] **Multisig governance enforced**
  ```solidity
  address public governanceMultisig; // Gnosis Safe or similar
  ```
  - 2-of-3 or 3-of-5 multisig required (no single key)
  - Signers identified: CEO, CTO, General Counsel, CFO, external advisor (typical)
  - Signing threshold documented
  - **Owner:** Governance Committee

- [ ] **Emergency actions logged on-chain**
  ```solidity
  event GovernanceAction(address indexed initiator, string action, uint256 timestamp);
  ```
  - All privileged actions emit events
  - Audit trail maintained
  - Transparency for regulators and investors
  - **Owner:** Smart Contract Architect

- [ ] **No governance function can alter economics**
  - Cannot change interest rates, principal, maturity dates
  - Economic terms immutable (or changeable only per legal agreements)
  - Governance limited to operational parameters (allowlist, pause, metadata)
  - **Owner:** General Counsel + Smart Contract Architect

**Status:** ☐ PASS  ☐ FAIL  ☐ EXCEPTION (attach written approval)

**Sign-Off:**
* Governance Committee Chair: _________________ Date: _______
* Smart Contract Architect: _________________ Date: _______

---

### A6. Observability & Auditability

**Requirement:** Contract must be transparent and auditable.

- [ ] **All privileged actions emit events**
  - Mint, burn, pause, unpause, allowlist updates, governance changes
  - Events include: actor, action, parameters, timestamp
  - **Owner:** Smart Contract Architect

- [ ] **On-chain state reconciles to off-chain reports**
  - Total supply matches custodian holdings (for asset-backed tokens)
  - Holder count matches cap table
  - Daily/weekly reconciliation procedures documented
  - **Owner:** Controller / Operations

- [ ] **Attestation references immutable (hashes/URIs)**
  ```solidity
  string public attestationURI;
  bytes32 public reportHash;
  ```
  - Links to proof-of-reserves reports
  - IPFS hashes or permanent URLs
  - Updated quarterly (minimum)
  - **Owner:** CFO / Operations

- [ ] **Time-stamped deployment metadata recorded**
  - Deployment date and time
  - Deployer address
  - Network (mainnet, L2, testnet)
  - Commit hash (git)
  - **Owner:** Smart Contract Architect

**Status:** ☐ PASS  ☐ FAIL  ☐ EXCEPTION (attach written approval)

**Sign-Off:**
* Smart Contract Architect: _________________ Date: _______
* CFO: _________________ Date: _______

---

### A7. Independent Review

**Requirement:** External audit required before mainnet deployment.

- [ ] **Code audit completed**
  - Reputable auditor engaged (OpenZeppelin, Trail of Bits, ConsenSys Diligence, etc.)
  - Scope covered: Security vulnerabilities, business logic, compliance constraints
  - Duration: Minimum 2 weeks for complex contracts
  - **Owner:** CISO / CTO

- [ ] **Audit findings resolved or waived in writing**
  - Critical findings: **Must fix** before deployment
  - High severity findings: Fix or obtain written waiver from General Counsel
  - Medium/Low findings: Documented for post-deployment remediation
  - **Owner:** Smart Contract Architect + General Counsel

- [ ] **Final deployment hash approved**
  - Code deployed matches audited code (no changes after audit)
  - If changes made: Re-audit required
  - Commit hash recorded in attestation
  - **Owner:** Smart Contract Architect + Auditor

**Status:** ☐ PASS  ☐ FAIL  ☐ EXCEPTION (attach written approval)

**Sign-Off:**
* External Auditor: _________________ Firm: _____________ Date: _______
* General Counsel: _________________ Date: _______

---

## SECTION B — APPROVED SMART CONTRACT TEMPLATES (PATTERNS)

### B1. Permissioned RWA Mirror Token (Baseline)

**Use When:** Representing outstanding balances, NAV references, or funding tranches.

**Required Characteristics:**

* ✅ Fixed `maxSupply` (immutable)
* ✅ Issuer-only mint (`onlyIssuer` modifier)
* ✅ Allowlisted transfers (`require(allowlist[to])`)
* ✅ Pause capability (`pause()` / `unpause()`)
* ✅ Event emissions for all admin actions
* ✅ No payout logic (payments handled off-chain)

**Prohibited Additions:**

* ❌ Yield functions (`claimYield()`, `distributeReturns()`)
* ❌ Auto-distribution logic
* ❌ Staking or rewards mechanisms
* ❌ Performance-based payouts

**Example Structure:**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract PermissionedRWAToken is ERC20, AccessControl, Pausable {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");
    
    uint256 public immutable maxSupply;
    mapping(address => bool) public allowlist;
    
    event AllowlistAdded(address indexed account);
    event AllowlistRemoved(address indexed account);
    
    constructor(
        string memory name,
        string memory symbol,
        uint256 _maxSupply,
        address governance
    ) ERC20(name, symbol) {
        maxSupply = _maxSupply;
        _grantRole(DEFAULT_ADMIN_ROLE, governance);
        _grantRole(GOVERNANCE_ROLE, governance);
    }
    
    function mint(address to, uint256 amount) 
        external 
        onlyRole(ISSUER_ROLE) 
        whenNotPaused 
    {
        require(totalSupply() + amount <= maxSupply, "Supply cap exceeded");
        require(allowlist[to], "Recipient not allowlisted");
        _mint(to, amount);
    }
    
    function burn(address from, uint256 amount) 
        external 
        onlyRole(ISSUER_ROLE) 
    {
        _burn(from, amount);
    }
    
    function addToAllowlist(address account) 
        external 
        onlyRole(GOVERNANCE_ROLE) 
    {
        allowlist[account] = true;
        emit AllowlistAdded(account);
    }
    
    function removeFromAllowlist(address account) 
        external 
        onlyRole(GOVERNANCE_ROLE) 
    {
        allowlist[account] = false;
        emit AllowlistRemoved(account);
    }
    
    function pause() external onlyRole(GOVERNANCE_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(GOVERNANCE_ROLE) {
        _unpause();
    }
    
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override whenNotPaused {
        require(
            allowlist[to] || to == address(0), 
            "Recipient not allowlisted"
        );
        super._beforeTokenTransfer(from, to, amount);
    }
}
```

---

### B2. SPV Note Mirror

**Use When:** Representing SPV-issued notes or participations.

**Characteristics:**

* Token references note series ID
* Supply equals outstanding principal
* Redemption handled off-chain (by trustee/servicer)
* Token burn only after legal cancellation of note

**Example Structure:**

```solidity
contract SPVNoteMirror is PermissionedRWAToken {
    string public noteSeriesID;
    uint256 public totalNotePrincipal;
    uint256 public maturityDate;
    address public trustee;
    
    constructor(
        string memory name,
        string memory symbol,
        uint256 maxSupply,
        address governance,
        string memory _noteSeriesID,
        uint256 _maturityDate,
        address _trustee
    ) PermissionedRWAToken(name, symbol, maxSupply, governance) {
        noteSeriesID = _noteSeriesID;
        maturityDate = _maturityDate;
        trustee = _trustee;
    }
    
    function updatePrincipal(uint256 newPrincipal) 
        external 
        onlyRole(GOVERNANCE_ROLE) 
    {
        totalNotePrincipal = newPrincipal;
        emit PrincipalUpdated(newPrincipal);
    }
    
    event PrincipalUpdated(uint256 newPrincipal);
}
```

**Key Point:** No payment functions. All cash flows handled by trustee off-chain per note agreement.

---

### B3. Proof-of-Reserve / Proof-of-Liability Token

**Use When:** Publishing transparency data (custody balances, liabilities).

**Characteristics:**

* Read-only state variables (no transfers or economic rights)
* Oracle/attestation updates via authorized role
* No transfer functionality (non-transferable information token)
* Links to external attestation reports

**Example Structure:**

```solidity
contract ProofOfReserveToken is AccessControl {
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");
    
    uint256 public reportedCustodyBalance;
    uint256 public lastAttestationDate;
    string public attestationURI;
    bytes32 public reportHash;
    
    event AttestationUpdated(
        uint256 custodyBalance,
        string uri,
        bytes32 hash,
        uint256 timestamp
    );
    
    constructor(address governance) {
        _grantRole(DEFAULT_ADMIN_ROLE, governance);
    }
    
    function updateAttestation(
        uint256 newBalance,
        string memory newURI,
        bytes32 newHash
    ) external onlyRole(AUDITOR_ROLE) {
        reportedCustodyBalance = newBalance;
        attestationURI = newURI;
        reportHash = newHash;
        lastAttestationDate = block.timestamp;
        
        emit AttestationUpdated(newBalance, newURI, newHash, block.timestamp);
    }
}
```

**Key Point:** No token transfers. Purely informational. May not be a security (no investment characteristics).

---

## SECTION C — PROHIBITED CONTRACT PATTERNS (AUTOMATIC FAIL)

The following patterns result in **automatic deployment failure**:

### ❌ Pattern 1: Auto-Yield or Interest Calculation

```solidity
// PROHIBITED
uint256 public interestRate;

function claimYield() external {
    uint256 yield = calculateYield(msg.sender);
    _transfer(treasury, msg.sender, yield);
}
```

**Why Prohibited:** Creates Howey "expectation of profit from efforts of others."

---

### ❌ Pattern 2: Dividend or Revenue-Share Logic

```solidity
// PROHIBITED
function distributeRevenue() external {
    uint256 revenue = getTotalRevenue();
    for (uint i = 0; i < holders.length; i++) {
        uint256 share = (balanceOf(holders[i]) * revenue) / totalSupply();
        payable(holders[i]).transfer(share);
    }
}
```

**Why Prohibited:** Equity-like distribution = investment contract.

---

### ❌ Pattern 3: Permissionless Transfers (If Security)

```solidity
// PROHIBITED (if security without exemption)
function transfer(address to, uint256 amount) public override returns (bool) {
    return super.transfer(to, amount); // No restrictions
}
```

**Why Prohibited:** Blows Reg D exemption; enables unaccredited investors.

---

### ❌ Pattern 4: Contract-Initiated Payments

```solidity
// PROHIBITED
function payInvestors() external {
    for (uint i = 0; i < investors.length; i++) {
        payable(investors[i]).transfer(paymentAmount);
    }
}
```

**Why Prohibited:** Creates custody risk; contract controls cash flows.

---

### ❌ Pattern 5: Individual Participant Balance Tracking (ERISA Risk)

```solidity
// PROHIBITED
mapping(address => uint256) public employeeBalance;
mapping(address => uint256) public benefitAccrual;

function claimBenefit() external {
    uint256 benefit = employeeBalance[msg.sender];
    // ...
}
```

**Why Prohibited:** Creates ERISA plan asset contamination risk.

---

### ❌ Pattern 6: Upgrade Paths Modifying Economics

```solidity
// PROHIBITED
function setInterestRate(uint256 newRate) external onlyAdmin {
    interestRate = newRate; // Economic terms should be immutable
}
```

**Why Prohibited:** Economic terms must be fixed per legal agreements, not admin discretion.

---

**Any presence of these patterns = DEPLOYMENT BLOCKED.**

---

## SECTION D — HOWEY / SEC CODE-LEVEL CHECK

| Howey Prong | Code-Level Mitigation | Verification |
|-------------|----------------------|--------------|
| **1. Investment of Money** | No retail mint paths; institutional subscriptions only | ☐ No public `mint()` function<br>☐ Subscriptions via legal agreements |
| **2. Common Enterprise** | SPV isolation; no pooling logic in contract | ☐ No revenue pooling code<br>☐ Each token series separate |
| **3. Expectation of Profit** | No yield logic; no profit-related functions or variables | ☐ No `yield`, `profit`, `roi` in code<br>☐ No distribution functions |
| **4. Efforts of Others** | Contract enforces limits only; returns from underlying assets | ☐ No active management in contract<br>☐ Payments handled off-chain |

**Test:** If a regulator reads the ABI alone, profit expectation must be absent.

**Example ABI Review:**

```json
{
  "functions": [
    "mint(address,uint256)",          // OK - administrative
    "burn(address,uint256)",          // OK - administrative
    "pause()",                        // OK - governance
    "addToAllowlist(address)",        // OK - compliance
    "claimYield()"                    // ❌ FAIL - profit expectation
  ]
}
```

If `claimYield()` or similar appears → **Deployment blocked.**

---

## SECTION E — ERISA CODE-LEVEL CHECK

**Must Be True:**

- [ ] No participant identifiers (no `employeeID`, `participantAddress` mappings)
- [ ] No benefit logic (`calculateBenefit()`, `vestingSchedule`)
- [ ] Aggregates only (if any balances tracked)

**Fail Example:**

```solidity
// ERISA VIOLATION RISK
mapping(address => uint256) public employeeBalance;

function checkMyBenefit() external view returns (uint256) {
    return employeeBalance[msg.sender];
}
```

**Pass Example:**

```solidity
// ERISA-SAFE
uint256 public reportedAggregateExposure;
uint256 public totalProgramValue;

function getAggregateMetrics() external view returns (uint256, uint256) {
    return (reportedAggregateExposure, totalProgramValue);
}
```

**Critical Rule:** Individual participant tracking = ERISA contamination risk.

**Reference:** See `/docs/ayg-platform/02-legal-compliance/rwa-boundary-analysis.md` for comprehensive ERISA boundary framework.

---

## SECTION F — EVIDENCE & SIGN-OFF MATRIX

| Control | Evidence | Owner |
|---------|----------|-------|
| **Securities posture** | Securities classification memo | Securities Counsel |
| **ERISA isolation** | ERISA non-plan-asset opinion | ERISA Counsel |
| **Tax treatment** | Tax characterization memo | Tax Counsel |
| **Accounting** | Accounting treatment memo | CPA |
| **Code safety** | External audit report | Smart Contract Auditor |
| **Governance** | Multisig configuration, signer list | Governance Committee |
| **Deployment approval** | Signed attestation (Section G below) | All Required Parties |

**All evidence must be collected and filed before deployment.**

---

## SECTION G — DEPLOYMENT ATTESTATION (REQUIRED)

### Pre-Deployment Attestation Statement

> We attest that this smart contract:
>
> 1. **Enforces compliance constraints only** and does not create legal rights, financial entitlements, or custody obligations.
> 2. **Aligns with legal agreements** (offering documents, note agreements, custody agreements).
> 3. **Has been independently audited** and all critical findings have been resolved.
> 4. **Complies with applicable securities laws** via documented exemptions or registration.
> 5. **Does not create ERISA plan asset contamination** (if applicable).
> 6. **Includes required governance controls** (pause, multisig, event logging).
>
> Economic terms are defined by legal agreements. Removing this smart contract would **not** change any legal right, payment obligation, or entitlement.

### Deployment Metadata

* **Contract Name:** _________________________________
* **Network:** _________________________________
* **Contract Address:** _________________________________
* **Deployment Date:** _________________________________
* **Deployer Address:** _________________________________
* **Git Commit Hash:** _________________________________
* **Audit Firm:** _________________________________
* **Audit Report Date:** _________________________________

### Required Signatures

**Legal:**
* Securities Counsel: _________________ Date: _______
* General Counsel: _________________ Date: _______

**Finance:**
* CFO: _________________ Date: _______
* Controller: _________________ Date: _______

**Technology:**
* CTO: _________________ Date: _______
* Smart Contract Architect: _________________ Date: _______

**Governance:**
* CEO: _________________ Date: _______
* Governance Committee Chair: _________________ Date: _______

**Compliance:**
* Chief Compliance Officer: _________________ Date: _______

**External:**
* External Auditor: _________________ Firm: _____________ Date: _______

---

## SECTION H — POST-DEPLOYMENT REQUIREMENTS

### H1. Ongoing Monitoring

- [ ] **Daily reconciliation** (token supply vs. custody holdings)
- [ ] **Monthly governance review** (admin actions logged and reviewed)
- [ ] **Quarterly proof-of-reserves** (independent attestation published)
- [ ] **Annual code audit** (if material changes)

### H2. Change Management

- [ ] Any contract upgrade requires full re-approval (Section A checklist)
- [ ] Emergency changes documented and reviewed within 48 hours
- [ ] Governance action log maintained indefinitely

### H3. Incident Response

- [ ] Security incident triggers immediate pause (if warranted)
- [ ] Legal counsel notified within 1 hour
- [ ] Investors notified within 24 hours (if material)
- [ ] Post-incident review within 7 days

---

## SECTION I — DEPLOYMENT DECISION TREE

```
START
  |
  ├─ All legal opinions complete? ────NO──> STOP (cannot deploy)
  |                                YES
  |
  ├─ Contract creates legal rights? ──YES──> STOP (redesign required)
  |                                 NO
  |
  ├─ Contract has yield/profit logic? ─YES──> STOP (remove prohibited code)
  |                                   NO
  |
  ├─ Transfer restrictions enforced? ──NO──> STOP (add restrictions)
  |                                   YES
  |
  ├─ Multisig governance implemented? ──NO──> STOP (implement multisig)
  |                                    YES
  |
  ├─ External audit completed? ──NO──> STOP (obtain audit)
  |                             YES
  |
  ├─ Critical findings resolved? ──NO──> STOP (fix critical issues)
  |                               YES
  |
  ├─ All signatures obtained? ──NO──> STOP (obtain sign-offs)
  |                            YES
  |
  └─> PROCEED TO DEPLOYMENT
```

---

## FINAL RULE

> **If removing this smart contract would change any legal right, payment obligation, or entitlement, deployment is PROHIBITED.**

---

## Quick Reference: Deployment Blockers

**Automatic STOP conditions:**

* ❌ No securities classification memo
* ❌ No external audit or critical findings unresolved
* ❌ Yield/profit logic in contract
* ❌ No transfer restrictions (if security)
* ❌ Single-key admin control (no multisig)
* ❌ ERISA participant tracking (if applicable)
* ❌ Contract controls cash flows or assets
* ❌ Missing signatures from required parties

**Any one blocker = deployment prohibited.**

---

## Integration with Other Documents

This checklist integrates with:

* **Legal, CPA & Smart Contract Framework** (`legal-cpa-smart-contract-framework.md`): Professional roles and responsibilities
* **Smart Contract Compliance Cheat Sheets** (`smart-contract-compliance-cheatsheets.md`): Operational guidance
* **Control Matrix** (`control-matrix.md`): Ongoing governance controls
* **Asset Class Registry** (`asset-class-registry.md`): Asset-specific patterns
* **Execution Playbooks** (`execution-playbooks.md`): Operational procedures

---

## Document Control

**Version:** 1.0  
**Date:** January 2026  
**Last Updated:** January 13, 2026  
**Next Review:** Quarterly or upon material regulatory/technical developments

**Maintained By:** Chief Technology Officer / General Counsel / Chief Compliance Officer

**Approval:** Board of Directors (for deployment procedures)

---

> **Disclaimer:** This checklist is provided for informational purposes only and does not constitute legal, technical, or compliance advice. Each smart contract deployment requires independent legal review by qualified securities counsel, ERISA counsel (if applicable), tax counsel, comprehensive security audit by reputable auditors, and risk assessment by internal compliance teams. The templates provided are illustrative only and should not be used in production without proper legal and technical review tailored to specific facts and circumstances. Compliance with this checklist does not guarantee regulatory approval or exemption from securities laws. Consult qualified professionals before deploying any smart contract in a production environment.
