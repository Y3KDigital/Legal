# Capital Structure & SPV Mechanics

## Purpose

This document explains the capital structure of the AYG platform, including the role of special purpose vehicles (SPVs), funding arrangements, and repayment mechanics.

---

## Overview

The AYG platform utilizes a structured capital approach that:

* Isolates risk through SPV structures
* Protects operating flexibility
* Provides clear repayment priority
* Enables RWA issuance for transparency

---

## Capital Stack

### Layer 1: Operating Company (AYG Insurance & Financial Services LLC)

**Role:** Platform operations, employer/participant relationships, regulated activities

**Funding Sources:**

* Operating cash flow
* Strategic funding from SPV
* Revenue from multiple streams

**Key Characteristics:**

* Maintains all licenses and regulatory relationships
* Holds customer relationships
* Operates benefit programs

---

### Layer 2: SPV Funder (OPTKAS1 LLC)

**Role:** Capital provider to operating company

**Funding Sources:**

* Institutional capital partners
* Potentially RWA-backed financing
* Credit facilities

**Key Characteristics:**

* Special purpose vehicle structure
* Limited to funding activities specified in Operating Agreement
* Isolated from operating company liabilities (where structured)

**Legal Separation:**

* Separate legal entity
* Non-consolidated for bankruptcy purposes (if structured properly)
* Independent governance

---

### Layer 3: Guarantor (TC Advantage Traders LTD)

**Role:** Provides guaranty of operating company obligations to SPV

**Key Characteristics:**

* Creditworthiness backstop
* Enforcement rights
* May provide additional capital if needed

---

## Funding Flow

```
Institutional Capital
    ↓
SPV (OPTKAS1 LLC)
    ↓
Loan/Funding Agreement
    ↓
Operating Company (AYG)
    ↓
Platform Operations
    ↓
Revenue Generation
    ↓
Repayment to SPV
```

---

## Repayment Waterfall

### Priority 1: Operating Expenses

* Payroll
* Regulatory obligations
* Critical vendor payments
* Participant benefits (absolute priority)

### Priority 2: Debt Service to SPV

* Interest payments
* Principal amortization
* Per terms of Operating & Strategic Funding Agreement

### Priority 3: Reinvestment

* Growth initiatives
* Platform development
* Market expansion

### Priority 4: Distributions

* Only after all obligations satisfied
* Subject to covenant compliance
* Requires SPV consent (where applicable)

---

## Use of Funds Restrictions

Funded capital may be used only for:

* Platform operations and maintenance
* Working capital requirements
* Strategic growth investments (as approved)
* Acquisition of complementary assets (with approval)

**Prohibited Uses:**

* Speculative investments
* Non-operating distributions
* Activities outside core business
* Violating regulatory requirements

---

## Covenants & Financial Metrics

### Financial Covenants (Typical)

* Minimum liquidity requirements
* Maximum debt-to-EBITDA ratios
* Minimum debt service coverage ratios
* Restrictions on additional indebtedness

### Operational Covenants

* Maintain all required licenses
* Compliance with regulatory requirements
* Maintain insurance coverage
* Preserve customer relationships

### Reporting Requirements

* Monthly financial statements
* Quarterly compliance certifications
* Annual audited financials
* Material event notices

---

## RWA Integration at SPV Level

### Why SPV-Level RWAs Make Sense

1. **Risk Isolation**
   * RWAs do not touch operating company or plan assets
   * Clear separation from participant funds

2. **Capital Partner Transparency**
   * Investors can track repayment streams
   * Real-time visibility into SPV position

3. **Regulatory Clarity**
   * RWAs issued by non-operating entity
   * No insurance or benefit program implications

### RWA Structure at SPV

```
SPV Issues RWA
    ↓
RWA References: Repayment stream from Operating Company
    ↓
Capital Partners Hold RWA
    ↓
RWA Provides: Visibility into cash flows, not legal rights
```

**Key Characteristics:**

* RWAs are read-only representations
* No voting or control rights
* No direct claim on operating company assets
* Subject to contractual subordination

---

## Default & Remedies

### Events of Default (Typical)

* Failure to make required payments
* Breach of covenants
* Material misrepresentation
* Bankruptcy or insolvency
* Loss of critical licenses

### Remedies

* Acceleration of obligations
* Appointment of oversight
* Enforcement of guaranty
* Asset restrictions
* Forced sale or restructuring (as permitted)

### Participant Protection

Even in default scenarios:

* Participant benefits are protected (ERISA requires)
* Plan assets remain segregated
* Operations continue to extent possible
* Regulatory obligations maintained

---

## Capital Efficiency Through Structure

### Benefits of SPV Structure

1. **Lower Cost of Capital**
   * Risk isolation commands better pricing
   * Clear repayment priority
   * Transparent reporting through RWAs

2. **Operational Flexibility**
   * Operating company not directly encumbered
   * Growth not constrained by debt covenants on operations

3. **Scalability**
   * Additional SPVs can be created for new funding rounds
   * Each SPV can have different capital partners
   * Modular approach to capital formation

---

## Exit & Liquidity Scenarios

### Scenario 1: Acquisition

* Operating company acquired
* SPV obligations paid off or assumed
* RWA holders receive distributions per terms

### Scenario 2: Refinancing

* New capital replaces SPV funding
* SPV paid off
* RWAs redeemed or converted

### Scenario 3: IPO

* Operating company goes public
* SPV obligations refinanced or repaid
* RWAs converted to equity or cash

### Scenario 4: Continued Operations

* SPV debt paid down over time
* RWAs track declining obligation
* Normal course repayment

---

## Regulatory Capital Treatment (For Institutional Investors)

Depending on investor type:

* **Banks:** May receive favorable risk weighting for RWA-backed positions
* **Insurance Companies:** May qualify for certain capital credit
* **Investment Funds:** Transparent reporting reduces due diligence burden

*Note: Actual treatment varies by jurisdiction and investor type*

---

## Summary

The AYG capital structure is designed to:

* Protect participant interests (always first priority)
* Provide clarity and transparency to capital partners
* Enable efficient capital formation
* Support aggressive growth without excessive dilution

RWAs at the SPV level enhance transparency without touching regulated operations.

---

## Related Documentation

* [Economic Model](../03-economic-model/rwa-capital-efficiency.md) — Capital efficiency analysis
* [Program Architecture](../01-program-overview/program-architecture.md) — System design
* [Legal Boundaries](../02-legal-compliance/rwa-boundary-analysis.md) — Compliance framework
