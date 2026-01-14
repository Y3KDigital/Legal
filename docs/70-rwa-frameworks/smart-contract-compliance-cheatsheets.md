# Smart Contract Compliance Cheat Sheets

*(Institutional RWA Programs)*

> **Scope Notice**
>
> These cheat sheets provide operational guidance for smart contract compliance in institutional RWA tokenization projects. They are designed for rapid reference by auditors, counsel, engineers, and bank technologists. This document does not constitute legal or technical advice. Each smart contract deployment requires independent legal review, security audit, and risk assessment.

## Purpose

These cheat sheets translate legal and compliance requirements into **actionable smart contract design principles**. Each sheet addresses a specific compliance dimension with clear **do's and don'ts**, code examples, and decision frameworks.

**Target Audience:**
* Smart contract architects
* Security auditors
* Legal counsel reviewing code
* Bank technology risk teams
* Compliance officers

---

## CHEAT SHEET 1 — CORE PRINCIPLE (NON-NEGOTIABLE)

### The Golden Rule

> **Smart contracts do not create rights. They enforce constraints.**

### What This Means

If a smart contract:

* ❌ Creates profit expectations
* ❌ Controls assets
* ❌ Guarantees yield
* ❌ Overrides legal agreements

**→ It is out of compliance.**

### Correct Design

Smart contracts should:

* ✅ Enforce transfer restrictions
* ✅ Limit token supply
* ✅ Mirror off-chain state
* ✅ Provide emergency controls
* ✅ Emit audit events

### Litmus Test

Ask: *"If I remove this smart contract, do any legal rights change?"*

* **Yes** → Non-compliant design
* **No** → Correct institutional design

---

## CHEAT SHEET 2 — LEGAL ⇄ CODE RESPONSIBILITY SPLIT

| Layer | What It Does | What It MUST NOT Do |
|-------|--------------|---------------------|
| **Legal Agreements** | Define rights, obligations, economics | Cannot be replaced by code |
| **Offering Documents** | Define risks & eligibility | Cannot rely on code behavior |
| **Smart Contracts** | Enforce transfer & supply constraints | Cannot promise returns |
| **Tokens** | Represent state | Cannot represent ownership of plan assets |

### The Rule

> If removing the smart contract changes the legal rights → **you did it wrong**.

### Examples

**❌ Wrong:**
```solidity
// Contract creates economic promise
function claimMonthlyYield() external returns (uint256) {
    uint256 yield = calculateYield(msg.sender);
    token.transfer(msg.sender, yield);
    return yield;
}
```
*Problem:* Contract defines economics (yield calculation and payment).

**✅ Right:**
```solidity
// Contract enforces constraint only
function transfer(address to, uint256 amount) public override returns (bool) {
    require(allowlist[to], "Recipient not on allowlist");
    return super.transfer(to, amount);
}
```
*Why:* Contract enforces eligibility constraint; economics defined in legal agreements.

---

## CHEAT SHEET 3 — HOWEY-SAFE SMART CONTRACT DESIGN

### ❌ DO NOT IMPLEMENT

* **Yield calculations**
  ```solidity
  uint256 yieldRate;
  function calculateYield(address holder) public view returns (uint256);
  ```

* **Auto-distribution of "profits"**
  ```solidity
  function distributeReturns() external;
  ```

* **Performance-based rewards**
  ```solidity
  function claimBonus() external;
  ```

* **Language suggesting returns**
  ```solidity
  uint256 public interestRate;
  uint256 public annualYield;
  uint256 public roi;
  mapping(address => uint256) public expectedProfit;
  ```

### ✅ INSTEAD IMPLEMENT

* **Supply caps**
  ```solidity
  uint256 public immutable maxSupply;
  require(totalSupply() + amount <= maxSupply, "Supply cap exceeded");
  ```

* **Transfer restrictions**
  ```solidity
  mapping(address => bool) public allowlist;
  require(allowlist[to], "Transfer not permitted");
  ```

* **Pausable functionality**
  ```solidity
  bool public paused;
  modifier whenNotPaused() {
      require(!paused, "Contract paused");
      _;
  }
  ```

* **Read-only references to off-chain reports**
  ```solidity
  string public latestAttestationURI;
  bytes32 public reportHash;
  ```

### Code Reality Check

**If a regulator reads the ABI and sees:**

```solidity
function claimYield() external;
```

**You already failed.**

---

## CHEAT SHEET 4 — MANDATORY COMPLIANCE FEATURES (BASELINE)

Every institutional RWA contract **must** include:

### 1. Pause / Freeze

```solidity
bool public paused;

function pause() external onlyGovernance {
    paused = true;
    emit Paused(msg.sender);
}

function unpause() external onlyGovernance {
    paused = false;
    emit Unpaused(msg.sender);
}

modifier whenNotPaused() {
    require(!paused, "Contract paused");
    _;
}
```

**Why:**
* Regulatory intervention
* Court orders
* Sanctions enforcement
* Security incident response

---

### 2. Supply Control

```solidity
uint256 public immutable maxSupply;

constructor(uint256 _maxSupply) {
    maxSupply = _maxSupply;
}

function mint(address to, uint256 amount) external onlyIssuer {
    require(totalSupply() + amount <= maxSupply, "Supply cap exceeded");
    _mint(to, amount);
}
```

**Why:**
* Prevents dilution
* Aligns with legal issuance limits
* Required for audit reconciliation

---

### 3. Restricted Minting

```solidity
address public issuer;

modifier onlyIssuer() {
    require(msg.sender == issuer, "Not authorized");
    _;
}

function mint(address to, uint256 amount) external onlyIssuer {
    _mint(to, amount);
}
```

**Why:**
* Only legally authorized issuance
* No algorithmic minting
* No discretionary expansion

---

### 4. Transfer Restrictions

```solidity
mapping(address => bool) public allowlist;

function addToAllowlist(address account) external onlyGovernance {
    allowlist[account] = true;
    emit AllowlistAdded(account);
}

function removeFromAllowlist(address account) external onlyGovernance {
    allowlist[account] = false;
    emit AllowlistRemoved(account);
}

function _beforeTokenTransfer(
    address from,
    address to,
    uint256 amount
) internal virtual override {
    require(allowlist[to] || to == address(0), "Recipient not allowed");
    super._beforeTokenTransfer(from, to, amount);
}
```

**Why:**
* Securities law compliance (accredited/QP/QIB only)
* KYC/AML enforcement
* Jurisdictional controls

---

## CHEAT SHEET 5 — WHAT "READ-ONLY RWA" MEANS IN CODE

### ✅ Allowed

* **Token supply mirrors reported balances**
  ```solidity
  uint256 public reportedCustodyBalance;
  
  function updateReportedBalance(uint256 newBalance) external onlyOracle {
      reportedCustodyBalance = newBalance;
      emit BalanceUpdated(newBalance);
  }
  ```

* **Events reference external reports**
  ```solidity
  event AttestationPublished(string ipfsHash, uint256 timestamp);
  
  function publishAttestation(string memory ipfsHash) external onlyGovernance {
      emit AttestationPublished(ipfsHash, block.timestamp);
  }
  ```

* **Metadata links to attestations**
  ```solidity
  string public attestationURI;
  
  function setAttestationURI(string memory newURI) external onlyGovernance {
      attestationURI = newURI;
      emit AttestationURIUpdated(newURI);
  }
  ```

### ❌ Forbidden

* **Contract pulling funds**
  ```solidity
  // NEVER DO THIS
  function collectFunds() external {
      payable(address(this)).transfer(address(this).balance);
  }
  ```

* **Contract initiating payments**
  ```solidity
  // NEVER DO THIS
  function distributePayments(address[] memory recipients) external {
      for (uint i = 0; i < recipients.length; i++) {
          payable(recipients[i]).transfer(amount);
      }
  }
  ```

* **Contract triggering liquidation**
  ```solidity
  // NEVER DO THIS
  function liquidatePosition() external {
      // Any liquidation logic
  }
  ```

### Golden Rule

> Smart contract never touches fiat, custody, or settlement rails.

---

## CHEAT SHEET 6 — ERISA-SAFE CONTRACT DESIGN

To avoid ERISA contamination:

### ✅ Must Be True

* No participant addresses involved
* No plan-level balances represented
* No benefit logic encoded

### ❌ Code Smell (Bad)

```solidity
// ERISA VIOLATION RISK
mapping(address => uint256) public employeeBalance;
mapping(address => uint256) public benefitAccrual;
mapping(address => bool) public planParticipant;

function claimBenefit() external {
    require(planParticipant[msg.sender], "Not a participant");
    uint256 benefit = employeeBalance[msg.sender];
    // ...
}
```

**Problem:** Contract tracks individual plan participants and benefits → creates ERISA plan asset risk.

### ✅ ERISA-Safe Pattern (Good)

```solidity
// AGGREGATES ONLY
uint256 public reportedAggregateRevenue;
uint256 public totalProgramValue;

function updateAggregateMetrics(
    uint256 newRevenue,
    uint256 newValue
) external onlyOracle {
    reportedAggregateRevenue = newRevenue;
    totalProgramValue = newValue;
    emit MetricsUpdated(newRevenue, newValue);
}
```

**Why Safe:** Aggregates only. No individuals. No entitlements.

### Key Principle

> If contract can identify individual plan participants or calculate individual benefits → **ERISA contamination risk**.

**Reference:** See `/docs/ayg-platform/02-legal-compliance/rwa-boundary-analysis.md` for comprehensive ERISA boundary analysis.

---

## CHEAT SHEET 7 — SEC / SECURITIES COMPLIANCE FLAGS

### 🚨 High-Risk Code Indicators

* **Automatic cash-flow distribution**
  ```solidity
  function distributeDividends() external;
  ```

* **Staking mechanics**
  ```solidity
  function stake(uint256 amount) external;
  function unstake(uint256 amount) external;
  function claimStakingRewards() external;
  ```

* **Compounding logic**
  ```solidity
  function compound() external;
  function autoCompound() external;
  ```

* **Performance incentives**
  ```solidity
  function claimPerformanceBonus() external;
  ```

**Why High-Risk:** Suggests "profits from efforts of others" (Howey Prong 4).

### ✅ Low-Risk Institutional Pattern

* **Tokenized notes via SPV**
  ```solidity
  string public noteSeriesID;
  uint256 public totalNotePrincipal;
  uint256 public maturityDate;
  ```

* **Manual, off-chain settlement**
  ```solidity
  // No payment functions in contract
  // Payments handled by trustee/servicer off-chain
  ```

* **Contract only mirrors outstanding balance**
  ```solidity
  uint256 public outstandingPrincipal;
  
  function updatePrincipal(uint256 newPrincipal) external onlyServicer {
      outstandingPrincipal = newPrincipal;
      emit PrincipalUpdated(newPrincipal);
  }
  ```

### Remember

> Most institutional RWAs **are securities**. The goal is **compliance**, not avoidance.

Accept securities status → Use exemptions → Restrict distribution → Focus on efficiency.

---

## CHEAT SHEET 8 — ADMIN & GOVERNANCE CONTROLS

### ✅ Required

* **Multisig admin (never single key)**
  ```solidity
  address public governanceMultisig;
  
  modifier onlyGovernance() {
      require(msg.sender == governanceMultisig, "Not governance");
      _;
  }
  ```
  
  **Implementation:** Use Gnosis Safe or similar 2-of-3 / 3-of-5 multisig.

* **Logged governance actions**
  ```solidity
  event GovernanceAction(
      address indexed initiator,
      string action,
      bytes data,
      uint256 timestamp
  );
  
  function pause() external onlyGovernance {
      paused = true;
      emit GovernanceAction(msg.sender, "pause", "", block.timestamp);
  }
  ```

* **Time-delay for critical changes**
  ```solidity
  uint256 public constant GOVERNANCE_DELAY = 2 days;
  
  struct ProposedChange {
      bytes32 changeHash;
      uint256 proposedAt;
      bool executed;
  }
  
  mapping(bytes32 => ProposedChange) public proposedChanges;
  
  function proposeChange(bytes32 changeHash) external onlyGovernance {
      proposedChanges[changeHash] = ProposedChange({
          changeHash: changeHash,
          proposedAt: block.timestamp,
          executed: false
      });
      emit ChangeProposed(changeHash, block.timestamp);
  }
  
  function executeChange(bytes32 changeHash) external onlyGovernance {
      ProposedChange storage change = proposedChanges[changeHash];
      require(
          block.timestamp >= change.proposedAt + GOVERNANCE_DELAY,
          "Delay not met"
      );
      require(!change.executed, "Already executed");
      change.executed = true;
      // Execute change logic
  }
  ```

### ❌ Forbidden

* **Upgrade authority that can change economics**
  ```solidity
  // FORBIDDEN
  function setInterestRate(uint256 newRate) external onlyAdmin {
      interestRate = newRate;
  }
  ```
  
  **Why:** Economic terms are immutable or changeable only per legal agreements, not admin discretion.

* **Hidden admin functions**
  ```solidity
  // FORBIDDEN - undisclosed backdoors
  function emergencyWithdraw() external {
      if (msg.sender == secretAdmin) {
          // ...
      }
  }
  ```

* **Emergency mint without disclosure**
  ```solidity
  // FORBIDDEN if not disclosed in offering docs
  function emergencyMint(address to, uint256 amount) external onlyAdmin {
      _mint(to, amount);
  }
  ```

---

## CHEAT SHEET 9 — AUDIT READINESS CHECKLIST

Auditors will ask:

- [ ] **Who can mint?**
  - Answer: Only `issuer` role (single address or multisig)
  - Code: `onlyIssuer` modifier on `mint()` function

- [ ] **Who can pause?**
  - Answer: Only `governance` multisig
  - Code: `onlyGovernance` modifier on `pause()` / `unpause()`

- [ ] **Can supply change?**
  - Answer: No (immutable `maxSupply`) or Yes with strict authorization
  - Code: `uint256 public immutable maxSupply;`

- [ ] **Can transfers be restricted retroactively?**
  - Answer: Yes (via allowlist updates) but only by governance
  - Code: `addToAllowlist()` / `removeFromAllowlist()` with `onlyGovernance`

- [ ] **Can economics be modified?**
  - Answer: **No** (economic terms immutable in code)
  - Code: No functions to change interest rates, maturities, principal amounts

- [ ] **Are all privileged actions logged?**
  - Answer: Yes
  - Code: Events emitted for every admin action

### Time Limit

> If you cannot answer these questions in **30 seconds**, the contract fails institutional review.

---

## CHEAT SHEET 10 — COMMON FAILURES (REAL-WORLD)

### ❌ Failure Pattern 1: "Tokenized Revenue Share" with Auto Payouts

```solidity
// FAIL - creates Howey "profits from efforts of others"
function distributeRevenue() external {
    uint256 totalRevenue = getRevenueFromOperations();
    for (uint i = 0; i < holders.length; i++) {
        uint256 share = (balanceOf(holders[i]) * totalRevenue) / totalSupply();
        payable(holders[i]).transfer(share);
    }
}
```

**Why It Fails:**
* Howey Prong 3: Expectation of profit ✓
* Howey Prong 4: Profits from promoter's efforts (revenue operations) ✓
* Likely unregistered security offering

---

### ❌ Failure Pattern 2: "Yield-Bearing RWA Token"

```solidity
// FAIL - creates investment contract
uint256 public yieldRate;

function claimYield() external {
    uint256 yield = calculateYield(msg.sender);
    token.transfer(msg.sender, yield);
}
```

**Why It Fails:**
* Explicit profit mechanism (yield)
* Active management implied (who sets `yieldRate`?)
* Securities classification likely

---

### ❌ Failure Pattern 3: "On-Chain Dividend Logic"

```solidity
// FAIL - security without exemption
function declareDividend(uint256 amountPerToken) external onlyBoard {
    dividendPerToken = amountPerToken;
}

function claimDividend() external {
    uint256 dividend = balanceOf(msg.sender) * dividendPerToken;
    payable(msg.sender).transfer(dividend);
}
```

**Why It Fails:**
* Equity-like dividend structure
* Investment contract characteristics
* No evidence of securities exemption

---

### ❌ Failure Pattern 4: "Permissionless RWA Trading"

```solidity
// FAIL - no transfer restrictions
function transfer(address to, uint256 amount) public override returns (bool) {
    return super.transfer(to, amount);
}
```

**Why It Fails (if security):**
* Reg D exemption blown (no transfer restrictions)
* Unaccredited investors may acquire
* Secondary market without ATS/broker-dealer
* General solicitation if widely tradable

---

### These Patterns Fail:

* ❌ Howey Test (investment contract)
* ❌ Reves Test (note analysis)
* ❌ Bank risk review (custody/operational risk)
* ❌ ERISA boundary tests (plan asset contamination)

---

## CHEAT SHEET 11 — APPROVED INSTITUTIONAL PATTERNS

### ✔ Pattern 1: Tokenized Fund Units (Permissioned)

```solidity
contract PermissionedFundToken is ERC20 {
    mapping(address => bool) public qualifiedInvestor;
    
    function transfer(address to, uint256 amount) 
        public 
        override 
        returns (bool) 
    {
        require(qualifiedInvestor[to], "Not qualified");
        return super.transfer(to, amount);
    }
}
```

**Why It Works:**
* Accepts security status
* Enforces investor qualifications
* Restricts transfers
* Uses exemption (Reg D / institutional-only)

---

### ✔ Pattern 2: SPV Note Mirrors

```solidity
contract SPVNoteMirror is ERC20 {
    string public noteSeriesID;
    uint256 public totalPrincipal;
    uint256 public maturityDate;
    
    // No payment logic - handled off-chain by trustee
    // Token merely represents outstanding note balance
}
```

**Why It Works:**
* Token represents existing note obligation
* No on-chain economics
* Payments handled off-chain (trustee/servicer)
* Clear securities treatment (note = security)

---

### ✔ Pattern 3: Proof-of-Reserves Tokens

```solidity
contract ProofOfReserveToken {
    uint256 public reportedCustodyBalance;
    uint256 public lastAttestationDate;
    string public attestationURI;
    
    function updateAttestation(
        uint256 newBalance,
        string memory newURI
    ) external onlyAuditor {
        reportedCustodyBalance = newBalance;
        attestationURI = newURI;
        lastAttestationDate = block.timestamp;
        emit AttestationUpdated(newBalance, newURI);
    }
}
```

**Why It Works:**
* Read-only transparency mechanism
* No cash flows or payments
* No profit expectations created
* May not be security (depending on context)

---

### ✔ Pattern 4: Attestation-Linked Supply Tokens

```solidity
contract AttestationLinkedToken is ERC20 {
    bytes32 public latestAttestationHash;
    
    function mint(address to, uint256 amount, bytes32 attestationHash) 
        external 
        onlyIssuer 
    {
        require(verifyAttestation(attestationHash), "Invalid attestation");
        latestAttestationHash = attestationHash;
        _mint(to, amount);
    }
}
```

**Why It Works:**
* Minting tied to verified off-chain attestation
* Audit trail maintained
* Transparency enforced
* Compliance with proof-of-reserves requirements

---

### ✔ Pattern 5: Read-Only Reporting Tokens

```solidity
contract ReportingToken {
    struct Report {
        uint256 totalAssetValue;
        uint256 totalLiabilities;
        uint256 netAssetValue;
        uint256 timestamp;
        string ipfsHash;
    }
    
    Report public latestReport;
    
    function publishReport(Report memory newReport) external onlyReporter {
        latestReport = newReport;
        emit ReportPublished(newReport.timestamp, newReport.ipfsHash);
    }
}
```

**Why It Works:**
* Information-only token
* No economic rights
* Transparency mechanism
* Likely not a security (no investment characteristics)

---

### These Patterns Survive:

* ✅ Bank risk committees
* ✅ Securities counsel review
* ✅ Regulator scrutiny
* ✅ Auditor examination

---

## CHEAT SHEET 12 — ONE-PAGE DECISION TEST

Ask **one question**:

> *"If this smart contract disappeared tomorrow, would any legal right, payment obligation, or entitlement change?"*

### Interpretation

* **Yes** → **Non-compliant**
  - Contract is creating rights (should only enforce constraints)
  - Legal agreements insufficient
  - Risk of contract-law conflict

* **No** → **Correct institutional design**
  - Token is evidence, not source, of rights
  - Legal agreements authoritative
  - Contract provides efficiency, not substance

### Examples

**Question:** "If contract disappeared, would investor still be entitled to principal repayment?"

* If **Yes** (entitled via note agreement) → ✅ Good design
* If **No** (entitled only via contract) → ❌ Bad design

**Question:** "If contract disappeared, would investor still have transfer restrictions?"

* If **Yes** (restricted via subscription agreement) → ✅ Good design
* If **No** (restricted only via contract) → ❌ May be acceptable if disclosed

---

## CHEAT SHEET 13 — ROLE OWNERSHIP (WHO SIGNS OFF)

| Area | Owner | Why |
|------|-------|-----|
| **Securities classification** | Securities Counsel | Howey/Reves analysis requires legal expertise |
| **ERISA isolation** | ERISA Counsel | Plan asset analysis is highly specialized |
| **Tax neutrality** | Tax Counsel | Tax treatment must be analyzed under IRC |
| **Accounting treatment** | CPA | GAAP/IFRS expertise required |
| **Contract constraints** | Smart Contract Architect | Technical design and implementation |
| **Code safety** | Smart Contract Auditor | Security vulnerability assessment |
| **Emergency authority** | Governance Committee | Business continuity and risk management |

### Critical Rule

> **Smart contracts are the last step, never the first.**

### Correct Sequence

1. **Legal analysis** (structure, securities, tax, ERISA)
2. **Accounting analysis** (GAAP treatment, consolidation)
3. **Smart contract design** (translating legal constraints to code)
4. **Security audit** (code review)
5. **Deployment** (only after all approvals)

### Common Mistake

❌ **Building smart contract first, then seeking legal opinion**

**Problem:** Code may create unintended legal obligations or violate requirements

✅ **Correct Approach:** Legal/accounting analysis → Technical requirements → Smart contract design

---

## FINAL INSTITUTIONAL MANTRA

> **Law defines the asset.**
> **Contracts define the economics.**
> **Smart contracts enforce limits.**
> **Tokens reflect reality — they do not create it.**

---

## Quick Reference: Do's and Don'ts

### ✅ DO

* Enforce transfer restrictions
* Implement pause/freeze functions
* Use immutable supply caps
* Require multi-sig governance
* Emit events for all admin actions
* Link to off-chain attestations
* Accept securities status (if applicable)
* Focus on compliance, not avoidance

### ❌ DON'T

* Calculate yield or interest
* Distribute profits automatically
* Create staking rewards
* Promise returns in code
* Track individual participant benefits (ERISA risk)
* Allow single-key admin control
* Custody fiat or assets in contract
* Attempt to be "too clever" with exemptions

---

## Document Control

**Version:** 1.0  
**Date:** January 2026  
**Last Updated:** January 13, 2026  
**Next Review:** Quarterly or upon material regulatory/technical developments

**Maintained By:** Smart Contract Architect / Chief Technology Officer / General Counsel

**Integration:** This document integrates with:
* Legal, CPA & Smart Contract Framework (`legal-cpa-smart-contract-framework.md`)
* Smart Contract Deployment Checklist (`smart-contract-deployment-checklist.md`)
* Control Matrix (`control-matrix.md`)

---

> **Disclaimer:** These cheat sheets are provided for informational purposes only and do not constitute legal, technical, or compliance advice. Each smart contract deployment requires independent legal review by qualified securities counsel, comprehensive security audit by reputable auditors, and risk assessment by internal compliance teams. The examples provided are illustrative only and should not be used in production without proper legal and technical review. Smart contract behavior should always be subordinate to legal agreements. Consult qualified professionals before deploying any smart contract in a production environment.
