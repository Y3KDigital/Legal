# RWA Standard Operating Procedures: Execution Playbooks

> **Scope Notice**
>
> These playbooks document standard operating procedures observed in institutional RWA tokenization projects as of January 2026. They are provided as execution guides, not legal advice. Each implementation requires independent legal analysis, regulatory review, and risk assessment based on specific circumstances.

## Purpose

This document provides step-by-step execution playbooks for tokenizing real-world assets across major asset classes. Each playbook follows the eight-phase standard operating procedure used by institutional market participants.

---

## Universal Eight-Phase Framework

All RWA tokenization projects follow this structure:

**Phase 0:** Asset Eligibility & Tokenization Suitability  
**Phase 1:** Legal Wrapper Selection  
**Phase 2:** Custody, Control & Settlement Design  
**Phase 3:** Compliance Gating (KYC/AML + Investor Restrictions)  
**Phase 4:** Token Model & Issuance  
**Phase 5:** Attestation, Audit & Proof  
**Phase 6:** Secondary Transfer Controls & Market Infrastructure  
**Phase 7:** Ongoing Operations  
**Phase 8:** Redemption / Wind-Down  

---

## Playbook 1: Treasuries / Money Market Funds

### Target Asset Class

* U.S. Treasury securities (bills, notes, bonds)
* Government money market funds (2a-7 compliant)
* Short-duration government debt

### Phase 0: Asset Eligibility

**Evaluation Criteria:**

- [ ] **Transferability:** U.S. Treasuries freely transferable through DTC/Fed system
- [ ] **Valuation:** Daily mark-to-market pricing available (Bloomberg, Reuters)
- [ ] **Liquidity:** Deep secondary market ensures exit liquidity
- [ ] **Custody:** Established qualified custodian infrastructure
- [ ] **Cash Flows:** Predictable (interest payments, maturity proceeds)

**Fatal Flaws (do not proceed if present):**
* Restricted or illiquid Treasury securities
* Inability to obtain qualified custodian
* Unclear tax treatment for token holders

**Outcome:** Treasuries/MMFs are highly suitable for tokenization

---

### Phase 1: Legal Wrapper Selection

**Recommended Structure:** Fund wrapper (most common)

**Decision Matrix:**

| Structure | Pros | Cons | Best For |
|-----------|------|------|----------|
| **Registered Investment Company** | SEC-registered, institutional credibility | Heavy compliance burden | Large scale (>$50M AUM) |
| **Private Fund (3(c)(7))** | Lighter regulation, qualified purchasers | Limited to 2,000 QPs | Institutional only |
| **SPV Note** | Simple, direct exposure | Less familiar to investors | Specific use cases |

**Most Common Choice:** Private fund under Investment Company Act § 3(c)(7)

**Key Documents:**

1. **Private Placement Memorandum (PPM)**
   - Fund strategy and objectives
   - Risk factors
   - Fee structure
   - Transfer restrictions
   - Tax considerations

2. **Limited Partnership Agreement or LLC Operating Agreement**
   - Governance rights
   - Capital commitments
   - Distributions
   - Redemption terms

3. **Subscription Agreement**
   - Investor representations (accredited, QP status)
   - Transfer restrictions
   - AML/KYC requirements

**Timeline:** 6-12 weeks for fund formation and documentation

---

### Phase 2: Custody, Control & Settlement

**Custody Requirements:**

- [ ] Select qualified custodian under Investment Advisers Act Rule 206(4)-2
- [ ] Establish custody account in fund name
- [ ] Implement daily reconciliation procedures
- [ ] Obtain SIPC coverage (if broker-dealer custodian)
- [ ] Consider excess insurance (beyond SIPC limits)

**Common Custodians:**
* Major bank trust departments
* Prime brokers (for funds)
* Specialized digital asset custodians (with traditional asset capabilities)

**Settlement Model:**

**Target:** Delivery vs Payment (DvP) with atomic settlement
* Token transfer and cash payment occur simultaneously
* No counterparty risk during settlement
* Requires smart contract integration with payment system

**Current Reality:** Most implementations use:
* Traditional custodian settlement (T+1)
* Token mint/burn upon confirmed custody transfer
* Periodic reconciliation between on-chain supply and custody holdings

**DvP Roadmap:**
1. Phase 1: Custody-backed tokens (current)
2. Phase 2: Same-day settlement with payment rails integration
3. Phase 3: Atomic DvP (target state per Project Guardian guidance)

---

### Phase 3: Compliance Gating

**KYC/AML Program:**

- [ ] Written AML policies and procedures
- [ ] AML officer designated
- [ ] Customer Identification Program (CIP)
- [ ] Sanctions screening (OFAC, UN, EU)
- [ ] Ongoing monitoring and SAR filing procedures
- [ ] Annual independent review

**Investor Qualification:**

For 3(c)(7) fund:
- [ ] Qualified Purchaser verification
  * Individuals: $5M+ in investments
  * Entities: $25M+ in investments
  * Trusts: All grantors are QPs
- [ ] Non-U.S. persons: Verify Reg S eligibility
- [ ] Bad actor disqualification check (Reg D Rule 506)

**On-Chain Enforcement:**

```
Transfer Restrictions (Smart Contract Level):
1. Allowlist: Only addresses that passed KYC can hold tokens
2. Transfer approval: Transfer agent must approve before execution
3. Jurisdiction blocks: Block transfers to sanctioned countries
4. Maximum holders: Enforce 3(c)(7) limit (2,000 QPs)
```

**Technology Solutions:**
* Chainalysis / Elliptic for sanctions screening
* Wallet attestation providers for investor verification
* Permissioned token standards (ERC-1404, ERC-1400)

---

### Phase 4: Token Model & Issuance

**Token Economics:**

* **1 token = $1 of NAV** (or 1 token = 1 fund share)
* **NAV calculated daily** (per fund administrator)
* **Minting:** New tokens issued upon subscription cash receipt
* **Burning:** Tokens destroyed upon redemption

**Technical Implementation:**

- [ ] Select blockchain (Ethereum most common for institutional)
- [ ] Deploy smart contracts (audited by reputable firm)
- [ ] Implement transfer restrictions in contract code
- [ ] Set up admin controls (pause, blocklist, emergency)
- [ ] Multi-sig controls for admin functions (2-of-3 or 3-of-5)

**Issuance Process:**

```
Primary Issuance:
1. Investor subscribes (submits subscription agreement + cash)
2. KYC/AML verification completed
3. Cash received by custodian
4. Fund administrator confirms receipt
5. Tokens minted to investor wallet address (on allowlist)
6. Confirmation sent to investor
```

**Timeline:** Subscriptions typically quarterly; minting within 5 business days of cash receipt

---

### Phase 5: Attestation, Audit & Proof

**Attestation Requirements:**

| Frequency | Attestation Type | Provider | Distribution |
|-----------|------------------|----------|--------------|
| **Daily** | Holdings reconciliation | Fund administrator | Internal only |
| **Daily** | NAV calculation | Fund administrator | Investors (via portal) |
| **Monthly** | Financial statements | Fund administrator | Investors |
| **Quarterly** | Proof-of-reserves | Independent auditor | Public (often) |
| **Annual** | Full financial audit | Big 4 accounting firm | Investors + SEC (if required) |

**Proof-of-Reserves Procedure:**

1. **Custodian Statement:** Official statement of Treasury holdings (by CUSIP)
2. **On-Chain Supply:** Query smart contract for total token supply
3. **Reconciliation:** Verify value of Treasuries ≥ NAV of tokens outstanding
4. **Independent Verification:** Auditor confirms custodian statement and on-chain data
5. **Publication:** Attestation letter published on-chain or via IPFS

**Example Format:**
```
[Auditor Name] Attestation
Date: [Date]
Fund: [Fund Name]

We have verified:
- Custodian holdings: $X in U.S. Treasuries (per statement attached)
- Token supply: Y tokens outstanding (verified on Ethereum blockchain)
- NAV per token: $Z (per fund administrator calculation)

Conclusion: Custodian holdings support token supply with X.X% coverage ratio.

[Auditor signature]
```

---

### Phase 6: Secondary Transfer Controls

**Transfer Restrictions:**

- [ ] No public trading (3(c)(7) requirement)
- [ ] Transfers only to other qualified purchasers
- [ ] Transfer agent approval required
- [ ] 2,000 QP holder limit enforced

**Permitted Secondary Transfers:**

* Investor-to-investor (both QPs, both on allowlist)
* Inheritance transfers
* Transfers to affiliates (same beneficial owner)
* Transfers pursuant to court order

**Process:**

```
Secondary Transfer:
1. Selling investor submits transfer request
2. Transfer agent verifies buyer is QP and on allowlist
3. Transfer agent approves transaction
4. On-chain transfer executes (if smart contract enforcement)
5. Cap table updated
6. Confirmations sent to both parties
```

**Market Infrastructure:**

* **No ATS/exchange trading** (would violate 3(c)(7))
* **Bulletin board** (optional): Investors post bid/ask indications
* **Periodic tender offers** (optional): Fund offers to repurchase at NAV

---

### Phase 7: Ongoing Operations

**Monthly Activities:**

- [ ] NAV calculation and distribution
- [ ] Performance reporting to investors
- [ ] Portfolio rebalancing (if active management)
- [ ] Cash management (dividends, interest payments)
- [ ] Reconciliation (custody vs on-chain)

**Quarterly Activities:**

- [ ] Financial statements to investors
- [ ] Quarterly call with investors
- [ ] Proof-of-reserves attestation
- [ ] Review of compliance program

**Annual Activities:**

- [ ] Financial audit
- [ ] AML program independent review
- [ ] Form D amendment (if applicable)
- [ ] Tax reporting (K-1s for LP, 1099s if applicable)
- [ ] Update PPM if material changes

**Corporate Actions:**

* **Interest Payments:** Reinvested or distributed per fund terms
* **Maturities:** Proceeds reinvested or distributed
* **Treasury Rollovers:** Fund manager executes per strategy

---

### Phase 8: Redemption / Wind-Down

**Redemption Process:**

**Monthly/Quarterly Redemptions:**
```
1. Investor submits redemption notice (30-90 days advance notice typical)
2. Fund administrator calculates NAV at redemption date
3. Investor sends tokens to burn address
4. Custodian wires cash to investor bank account
5. Tokens burned on-chain
6. Confirmation sent
```

**Redemption Terms:**
* **Notice Period:** 30-90 days
* **Frequency:** Quarterly typical (monthly for some MMFs)
* **Fees:** Redemption fee (0-2%) if within first year
* **Settlement:** T+3 to T+5 cash delivery

**Wind-Down Scenario:**

If fund liquidates:

1. **Notice:** 60-90 days to all investors
2. **Liquidation:** Sell all Treasuries into market
3. **Distributions:** Pro-rata cash distributions to token holders
4. **Token Burn:** All tokens burned
5. **Final Accounting:** Audited financial statements
6. **Dissolution:** Fund entity dissolved per state law

**Emergency Procedures:**

* **Gate:** Fund may suspend redemptions if liquidity insufficient (rare for Treasuries)
* **Side Pocket:** Illiquid assets segregated (not applicable for Treasuries)
* **Orderly Wind-Down:** Preserve investor value during liquidation

---

### Key Success Factors

**Critical Success Factors for Treasury/MMF Tokenization:**

1. **Qualified Custodian:** Must have custodian with institutional credibility
2. **Daily NAV:** Accurate, timely valuation is essential
3. **Regulatory Compliance:** 3(c)(7) limits and reporting must be maintained
4. **Proof-of-Reserves:** Quarterly attestations build trust
5. **Investor Communication:** Transparency drives adoption

**Common Pitfalls:**

* Underestimating compliance burden
* Inadequate reconciliation procedures
* Poor investor communication
* Unclear redemption terms
* Weak cybersecurity controls

---

## Playbook 2: Private Credit / Loan Participations

### Target Asset Class

* Senior secured loans
* Mezzanine debt
* Loan participations
* Structured credit

### Phase 0: Asset Eligibility

**Evaluation Criteria:**

- [ ] **Documentation:** Loan agreements, security interests, perfected liens
- [ ] **Servicing:** Professional loan servicer in place
- [ ] **Collateral:** Identifiable, valuable, insurable
- [ ] **Cash Flow:** Predictable payment stream (P&I schedule)
- [ ] **Transferability:** Participation or assignment permitted under loan docs

**Fatal Flaws:**
* Unclear title or security interest
* No professional servicer
* Weak or no collateral
* Borrower consent required for transfer (cannot obtain)
* Unpredictable or contingent cash flows

**Due Diligence:**

- [ ] Loan tape review (borrower, principal, rate, maturity, LTV)
- [ ] Credit analysis (borrower financials, debt service coverage ratio)
- [ ] Collateral appraisal (if secured)
- [ ] Legal review (enforceability, jurisdiction, bankruptcy issues)
- [ ] Servicer quality assessment

---

### Phase 1: Legal Wrapper Selection

**Recommended Structure:** SPV Note

**Decision Matrix:**

| Structure | Pros | Cons | Best For |
|-----------|------|------|----------|
| **SPV Note** | Simple, bankruptcy remote | Passive income only | Institutional investors |
| **Credit Fund** | Active management, diversification | Higher setup/ongoing costs | Multi-loan portfolios |
| **Participation Agreement** | Direct loan exposure | Complex administration | Single large loan |

**Most Common Choice:** SPV issues notes; SPV holds loan participations

**Key Documents:**

1. **Offering Memorandum**
   - Loan pool description
   - Waterfall and priority
   - Risk factors (credit, prepayment, default)
   - Covenants and events of default

2. **Note Purchase Agreement / Indenture**
   - Note terms (interest rate, maturity, subordination)
   - Security interest (if any)
   - Representations and warranties
   - Transfer restrictions

3. **Servicing Agreement**
   - Servicer duties (collect payments, enforce remedies)
   - Reporting requirements
   - Fees and expenses
   - Termination and replacement

4. **Subscription Agreement**
   - Investor qualifications (accredited, QP, QIB)
   - Transfer restrictions
   - Tax considerations

**Timeline:** 10-16 weeks for SPV formation, loan acquisition, and documentation

---

### Phase 2: Custody, Control & Settlement

**Custody Requirements:**

- [ ] Loan documentation held by administrative agent or trustee
- [ ] Collateral (if any) held by separate collateral agent
- [ ] Original promissory notes held in secure facility
- [ ] UCC filings perfected and maintained

**Servicing:**

- [ ] Third-party servicer engaged (non-affiliated preferred)
- [ ] Monthly payment processing and reconciliation
- [ ] Default monitoring and workout procedures
- [ ] Quarterly performance reporting to noteholders

**Common Servicers:**
* Specialized loan servicers
* Administrative agents (for syndicated loans)
* Custodian banks with servicing capabilities

**Settlement Model:**

**Primary Issuance:**
* Subscription period (30-90 days)
* Tokens issued upon funding of note purchase
* Cap table updated with token holder addresses

**Secondary Transfers:**
* **Permissioned:** Requires transfer agent approval
* **Bilateral:** Buyer and seller negotiate price
* **Settlement:** T+3 to T+7 (KYC, legal docs, payment)
* **Not DvP:** Transfers are not atomic (legal process involved)

**No Continuous Secondary Market:** Credit notes typically held to maturity

---

### Phase 3: Compliance Gating

**KYC/AML Program:**

- [ ] Same requirements as Playbook 1 (Treasury/MMF)
- [ ] Additional focus: Source of funds (high-risk asset class)
- [ ] Enhanced due diligence for PEPs and high-risk jurisdictions

**Investor Qualification:**

Private credit typically requires:

- [ ] **Accredited Investor** (minimum)
  * Income test: $200k individual, $300k joint
  * Net worth test: $1M excluding primary residence
- [ ] **Qualified Institutional Buyer (QIB)** (for Rule 144A)
  * $100M+ in securities owned and invested
- [ ] **Qualified Purchaser (QP)** (for 3(c)(7) structures)
  * $5M+ in investments (individual)

**On-Chain Enforcement:**

```
Transfer Restrictions:
1. Allowlist: Only verified accredited/QP/QIB investors
2. Transfer approval: Required for all transfers
3. Maximum holders: Enforce limits (499 for Reg D, 2000 for 3(c)(7))
4. Lock-up period: No transfers in first 12 months (typical)
```

---

### Phase 4: Token Model & Issuance

**Token Economics:**

* **1 token = $X of principal** (e.g., $1,000 per token)
* **Interest Accrual:** Tokens accrue interest per note terms
* **Principal Repayment:** Tokens redeemed as principal repaid
* **Default Impact:** Tokens may lose value if loans default

**Technical Implementation:**

- [ ] Deploy smart contracts (ERC-20 with transfer restrictions)
- [ ] Implement interest accrual logic (if on-chain)
- [ ] Set up payment distribution mechanism
- [ ] Multi-sig admin controls

**Issuance Process:**

```
1. Investor subscribes and funds via wire
2. KYC/AML verification
3. SPV receives funds and acquires loan participations
4. Closing occurs (legal docs signed)
5. Tokens minted to investor wallet
6. Cap table updated
```

**Timeline:** Issuance typically occurs in one or more closings over 90-day period

---

### Phase 5: Attestation, Audit & Proof

**Attestation Requirements:**

| Frequency | Attestation Type | Provider | Purpose |
|-----------|------------------|----------|---------|
| **Monthly** | Payment waterfall | Servicer | Confirm payments received and distributed |
| **Monthly** | Loan tape | Servicer | Current balances, delinquencies, defaults |
| **Quarterly** | Performance report | Servicer | Credit metrics, LTV, DSCR |
| **Quarterly** | Collateral valuation | Appraiser | Mark-to-market (if applicable) |
| **Annual** | Financial audit | Independent auditor | SPV financial statements |

**Proof-of-Reserves Procedure:**

1. **Servicer Report:** Statement of loan balances and payments received
2. **Bank Statement:** SPV account showing funds received from borrowers
3. **Reconciliation:** Verify loan payments = distributions to noteholders
4. **Independent Review:** Auditor confirms servicer data and bank statements
5. **Publication:** Quarterly report to noteholders (may be confidential)

**Transparency Trade-Off:**

* Credit details typically confidential (borrower names, specific terms)
* Aggregate metrics disclosed (weighted average rate, LTV, DSCR)
* Full disclosure only to qualified investors under NDA

---

### Phase 6: Secondary Transfer Controls

**Transfer Restrictions:**

- [ ] No public trading
- [ ] Transfers only to accredited/QP/QIB investors
- [ ] Transfer agent approval required
- [ ] Lock-up period (12 months typical)
- [ ] Right of first refusal (ROFR) to SPV or sponsor (common)

**Permitted Secondary Transfers:**

* Investor-to-investor (both qualified, both on allowlist)
* Estate planning transfers
* Transfers to affiliates
* Transfers pursuant to legal process

**Process:**

```
Secondary Transfer:
1. Selling investor submits transfer request
2. Buyer submits qualification documents
3. Transfer agent verifies buyer eligibility
4. ROFR notice sent to SPV/sponsor (if applicable)
5. If ROFR not exercised, transfer approved
6. Legal assignment agreement executed
7. On-chain transfer (if token-based)
8. Cap table updated
```

**Market Infrastructure:**

* **Bulletin Boards:** Some platforms facilitate investor-to-investor matches
* **Secondary Funds:** Specialized buyers of private credit secondaries
* **Tender Offers:** Sponsor may periodically offer to repurchase at discount

**Typical Discount:** Secondary trades often occur at 5-20% discount to par (illiquidity discount)

---

### Phase 7: Ongoing Operations

**Monthly Activities:**

- [ ] Payment collection from servicer
- [ ] Distribution to noteholders per waterfall
- [ ] Delinquency and default monitoring
- [ ] Cash reconciliation

**Quarterly Activities:**

- [ ] Performance reporting to noteholders
- [ ] Collateral valuation update (if applicable)
- [ ] Credit review (borrower financial statements)
- [ ] Compliance certificate from servicer

**Annual Activities:**

- [ ] Financial audit
- [ ] Tax reporting (K-1s or 1099-OID)
- [ ] AML program review
- [ ] Legal opinion update (if required)

**Corporate Actions:**

* **Prepayments:** Loan prepaid → early distribution to noteholders
* **Defaults:** Servicer pursues remedies → potential loss to noteholders
* **Extensions:** Loan maturity extended → note maturity may extend
* **Modifications:** Loan terms modified → note terms may be impacted

**Servicer Oversight:**

- [ ] Monthly servicer reports reviewed
- [ ] Annual servicer financial audit reviewed
- [ ] Backup servicer identified (business continuity)
- [ ] Servicer performance benchmarked (delinquency rates, recovery rates)

---

### Phase 8: Redemption / Wind-Down

**Redemption Process:**

**No Optional Redemption (typical):**
* Credit notes are term instruments
* Investors receive principal as loans are repaid
* No early redemption at investor option

**Scheduled Amortization:**
```
1. Borrower makes P&I payment to servicer
2. Servicer forwards payment to SPV
3. SPV distributes to noteholders per waterfall
4. Tokens remain outstanding (unless fully repaid)
5. At maturity, all principal distributed and tokens burned
```

**Default Scenario:**

If loan defaults:

1. **Notice:** Servicer notifies SPV and noteholders
2. **Remedies:** Servicer pursues collection, foreclosure, or workout
3. **Distributions:** Recoveries distributed to noteholders per waterfall
4. **Write-Down:** If loss realized, noteholder principal reduced
5. **Token Impact:** Token value decreases (no redemption at par)

**Wind-Down Scenario:**

If SPV liquidates:

1. **Trigger:** All loans mature, default, or prepaid
2. **Distributions:** All available cash distributed to noteholders
3. **Token Burn:** Tokens burned upon final distribution
4. **Dissolution:** SPV dissolved per state law

**Recovery Rates:**

* Senior secured loans: 60-80% recovery typical (if default)
* Unsecured loans: 20-40% recovery typical
* Subordinated debt: 0-20% recovery typical

---

### Key Success Factors

**Critical Success Factors for Private Credit Tokenization:**

1. **Servicer Quality:** Reliable, experienced servicer is essential
2. **Collateral Quality:** Strong collateral improves recovery rates
3. **Borrower Quality:** Underwriting discipline prevents defaults
4. **Transparency:** Regular reporting builds investor confidence
5. **Legal Certainty:** Enforceable loan documents and security interests

**Common Pitfalls:**

* Weak underwriting (accepting poor credit quality)
* Inadequate servicing (delinquencies not addressed)
* Poor collateral valuation (overstated LTV)
* Unclear waterfall mechanics (disputes over distributions)
* Insufficient reserves (no cash for workouts or legal fees)

---

## Playbook 3: Commodities (Gold / Precious Metals)

### Target Asset Class

* Physical gold (bars, coins)
* Silver, platinum, palladium
* Other precious metals

### Phase 0: Asset Eligibility

**Evaluation Criteria:**

- [ ] **Fungibility:** Standardized units (e.g., LBMA Good Delivery bars)
- [ ] **Custody:** Secure vault with insurance available
- [ ] **Assay:** Verifiable purity and weight
- [ ] **Liquidity:** Established spot market for pricing and exit
- [ ] **Transportability:** Can be physically delivered if needed

**Fatal Flaws:**
* Non-standard or unassayable metal
* No secure vault available
* Questionable provenance (conflict minerals, stolen property)
* Legal restrictions on ownership or transport

**Due Diligence:**

- [ ] Vault operator due diligence (security, insurance, financials)
- [ ] Assay verification (certified assayer)
- [ ] Chain of custody documentation (refiner → distributor → vault)
- [ ] Insurance review (all-risk, full replacement value)
- [ ] Legal review (ownership, title, no liens)

---

### Phase 1: Legal Wrapper Selection

**Recommended Structure:** Custody Receipt Model

**Decision Matrix:**

| Structure | Pros | Cons | Best For |
|-----------|------|------|----------|
| **Custody Receipt** | Simple, direct metal ownership | Potential sales tax on purchase | Physical gold investors |
| **ETF Structure** | Securities law clarity, institutional | Heavy regulatory burden | Large scale (>$100M AUM) |
| **SPV Note** | Flexible structure | Less direct metal exposure | Synthetic exposure seekers |

**Most Common Choice:** Custody receipt (token = warehouse receipt for allocated metal)

**Key Documents:**

1. **Custody Agreement**
   - Metal specifications (type, purity, form)
   - Segregation (allocated vs unallocated)
   - Storage fees
   - Insurance terms
   - Redemption procedures

2. **Terms of Service (for token platform)**
   - Token issuance and redemption
   - Transfer procedures
   - Fees (transaction, storage, redemption)
   - Disclaimers and risk factors

3. **Assay Certificate**
   - Metal type and purity
   - Weight (troy ounces or grams)
   - Serial numbers (for bars)
   - Assayer certification

**Timeline:** 4-8 weeks for vault selection, custody agreement, and platform setup

---

### Phase 2: Custody, Control & Settlement

**Custody Requirements:**

- [ ] **Vault Selection:** Secure vault facility (e.g., Brink's, Loomis, Malca-Amit)
- [ ] **Allocated Storage:** Specific bars assigned to token issuer/holders
- [ ] **Insurance:** All-risk insurance covering full replacement value
- [ ] **Security:** 24/7 monitoring, armed guards, multi-layer access controls
- [ ] **Jurisdiction:** Politically stable, rule-of-law jurisdiction (Switzerland, UK, Singapore, Canada)

**Common Vault Locations:**
* Switzerland: Zurich vaults (Loomis, Brink's)
* United Kingdom: London vaults (ICBC, HSBC, JP Morgan)
* Singapore: Singapore Freeport, Certis Cisco
* Canada: Royal Canadian Mint, private vaults

**Allocated vs Unallocated:**

| Type | Description | Ownership | Redemption |
|------|-------------|-----------|------------|
| **Allocated** | Specific bars assigned to you | Legal title (bailment) | Your specific bars returned |
| **Unallocated** | General claim on vault pool | Unsecured creditor | Any bars (or cash equivalent) |

**Best Practice:** Use allocated storage (unallocated has counterparty risk)

**Settlement Model:**

**Token Issuance:**
```
1. Customer purchases gold from issuer
2. Issuer buys gold from refiner/dealer
3. Gold delivered to vault and assayed
4. Vault confirms receipt and provides storage receipt
5. Tokens minted (1 token = X oz gold)
6. Tokens sent to customer wallet
```

**Token Transfer:**
* On-chain transfer is instant
* No physical gold movement (metal stays in vault)
* Cap table updated to reflect new owner

**Redemption:**
```
1. Customer submits redemption request
2. If large enough (e.g., 400 oz gold bar), physical delivery arranged
3. If small, cash equivalent paid (spot price less fees)
4. Tokens burned
5. Vault releases gold to shipper (if physical) or issuer sells gold (if cash)
```

---

### Phase 3: Compliance Gating

**KYC/AML Program:**

- [ ] Written AML policies (precious metals dealer requirements)
- [ ] Customer identification (government-issued ID)
- [ ] Beneficial owner identification (for entities)
- [ ] Sanctions screening (OFAC, UN, EU)
- [ ] Transaction monitoring (CTR for $10k+ cash equivalent)
- [ ] SAR filing (suspicious activity)

**FinCEN Requirements (U.S.):**

* Precious metals dealers are subject to AML requirements
* BSA/AML program required
* Reporting for transactions >$10,000

**Investor Qualification:**

* **No accredited investor requirement** (commodities are not securities)
* **Minimum purchase** (often $10k+ for economic efficiency)
* **Jurisdiction restrictions** (may block sanctioned countries)

**On-Chain Enforcement:**

```
Transfer Restrictions:
1. Sanctions screening: Block wallets associated with sanctioned entities
2. Jurisdiction blocks: No transfers to restricted countries
3. Allowlist (optional): Some issuers limit to KYC'd wallets only
4. Public transfers (possible): If no securities law issues, may allow open transfers
```

**Key Difference from Securities:**

* If structured properly, gold-backed tokens are commodities, not securities
* Less restrictive transfer rules
* Broader investor base (retail possible)

---

### Phase 4: Token Model & Issuance

**Token Economics:**

* **1 token = X grams of gold** (e.g., 1 token = 1 gram, or 31.1 grams for 1 troy oz)
* **Spot price reference:** Token value tracks gold spot price (less fees)
* **Storage fees:** Annual fee (0.1-0.5% of AUM typical) deducted via token burn or cash charge
* **No yield:** Gold does not generate income (unlike bonds/dividends)

**Technical Implementation:**

- [ ] Deploy smart contracts (ERC-20 typical)
- [ ] Implement fee mechanism (annual storage fee)
- [ ] Set up oracle for spot price feeds (Chainlink, others)
- [ ] Multi-sig admin controls for minting/burning
- [ ] Emergency pause function (security incident)

**Issuance Process:**

```
1. Customer creates account on platform
2. Customer completes KYC (if required)
3. Customer places order (e.g., "100 grams of gold")
4. Customer pays via wire, crypto, or credit card
5. Issuer purchases gold from refiner/dealer
6. Gold delivered to vault, assayed, and stored
7. Tokens minted (100 tokens if 1 token = 1 gram)
8. Tokens sent to customer wallet
9. Confirmation and storage receipt issued
```

**Timeline:** 1-5 business days from payment to token issuance

---

### Phase 5: Attestation, Audit & Proof

**Attestation Requirements:**

| Frequency | Attestation Type | Provider | Distribution |
|-----------|------------------|----------|--------------|
| **Daily** | Vault inventory reconciliation | Vault operator | Internal |
| **Monthly** | Assay reports | Independent assayer | Internal |
| **Quarterly** | Proof-of-reserves | Third-party auditor | **Public** |
| **Annual** | Full audit | Accounting firm | Public/investors |

**Proof-of-Reserves Procedure (Critical):**

1. **Vault Statement:** Official inventory list from vault operator
   * Bar serial numbers
   * Weight (troy ounces or grams)
   * Purity (e.g., 99.99% for gold)
   * Total value at spot price

2. **On-Chain Supply:** Query smart contract for total token supply

3. **Reconciliation:** Calculate:
   ```
   Vault gold (grams) ÷ Token supply = Grams per token
   Compare to specification (should be ≥ 1:1)
   ```

4. **Independent Verification:**
   * Auditor visits vault (or reviews vault operator reports)
   * Auditor verifies serial numbers match inventory
   * Auditor confirms weight and purity via assay certificates
   * Auditor queries blockchain to confirm token supply

5. **Publication:**
   * Attestation report published on issuer website
   * Report hash stored on-chain (provable timestamp)
   * Updated quarterly (or monthly for high-volume issuers)

**Example Report:**

```
[Auditor Name] Proof-of-Reserves Report
Date: [Date]
Issuer: [Token Platform Name]

Gold Holdings:
- Vault: [Vault Name and Location]
- Total bars: [Number]
- Total weight: [X.XXX troy ounces / X,XXX grams]
- Purity: [99.99% gold]
- Insurance: [All-risk policy for $X value]

Token Supply:
- Blockchain: [Ethereum]
- Contract address: [0x...]
- Total supply: [X,XXX tokens]
- Grams per token: [X.XX grams]

Conclusion:
Vault holdings support token supply with [XXX]% backing.
[Date of vault inspection: X]
[Next inspection: X]

[Auditor signature and credentials]
```

**Public Trust:** Transparent, frequent proof-of-reserves is essential for market confidence

---

### Phase 6: Secondary Transfer Controls

**Transfer Restrictions:**

- [ ] Sanctions screening (ongoing)
- [ ] Jurisdiction blocks (sanctioned countries)
- [ ] Optional: Allowlist (only KYC'd wallets can hold)

**Permitted Transfers:**

* **Peer-to-peer:** Token holder can transfer to any other wallet (if no restrictions)
* **Exchanges:** Some gold-backed tokens trade on crypto exchanges
* **OTC:** Large holders may transact off-chain and settle on-chain

**Market Infrastructure:**

**Decentralized Exchanges (DEXs):**
* Tokens may be tradable on Uniswap, Curve, others
* Liquidity pools can be created
* Slippage depends on pool depth

**Centralized Exchanges (CEXs):**
* Some gold-backed tokens listed on exchanges (e.g., PAX Gold on major exchanges)
* Higher liquidity
* Exchange handles KYC/AML

**OTC Desks:**
* For large transactions (>$1M)
* Price negotiated
* Settlement on-chain

**Redemption as Exit:**
* Holders can redeem for cash or physical gold (if minimum met)
* Alternative to selling on secondary market

---

### Phase 7: Ongoing Operations

**Daily Activities:**

- [ ] Monitor vault inventory
- [ ] Reconcile on-chain supply with vault holdings
- [ ] Process minting and burning requests
- [ ] Update spot price oracle

**Monthly Activities:**

- [ ] Storage fee collection (via token burn or cash charge)
- [ ] Assay reports reviewed
- [ ] Financial reconciliation

**Quarterly Activities:**

- [ ] Proof-of-reserves attestation
- [ ] Vault physical inspection (by auditor)
- [ ] Marketing and investor communications

**Annual Activities:**

- [ ] Full financial audit
- [ ] AML program review
- [ ] Insurance policy renewal
- [ ] Vault operator contract review

**Corporate Actions:**

* **Storage Fees:** Deducted annually via small token burn (0.1-0.5% of holdings)
* **Vault Relocation:** If vault changed, gold transported and re-assayed
* **Bar Refinement:** Old bars melted and recast if necessary (rare)

**Risk Management:**

- [ ] Insurance adequate for full replacement value
- [ ] Vault operator financially sound
- [ ] Diversification across multiple vaults (if large AUM)
- [ ] Emergency procedures (vault security breach, natural disaster)

---

### Phase 8: Redemption / Wind-Down

**Redemption Process:**

**Physical Redemption (Large Holders):**
```
Minimum: Typically 400 oz gold bar (≈ $800k at $2,000/oz)
Process:
1. Holder submits redemption request
2. Issuer confirms holder owns sufficient tokens
3. Holder burns tokens
4. Issuer arranges shipment from vault to holder
5. Shipping and insurance costs paid by holder
6. Delivery time: 1-2 weeks
```

**Cash Redemption (Small Holders):**
```
Minimum: Often $1,000+
Process:
1. Holder submits redemption request
2. Issuer calculates redemption value (spot price less fees)
3. Holder burns tokens
4. Issuer sells equivalent gold and wires cash
5. Settlement: 1-3 business days
```

**Redemption Fees:**
* **Physical delivery:** 1-3% + shipping/insurance costs
* **Cash redemption:** 0.5-2% (spread over spot price)

**Wind-Down Scenario:**

If issuer liquidates:

1. **Notice:** 30-60 days to all token holders
2. **Redemption Window:** Holders offered cash or physical redemption
3. **Liquidation:** All gold sold at spot price
4. **Distributions:** Pro-rata distributions to remaining token holders
5. **Token Burn:** All tokens burned
6. **Dissolution:** Platform shut down

**Vault Continuity:**

If vault operator changes:
* Gold transported to new vault
* Re-assayed and re-inventoried
* New proof-of-reserves issued
* Token holders notified but tokens unaffected

---

### Key Success Factors

**Critical Success Factors for Commodity Tokenization:**

1. **Vault Security:** Secure, insured, auditable vault is essential
2. **Proof-of-Reserves:** Transparent, frequent attestations build trust
3. **Allocated Storage:** Legal title (bailment) preferred over unsecured claims
4. **Low Fees:** Storage fees must be competitive with traditional gold holdings
5. **Redemption Optionality:** Physical delivery option attracts institutional investors

**Common Pitfalls:**

* Unallocated storage (counterparty risk)
* Infrequent audits (trust erodes)
* High fees (uncompetitive vs ETFs)
* No physical redemption option (limited investor base)
* Poor vault selection (security or financial risk)

---

## Summary: Execution Comparison

| Playbook | Phase 0 Duration | Phase 1 Duration | Total to Launch | Key Success Factor |
|----------|------------------|------------------|-----------------|---------------------|
| **Treasuries/MMF** | 2-4 weeks | 6-12 weeks | 8-16 weeks | Qualified custodian + daily NAV |
| **Private Credit** | 4-8 weeks | 10-16 weeks | 14-24 weeks | Servicer quality + credit underwriting |
| **Commodities** | 2-4 weeks | 4-8 weeks | 6-12 weeks | Vault security + proof-of-reserves |

---

## Document Control

**Version:** 1.0  
**Date:** January 2026  
**Last Updated:** January 13, 2026  
**Next Review:** Quarterly or upon material regulatory/market developments

**Maintained By:** Legal/Compliance Team  
**References:** See Asset Class Registry for authoritative sources

---

> **Disclaimer:** These playbooks are provided for informational and planning purposes only. They document common institutional practices but do not constitute legal, tax, or investment advice. Each tokenization project requires independent legal analysis, regulatory review, and risk assessment based on specific facts, jurisdictions, and applicable laws. Consult qualified legal counsel before proceeding with any RWA tokenization project.
