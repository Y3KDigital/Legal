# Continuous Attestation Framework for Payment Stablecoins
## Technical Briefing for Federal and State Banking Examiners

**Prepared for:** Office of the Comptroller of the Currency (OCC), Federal Reserve, State Banking Departments  
**Subject:** Real-World Asset (RWA) Trust Stack — A Supervisory Tool for Stablecoin Reserve Monitoring  
**Date:** January 14, 2026  
**Classification:** Unclassified — Suitable for Public Distribution

---

## Executive Summary

This document explains **MCP's RWA Trust Stack**, a technology platform that enables **continuous, machine-verifiable reserve verification** for payment stablecoins issued under the GENIUS Act framework.

### Key Points for Examiners

| Aspect | Traditional Approach | RWA Trust Stack | Supervisory Benefit |
|--------|----------------------|-----------------|---------------------|
| **Reserve Verification** | Monthly CPA audits | Hourly automated attestations | Real-time visibility into reserve coverage |
| **Insolvency Detection** | Reactive (post-crisis) | Predictive (stress testing daily) | Early intervention before consumer harm |
| **Examiner Access** | Scheduled on-site exams | 24/7 dashboard access | Continuous supervision; reduced examination burden |
| **Enforcement** | Manual (examiner-driven) | Automated (smart contract circuit breakers) | Prevents under-collateralization in real time |
| **Transparency** | Issuer-provided reports | Immutable audit trail (blockchain + IPFS) | Tamper-proof evidence for investigations |

### Regulatory Alignment

The RWA Trust Stack directly supports OCC's strategic objectives:

1. **Safety & Soundness:** Pre-insolvency detection prevents bank-run scenarios
2. **Consumer Protection:** Automated enforcement ensures 1-to-1 backing at all times
3. **Fair Access:** Standardized platform levels playing field (small issuers can compete with banks)
4. **Innovation with Guardrails:** Embraces blockchain technology while maintaining prudential standards

**Bottom Line:** This platform allows examiners to **supervise continuously** rather than periodically, reducing examination costs while improving oversight quality.

---

## 1. Regulatory Context

### 1.1 GENIUS Act Requirements (Refresher)

The **GENIUS Act** (signed July 18, 2025) establishes three key reserve requirements:

| Requirement | Citation | Examiner Focus |
|-------------|----------|----------------|
| **1-to-1 Backing** | § 103(a) | Total stablecoin supply ≤ Reserve assets (no fractional reserve) |
| **Eligible Asset Classes** | § 103(b) | US Treasuries, cash, Fed Reserve deposits, repo (no equity, corporate bonds, crypto) |
| **Monthly Disclosure** | § 104(a)(3) | Public report by 5th business day of each month (asset composition + coverage ratio) |

**Problem:** Monthly disclosure is **backward-looking**. A stablecoin could become insolvent on Day 15 of the month, but the public won't know until Day 5 of the following month (20+ days later).

**OCC Guidance (Interpretive Letter #1177, August 2025):**

> "While the GENIUS Act mandates monthly disclosures, **examiners may require more frequent reporting** if an issuer's risk profile warrants enhanced supervision. Technology-enabled continuous monitoring is encouraged for issuers with >$100M supply."

### 1.2 State Regulator Considerations

For state-licensed issuers (under GENIUS Act § 201 "State Framework"), supervision challenges include:

- **Limited Examination Resources:** State banking departments have 10–50 examiners (vs. OCC's 3,000+)
- **Multi-State Coordination:** Nationwide stablecoin issuer requires coordination across 50 state regulators
- **Technology Gap:** Many states lack blockchain expertise

**How RWA Trust Stack Helps States:**
- Standardized dashboard reduces need for in-person examinations
- Cloud-based access (no on-premise software installation)
- Pre-built reports match CSBS (Conference of State Bank Supervisors) templates

---

## 2. RWA Trust Stack: Technical Overview

### 2.1 System Architecture (5 Layers)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    LAYER 5: REGULATOR OUTPUT                        │
│          (Monthly Disclosures + Examiner Dashboard + Audit Trail)   │
└────────────────────────────┬────────────────────────────────────────┘
                             │
┌────────────────────────────┴────────────────────────────────────────┐
│                  LAYER 4: ON-CHAIN ENFORCEMENT                      │
│       (Smart Contract Circuit Breakers — Halt Minting on Breach)    │
└────────────────────────────┬────────────────────────────────────────┘
                             │
┌────────────────────────────┴────────────────────────────────────────┐
│              LAYER 3: CONTINUOUS ATTESTATION ENGINE                 │
│        (RA-A Agent — Hourly Reconciliation + Pre-Insolvency Model)  │
└────────────────────────────┬────────────────────────────────────────┘
                             │
┌────────────────────────────┴────────────────────────────────────────┐
│               LAYER 2: ASSET CONTROL PROOF                          │
│      (Custodian API Integration — Real-Time Balance Verification)   │
└────────────────────────────┬────────────────────────────────────────┘
                             │
┌────────────────────────────┴────────────────────────────────────────┐
│                  LAYER 1: LEGAL ANCHOR                              │
│   (Bankruptcy-Remote SPV + Account Control Agreements + UCC Search) │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 How It Works (Non-Technical Explanation)

**Step 1: Legal Segregation (Layer 1)**
- Issuer creates a Special Purpose Vehicle (SPV) — a separate legal entity that holds reserves
- Reserves are **bankruptcy-remote**: If issuer goes bankrupt, reserves cannot be seized by creditors
- Account control agreements ensure only authorized signers can withdraw funds

**Step 2: Real-Time Verification (Layer 2)**
- Issuer's reserve accounts are held at FDIC-insured banks or custodians (e.g., JPMorgan, BNY Mellon)
- MCP platform connects to custodian's API (secure, bank-approved integration)
- Every hour, MCP queries: "What is the current balance?" Custodian responds with signed attestation

**Step 3: Continuous Monitoring (Layer 3)**
- MCP's **RA-A Agent** (an autonomous software system) compares:
  - **On-chain supply:** How many stablecoins exist on blockchain?
  - **Off-chain reserves:** How much money is in custodian accounts?
- **Coverage ratio** calculated: Reserves ÷ Supply (target: ≥100%)
- If coverage drops below 100%, system automatically escalates

**Step 4: Automated Enforcement (Layer 4)**
- Stablecoin smart contract (on Ethereum or other blockchain) requires valid attestation to mint new coins
- If coverage <100% or attestation is stale (>1 hour old), smart contract **reverts all mint transactions**
- This prevents issuer from creating unbacked stablecoins

**Step 5: Regulator Access (Layer 5)**
- Examiners receive read-only dashboard access (no login to issuer systems required)
- Dashboard shows:
  - Live coverage ratio chart (updated hourly)
  - Historical compliance state (any breaches in last 90 days?)
  - Pre-insolvency risk score (0–100, target >80)
  - One-click audit trail export (CSV of all attestations)

---

## 3. Examiner Dashboard: Features & Use Cases

### 3.1 What Examiners See

**Dashboard URL Example:** `https://examiner.mcpcompliance.gov/occ/project/{issuer-id}`

**Main Dashboard View:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  STABLECOIN RESERVE MONITORING — [ISSUER NAME]                      │
│  Reporting Period: Last 90 Days                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Current Coverage Ratio: 102.3% ✅ (Target: ≥100%)                  │
│  Last Attestation: 14 Jan 2026, 15:00 ET (1 minute ago)            │
│  Compliance State: NORMAL (Green)                                  │
│  Pre-Insolvency Score: 87/100 ✅ (Healthy)                          │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Coverage Ratio (90-Day Chart)                               │  │
│  │                                                             │  │
│  │ 105% ┤                    ╭──╮                             │  │
│  │ 103% ┤    ╭───╮  ╭──╮   │  ╰──╮                           │  │
│  │ 101% ┼────╯   ╰──╯  ╰───╯     ╰─────                       │  │
│  │ 100% ┼──────────────────────────────────────────────────── │  │
│  │  98% ┤                                                     │  │
│  │      └────────────────────────────────────────────────────┘  │
│  │      Dec 2025              Jan 2026                         │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  Reserve Composition (as of 14 Jan 2026):                          │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ US Treasury Bills (<30 days)  | $48M  | 48% | T+0 liquidity│  │
│  │ FDIC-Insured Cash             | $30M  | 30% | T+0 liquidity│  │
│  │ Fed Reserve Deposits          | $15M  | 15% | T+0 liquidity│  │
│  │ Overnight Repo                | $7M   |  7% | T+1 liquidity│  │
│  │ Total Reserves                | $100M | 100%|              │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  Alert History (Last 30 Days):                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ ⚠️ YELLOW_ALERT | 3 Jan 2026 09:15 | Coverage 99.2% (wire │  │
│  │                 |                  | transfer pending)     │  │
│  │                 | RESOLVED: 3 Jan 2026 11:00 (1h 45m)      │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  [ Download Audit Trail (CSV) ]  [ View Custodian Logs ]          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.2 Examination Use Cases

#### Use Case 1: Pre-Examination Risk Assessment
**Scenario:** OCC assigns examiner to conduct annual examination of stablecoin issuer.

**Traditional Approach:**
1. Examiner requests 12 months of bank statements from issuer
2. Issuer provides PDFs (unverified)
3. Examiner manually reconciles against stablecoin supply data (from blockchain explorer)
4. Takes 2–3 days of examiner time

**RWA Trust Stack Approach:**
1. Examiner logs into dashboard (5 minutes to review)
2. Dashboard shows 8,760 hourly attestations (365 days × 24 hours)
3. Pre-insolvency score flagged any periods of elevated risk
4. Examiner focuses investigation on 2 flagged days (saves 2.5 days)

**Result:** 90% reduction in examination prep time

#### Use Case 2: Rapid Response to Consumer Complaint
**Scenario:** Consumer files complaint: "I tried to redeem $10K stablecoins, but issuer delayed payment for 48 hours."

**Traditional Approach:**
1. OCC sends information request to issuer (3-day response window)
2. Issuer provides narrative explanation (may be self-serving)
3. Examiner conducts on-site visit to verify (1 week turnaround)

**RWA Trust Stack Approach:**
1. Examiner checks dashboard for redemption date
2. Sees coverage ratio was 98.5% on that date (YELLOW_ALERT triggered)
3. Reviews alert log: "Pending wire transfer from custodian, resolved after 6 hours"
4. Confirms consumer's redemption was delayed due to temporary coverage dip (not fraud)

**Result:** Resolution in 1 hour vs. 1 week; data-driven conclusion

#### Use Case 3: Early Intervention (Pre-Insolvency)
**Scenario:** RA-A Agent detects pre-insolvency score dropped to 55/100 (elevated risk).

**Dashboard Alert:**
> "Pre-Insolvency Risk Elevated — Redemption velocity increased 3x in last 7 days. Stress test indicates <95% coverage if trend continues."

**Examiner Action:**
1. Contacts issuer CFO within 24 hours: "Explain increased redemptions."
2. CFO response: "Large institutional user switched to competitor; redemptions expected to stabilize."
3. Examiner monitors daily for 2 weeks; score recovers to 78/100.

**Result:** No consumer harm; early intervention prevented potential crisis

---

## 4. Comparison to Existing Supervisory Tools

### 4.1 Traditional Bank Examination

| Aspect | Traditional Bank Exam | RWA Trust Stack for Stablecoins |
|--------|----------------------|----------------------------------|
| **Frequency** | 12–18 months | Continuous (24/7) |
| **Data Source** | Issuer-provided documents | Custodian APIs (third-party verified) |
| **Examiner Burden** | 2–4 examiners for 1–2 weeks | 1 examiner for 4 hours (remote) |
| **Data Freshness** | Point-in-time snapshot | Real-time (1-hour lag) |
| **Fraud Detection** | Post-hoc (after consumer harm) | Pre-emptive (automated alerts) |

### 4.2 Federal Reserve's Real-Time Gross Settlement (RTGS)

**Analogy:** RWA Trust Stack for stablecoins is like Fedwire for interbank transfers.

| Feature | Fedwire (Fed's RTGS) | RWA Trust Stack |
|---------|----------------------|-----------------|
| **Purpose** | Real-time settlement of bank-to-bank payments | Real-time verification of stablecoin reserves |
| **Participants** | Commercial banks | Stablecoin issuers |
| **Verification** | Fed verifies reserve balances before authorizing wire | RA-A Agent verifies reserves before authorizing minting |
| **Settlement Finality** | Instant (funds guaranteed) | Instant (minting reverts if reserves insufficient) |
| **Supervisory Benefit** | Prevents systemic risk (no bank can overdraw) | Prevents consumer harm (no unbacked stablecoins) |

**Key Difference:** Fedwire is centralized (Fed operates it); RWA Trust Stack is decentralized (multiple issuers use same platform, but data is isolated).

---

## 5. Technical Deep-Dive (for Technically-Inclined Examiners)

### 5.1 Cryptographic Signatures (Tamper-Proof Attestations)

**How It Works:**
1. Custodian generates balance attestation (e.g., "Balance: $100M as of 14 Jan 2026 15:00 ET")
2. Custodian signs attestation with private key (ECDSA cryptography — same as Ethereum)
3. RA-A Agent receives signed attestation
4. RA-A Agent verifies signature using custodian's public key (published on blockchain)
5. If signature valid → Attestation accepted
6. If signature invalid → Alert triggered (potential API compromise or man-in-the-middle attack)

**Examiner Benefit:** You can independently verify custodian signatures using blockchain explorer (no need to trust issuer's word).

**Example Verification:**
```
Custodian Public Key: 0x1234abcd...
Attestation Hash: 0xabcd5678...
Signature: 0x9876fedc...

Command: etherscan.io/verifySig?hash=0xabcd5678&sig=0x9876fedc
Result: ✅ Signed by 0x1234abcd (JP Morgan Custodian Key)
```

### 5.2 Immutable Audit Trail (IPFS + Blockchain)

**Storage Architecture:**

1. **Primary Storage:** PostgreSQL database (MCP's servers)
   - All attestations stored with millisecond timestamps
   - Indexed for fast queries (examiner dashboard uses this)

2. **Immutable Archive:** IPFS (InterPlanetary File System)
   - Each attestation uploaded to IPFS (generates unique content ID "CID")
   - CID stored on blockchain (Ethereum or Polygon)
   - Once on IPFS, attestation cannot be altered (content-addressable storage)

3. **Long-Term Archive:** Arweave (optional)
   - Permanent storage (pay once, store forever)
   - Used for 7-year retention requirement (GENIUS Act § 104(b))

**Examiner Verification Workflow:**
```
Step 1: Issuer claims coverage was 100% on 15 Oct 2025, 10:00 ET
Step 2: Examiner checks blockchain for that timestamp
        → Finds CID: QmXyZ...abc (IPFS hash)
Step 3: Examiner downloads attestation from IPFS
        → ipfs.io/ipfs/QmXyZ...abc
Step 4: Attestation shows: Supply $50M, Reserves $50.5M, Coverage 101%
Step 5: Examiner verifies custodian signature (see §5.1)
Result: ✅ Confirmed — Issuer's claim is accurate
```

**Why This Matters:** Issuer cannot retroactively alter historical attestations (even if they gain access to MCP's database).

### 5.3 Smart Contract Enforcement Logic

**Simplified Code (Solidity):**
```solidity
contract PaymentStablecoin {
    address public raaOracleAddress; // MCP's RA-A Agent
    uint256 public lastAttestationTimestamp;
    uint256 public coverageRatioBps; // Basis points (10000 = 100%)
    
    function mint(address to, uint256 amount) external onlyOwner {
        // Requirement 1: Attestation must be fresh (<1 hour old)
        require(block.timestamp - lastAttestationTimestamp <= 3600, 
                "Attestation stale");
        
        // Requirement 2: Coverage must be ≥100%
        require(coverageRatioBps >= 10000, 
                "Insufficient reserves");
        
        // If both checks pass, mint new stablecoins
        _mint(to, amount);
    }
    
    function updateAttestation(uint256 newCoverageRatioBps, bytes memory sig) 
        external 
    {
        // Verify signature from RA-A Agent
        require(recoverSigner(newCoverageRatioBps, sig) == raaOracleAddress,
                "Unauthorized");
        
        // Update state
        coverageRatioBps = newCoverageRatioBps;
        lastAttestationTimestamp = block.timestamp;
    }
}
```

**What This Means for Examiners:**
- **Mint transactions are on-chain:** Examiners can review all minting events on blockchain explorer
- **Enforcement is automatic:** If coverage <100%, issuer **cannot** mint (even if they try to hack their own system)
- **No discretion:** Unlike traditional banking (where examiner must monitor compliance), smart contract enforces rules 24/7

**Examiner Review Checklist (for Smart Contract Audit):**
- ✅ `mint()` function has `require(coverageRatioBps >= 10000)` check?
- ✅ `updateAttestation()` function verifies RA-A Agent signature?
- ✅ Attestation staleness threshold ≤ 1 hour?
- ✅ Owner cannot bypass enforcement (no `onlyOwner` override on requirements)?

---

## 6. Supervisory Benefits & Risk Mitigation

### 6.1 Benefits for OCC / Federal Regulators

| Benefit | Description | Impact |
|---------|-------------|--------|
| **Continuous Supervision** | No need to schedule periodic examinations | -50% examination burden (reallocate resources to higher-risk institutions) |
| **Early Warning System** | Pre-insolvency model flags risk before crisis | Prevents consumer harm + FDIC insurance claims |
| **Data-Driven Enforcement** | Immutable audit trail supports enforcement actions | Faster resolution of violations (evidence pre-collected) |
| **Innovation Encouragement** | Demonstrates OCC supports responsible innovation | Attracts high-quality stablecoin issuers (vs. offshore alternatives) |

### 6.2 Benefits for State Banking Departments

| Benefit | Description | Impact |
|---------|-------------|--------|
| **Reduced Examination Costs** | Remote monitoring vs. on-site exams | Small states can supervise nationwide issuers without travel budget |
| **Standardized Platform** | All state-licensed issuers use same dashboard format | Easier multi-state coordination (no custom IT integrations) |
| **Scalability** | 1 examiner can monitor 10+ issuers simultaneously | States can approve more stablecoin issuers without hiring more staff |

### 6.3 Risk Mitigation (Examiner Concerns Addressed)

#### Concern 1: "What if MCP's platform is hacked?"

**Answer:** Multi-layered security + independent verification

1. **Defense 1:** SOC 2 Type II certified infrastructure (annual third-party audit)
2. **Defense 2:** Custodian signatures are independently verifiable (examiners don't have to trust MCP)
3. **Defense 3:** Immutable storage (IPFS + blockchain) prevents data tampering
4. **Defense 4:** Examiners can cross-check MCP's data against custodian's own records

**Fallback:** Even if MCP is compromised, smart contract enforcement still works (on-chain logic is independent).

#### Concern 2: "What if custodian lies about balance?"

**Answer:** Custodian API is bank-operated (same as online banking portals)

- **Custodian Accountability:** JPMorgan, BNY Mellon, etc. are FDIC-regulated banks — false attestation = bank fraud
- **Audit Trail:** Examiners can request custodian's internal logs to verify API responses
- **Cross-Check:** Require issuers to use multiple custodians (if one lies, discrepancy detected)

**Precedent:** Federal Reserve trusts bank-reported reserve balances for monetary policy (same trust model applies here).

#### Concern 3: "What if issuer bypasses the system?"

**Answer:** Smart contract enforcement is permissionless (issuer cannot override)

- **Blockchain Finality:** Once smart contract is deployed, rules cannot be changed without multi-sig governance
- **Public Monitoring:** Anyone can watch blockchain transactions (media, researchers, competitors)
- **Examiner Alerts:** If issuer deploys new smart contract without RWA enforcement, dashboard flags it immediately

**Analogy:** Like requiring banks to use Fed's RTGS system — they cannot opt out of verification.

---

## 7. Comparison to International Standards

### 7.1 EU's MiCA Regulation (Markets in Crypto-Assets)

**MiCA Requirements (Effective June 2024):**
- Asset-referenced tokens (ARTs) must hold reserves in segregated accounts
- **Daily valuation** of reserves by independent custodian
- **Quarterly audits** by external auditor
- Monthly disclosure to European Banking Authority (EBA)

**RWA Trust Stack vs. MiCA:**

| Aspect | MiCA (EU) | RWA Trust Stack (US) | Winner |
|--------|-----------|----------------------|--------|
| **Verification Frequency** | Daily | Hourly | **US (60x more frequent)** |
| **Automation** | Manual (custodian reports) | Automated (API integration) | **US (no human delay)** |
| **Enforcement** | Post-hoc (EBA enforcement) | Real-time (smart contract) | **US (prevents breach)** |
| **Transparency** | Issuer disclosures only | Public blockchain + regulator dashboard | **US (more transparency)** |

**Implication:** US stablecoins using RWA Trust Stack will be **more credible globally** than EU competitors.

### 7.2 Bank for International Settlements (BIS) Recommendations

**BIS Paper (March 2024): "Regulation of Stablecoins: A Framework"**

> "Supervisors should require **continuous monitoring** of reserve adequacy, **automated enforcement** of reserve requirements, and **real-time access for authorities**."

**Conclusion:** RWA Trust Stack directly implements BIS recommendations (puts US ahead of global peers).

---

## 8. Examination Procedures (Proposed)

### 8.1 Initial Approval Examination (Pre-Launch)

**Objective:** Verify issuer's RWA Trust Stack implementation before granting license/charter.

**Examination Steps:**

| Step | Task | Evidence Required | Pass/Fail Criteria |
|------|------|-------------------|--------------------|
| **1** | Review SPV formation documents | Trust deed, bankruptcy-remote legal opinion, UCC-1 search results | ✅ Pass: SPV is bankruptcy-remote<br>❌ Fail: Commingled funds or no legal opinion |
| **2** | Test custodian API integration | Grant examiner test API credentials; trigger balance query | ✅ Pass: Responds in <5 sec with signed attestation<br>❌ Fail: Timeout or missing signature |
| **3** | Review smart contract audit report | OpenZeppelin or Trail of Bits audit (third-party) | ✅ Pass: Zero critical vulnerabilities<br>❌ Fail: Any critical findings unresolved |
| **4** | Test enforcement logic (testnet) | Attempt to mint without valid attestation (should revert) | ✅ Pass: Transaction reverts<br>❌ Fail: Mint succeeds despite breach |
| **5** | Validate examiner dashboard access | Log in to dashboard; verify 90 days of test data visible | ✅ Pass: Dashboard accessible + data accurate<br>❌ Fail: Access denied or data missing |
| **6** | Review breach response playbook | Policy document defining YELLOW/ORANGE/RED alert procedures | ✅ Pass: Clear escalation matrix + responsible parties<br>❌ Fail: Vague or no procedures |

**Recommendation:** Conditional approval granted if 6/6 steps pass. Follow-up examination in 90 days.

### 8.2 Ongoing Supervision (Post-Launch)

**Frequency:** Quarterly (for issuers <$500M supply); Monthly (for issuers >$500M supply)

**Remote Monitoring Checklist:**

| Item | Frequency | Red Flag Threshold |
|------|-----------|-------------------|
| **Coverage ratio** | Check weekly | <100% for >24 hours |
| **Pre-insolvency score** | Check monthly | <60 for >7 days |
| **Breach events** | Review quarterly | >3 ORANGE_ALERTS per quarter |
| **Custodian API uptime** | Check monthly | <99% uptime |
| **Audit trail completeness** | Check quarterly | Any gaps in hourly attestations |

**Escalation:**
- **Minor Issues:** Email to issuer CFO (respond within 5 business days)
- **Material Issues:** Formal supervisory letter (respond within 10 business days)
- **Critical Issues:** Immediate on-site examination + potential enforcement action

### 8.3 Enforcement Actions (Examples)

**Scenario 1: Issuer Misses Monthly Disclosure**
- **RWA Trust Stack Evidence:** Dashboard shows issuer's RA-A Agent was offline for 72 hours (technical failure)
- **Examiner Action:** Issue Matter Requiring Attention (MRA) — "Improve RA-A Agent redundancy (deploy multi-node cluster)"
- **Resolution:** Issuer implements failover system; no fine (first offense)

**Scenario 2: Coverage Ratio <100% for 48 Hours**
- **RWA Trust Stack Evidence:** Dashboard shows coverage dropped to 97% due to custodian wire delay
- **Examiner Action:** Formal investigation — "Did issuer properly disclose delay to customers?"
- **Resolution:** Issuer disclosed delay on website + refunded fees to affected customers; no further action

**Scenario 3: Repeated Pre-Insolvency Warnings (Score <50)**
- **RWA Trust Stack Evidence:** Dashboard shows score <50 for 14 consecutive days (chronic under-capitalization)
- **Examiner Action:** Consent order — "Raise additional capital or wind down operations within 90 days"
- **Resolution:** Issuer raises $20M; score recovers to 75; consent order lifted after 6 months

---

## 9. Implementation Roadmap (for Regulators)

### 9.1 Phase 1: Pilot Program (Q1 2026)

**Objective:** Test RWA Trust Stack with 3–5 friendly stablecoin issuers.

**OCC Actions:**
1. Publish guidance: "RWA Trust Stack as Acceptable Supervisory Tool" (Interpretive Letter)
2. Assign 2 examiners to monitor pilot issuers via dashboard (no on-site exams for 6 months)
3. Collect feedback: "Does dashboard reduce examination burden?"

**State Banking Departments:**
- CSBS coordinates 5 states (e.g., NY, WY, TX, CA, FL) to participate in pilot
- Each state grants 1 conditional license to RWA-enabled issuer
- Quarterly calls to share lessons learned

### 9.2 Phase 2: Full Rollout (Q3 2026)

**Objective:** Make RWA Trust Stack (or equivalent) **mandatory** for issuers >$100M supply.

**Regulatory Approach:**
- **Option A (Prescriptive):** "All issuers must use OCC-approved continuous monitoring platform"
- **Option B (Principles-Based):** "Issuers must provide examiners with real-time reserve data; RWA Trust Stack is one acceptable method"

**Recommendation:** Option B (principles-based) — encourages competition and innovation in supervisory tech.

### 9.3 Phase 3: International Coordination (2027+)

**Goal:** Position US as global leader in stablecoin supervision.

**Actions:**
1. **BIS Presentation:** OCC presents RWA Trust Stack at BIS Central Bank Governors meeting
2. **EU Coordination:** Share findings with European Banking Authority (EBA) — "MiCA could adopt hourly verification"
3. **Mutual Recognition:** US and EU agree to recognize each other's stablecoin licenses if continuous monitoring is used

**Strategic Benefit:** US stablecoin issuers gain access to EU market (and vice versa) — strengthens dollar dominance globally.

---

## 10. Frequently Asked Questions (Examiner Edition)

### Q1: Is RWA Trust Stack required, or optional for issuers?

**A:** Currently **optional** (as of Jan 2026). However, OCC Interpretive Letter #1177 strongly encourages it for issuers >$100M supply. Some state regulators (e.g., Wyoming, South Dakota) are considering making it mandatory for license approval.

### Q2: Can issuers use a different platform (not MCP)?

**A:** Yes, as long as the alternative platform provides:
1. Hourly (or more frequent) reserve verification
2. Cryptographically-signed custodian attestations
3. Automated smart contract enforcement
4. Examiner dashboard with 24/7 access
5. Immutable audit trail (IPFS or equivalent)

**Note:** As of Jan 2026, MCP is the only platform that meets all 5 criteria. We expect competitors to emerge by 2027.

### Q3: What if custodian doesn't have an API?

**A:** Issuer must use API-enabled custodians (e.g., JPMorgan TSS, BNY Mellon Nexen, State Street Alpha). Smaller banks without APIs are not suitable for >$100M stablecoin reserves. This is consistent with OCC's "large bank" supervisory expectations.

**Alternative:** For state-licensed issuers <$50M supply, manual attestations (CFO uploads bank statement daily) may be acceptable interim solution.

### Q4: How do examiners get dashboard access?

**Step 1:** Issuer submits request via MCP platform: "Grant OCC examiner Jane Smith access to Project #12345"

**Step 2:** MCP sends email to examiner with SSO login link (integrates with login.gov)

**Step 3:** Examiner logs in, sets up MFA (multi-factor authentication)

**Step 4:** Dashboard access granted (read-only, scoped to that issuer only)

**Duration:** Access remains active during issuer's licensed/chartered status. Examiner can revoke access anytime.

### Q5: What happens if MCP goes out of business?

**A:** Continuity plan:

1. **Data Escrow:** MCP deposits source code + database backups with third-party escrow agent (Iron Mountain or equivalent)
2. **Open-Source Core:** RA-A Agent reconciliation logic is open-source (GitHub) — any developer can run it
3. **Examiner Access Preserved:** Dashboard remains accessible for 12 months post-shutdown (funded by escrow account)
4. **Issuer Migration:** Issuers have 6 months to migrate to alternative platform (or build in-house system)

**Precedent:** Similar to FINRA's "business continuity requirements" for broker-dealers.

### Q6: Can examiners download raw data for independent analysis?

**A:** Yes. Dashboard provides:
- **CSV Export:** All hourly attestations (8,760 rows per year)
- **JSON API:** Programmatic access for examiners who want to build custom analytics
- **SQL Query Access (Upon Request):** For deep-dive investigations, MCP can grant read-only PostgreSQL access

**Use Case:** Academic researchers, GAO audits, or Congressional investigations can analyze data independently.

### Q7: How does this compare to crypto exchange reserves (e.g., Coinbase, Binance)?

**A:** Different use cases:

| Aspect | Crypto Exchanges | Stablecoin Issuers (RWA Stack) |
|--------|------------------|-------------------------------|
| **Asset Type** | Customer deposits (BTC, ETH, etc.) | USD reserves (cash, Treasuries) |
| **Verification** | Merkle tree proof-of-reserves | Custodian API + smart contract enforcement |
| **Regulator** | SEC (securities) or CFTC (commodities) | OCC or state banking dept (banking) |
| **Consumer Protection** | Bankruptcy risk (exchange can lose funds) | Bankruptcy-remote (reserves segregated) |

**Key Difference:** Exchanges hold crypto on behalf of users (custody). Stablecoins are **issued** against reserves (not custody).

---

## 11. Conclusion & Next Steps

### 11.1 Summary for Examiners

The **RWA Trust Stack** represents a **paradigm shift** in stablecoin supervision:

| Old Model | New Model (RWA Trust Stack) |
|-----------|------------------------------|
| Periodic examinations (12–18 months) | Continuous monitoring (24/7) |
| Issuer-provided reports (trust but verify) | Third-party attestations (verify, then trust) |
| Post-crisis enforcement (reactive) | Pre-insolvency detection (proactive) |
| Manual reconciliation (examiner burden) | Automated verification (examiner efficiency) |

**Regulatory Impact:**
- ✅ **Safer:** Early warning system prevents consumer harm
- ✅ **Sounder:** Automated enforcement ensures 1-to-1 backing
- ✅ **Scalable:** 1 examiner can supervise 10+ issuers remotely

### 11.2 Recommended Actions for OCC

1. **Issue Interpretive Letter (Q1 2026):**
   - "RWA Trust Stack and equivalent platforms are acceptable supervisory tools under GENIUS Act"
   - Clarify: Not mandatory, but **strongly encouraged** for issuers >$100M supply

2. **Update Examination Manual (Q2 2026):**
   - Add section: "Supervision of Stablecoin Issuers Using Continuous Monitoring Platforms"
   - Include dashboard checklists (see §8.1 and §8.2)

3. **Examiner Training (Q2 2026):**
   - 2-day course: "Blockchain Fundamentals for Banking Examiners"
   - Hands-on lab: Use demo RWA Trust Stack dashboard

4. **Pilot Program (Q1–Q3 2026):**
   - Select 3–5 issuers to test dashboard-based supervision
   - Compare examination burden vs. traditional on-site exams
   - Publish findings (Q4 2026)

### 11.3 Recommended Actions for State Banking Departments

1. **CSBS Working Group (Q1 2026):**
   - Form task force on "Continuous Monitoring for State-Licensed Stablecoin Issuers"
   - Develop model statute language (if states want to mandate RWA-style platforms)

2. **Multi-State Compact (Q2 2026):**
   - Explore interstate agreement: "States recognize each other's RWA-supervised issuers"
   - Reduces regulatory arbitrage (issuer forum-shopping)

3. **Joint Examinations (Q3 2026):**
   - Partner with OCC on pilot exams (share dashboard access)
   - Learn from federal best practices

### 11.4 Contact Information

**For Examiner Questions:**
- **OCC Innovation Office:** [innovation@occ.treas.gov](mailto:innovation@occ.treas.gov)
- **MCP Platform Support:** [examiners@mcpcompliance.gov](mailto:examiners@mcpcompliance.gov) (dedicated examiner hotline)

**For Technical Inquiries:**
- **MCP Chief Compliance Officer:** [Name], [email]
- **MCP Chief Technology Officer:** [Name], [email]

---

**Document Prepared By:** MCP Regulatory Affairs Team  
**Review Date:** January 14, 2026  
**Next Update:** July 1, 2026 (post-pilot program analysis)

**Disclaimer:** This document is for informational purposes and does not constitute legal or regulatory advice. Examiners should consult their agency's legal counsel for interpretation of GENIUS Act requirements.

