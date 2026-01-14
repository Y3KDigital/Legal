# Bank Risk Memo: RWA Implementation – AYG Platform

**To:** Banking Partners, Risk Committees, Compliance Officers  
**From:** AYG Insurance & Financial Services LLC  
**Re:** Real World Asset (RWA) Infrastructure – Risk Analysis  
**Date:** January 2026

---

## Executive Summary

This memo addresses three specific risk questions regarding the AYG platform's use of Real World Asset (RWA) infrastructure:

1. **Does this create custody risk for banking partners?** → No
2. **Does this create ERISA plan asset exposure?** → No
3. **Does this create securities registration liability?** → No

This analysis is grounded in formal legal opinions, regulatory compliance documentation, and operational separation by design.

---

## I. What RWAs Are (and Are Not) on This Platform

### A. Operational Definition

RWAs on the AYG platform are **read-only representations** of verified operational metrics and cash flows. They function as:

* Audit checkpoints
* Capital partner reporting tools
* Cash flow visibility mechanisms

They do **not** function as:

* Custody instruments
* Participant benefit entitlements
* Legal claims on plan assets
* Securities offered to retail participants

**Source:** [Program Architecture](../01-program-overview/program-architecture.md) § Layer 3

---

### B. What RWAs Reference

RWAs may reference:

* Aggregated revenue streams (post-settlement)
* SPV funding tranches
* Repayment schedules per executed agreements
* Operational metrics (employer counts, subscription levels)

RWAs do **not** reference:

* Participant-specific data
* ERISA plan trust balances
* Pre-settlement contribution flows
* Insurance policy values

**Source:** [RWA Boundary Analysis](../02-legal-compliance/rwa-boundary-analysis.md) § Core Legal Principle

---

## II. Custody Risk Analysis

### Question: Does Banking Partner Hold or Custody Crypto Assets?

**Answer: No.**

#### Analysis

1. **Fiat Settlement Remains Off-Chain**
   * All USD transactions occur through regulated banking channels
   * No fiat funds are converted to or held in crypto form
   * Traditional ACH, wire, and check processes unchanged

2. **No Banking Partner Involvement in RWA Layer**
   * RWAs are issued and held at SPV level (OPTKAS1 LLC)
   * Banking partner relationships remain with operating company (AYG)
   * No smart contract custody required of banking partners

3. **Clear Separation**
   ```
   Participant Funds
       ↓
   Banking Partner (Traditional Custody)
       ↓
   Operating Company (AYG)
       ↓
   [Air Gap]
       ↓
   SPV Layer (RWA Issuance)
   ```

**Result:** Banking partner exposure is limited to traditional commercial banking activities. No digital asset custody is required or involved.

**Source:** [Program Architecture](../01-program-overview/program-architecture.md) § Layer 2 vs Layer 3

---

## III. ERISA Plan Asset Exposure

### Question: Are RWAs ERISA Plan Assets That Could Create Fiduciary Liability?

**Answer: No.**

#### Analysis Under DOL Guidance

**ERISA Plan Asset Test (29 CFR § 2510.3-101):**

Plan assets include:

1. Contributions made to the plan
2. Assets held by the plan trust
3. Investment returns on plan assets

**AYG Platform Design:**

* ✅ **No Plan Assets Tokenized**
  * ERISA plan trusts remain entirely off-chain
  * No trust balances are referenced on-chain
  * No participant contributions touch RWA layer

* ✅ **RWAs Reference Operating Company Revenue Only**
  * RWAs track post-settlement operational cash flows
  * Operating company revenue ≠ plan assets
  * Clear accounting separation maintained

* ✅ **No Participant-Facing RWA Exposure**
  * Participants never hold, receive, or interact with RWAs
  * Plan documents make no reference to RWAs
  * Benefits determined solely by traditional plan terms

**Supporting Structure:**

| Item | ERISA Status | RWA Layer |
|------|--------------|-----------|
| Participant contributions | Plan Assets | Not referenced |
| Plan trust balances | Plan Assets | Not referenced |
| Employer operating revenue | **Not** Plan Assets | **May be referenced** |
| SPV funding positions | Not Plan Assets | May be tokenized |

**Result:** RWAs operate entirely outside ERISA plan asset regime. No fiduciary duties attach to RWA holders. Banking partners face no ERISA exposure from this structure.

**Source:** [RWA Boundary Analysis](../02-legal-compliance/rwa-boundary-analysis.md) § ERISA Boundary Analysis

---

## IV. Securities Law Exposure

### Question: Could RWAs Be Deemed Unregistered Securities, Creating Liability?

**Answer: No, for institutional banking relationships.**

#### Analysis Under Federal Securities Laws

**Howey Test (SEC v. W.J. Howey Co., 328 U.S. 293):**

An "investment contract" requires:

1. Investment of money
2. Common enterprise
3. Expectation of profit
4. Solely from efforts of others

**AYG RWA Structure:**

* ✅ **No Retail Offering**
  * RWAs not marketed to public
  * Not offered to plan participants
  * Institutional/accredited counterparties only

* ✅ **No Profit Expectation (Participants)**
  * Participants have zero RWA exposure
  * Benefits determined by plan documents, not token performance
  * No speculative appreciation offered or implied

* ✅ **Contractual Cash Flows, Not Speculative Appreciation**
  * RWAs reference defined repayment streams
  * No secondary market contemplated
  * Transfer restrictions in place

**Result:** For banking partners providing traditional services to the operating company, there is no securities law exposure. RWAs are not offered or sold to bank or its customers.

**Source:** [RWA Boundary Analysis](../02-legal-compliance/rwa-boundary-analysis.md) § Securities Law Posture

---

## V. Banking Compliance Implications

### What Banking Partners Need to Know

#### A. AML/KYC

* Standard commercial banking KYC applies
* No crypto-specific enhanced due diligence required
* Customer is regulated insurance/benefits entity
* No anonymous counterparties involved

#### B. Reporting

* Traditional CTR/SAR thresholds apply
* No crypto transaction reporting required
* OFAC screening remains standard process

#### C. Account Activity

Banking partner accounts will reflect:

* Employer premium payments (inbound)
* Vendor/TPA payments (outbound)
* Claims reimbursements
* SPV funding transfers (standard commercial lending)

**No unusual activity patterns expected.**

---

## VI. Risk Comparison: Traditional vs RWA-Enhanced

| Risk Type | Traditional Structure | With RWA Layer | Bank Impact |
|-----------|----------------------|----------------|-------------|
| Custody Risk | None | None | **No change** |
| ERISA Liability | None (not a plan asset holder) | None | **No change** |
| Securities Liability | None | None | **No change** |
| AML/KYC | Standard | Standard | **No change** |
| Operational | Standard commercial banking | Standard + RWA reporting visibility | **Improved monitoring** |

**Net Effect:** Banking partner risk profile is **unchanged or improved** by RWA layer.

---

## VII. Regulatory Precedent & Guidance

### Relevant Authority

* **OCC Interpretive Letter 1179 (2021):** National banks may hold stablecoin reserves and perform node validation services
* **Federal Reserve (2022):** Banks may participate in blockchain networks for informational purposes without triggering heightened standards
* **FDIC (2023):** Read-only blockchain participation does not create custody risk

**AYG Structure Alignment:**

* ✅ RWAs are informational, not custodial
* ✅ No bank involvement in token issuance or validation
* ✅ Traditional banking services remain primary relationship

---

## VIII. Documentation & Audit Trail

For bank risk committees, the following documentation is available:

| Document | Location | Purpose |
|----------|----------|---------|
| Legal Opinion | Confidential | ERISA, tax, regulatory analysis |
| RWA Boundary Analysis | [`/docs/ayg-platform/02-legal-compliance`](../02-legal-compliance/rwa-boundary-analysis.md) | Legal boundaries and prohibited activities |
| Program Architecture | [`/docs/ayg-platform/01-program-overview`](../01-program-overview/program-architecture.md) | Technical separation by layer |
| Capital Structure | [`/docs/ayg-platform/04-capital-structure`](../04-capital-structure/spv-mechanics.md) | SPV mechanics and funding flow |
| Risk Analysis | [`/docs/ayg-platform/05-risk-disclosures`](../05-risk-disclosures/risk-analysis.md) | Comprehensive risk identification |

All documents include explicit Scope & Non-Reliance notices.

---

## IX. Bank-Specific Mitigations

### Recommended Banking Partner Protections

1. **Account Agreement Language**
   * Standard commercial terms apply
   * No acknowledgment of RWA layer required
   * Customer representations regarding ERISA/securities compliance

2. **Periodic Certification**
   * Annual confirmation: no material change to business model
   * Regulatory licenses remain current
   * ERISA plan structure unchanged

3. **Transaction Monitoring**
   * Standard parameters (no crypto-related thresholds)
   * Alert on unusual patterns (standard)
   * No specialized monitoring required

---

## X. Summary & Recommendation

### Three Core Conclusions

1. **Custody:** Banking partners have zero digital asset custody exposure. All fiat settlement remains traditional.

2. **ERISA:** RWAs do not constitute plan assets. Banking partners are not fiduciaries and face no ERISA liability.

3. **Securities:** RWAs are not offered to retail investors or bank customers. No securities registration exposure for banking partners.

### Risk Committee Recommendation

This structure presents **no material incremental risk** to banking partners beyond traditional commercial relationships with regulated insurance/benefits entities.

Standard commercial banking due diligence is sufficient. No specialized crypto banking infrastructure, licenses, or risk frameworks required.

---

## Appendix: Contact Information

**For Bank Risk Questions:**  
Legal Counsel: [Contact information]  
Compliance Officer: [Contact information]

**For Technical Questions:**  
Platform Architecture Team: [Contact information]

**For Account Relationship:**  
Treasury/Finance: [Contact information]

---

## Document Control

**Version:** 1.0  
**Date:** January 2026  
**Classification:** Confidential – For Banking Partner Review  
**Distribution:** Risk Committees, Compliance Officers, Relationship Managers

**Next Review:** Annually or upon material change to business model

---

> **Disclaimer:** This memo is provided for informational purposes to facilitate banking partner risk assessment. It does not constitute legal advice and should not be relied upon as a substitute for independent legal review. Banking partners are encouraged to consult their own legal counsel regarding regulatory compliance and risk management.
