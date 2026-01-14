# RWA Asset Class Registry

> **Scope Notice**
>
> This registry documents common Real World Asset tokenization patterns observed in institutional markets as of January 2026. It does not constitute legal advice, securities offering materials, or recommendations. Each implementation requires independent legal analysis and regulatory review based on specific facts and jurisdictions.

## Purpose

This document provides a comprehensive reference for RWA asset classes, their typical legal structures, custody models, settlement mechanisms, and jurisdictional considerations. It serves as a planning tool for evaluating tokenization feasibility and execution approach.

---

## Registry Structure

For each asset class, this registry documents:

* **Legal Wrapper** — Common structuring approaches
* **Custody Model** — How underlying assets are held
* **Settlement Model** — Transfer and delivery mechanics
* **Attestation Standard** — Proof and audit requirements
* **Redemption Model** — How tokens convert back to underlying value
* **Jurisdictions** — Where commonly executed
* **Regulatory References** — Applicable frameworks and guidance

---

## Asset Class 1: Tokenized U.S. Treasuries / T-Bills

### Overview

Tokenized representations of U.S. Treasury securities or fund interests holding Treasuries. Primary driver of institutional RWA growth in 2024-2025.¹

### Typical Legal Structure

| Approach | Structure | Characteristics |
|----------|-----------|-----------------|
| **Fund Wrapper** | Token represents fund share/unit | Most common; fund holds Treasuries, token = fund interest |
| **SPV Note** | Token represents note issued by SPV | SPV holds Treasuries; note references value |
| **Direct Tokenization** | Token represents Treasury itself | Rare; complex title/custody issues |

**Dominant Model:** Fund wrapper with tokenized shares

### Custody Model

* **Custodian:** Regulated broker-dealer or qualified custodian under Investment Advisers Act
* **Segregation:** Client assets held separately from issuer/manager assets
* **Audit Trail:** Daily reconciliation between custodian holdings and token supply
* **Insurance:** SIPC coverage where applicable; excess coverage typical

### Settlement Model

* **Target State:** Delivery vs Payment (DvP) with atomic settlement²
* **Current State:** Varies; some T+0, some T+1 with traditional custodian settlement
* **Interoperability:** Growing focus on cross-chain settlement and traditional market infrastructure integration

### Attestation Standard

| Frequency | Attestation Type | Provider | Public/Private |
|-----------|------------------|----------|----------------|
| Daily | Holdings reconciliation | Internal | Private |
| Monthly | NAV certification | Fund administrator | Private |
| Quarterly | Proof-of-reserves | Third-party auditor | Often public |
| Annual | Full audit | Big 4 accounting firm | Private/summary public |

### Redemption Model

* **Primary Market:** Authorized participants redeem with fund/issuer
* **Cash Redemption:** USD via wire transfer (most common)
* **In-Kind Redemption:** Receive underlying Treasuries (rare; large blocks only)
* **Timing:** T+1 to T+3 typical
* **Minimums:** Often $100k+ for institutional

### Regulatory Framework

**United States:**
* SEC: Investment Company Act (if structured as fund)
* SEC: Tokenization as part of market infrastructure modernization¹
* FINRA: Broker-dealer rules if distribution involves BD activities
* State: Blue sky laws for fund distribution

**Key Considerations:**
* Transfer restrictions to qualified investors
* Form D or Reg S if private placement
* Ongoing reporting obligations

### Jurisdictions Commonly Used

* **Primary:** United States (Delaware, New York entities)
* **Secondary:** Cayman Islands (offshore fund structures)
* **Emerging:** Singapore, Switzerland, Luxembourg

### Reference Materials

1. SEC Commissioner Uyeda remarks on tokenization (May 2025)
2. Project Guardian Fixed Income workstream (ICMA/MAS collaboration)

---

## Asset Class 2: Tokenized Money Market Funds

### Overview

Traditional money market fund exposures with tokenized subscription/redemption and on-chain recordkeeping. Large banks entering market.³

### Typical Legal Structure

| Approach | Structure | Regulatory Path |
|----------|-----------|-----------------|
| **Registered MMF** | SEC-registered under Rule 2a-7 | Full SEC compliance; most conservative |
| **Private MMF** | Exempt under 3(c)(7) or similar | Qualified purchasers only |
| **Offshore Feeder** | Cayman/Luxembourg vehicle | Non-U.S. investors |

**Dominant Model:** Registered MMF with tokenized shares for institutional investors

### Custody Model

* **Custodian:** Bank or qualified custodian under Investment Company Act
* **Underlying Assets:** U.S. Treasuries, government agency debt, repo, commercial paper
* **Daily Liquidity:** 10% minimum daily liquid assets (per Rule 2a-7)
* **Weekly Liquidity:** 30% minimum weekly liquid assets

### Settlement Model

* **Subscription:** Token issued upon confirmed cash receipt
* **Redemption:** Token burned upon redemption request; cash T+1
* **NAV:** Stable $1.00 NAV (government/retail) or floating NAV (institutional)
* **DvP:** Atomic swap when possible; traditional settlement via custodian otherwise

### Attestation Standard

| Frequency | Attestation Type | Provider | Requirement |
|-----------|------------------|----------|-------------|
| Daily | Shadow pricing | Fund administrator | SEC Rule 2a-7 |
| Daily | Liquidity test | Portfolio manager | SEC Rule 2a-7 |
| Weekly | Portfolio holdings | Fund | SEC filing (if registered) |
| Annual | Full audit | Independent auditor | SEC required |

### Redemption Model

* **Same-Day:** Requests before cutoff (typically 4pm ET) settle same day
* **Cash Only:** All redemptions in USD
* **No Gates (retail):** Retail MMFs cannot gate redemptions
* **Discretionary Gates (institutional):** Permitted if liquidity falls below thresholds

### Regulatory Framework

**United States:**
* SEC Rule 2a-7 (MMF specific requirements)
* Investment Company Act (if registered)
* Form N-MFP (monthly portfolio holdings)
* Form N-CR (if material events occur)

**Key Compliance:**
* Weekly reporting to board on liquidity
* Stress testing
* Know Your Customer (AML/KYC)
* Diversification requirements

### Jurisdictions Commonly Used

* **Primary:** United States
* **Offshore:** Ireland (UCITS), Luxembourg, Cayman Islands

### Reference Materials

3. JPMorgan tokenized money market fund initiative (2024)
4. Project Guardian: Tokenized fund frameworks (MAS)

---

## Asset Class 3: Private Credit / Loan Participations

### Overview

Tokenized interests in private credit facilities, loan participations, or structured credit vehicles. Fast-growing segment.⁵

### Typical Legal Structure

| Approach | Structure | Investor Profile |
|----------|-----------|------------------|
| **SPV Note** | Token = note issued by SPV holding loans | Institutional/accredited |
| **Participation Agreement** | Token references participation in loan pool | Qualified purchasers |
| **Credit Fund Unit** | Token = interest in private credit fund | Institutional |

**Dominant Model:** SPV note structure with transfer restrictions

### Custody Model

* **Loan Documentation:** Held by administrative agent or trustee
* **Collateral:** Separate custodian if secured credit
* **Servicing:** Third-party servicer tracks payments, defaults, recoveries
* **Verification:** Quarterly loan tape and performance reporting

### Settlement Model

* **Primary Issuance:** Subscription period; tokens issued upon funding
* **Secondary Transfer:** Typically restricted; requires transfer agent approval
* **Settlement:** Bilateral transfer with updated cap table
* **No DvP (typically):** Transfers are permissioned, not atomic

### Attestation Standard

| Frequency | Attestation Type | Provider | Purpose |
|-----------|------------------|----------|---------|
| Monthly | Payment waterfall | Servicer | Cash flow verification |
| Quarterly | Loan performance | Servicer | Credit metrics, defaults |
| Quarterly | Collateral valuation | Independent appraiser | LTV, coverage ratios |
| Annual | Full audit | Big 4 or specialized firm | Financial statements |

### Redemption Model

* **No Redemption (typical):** Term notes held to maturity
* **Optional Redemption:** Issuer call provisions (if any)
* **Secondary Sale:** Investor-to-investor transfer (if permitted)
* **Maturity:** Cash distribution upon loan pool payoff or facility maturity

### Regulatory Framework

**United States:**
* Securities Act: Private placement (Reg D 506(b) or 506(c))
* Investment Advisers Act: If managed by RIA
* Dodd-Frank: If credit facility triggers swap dealer registration
* State: Blue sky exemptions

**Key Covenants:**
* Investor qualification requirements (accredited, QP, QIB)
* Transfer restrictions (no retail, no public trading)
* Information rights and reporting obligations
* ERISA restrictions (if applicable)

### Jurisdictions Commonly Used

* **Primary:** United States (Delaware SPVs), Cayman Islands
* **Secondary:** Luxembourg, Ireland (for regulated fund structures)

### Reference Materials

5. Wall Street Journal: Growth in private credit secondary markets
6. Project Guardian: Credit tokenization workstreams

---

## Asset Class 4: Real Estate (Equity or Debt)

### Overview

Tokenized interests in real property, typically structured as equity interests in property-holding entities or debt secured by real property.

### Typical Legal Structure

| Approach | Structure | Investor Rights |
|----------|-----------|-----------------|
| **LLC/LP Interest** | Token = membership interest in entity owning property | Equity (profits, appreciation, control) |
| **REIT Share** | Token = share in REIT | Dividend income, no control |
| **Debt Note** | Token = note secured by mortgage | Fixed income, security interest |
| **Fractional Ownership** | Token = undivided interest in property | Direct ownership (rare, complex) |

**Dominant Model:** LLC interest or debt note

### Custody Model

* **Title:** Held by entity (LLC/LP) or trustee (if debt)
* **Property Management:** Professional property manager
* **Escrow:** Title insurance, property insurance
* **Records:** Secretary of state filings, title registry

### Settlement Model

* **Primary Issuance:** Subscription agreement, transfer on cap table
* **Secondary Transfer:** Requires transfer agent approval (LLC operating agreement)
* **Right of First Refusal:** Common restriction in operating agreements
* **Settlement:** Days to weeks (not instant due to legal requirements)

### Attestation Standard

| Frequency | Attestation Type | Provider | Purpose |
|-----------|------------------|----------|---------|
| Monthly | Rent roll | Property manager | Occupancy, revenue |
| Quarterly | Financial statements | Property accountant | NOI, cash flow |
| Annual | Appraisal | MAI-certified appraiser | Fair market value |
| Annual | Title review | Title company | Clear title, liens |

### Redemption Model

* **No Redemption (equity):** Held until property sale or entity liquidation
* **Maturity (debt):** Principal + interest at maturity
* **Buyback Option:** Entity may have right to repurchase (not obligation)
* **Exit Event:** Property sale triggers distribution to token holders per waterfall

### Regulatory Framework

**United States:**
* Securities Act: Real estate interests typically = securities
* State: Real estate licensing laws (if operator acts as broker)
* State: Securities registration or exemption (Blue Sky)
* Federal: Reg A, Reg D, Reg S, or Reg CF (depending on offering size)

**Key Issues:**
* Transfer restrictions (securities + property law)
* Accredited investor requirements
* State-specific real estate investment laws
* ERISA "plan asset" analysis if 25%+ benefit plan investors

### Jurisdictions Commonly Used

* **Primary:** United States (Delaware entities, property location state)
* **Offshore:** Cayman Islands (for international investors)

### Reference Materials

* SEC: Real estate offerings historically treated as securities
* State securities regulators: Blue Sky compliance

---

## Asset Class 5: Commodities (Gold, Precious Metals)

### Overview

Tokenized claims on physical commodities held in vaults, warehouses, or custody. Gold is most common.

### Typical Legal Structure

| Approach | Structure | Redemption Rights |
|----------|-----------|-------------------|
| **Custody Receipt** | Token = warehouse receipt for specific bars | Physical delivery possible |
| **Allocated Account** | Token = claim on allocated metal | Specific bars identified |
| **Unallocated Account** | Token = general claim (no specific bars) | Cash or metal at custodian discretion |
| **ETF Share** | Token = share in commodity ETF | Authorized participants only (large blocks) |

**Dominant Model:** Allocated account with physical redemption rights for large holders

### Custody Model

* **Vault Operator:** Specialized commodity custodian (e.g., Brink's, Loomis, Malca-Amit)
* **Segregation:** Allocated (specific bars) vs unallocated (pooled)
* **Insurance:** All-risk insurance on full replacement value
* **Assay:** Regular verification of purity, weight, authenticity
* **Chain of Custody:** Documented movement from refiner → vault → custody

### Settlement Model

* **Token Issuance:** Upon confirmed delivery and assay of metal
* **Transfer:** On-chain transfer of token
* **Redemption:** Large holders (e.g., 400 oz gold bar minimums) can request physical delivery
* **Settlement Time:** Instant (on-chain) for token transfer; T+2 to T+5 for physical delivery

### Attestation Standard

| Frequency | Attestation Type | Provider | Purpose |
|-----------|------------------|----------|---------|
| Daily | Vault reconciliation | Vault operator | Inventory count |
| Monthly | Assay reports | Independent assayer | Verify purity/weight |
| Quarterly | Proof-of-reserves | Third-party auditor | Public attestation |
| Annual | Full audit | Big 4 or specialized firm | Financial statements |

### Redemption Model

* **Small Holders:** Cash redemption only (token burned, cash paid)
* **Large Holders:** Physical delivery option (minimum bar sizes apply)
* **Fees:** Storage fees (annual), redemption fees (physical delivery)
* **Timing:** Cash redemption T+1 to T+3; physical delivery T+5 to T+10

### Regulatory Framework

**United States:**
* CFTC: Commodity pool rules (if structured as pool)
* SEC: If structured as security (e.g., ETF shares)
* State: Warehouse receipt laws
* AML: Precious metals dealers subject to FinCEN AML requirements

**International:**
* LBMA (London Bullion Market Association): Good delivery standards
* UK: FCA regulation if dealing in commodity derivatives

### Jurisdictions Commonly Used

* **Primary:** Switzerland (Zurich vaults), United Kingdom (London vaults), United States
* **Vault Locations:** Switzerland, UK, Singapore, Canada (geopolitical diversity)

### Reference Materials

* LBMA: Good delivery standards and vault operator requirements
* CFTC: Commodity pool operator guidance

---

## Asset Class 6: Carbon Credits / Environmental Assets

### Overview

Tokenized carbon credits, renewable energy certificates (RECs), or other environmental attributes. Requires registry integration and retirement tracking.

### Typical Legal Structure

| Approach | Structure | Registry |
|----------|-----------|----------|
| **Direct Tokenization** | Token = carbon credit from registry | Verra, Gold Standard, ACR |
| **Pooled Credits** | Token = interest in pooled credit portfolio | Multiple registries |
| **Futures/Forward** | Token = forward contract for future credits | OTC or exchange |

**Dominant Model:** Direct tokenization with registry integration

### Custody Model

* **Registry:** Credits held in account on carbon registry (Verra, Gold Standard, ACR, CAR)
* **Retirement:** Credits must be "retired" in registry to claim environmental benefit
* **Double-Counting Prevention:** Token transfer must synchronize with registry transfer
* **Verification:** Third-party verification of underlying project

### Settlement Model

* **Issuance:** Token minted upon confirmed credit issuance in registry
* **Transfer:** On-chain transfer + registry transfer notification
* **Retirement:** Token burned + credit retired in registry (provable on-chain + registry)
* **Transparency:** Retirement events typically public (ESG reporting)

### Attestation Standard

| Frequency | Attestation Type | Provider | Purpose |
|-----------|------------------|----------|---------|
| Upon Issuance | Project verification | VVB (Verra), auditor | Confirm credit validity |
| Continuous | Registry sync | Registry API | Prevent double-counting |
| Upon Retirement | Retirement certificate | Registry | Proof of retirement |
| Annual | Portfolio audit | Third-party | ESG reporting |

### Redemption Model

* **Retirement:** Token holder retires credit (token burned, registry updated)
* **Resale:** Transfer to another holder (if not yet retired)
* **Corporate Use:** Company retires credits against emissions (Scope 1/2/3)
* **No Cash Redemption:** Credits cannot be "redeemed" for cash (only sold or retired)

### Regulatory Framework

**International:**
* Paris Agreement: Article 6 (international carbon markets)
* CORSIA: Aviation carbon offsetting scheme
* EU ETS: Emissions trading scheme (separate from voluntary markets)

**Voluntary Standards:**
* Verra VCS (Verified Carbon Standard)
* Gold Standard
* American Carbon Registry (ACR)
* Climate Action Reserve (CAR)

**Key Issues:**
* Additionality (would emission reduction have happened anyway?)
* Permanence (is carbon storage durable?)
* Leakage (does project cause emissions elsewhere?)
* Verification and monitoring rigor

### Jurisdictions Commonly Used

* **Project Location:** Varies (forest conservation, renewable energy, etc.)
* **Token Issuer:** Singapore, Switzerland, United States (Delaware)
* **Registry:** Global (Verra international, Gold Standard, ACR U.S./North America)

### Reference Materials

* Verra: VCS Program Guide
* ICVCM: Core Carbon Principles (quality standards)
* TSVCM: Taskforce on Scaling Voluntary Carbon Markets

---

## Summary Table: Asset Class Quick Reference

| Asset Class | Legal Wrapper | Custody | Settlement | Attestation | Redemption | Primary Jurisdictions |
|-------------|---------------|---------|------------|-------------|------------|-----------------------|
| **Treasuries/T-Bills** | Fund shares | Qualified custodian | DvP (target) | Quarterly PoR | Cash (T+1) | US, Cayman |
| **Money Market Funds** | Registered MMF | Bank custodian | T+1 cash | Daily shadow price | Same-day cash | US, Ireland |
| **Private Credit** | SPV notes | Administrative agent | Permissioned transfer | Quarterly tape | Maturity/no redemption | US, Cayman |
| **Real Estate** | LLC/LP interest | Entity (title) | Transfer agent | Annual appraisal | Sale/liquidation | US, Cayman |
| **Commodities** | Custody receipt | Vault operator | On-chain + physical | Quarterly PoR | Cash or physical | CH, UK, US |
| **Carbon Credits** | Registry credit | Carbon registry | Registry sync | Project verification | Retirement (burn) | Global (project-dependent) |

---

## Usage Guidelines

### For New Asset Classes

When evaluating tokenization of an asset not listed here:

1. **Map to closest analog** — Which existing class is most similar?
2. **Identify unique issues** — What makes this asset different?
3. **Consult legal counsel** — Regulatory classification may vary
4. **Design custody model** — Who holds the asset and how?
5. **Define redemption** — How does token convert to value?
6. **Plan attestation** — What proof is required and when?

### For Jurisdiction Selection

Consider:

* **Asset location** — Where is the underlying asset?
* **Investor base** — Where are the token holders?
* **Regulatory clarity** — Which jurisdictions have clear guidance?
* **Tax efficiency** — What is the tax treatment?
* **Enforcement** — Where can contracts be enforced?

### For Regulatory Analysis

Always address:

* **Securities law** — Is this a security? Under which test?
* **Transfer restrictions** — Who can hold? Who can transfer?
* **Custody rules** — Does Investment Advisers Act or similar apply?
* **AML/KYC** — What customer diligence is required?
* **Reporting** — What ongoing disclosures are required?

---

## Document Control

**Version:** 1.0  
**Date:** January 2026  
**Last Updated:** January 13, 2026  
**Next Review:** Quarterly or upon material regulatory developments

**Maintained By:** Legal/Compliance Team  
**References:** See footnotes for authoritative sources

---

## References

1. SEC Commissioner Uyeda, "Remarks on Tokenization" (May 2025)
2. ICMA/Project Guardian Fixed Income Workstream
3. Barron's: JPMorgan Tokenized Money Market Fund (2024)
4. Monetary Authority of Singapore: Project Guardian
5. Wall Street Journal: Private Credit Secondary Markets
6. LBMA: Good Delivery Standards
7. Verra: VCS Program Guide
8. ESMA: DLT Pilot Regime
9. FCA: Project Guardian Collaboration

---

> **Disclaimer:** This registry is provided for informational and planning purposes only. It does not constitute legal, tax, or investment advice. Each tokenization implementation requires independent legal analysis, regulatory review, and risk assessment based on specific facts, jurisdictions, and applicable laws. Consult qualified legal counsel before proceeding with any RWA tokenization project.
