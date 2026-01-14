# Legal, CPA & Smart Contract Framework for RWA Programs

> **Scope Notice**
>
> This framework documents the roles, responsibilities, and deliverables of legal counsel, CPAs, and smart contract professionals in institutional RWA tokenization projects as of January 2026. It is provided as a reference framework for structuring professional services engagements. This document does not constitute legal, accounting, or technical advice. Each RWA project requires independent professional analysis based on specific circumstances.

## Purpose

This document provides a comprehensive framework for:

* **Legal roles and responsibilities** across transaction structuring, securities law, ERISA, tax, and regulatory compliance
* **CPA and accounting roles** covering GAAP/IFRS treatment, attestations, and valuations
* **Smart contract roles** for translating legal constraints into enforceable code
* **SEC analysis** including Howey Test application and related frameworks
* **Control matrix** mapping functions to owners and evidence artifacts

This framework ensures clear delineation of responsibilities and prevents gaps in institutional RWA execution.

---

## I. LEGAL ROLES & RESPONSIBILITIES

### 1. Lead Transaction / Structuring Counsel

**Primary Responsibility:** Owns the legal architecture of each RWA class.

**Key Duties:**

* **Legal Wrapper Selection:** Determines optimal structure (SPV, fund, trust, note program) based on:
  - Asset class characteristics
  - Investor profile (institutional, accredited, qualified purchaser)
  - Jurisdictional considerations
  - Regulatory landscape
  - Exit and redemption mechanics

* **Jurisdictional Strategy:** Selects formation and operational jurisdictions considering:
  - Tax efficiency
  - Regulatory clarity
  - Enforcement predictability
  - Investor domicile requirements
  - Example structures:
    * US SPV with Cayman feeder
    * Delaware Series LLC with EU distribution
    * Singapore variable capital company
    * UK authorized fund structure

* **Documentation Supervision:** Drafts or supervises:
  - **Offering Memoranda / Private Placement Memoranda**
    * Program description
    * Risk factors (comprehensive)
    * Use of proceeds
    * Distribution restrictions
    * Transfer limitations
  - **Term Sheets**
    * Economic terms
    * Governance rights
    * Redemption mechanics
    * Events of default
  - **Non-Reliance Language**
    * Scope limitations
    * No advisory relationship disclaimers
    * Independent judgment requirements
  - **Risk Factors**
    * Asset-specific risks
    * Market risks
    * Liquidity risks
    * Technology risks
    * Regulatory risks

* **Transfer Restrictions Design:** Defines:
  - Eligibility criteria (accredited, QP, QIB, institutional-only)
  - Lock-up periods
  - Resale restrictions
  - Right of first refusal provisions
  - Bad actor disqualifications

* **Coordination:** Interfaces with:
  - Securities counsel (on registration/exemptions)
  - Tax counsel (on structure efficiency)
  - ERISA counsel (on plan asset boundaries)
  - Banking/regulatory counsel (on custody posture)

**Deliverables:**

* **Transaction Structure Memo** (10-20 pages)
  - Legal wrapper rationale
  - Jurisdictional analysis
  - Structure diagram with entity chart
  - Capital flows waterfall
  - Alternative structures considered and rejected

* **Offering Documents** (50-150 pages)
  - Complete offering memorandum
  - Subscription agreements
  - Investor representations and warranties
  - Transfer restriction exhibits

* **Legal Opinion on Enforceability** (5-10 pages)
  - Formation and good standing
  - Authorization and execution
  - Binding obligations
  - No conflicts with law or contracts
  - Qualifications and assumptions

**Timeline:** 6-12 weeks for initial structure; 2-4 weeks for subsequent offerings

---

### 2. Securities Counsel (Critical Path)

**Primary Responsibility:** Determines whether the RWA is a "security" and how it may be issued, held, and transferred.

**Critical Importance:** This is the **most legally sensitive role** in RWA tokenization. Errors here create existential regulatory risk.

**Key Duties:**

* **Howey Test Analysis:** Performs comprehensive analysis addressing all four prongs:
  1. **Investment of Money**
     - Form of consideration (cash, crypto, other)
     - Commercial vs. consumptive transaction
  2. **Common Enterprise**
     - Horizontal commonality (pooling)
     - Vertical commonality (fortunes tied to promoter)
  3. **Expectation of Profit**
     - Capital appreciation expected?
     - Passive income stream expected?
     - Marketing language suggesting returns?
  4. **Efforts of Others**
     - Whose efforts generate returns?
     - Degree of investor control
     - Ongoing managerial efforts by promoter

* **Additional SEC Tests:**
  - **Reves Test** (if structured as notes)
    * Motivation of buyer/seller (commercial vs. investment)
    * Plan of distribution (general vs. targeted)
    * Reasonable expectations of investing public
    * Risk-reducing regulatory schemes
  - **SEC Digital Asset Framework (2019)**
    * Degree of decentralization
    * Active participant vs. passive investor
    * Functional vs. consumptive use
  - **Family Resemblance Test** (debt instruments)
    * Does it resemble securities more than commercial debt?

* **Exemption Analysis:** If security, determines applicable exemptions:
  - **Regulation D**
    * Rule 504 (up to $10M, limited purchasers)
    * Rule 506(b) (unlimited amount, 35 non-accredited + unlimited accredited)
    * Rule 506(c) (unlimited amount, accredited only, general solicitation OK)
  - **Regulation S** (offshore offerings)
  - **Section 4(a)(2)** (private placement)
  - **Regulation A** (mini-IPO up to $75M)
  - **Institutional-Only** (QIB/QP strategies)

* **Resale Restrictions:** Determines:
  - Holding period requirements (6 months for restricted securities)
  - Manner of sale limitations
  - Volume restrictions (Rule 144)
  - Current public information requirements

* **Secondary Trading Posture:**
  - May tokens trade on ATS/exchange?
  - Bulletin board permissibility
  - Broker-dealer involvement required?
  - Market maker implications

* **Regulatory Interface:** Coordinates with:
  - SEC staff (no-action letter process, if pursued)
  - FINRA (if broker-dealer distribution)
  - State securities regulators (Blue Sky filings)

**Deliverables:**

* **Securities Classification Memo** (15-30 pages)
  - Comprehensive Howey analysis
  - Supporting case law and SEC guidance
  - Conclusion on security status (clear yes/no)
  - Risk assessment if classification unclear
  - Materiality assessment of uncertain factors

* **Exemption Reliance Memo** (10-20 pages)
  - Exemption(s) relied upon
  - Factual support for exemption elements
  - Conditions and limitations
  - Form D filing requirements and timing
  - State filing requirements (Blue Sky)

* **Transferability Opinion** (5-10 pages)
  - Permitted transfers and conditions
  - Lock-up periods and rationale
  - Secondary market limitations
  - Legends and stop transfer instructions
  - Rule 144 considerations

* **Risk Assessment** (if classification uncertain)
  - Continuum positioning (clearly not a security → clearly a security)
  - Key risk factors driving uncertainty
  - Mitigating actions available
  - Regulatory posture assessment

**Timeline:** 4-8 weeks for initial analysis; 2-3 weeks for updates

**Red Flags (Automatic Securities Classification):**
* Marketing materials emphasizing "returns" or "yield"
* Pooling of investor capital with shared upside
* Active management of underlying assets by promoter
* Lack of consumptive use case
* Token holder voting rights on material matters

**Institutional Best Practice:**
> Most institutional RWAs **accept securities status** and focus on **exemption compliance** rather than attempting to avoid classification. This provides regulatory clarity and reduces legal risk.

---

### 3. ERISA / Benefits Counsel (Where Applicable)

**Primary Responsibility:** Ensures no ERISA plan asset contamination.

**When Required:**
* Platform involves employer-sponsored benefit programs
* Investors include pension plans or ERISA-covered entities
* Asset structure could implicate plan asset rules

**Key Duties:**

* **Plan Asset Analysis:** Determines whether RWA investment creates plan asset status under DOL regulations:
  - **25% Test:** If 25%+ of any class held by benefit plan investors, underlying assets = plan assets (absent exception)
  - **Exceptions:**
    * Publicly offered securities
    * Operating companies
    * Venture capital operating companies (VCOCs)
    * Real estate operating companies (REOCs)
    * Investment in registered investment companies

* **Cash Flow Boundary Review:** Confirms:
  - RWAs do not represent benefit plan entitlements
  - RWAs do not provide governance rights over plan assets
  - RWAs do not create co-fiduciary relationships
  - Cash flows to RWA holders originate from separate capital (not plan assets)

* **Fiduciary Duty Analysis:**
  - Who is a fiduciary under ERISA Section 3(21)?
  - Does token issuance create fiduciary status?
  - Are fiduciary duties properly limited and disclosed?

* **Prohibited Transaction Review (IRC §4975):**
  - No self-dealing between plan and disqualified persons
  - No loans between plan and parties in interest
  - No sale/exchange/leasing between plan and disqualified persons
  - Statutory and class exemptions available?

* **Documentation Review:** Ensures offering documents contain:
  - ERISA-safe harbor language
  - Plan asset disclaimers
  - Fiduciary acknowledgment requirements
  - Prohibited transaction warnings

**Deliverables:**

* **ERISA Non-Plan-Asset Opinion** (10-15 pages)
  - Analysis of plan asset status
  - Exception applicability (if any)
  - 25% test monitoring requirements
  - Plan asset safe harbor confirmation

* **Fiduciary Exposure Analysis** (5-10 pages)
  - Identification of ERISA fiduciaries
  - Scope of fiduciary duties
  - Fiduciary risk mitigation measures
  - Investment advice exclusion confirmation

* **Prohibited Transaction Memo** (if plan investors involved)
  - Identification of disqualified persons/parties in interest
  - Transaction screening
  - Exemption availability analysis
  - Excise tax exposure assessment

**Timeline:** 3-6 weeks for initial analysis

**Critical for AYG Platform:**
The AYG platform specifically requires this analysis due to integration with MEC insurance policies and cafeteria plans. The five-layer architecture (Regulated Program → Operational → RWA Representation → Attestation → Capital) is designed to prevent plan asset contamination.

**Reference:** See `/docs/ayg-platform/02-legal-compliance/rwa-boundary-analysis.md` for comprehensive ERISA boundary framework.

---

### 4. Tax Counsel

**Primary Responsibility:** Tax characterization across issuance, cash flows, and redemptions.

**Key Duties:**

* **Income Characterization:** Determines tax treatment of:
  - **Token Issuance:** Taxable event? Basis establishment?
  - **Ongoing Cash Flows:**
    * Interest income (ordinary income, 1099-INT)
    * Dividend income (qualified vs. non-qualified)
    * Capital gains (long-term vs. short-term)
    * Ordinary income (1099-MISC)
    * Return of capital (non-taxable, basis reduction)
  - **Redemption:** Gain/loss calculation and character

* **Entity Classification:**
  - Partnership (pass-through, K-1 reporting)
  - Corporation (C-corp, dividend treatment)
  - Trust (grantor vs. non-grantor)
  - Disregarded entity

* **Withholding Obligations:**
  - **U.S. Persons:** Backup withholding (24%)
  - **Foreign Persons:**
    * FDAP income withholding (30% or treaty rate)
    * FIRPTA withholding (real estate)
    * Portfolio interest exemption eligibility

* **Information Reporting:**
  - Form 1099-INT (interest)
  - Form 1099-DIV (dividends)
  - Form 1099-OID (original issue discount)
  - Form 1099-B (broker proceeds)
  - Form 1042-S (foreign persons)
  - Schedule K-1 (partnership interests)

* **Tax Neutrality Confirmation:**
  - Tokenization does not change tax treatment of underlying economics
  - No step transaction or economic substance issues
  - No disguised sale concerns
  - No debt vs. equity recharacterization risk

* **Cross-Border Considerations:**
  - Treaty benefits availability
  - Permanent establishment risk
  - Transfer pricing implications
  - FATCA compliance (Form W-8, W-9)
  - CRS reporting (Common Reporting Standard)

* **CPA Coordination:**
  - Aligns legal tax analysis with accounting tax treatment
  - Confirms reporting methodologies
  - Reviews investor tax packages

**Deliverables:**

* **Tax Characterization Memo** (15-25 pages)
  - Entity classification analysis
  - Income characterization by cash flow type
  - Withholding obligations summary
  - Information reporting requirements
  - Tax treatment timeline (issuance → holding → redemption)

* **Withholding and Reporting Guidance** (5-10 pages)
  - Withholding rate table by investor type and income type
  - Form requirements and deadlines
  - Certification procedures (W-8, W-9)
  - Penalty exposure for non-compliance

* **Cross-Border Tax Opinion** (if international investors)
  - Treaty analysis by jurisdiction
  - Permanent establishment assessment
  - Withholding tax planning strategies
  - Reporting obligations by country

**Timeline:** 4-6 weeks for initial analysis; ongoing for annual updates

**Common Tax Structures:**

| RWA Structure | Typical Tax Treatment | Reporting |
|---------------|----------------------|-----------|
| **Treasury/MMF Fund** | Interest income | 1099-INT or K-1 |
| **Private Credit Notes** | Interest income (1099-INT) or OID (1099-OID) | 1099-INT/OID |
| **Real Estate Fund** | Rental income + capital gain/loss | K-1 |
| **Commodity Token** | Capital gain/loss on sale | 1099-B |
| **Carbon Credit** | Ordinary income or capital gain (depends on use) | 1099-MISC or 1099-B |

---

### 5. Regulatory / Banking Counsel

**Primary Responsibility:** Ensures banking, custody, AML, and payments compliance.

**Key Duties:**

* **Banking Risk Posture:**
  - Confirms RWA structure creates **no custody risk** to banks
  - Clarifies that tokenization layer ≠ fiat custody
  - Distinguishes standard commercial banking from crypto banking
  - Addresses bank risk committee concerns proactively

* **Custody Analysis:**
  - Who has legal custody of underlying assets?
  - Is custodian qualified under applicable regulations?
    * Investment Advisers Act Rule 206(4)-2 (RIAs)
    * Bank custodian standards
    * Securities custody requirements
  - Bankruptcy remoteness of custody arrangements

* **AML/KYC Framework:**
  - **BSA/FinCEN Requirements:**
    * Customer Identification Program (CIP)
    * Customer Due Diligence (CDD)
    * Enhanced Due Diligence (EDD) for high-risk customers
    * Beneficial ownership identification (if entity investors)
  - **AML Program Elements:**
    * Written policies and procedures
    * Designated AML officer
    * Ongoing training
    * Independent testing (annual)
  - **Transaction Monitoring:**
    * Suspicious Activity Report (SAR) filing procedures
    * Currency Transaction Report (CTR) requirements ($10k+ cash equivalent)

* **Sanctions Screening:**
  - OFAC SDN list screening (U.S.)
  - UN sanctions lists
  - EU sanctions lists
  - Blocked persons and jurisdictions

* **Money Transmission Risk:**
  - Does platform transmit money under state or federal law?
  - FinCEN MSB registration required?
  - State money transmitter licenses required?
  - Exemptions available (integral exception, agent exception)?

* **Payments Compliance:**
  - Payment Card Industry (PCI DSS) requirements (if card payments accepted)
  - ACH rules compliance
  - Wire transfer (SWIFT) compliance
  - Funds availability (Reg CC if applicable)

* **Bank Partnership Alignment:**
  - Reviews documentation for bank-acceptable language
  - Removes "red flag" terms (crypto, staking, yield farming, DeFi)
  - Emphasizes traditional banking services requested
  - Provides comfort on no crypto custody requirements

**Deliverables:**

* **Banking Risk Posture Memo** (5-10 pages)
  - Why this structure creates no custody risk
  - Comparison: Traditional banking vs. digital asset banking
  - What is requested (standard commercial banking)
  - What is NOT requested (crypto custody, specialized infrastructure)
  - Risk comparison table (this structure vs. crypto banking)

* **AML/KYC Compliance Framework** (20-30 pages)
  - Written AML policies and procedures
  - Risk assessment methodology
  - CIP/CDD/EDD procedures
  - Transaction monitoring parameters
  - SAR/CTR filing protocols
  - Training program outline
  - Independent testing requirements

* **Sanctions Compliance Program** (10-15 pages)
  - Screening procedures (initial and ongoing)
  - Sanctions list update protocols
  - Blocked transaction procedures
  - OFAC reporting requirements
  - International sanctions coordination

* **Money Transmission Analysis** (10-15 pages)
  - State-by-state analysis of money transmission laws
  - FinCEN MSB analysis
  - Exemption applicability assessment
  - Licensing requirements (if applicable)
  - Compliance timeline and costs

**Timeline:** 4-6 weeks for initial framework development

**Bank Submission Package Integration:**
This analysis directly supports the bank submission package created for AYG platform. See `/docs/ayg-platform/appendix/bank-risk-memo.md` and `/docs/ayg-platform/appendix/bank-submission-checklist.md`.

---

## II. CPA / ACCOUNTING ROLES & RESPONSIBILITIES

### 1. Lead CPA / Accounting Advisor

**Primary Responsibility:** Accounting truth layer. Prevents "token accounting fiction."

**Key Duties:**

* **GAAP / IFRS Treatment Determination:**
  - **Asset Classification:**
    * Financial assets (debt, equity, derivatives)?
    * Intangible assets?
    * Property, plant & equipment?
    * Inventory or other current assets?
  - **Revenue Recognition (ASC 606 / IFRS 15):**
    * Identification of performance obligations
    * Transaction price determination
    * Allocation methodology
    * Timing of recognition (point in time vs. over time)
  - **Liability Treatment:**
    * Debt (ASC 470)?
    * Equity (ASC 480)?
    * Hybrid instruments (bifurcation required)?

* **Off-Balance-Sheet Prevention:**
  - Ensures RWA structures are properly consolidated or disclosed
  - VIE analysis (Variable Interest Entity) under ASC 810
  - Determines primary beneficiary for consolidation
  - Special purpose entity (SPE) qualification for off-balance-sheet treatment (rare post-FAS 167)

* **Consolidation Analysis:**
  - **Voting Interest Model:**
    * Does issuer control SPV through majority voting interest?
  - **Variable Interest Model:**
    * Is SPV a VIE?
    * Is issuer the primary beneficiary (power + economics)?
  - **Conclusion:** Consolidate vs. equity method vs. cost method

* **Fair Value Measurement (ASC 820 / IFRS 13):**
  - Level 1 (quoted prices): Rarely applicable for RWAs
  - Level 2 (observable inputs): Market-based pricing where available
  - Level 3 (unobservable inputs): Valuation models for illiquid RWAs
  - Valuation technique selection and disclosure

* **Disclosure Requirements:**
  - Significant accounting policies
  - Fair value measurements (hierarchy level)
  - Concentration of credit risk
  - Liquidity and capital resources
  - Related party transactions
  - Subsequent events

* **Token Accounting (Emerging Guidance):**
  - Intangible asset treatment (most common currently)
  - Indefinite-lived intangible (no amortization)
  - Impairment testing (if fair value < carrying value)
  - **FASB Exposure Draft (2023):** Proposed fair value model
    * Mark-to-market through earnings
    * Enhanced disclosure requirements
    * Expected effective date: 2025-2026

**Deliverables:**

* **Accounting Treatment Memo** (15-25 pages)
  - Asset/liability classification analysis
  - Revenue recognition methodology
  - Consolidation conclusion and rationale
  - Fair value measurement approach
  - Disclosure requirements checklist
  - Journal entry examples

* **Consolidation Analysis** (10-15 pages)
  - SPV structure diagram
  - VIE assessment (if applicable)
  - Primary beneficiary determination
  - Consolidation model selected
  - Alternative analyses considered

* **Revenue Recognition Policy** (5-10 pages)
  - Five-step model application (ASC 606)
  - Performance obligations identified
  - Transaction price allocation
  - Recognition timing
  - Variable consideration treatment

**Timeline:** 4-6 weeks for initial policies; ongoing for implementation

**Critical Point:**
> Tokenization does not change accounting treatment of underlying economics. If traditional structure is a debt note, tokenized version is still a debt note for accounting purposes.

---

### 2. Audit Firm (or Independent Accountant)

**Primary Responsibility:** External credibility and assurance.

**Key Duties:**

* **Financial Statement Audit:**
  - **Planning:** Risk assessment, materiality determination, audit strategy
  - **Internal Controls Testing:** Design and operating effectiveness
  - **Substantive Testing:**
    * Cash and investments verification
    * Revenue recognition testing
    * Expense accuracy
    * Asset/liability valuation
    * Related party transactions
    * Subsequent events review
  - **Conclusion:** Audit opinion (unqualified, qualified, adverse, disclaimer)

* **Proof-of-Reserves Attestation:**
  - **Custodian Holdings Verification:**
    * Obtain custodian statements
    * Confirm holdings directly with custodian (if possible)
    * Verify asset descriptions match offering documents
  - **On-Chain Supply Verification:**
    * Query smart contracts for total token supply
    * Verify token supply against issuer records
    * Confirm no unauthorized minting/burning
  - **Reconciliation:**
    * Calculate coverage ratio: Asset Value ÷ Token NAV
    * Should be ≥ 100% (1:1 backing minimum)
  - **Publication:** Issue attestation report (often public)

* **Agreed-Upon Procedures (AUP):**
  - Less comprehensive than audit
  - Performs specific procedures requested by client
  - Issues report of findings (not opinion)
  - Common for interim reviews or specific assertions

* **SOC Reports:**
  - **SOC 1 Type II:** Internal controls over financial reporting (ICFR)
    * Service auditor examines controls at service organization
    * Relevant for fund administrators, custodians, servicers
  - **SOC 2 Type II:** Security, availability, processing integrity, confidentiality, privacy
    * Relevant for technology platforms, custodians, data centers

* **Internal Controls Review:**
  - Evaluates control design
  - Tests operating effectiveness
  - Identifies control deficiencies:
    * Material weaknesses (high risk)
    * Significant deficiencies (moderate risk)
    * Control deficiencies (lower risk)
  - Management letter with recommendations

**Deliverables:**

* **Audited Financial Statements** (Annual)
  - Audit opinion (1-2 pages)
  - Balance sheet
  - Income statement
  - Statement of cash flows
  - Statement of changes in equity
  - Notes to financial statements (10-30 pages)

* **Proof-of-Reserves Attestation Report** (Quarterly typical)
  - Scope and procedures performed
  - Custodian holdings summary
  - On-chain supply verification
  - Reconciliation and coverage ratio
  - Conclusion statement
  - Auditor signature and credentials

* **Management Letter** (if control deficiencies identified)
  - Control deficiencies identified
  - Risk assessment (likelihood × impact)
  - Recommendations for remediation
  - Management response

* **SOC 1 Type II Report** (Annual, for service organizations)
  - Management assertion
  - Service auditor opinion
  - Description of system and controls
  - Control objectives and tests
  - Test results and exceptions

**Timeline:**
* Annual audit: 6-8 weeks from year-end close
* Quarterly PoR attestation: 2-3 weeks
* SOC reports: 4-6 months for initial; 2-3 months for subsequent

**Auditor Selection Criteria:**
* Experience with tokenized assets and digital custody
* Understanding of blockchain technology and on-chain verification
* Reputation with banks and regulators (Big 4 or top-tier regional firm preferred)
* Industry expertise (asset management, fintech, real estate, etc.)

**Common Audit Findings in RWA Projects:**
* Inadequate reconciliation procedures (custody vs. on-chain)
* Weak access controls (admin keys, minting authority)
* Insufficient segregation of duties
* Incomplete or untimely investor reporting
* Fair value measurement challenges (Level 3 inputs)

---

### 3. Valuation Specialist (When Needed)

**Primary Responsibility:** Fair value determination for illiquid assets.

**When Required:**
* Private credit (no quoted market prices)
* Real estate (property-specific valuation)
* Receivables / trade finance (credit-adjusted valuation)
* IP rights / royalties (discounted cash flow models)
* Structured products (complex modeling)

**Key Duties:**

* **Valuation Methodology Selection:**
  - **Income Approach:** Discounted cash flow (DCF), direct capitalization
  - **Market Approach:** Comparable sales, guideline public company method
  - **Cost Approach:** Replacement cost (rare for financial assets)

* **DCF Model Development (Most Common):**
  - **Cash Flow Projections:**
    * Revenue forecasts
    * Operating expense assumptions
    * Capital expenditures
    * Working capital changes
  - **Discount Rate Determination:**
    * Risk-free rate
    * Equity risk premium
    * Size premium (if applicable)
    * Company-specific risk adjustments
  - **Terminal Value Calculation:**
    * Perpetuity growth method
    * Exit multiple method

* **Credit Risk Assessment (Private Credit):**
  - Probability of default (PD)
  - Loss given default (LGD)
  - Expected loss calculation
  - Credit spread determination

* **Real Estate Appraisal:**
  - **Income Approach:** Net operating income (NOI) ÷ cap rate
  - **Sales Comparison:** Comparable property analysis ($ per sq ft)
  - **Cost Approach:** Replacement cost less depreciation
  - Physical inspection (if applicable)
  - Market rent analysis
  - Expense ratio benchmarking

* **Sensitivity Analysis:**
  - Key assumptions varied
  - Tornado charts showing impact
  - Scenario analysis (base, upside, downside)

* **Credentials and Standards:**
  - **Real Estate:** MAI (Member, Appraisal Institute) or ASA (American Society of Appraisers)
  - **Business Valuation:** ASA, ABV (Accredited in Business Valuation), CVA (Certified Valuation Analyst)
  - **Standards:** USPAP (Uniform Standards of Professional Appraisal Practice)

**Deliverables:**

* **Valuation Report** (20-50 pages)
  - Executive summary
  - Valuation methodology
  - Company/asset overview
  - Industry and market analysis
  - Financial analysis and projections
  - Discount rate / cap rate determination
  - Valuation calculations
  - Sensitivity analysis
  - Conclusion of value
  - Appraiser qualifications

* **Methodology Disclosures** (for financial statements)
  - Level 3 fair value measurement disclosures
  - Unobservable inputs description
  - Quantitative sensitivity disclosures

**Timeline:** 2-4 weeks per valuation (annual or quarterly)

**Common Valuation Challenges:**
* Lack of comparable transactions (private markets)
* Highly uncertain cash flows (early-stage credit)
* Illiquid markets (wide bid-ask spreads)
* Complex capital structures (waterfalls, preferences)
* Regulatory constraints on valuation frequency

---

## III. SMART CONTRACT ROLES & RESPONSIBILITIES

### 1. Smart Contract Architect

**Primary Responsibility:** Translate legal constraints into enforceable code.

**Critical Principle:**
> Smart contracts enforce *compliance*, not *economic promises*.

**Key Duties:**

* **Transfer Restriction Encoding:**
  - **Allowlist / Whitelist:**
    ```
    mapping(address => bool) public allowlist;
    require(allowlist[to], "Transfer not permitted");
    ```
  - **Lock-Up Periods:**
    ```
    mapping(address => uint256) public lockupExpiry;
    require(block.timestamp >= lockupExpiry[from], "Lock-up active");
    ```
  - **Investor Count Limits:**
    ```
    uint256 public constant MAX_HOLDERS = 2000; // 3(c)(7) limit
    require(holderCount <= MAX_HOLDERS, "Holder limit exceeded");
    ```
  - **Jurisdictional Blocks:**
    ```
    mapping(address => bool) public blockedJurisdictions;
    require(!blockedJurisdictions[to], "Jurisdiction blocked");
    ```

* **Issuance Cap Enforcement:**
  ```
  uint256 public immutable maxSupply;
  require(totalSupply + amount <= maxSupply, "Supply cap exceeded");
  ```

* **Pause / Freeze / Burn Logic:**
  - **Pause (Emergency Stop):**
    ```
    bool public paused;
    modifier whenNotPaused() {
        require(!paused, "Contract paused");
        _;
    }
    ```
  - **Address Freeze (Sanctions Compliance):**
    ```
    mapping(address => bool) public frozen;
    require(!frozen[from] && !frozen[to], "Address frozen");
    ```
  - **Burn (Redemption):**
    ```
    function burn(address from, uint256 amount) external onlyAuthorized {
        _burn(from, amount);
    }
    ```

* **Non-Custodial Design:**
  - Smart contract **never** holds fiat or digital assets
  - Smart contract **never** initiates payments
  - Smart contract **never** executes liquidations
  - Smart contract is a **state mirror**, not an asset controller

* **Read-Only References:**
  - On-chain references to off-chain reports (IPFS hash, attestation URL)
  - No on-chain calculation of yield, interest, or ROI
  - Metadata links only

**Design Principles:**

1. **Law defines the asset** (not code)
2. **Contracts define economics** (not code)
3. **Smart contracts enforce constraints** (only this)
4. **Tokens reflect reality** (they do not create it)

**Anti-Patterns (Prohibited):**

* ❌ Yield calculations (`function claimYield()`)
* ❌ Auto-distribution of "profits"
* ❌ Performance-based rewards
* ❌ Language suggesting returns (`interestRate`, `yield`, `roi`, `profit`)
* ❌ Participant-level balance tracking (ERISA risk)
* ❌ Contract-initiated payments

**Deliverables:**

* **Smart Contract Architecture Document** (10-20 pages)
  - Contract diagram (inheritance, interfaces)
  - Role-based access control (RBAC) model
  - Function-level permissions matrix
  - State transition diagram
  - Security assumptions and trust model

* **Technical Specification** (20-40 pages)
  - Function-by-function specification
  - Input validation requirements
  - Error handling and revert conditions
  - Event emissions
  - Gas optimization considerations

* **Deployment Plan** (5-10 pages)
  - Network selection (mainnet, L2, private chain)
  - Deployment sequence (dependencies)
  - Initial parameter configuration
  - Multi-sig setup and key management
  - Post-deployment verification checklist

**Timeline:** 4-8 weeks for architecture and development

---

### 2. Smart Contract Auditor

**Primary Responsibility:** Code risk containment.

**Key Duties:**

* **Security Vulnerability Assessment:**
  - **Critical Vulnerabilities:**
    * Unauthorized mint/burn
    * Transfer bypass (circumventing restrictions)
    * Privilege escalation (non-admin gaining admin rights)
    * Integer overflow/underflow (if not using safe math)
    * Reentrancy attacks
  - **High Severity:**
    * Denial of service (DoS) attacks
    * Front-running vulnerabilities
    * Oracle manipulation
    * Signature replay attacks
  - **Medium Severity:**
    * Gas inefficiencies
    * Unchecked return values
    * Floating pragma
    * Missing event emissions

* **Legal Constraint Verification:**
  - Confirms smart contract **cannot override legal agreements**
  - Verifies transfer restrictions align with offering documents
  - Checks that contracts create **no economic promises**
  - Ensures contracts do **not custody assets**

* **Access Control Review:**
  - Role definitions appropriate?
  - Permission granularity sufficient?
  - Multi-sig requirements enforced?
  - Key management procedures documented?

* **Testing Coverage:**
  - Unit test coverage (target: >90%)
  - Integration test coverage
  - Fuzzing (randomized inputs to find edge cases)
  - Formal verification (mathematical proof of correctness, if applicable)

* **Third-Party Dependencies:**
  - OpenZeppelin contracts (generally safe)
  - Custom libraries (higher risk)
  - Oracle integrations (Chainlink, others)
  - Cross-contract calls (reentrancy risk)

**Deliverables:**

* **Audit Report** (20-50 pages)
  - Executive summary
  - Scope and methodology
  - Vulnerability findings (by severity)
  - Code quality assessment
  - Best practice recommendations
  - Detailed findings with code snippets
  - Remediation guidance

* **Remediation Checklist**
  - Critical issues (must fix before deployment)
  - High severity issues (fix within 30 days)
  - Medium severity issues (fix within 90 days)
  - Low severity / informational (address as able)

* **Re-Audit Report** (after remediation)
  - Verification that critical issues resolved
  - Residual risk assessment
  - Final recommendation (deploy / do not deploy)

**Timeline:** 2-4 weeks per audit; 1 week for re-audit

**Reputable Auditors:**
* OpenZeppelin
* Trail of Bits
* ConsenSys Diligence
* Certik
* Quantstamp
* Hacken
* Halborn

**Red Flags:**
* No audit (automatic fail for institutional projects)
* Self-audit or internal-only audit
* Audit with critical unresolved findings
* Rushed audit (<2 weeks for complex contracts)

---

### 3. Protocol Governance Authority

**Primary Responsibility:** Human control layer for emergency actions.

**Key Duties:**

* **Multi-Sig Administration:**
  - Controls admin keys (typically 2-of-3 or 3-of-5 multi-signature wallet)
  - Examples: Gnosis Safe, multi-sig smart contract
  - Signers: CEO, CTO, General Counsel, CFO, external advisor
  - Requires majority approval for admin actions

* **Emergency Actions:**
  - **Pause Contract:** Stops all transfers (regulatory order, security incident)
  - **Freeze Address:** Blocks specific addresses (sanctions, fraud)
  - **Revoke Allowlist:** Removes investor from permissioned transfers (AML flag)
  - **Burn Tokens:** Destroys tokens (post-redemption, legal order)

* **Parameter Updates:**
  - Update allowlist (add/remove addresses)
  - Adjust transfer limits (if any)
  - Update metadata URIs (offering doc revisions)
  - **Cannot** change economics (interest rates, principal, maturity)

* **Coordination:**
  - Interfaces with legal/compliance teams before actions
  - Documents rationale for all governance actions
  - Maintains audit log of admin activities
  - Communicates actions to stakeholders

**Key Rule:**
> Governance ≠ discretion to change economics.

Economic terms are **immutable** or changeable only per legal agreements, not governance discretion.

**Deliverables:**

* **Governance Framework** (10-15 pages)
  - Multi-sig configuration
  - Signer selection criteria
  - Action approval thresholds
  - Emergency procedures
  - Communication protocols

* **Governance Action Log**
  - Date and time
  - Action taken (pause, freeze, etc.)
  - Rationale
  - Approvers (signer addresses)
  - Transaction hash
  - Stakeholder notification

**Timeline:** Ongoing operational responsibility

---

## IV. SEC ANALYSIS — HOWEY TEST & RELATED FRAMEWORKS

### 1. The Howey Test (Core U.S. Securities Analysis)

**Source:** *SEC v. W.J. Howey Co.*, 328 U.S. 293 (1946)

**Definition:** A product is an "investment contract" (and thus a security) if **all four** prongs are met:

1. **Investment of Money**
2. **In a Common Enterprise**
3. **With an Expectation of Profit**
4. **Derived from the Efforts of Others**

---

#### Prong 1: Investment of Money

**Standard:** Commitment of consideration (cash, crypto, services, property) in expectation of a financial return.

**Analysis Factors:**
* Form of consideration (cash, cryptocurrency, labor, property)
* Is transaction consumptive or investment-motivated?
* Does purchaser part with something of value?

**How Institutional RWAs Address This:**
* Institutional counterparties only (not retail capital raises)
* Contractual funding (not speculative purchases)
* Clear commercial purpose documented

**Case Law:**
* *International Brotherhood of Teamsters v. Daniel*, 439 U.S. 551 (1979): Compulsory pension contributions ≠ investment of money
* *United Housing Foundation v. Forman*, 421 U.S. 837 (1975): Shares purchased for housing (consumptive) ≠ investment

---

#### Prong 2: Common Enterprise

**Standard:** Fortunes of investors tied together or to promoter.

**Types of Commonality:**

* **Horizontal Commonality (Widely Accepted):**
  - Pooling of investor funds
  - Pro-rata sharing of profits/losses
  - Example: Investment fund where all investors share in aggregate performance

* **Vertical Commonality (Circuit Split):**
  - **Broad Vertical:** Investor fortunes tied to promoter's efforts
  - **Narrow Vertical:** Investor fortunes tied to promoter's fortunes
  - Circuits disagree on whether broad or narrow standard applies

**How Institutional RWAs Address This:**
* **SPV Isolation:** Each issuance via separate SPV (no pooling)
* **Contractual Segregation:** Investors have rights to specific assets, not a pool
* **No Retail Pooling:** Institutional-only distribution prevents retail pooling concerns

**Case Law:**
* *SEC v. SG Ltd.*, 265 F.3d 42 (1st Cir. 2001): Horizontal commonality found in pooled trading accounts
* *Revak v. SEC Realty Corp.*, 18 F.3d 81 (2d Cir. 1994): No horizontal commonality when investors purchase separate properties

---

#### Prong 3: Expectation of Profit

**Standard:** Purchaser expects to profit from the investment, either through:
* Capital appreciation
* Participation in earnings
* Other financial returns

**Does NOT Include:**
* Consumptive use
* Non-financial benefits
* Fixed contractual returns (sometimes; see below)

**How Institutional RWAs Address This:**
* **Contractual Cash Flows:** Returns arise from pre-existing contracts (loan agreements, leases, purchase orders), not speculative appreciation
* **Fixed Coupon Notes:** Interest payments are contractual obligations, not "profits" from promoter efforts (but see *Reves* analysis)
* **No Marketing of Returns:** Offering documents avoid language suggesting speculative profit ("invest for growth," "high returns," "appreciation potential")

**Marketing Language Analysis (Critical):**

| ❌ Securities Language | ✅ Compliant Language |
|------------------------|----------------------|
| "Invest for high returns" | "Participate in senior secured note program" |
| "Profit from asset appreciation" | "Contractual interest payments per note terms" |
| "Earn yield on your investment" | "Receive scheduled payments pursuant to indenture" |
| "Growth potential" | "Fixed-rate obligations" |

**Case Law:**
* *United Housing Foundation v. Forman*: No profit expectation when purchasing co-op shares for housing
* *SEC v. Edwards*, 540 U.S. 389 (2004): Fixed returns count as "profits" if dependent on entrepreneurial efforts

---

#### Prong 4: Efforts of Others

**Standard:** Profits come predominantly from promoter's or third party's efforts, not purchaser's own efforts.

**Analysis Factors (per *SEC v. Glenn W. Turner Enterprises*, 474 F.2d 476 (9th Cir. 1973)):**
* Are the promoter's efforts "undeniably significant"?
* Are they the "essential managerial efforts which affect the failure or success of the enterprise"?
* Does investor have meaningful control?

**How Institutional RWAs Address This:**

* **Returns from Asset Performance, Not Promoter:**
  - Loan participations: Returns from borrower payments (not servicer management)
  - Real estate: Returns from tenant leases (not property manager)
  - Treasuries: Returns from U.S. government (no promoter)
  - Commodities: Returns from spot price (not vault operator)

* **Passive Structure:**
  - No active trading or portfolio management
  - Pre-determined asset selection
  - Mechanical servicing only

* **Legal Structure Limits Promoter Discretion:**
  - SPV cannot deviate from stated purpose
  - No reinvestment discretion
  - No asset substitution

**Institutional Advantage:**
> If promoter is a **servicer or custodian** (ministerial functions) rather than an **active manager** (discretionary functions), Prong 4 is weakened.

**Case Law:**
* *SEC v. Life Partners, Inc.*, 87 F.3d 536 (D.C. Cir. 1996): Viatical settlements are securities because returns depend on promoter's efforts (tracking, collecting)
* *Robinson v. Glynn*, 349 F.3d 166 (4th Cir. 2003): Promotional breeding of animals not security because owner's efforts critical

---

### 2. Summary: How Institutional RWAs Mitigate Howey

| Howey Prong | RWA Mitigation Strategy |
|-------------|-------------------------|
| **1. Investment of Money** | Institutional counterparties only; contractual funding (not retail capital raise) |
| **2. Common Enterprise** | SPV isolation; no pooling of retail capital; separate legal rights per investor |
| **3. Expectation of Profit** | Contractual cash flows (not speculative); fixed-rate obligations; no "profit" marketing |
| **4. Efforts of Others** | Returns from asset performance (borrower payments, rents, T-bills), not promoter management; ministerial servicing only |

**Critical Institutional Positioning:**
> Most institutional RWAs **accept securities status** and comply via exemptions (Reg D, institutional-only) rather than attempting to argue they are not securities. This provides certainty and reduces regulatory risk.

---

### 3. Why "Read-Only / Mirror RWAs" Are Stronger

**Concept:** Token is a **reference** or **proof** of existing contractual rights, not the source of those rights.

**Characteristics:**
* Token does **not control** underlying asset
* Token does **not grant** governance rights
* Token does **not promise** yield or returns
* Token **references existing contracts** (offering docs, note agreements, custody agreements)

**Howey Impact:**

This structure dramatically weakens Prongs 2-4:

* **Prong 2 (Common Enterprise):** No pooling if token merely represents existing segregated note
* **Prong 3 (Profit Expectation):** Profit expectations arise from underlying contract, not token
* **Prong 4 (Efforts of Others):** Returns determined by underlying contract, not token issuer's efforts

**However:**
Even read-only RWAs may still be securities if underlying rights are themselves securities (e.g., token representing fund interest is still a security).

**Best Practice:**
> Tokenization is a **delivery mechanism**, not a **legal transformation**. If underlying instrument is a security, token representing it is also a security.

---

### 4. Other SEC Frameworks

#### A. Reves Test (Notes Analysis)

**Source:** *Reves v. Ernst & Young*, 494 U.S. 56 (1990)

**When Applied:** Analyzing whether notes or debt instruments are securities.

**Presumption:** All notes are securities **unless** they fall into enumerated exceptions (consumer financing, mortgage on home, short-term commercial paper, etc.).

**Four-Factor Test (if not excepted):**

1. **Motivation of Buyer/Seller:**
   - Investment motivation? → Likely security
   - Commercial/consumer motivation? → Less likely security

2. **Plan of Distribution:**
   - Common trading? → Likely security
   - Direct sale to limited group? → Less likely security

3. **Reasonable Expectations of Investing Public:**
   - Public perceives as investment? → Likely security
   - Public perceives as commercial transaction? → Less likely security

4. **Risk-Reducing Regulatory Scheme:**
   - No alternative regulation? → Likely security
   - Strong alternative regulation (banking, insurance)? → Less likely security

**How Institutional RWA Notes Are Analyzed:**

Most RWA notes issued to institutional investors rely on:

* **Commercial Note Exception (Factor 1):** Issued for business funding, not capital raising
* **Limited Distribution (Factor 2):** Institutional-only, not public offering
* **Institutional Expectation (Factor 3):** Sophisticated parties understand commercial nature
* **Alternative Regulation (Factor 4):** Banking/custody regulation may apply

**Result:**
Even if Reves factors favor non-security status, institutional RWAs typically **accept securities status** and use exemptions for certainty.

---

#### B. SEC "Framework for Investment Contract Analysis of Digital Assets" (2019)

**Source:** SEC Strategic Hub for Innovation and Financial Technology (FinHub), April 2019

**Purpose:** Guidance on applying Howey to digital assets (tokens).

**Key Focus Areas:**

1. **Degree of Decentralization:**
   - Is there an identifiable issuer or promoter?
   - High centralization → More likely security
   - Full decentralization (rare) → Less likely security

2. **Ongoing Managerial Efforts:**
   - Does token issuer continue to perform essential efforts?
   - Active management → Security
   - Purely mechanical/ministerial → Less likely security

3. **Marketing Language:**
   - How is token marketed?
   - Investment/profit language → Security
   - Utility/consumptive language → Less likely security

4. **Economic Reality Over Form:**
   - Substance over labels
   - "Utility token" label does not exempt from securities laws if functions as investment

**Relevance to Institutional RWAs:**

* Most institutional RWAs have **identifiable issuers** (centralized)
* Many involve **ongoing efforts** (servicing, reporting, asset management)
* Marketing language carefully controlled (no "profit" language)
* Economic reality: Represents investment contract → Security

**FinHub Guidance Takeaway:**
> Labels do not determine status. Economic function and reasonable expectations of purchasers control.

---

#### C. Market Infrastructure Focus (2023–2025 SEC Posture)

**Recent SEC Statements (Chair Gensler, Commissioner Peirce, Division of Corporation Finance):**

* Tokenization **does not excuse compliance** with securities laws
* Focus on:
  - **Issuance:** Registration or exemption required
  - **Transfer:** ATS or exchange registration may be required
  - **Settlement:** T+1 settlement requirements apply (if applicable)
  - **Record Ownership:** Transfer agent registration may be required

**Key Actions:**

* **SEC v. Ripple Labs (2023):** Programmatic sales to retail are securities transactions
* **SEC v. Coinbase (2023):** Exchange listing securities without registration
* **Prometheum Approval (2023):** First SEC-registered crypto securities broker-dealer

**Institutional Takeaway:**

* Tokenization is **technology**, not legal alchemy
* Traditional securities law compliance required:
  - Registration or exemption (Reg D, Reg S, etc.)
  - Broker-dealer involvement (if public distribution)
  - ATS registration (if secondary market)
  - Transfer agent registration (if large holder base)

> Efficient settlement ≠ regulatory exemption.

---

### 5. Why Most Institutional RWAs Are Still Securities — And That's OK

**Important Institutional Truth:**

> **Being a security is not a failure.**
> **Being a non-compliant security is.**

**Most Successful Institutional RWAs:**

✅ **Accept securities status**
✅ **Use exemptions** (Reg D, institutional-only)
✅ **Restrict access** (accredited, QP, QIB only)
✅ **Focus on settlement efficiency, not retail hype**

**Why This Approach Succeeds:**

1. **Regulatory Certainty:** No ambiguity about compliance obligations
2. **Bank Comfort:** Banks understand securities regulation (comfortable lending against securities)
3. **Institutional Investor Comfort:** Sophisticated investors expect securities treatment
4. **Legal Defensibility:** Clear exemption reliance documented
5. **Scalability:** Proven path for secondary market development (ATS, broker-dealer involvement)

**Contrast with Failed Approaches:**

❌ **Claiming "utility token" status** without genuine utility
❌ **Aggressive Howey avoidance** (regulatory risk)
❌ **Unregistered public offerings** (enforcement risk)
❌ **Ignoring transfer restrictions** (exemption blown)

**Best Practice:**
> Design for **compliant securities**, not for **avoiding securities status**.

---

## V. CONTROL MATRIX: WHO DOES WHAT

| Function | Owner | Evidence |
|----------|-------|----------|
| **Legal structure design** | Lead Transaction Counsel | Structure memo, offering docs |
| **Securities classification** | Securities Counsel | Howey memo, exemption reliance memo |
| **ERISA boundary protection** | ERISA Counsel | Non-plan-asset opinion |
| **Tax treatment determination** | Tax Counsel | Tax memo, withholding guidance |
| **Accounting policy** | Lead CPA | Accounting treatment memo |
| **Financial statement audit** | Audit Firm | Audited financials, audit opinion |
| **Proof-of-reserves** | Audit Firm / Independent Accountant | PoR attestation report (quarterly) |
| **Valuation (illiquid assets)** | Valuation Specialist | Valuation reports (annual/quarterly) |
| **Smart contract architecture** | Smart Contract Architect | Architecture doc, technical spec |
| **Code security audit** | Smart Contract Auditor | Audit report, remediation checklist |
| **Contract deployment** | Smart Contract Architect + Governance | Deployment plan, multi-sig records |
| **Emergency actions** | Protocol Governance Authority | Governance action log |
| **Banking relationship** | Regulatory/Banking Counsel | Banking risk memo, AML framework |
| **Custody arrangements** | Lead Transaction Counsel + Regulatory Counsel | Custody agreements, custodian DD |
| **Investor reporting** | Fund Administrator / Issuer | Monthly/quarterly reports, tax forms |

---

## VI. KEY INSTITUTIONAL PRINCIPLES (NON-NEGOTIABLE)

### Principle 1: Hierarchy of Authority

> **Law defines the asset.**
> **Contracts define the economics.**
> **Smart contracts enforce constraints.**
> **Tokens reflect — they do not create.**

**Implication:**
* Removing smart contract should **not change legal rights**
* Token is evidence, not source, of rights
* Legal agreements are authoritative; code is subordinate

---

### Principle 2: Professional Separation

> Each role (legal, accounting, technical) has distinct expertise. No role should attempt to opine outside its domain.

**Examples:**
* Smart contract architect does **not** determine securities status (securities counsel does)
* CPA does **not** draft legal documents (counsel does)
* Counsel does **not** design valuation models (valuation specialist does)

---

### Principle 3: Evidence-Based Control

> Every control must have:
> * Clear owner
> * Documented evidence
> * Regular testing cadence

**Reference:** See Control Matrix document (`control-matrix.md`) for comprehensive framework.

---

### Principle 4: Transparency Default

> Institutional credibility requires:
> * Public proof-of-reserves (quarterly minimum)
> * Audited financial statements (annual)
> * Clear offering document disclosure
> * Accessible attestation reports

Opacity = regulatory suspicion.

---

### Principle 5: Regulatory Humility

> Institutional projects do not attempt to "outsmart" regulators.

**Preferred Approach:**
* Accept likely regulatory classification
* Comply via exemptions or registration
* Focus on efficiency, not avoidance

**Avoided Approach:**
* Novel legal theories untested in courts
* Aggressive classification positions
* Reliance on regulatory gaps

---

## VII. DOCUMENT INTEGRATION

This framework integrates with:

* **Asset Class Registry** (`asset-class-registry.md`): Asset-specific legal/custody/settlement patterns
* **Execution Playbooks** (`execution-playbooks.md`): Operational procedures by asset class
* **Control Matrix** (`control-matrix.md`): Governance and compliance controls
* **Smart Contract Compliance Cheat Sheets** (`smart-contract-compliance-cheatsheets.md`): Operational smart contract guidance
* **Smart Contract Deployment Checklist** (`smart-contract-deployment-checklist.md`): Pre-deployment compliance gate

Together, these documents form a comprehensive institutional RWA execution framework.

---

## VIII. NEXT STEPS FOR NEW RWA PROJECTS

**Phase 1: Engagement Planning (Week 1-2)**

- [ ] Identify all required professional roles
- [ ] Engage lead transaction counsel
- [ ] Engage securities counsel
- [ ] Engage tax counsel
- [ ] Engage CPA/audit firm
- [ ] Engage smart contract architect (if tokenizing)
- [ ] Define scope, timeline, budget for each engagement

**Phase 2: Legal & Accounting Foundation (Week 3-8)**

- [ ] Structure memo (lead counsel)
- [ ] Securities classification memo (securities counsel)
- [ ] Tax memo (tax counsel)
- [ ] Accounting treatment memo (CPA)
- [ ] ERISA opinion (if applicable)
- [ ] Banking risk memo (if seeking banking relationship)

**Phase 3: Documentation & Smart Contracts (Week 9-16)**

- [ ] Offering documents drafted and reviewed
- [ ] Custody agreements executed
- [ ] Service provider agreements executed
- [ ] Smart contract architecture designed
- [ ] Smart contracts developed and audited
- [ ] Deployment plan finalized

**Phase 4: Pre-Launch (Week 17-20)**

- [ ] All legal opinions finalized
- [ ] Subscription documents finalized
- [ ] Smart contracts deployed (if applicable)
- [ ] Investor onboarding procedures tested
- [ ] Compliance calendar established
- [ ] Attestation procedures implemented

**Phase 5: Launch & Ongoing Operations**

- [ ] First investor subscriptions
- [ ] Tokens minted (if applicable)
- [ ] Monthly investor reporting
- [ ] Quarterly proof-of-reserves
- [ ] Annual financial audit
- [ ] Annual AML independent review

---

## Document Control

**Version:** 1.0  
**Date:** January 2026  
**Last Updated:** January 13, 2026  
**Next Review:** Quarterly or upon material regulatory developments

**Maintained By:** General Counsel / Chief Compliance Officer

**References:**
* SEC v. W.J. Howey Co., 328 U.S. 293 (1946)
* Reves v. Ernst & Young, 494 U.S. 56 (1990)
* SEC Framework for Investment Contract Analysis of Digital Assets (April 2019)
* Investment Advisers Act Rule 206(4)-2
* ERISA Section 3(21), DOL Plan Asset Regulations
* ASC 606 (Revenue Recognition), ASC 810 (Consolidation), ASC 820 (Fair Value)

---

> **Disclaimer:** This framework is provided for informational purposes only and does not constitute legal, accounting, or technical advice. Each RWA tokenization project requires independent professional analysis by qualified legal counsel, CPAs, auditors, and technical experts based on specific facts, applicable laws, and regulatory guidance. The classification of any instrument as a security depends on the specific facts and circumstances and should be determined by qualified securities counsel. Do not rely on this document as a substitute for professional advice.
