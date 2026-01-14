# RWA Legal Boundary & Compliance Analysis

> **Scope & Non-Reliance Notice**
>
> This document describes architectural, operational, and compliance design principles.
> It does not create legal rights, modify plan documents, or substitute for licensed legal,
> tax, or regulatory advice. All legally operative rights arise solely from executed
> agreements, plan documents, and applicable law.

## Purpose

This document defines the explicit legal, regulatory, and compliance boundaries governing the use of Real World Asset (RWA) representations within the AYG platform. It is written to prevent category errors between regulated benefit plans, insurance products, financial instruments, and on-chain representations.

This document is intentionally conservative. It is designed to withstand review by ERISA counsel, tax counsel, banking partners, auditors, and regulators.

---

## Core Legal Principle

**RWAs on the AYG platform are representational infrastructure, not operative legal instruments.**

They do not create, modify, replace, or evidence participant rights, insurance coverage, or benefit entitlements. All legally operative rights arise exclusively from off-chain plan documents, contracts, and regulated relationships.

---

## ERISA Boundary Analysis

### ERISA Plan Assets

Under ERISA, plan assets are determined by reference to:

* Plan documents
* Trust arrangements
* Contribution flows
* Participant entitlements

**Design Safeguards:**

* No plan assets are tokenized
* No plan trusts are mirrored on-chain
* No RWA references participant-specific balances
* No RWA is funded directly from ERISA trust accounts

RWAs may reference **aggregated, post-settlement operational revenues** only.

**Result:** RWAs do not constitute ERISA plan assets.

---

## IRS & Tax Boundary Analysis

### Cafeteria Plan & MEC Interaction

* Pre-tax contributions remain fully off-chain
* RWA systems do not receive or process salary-reduction dollars
* ATA funds remain employer/participant controlled until spent

### Reward Payments

* Rewards are earned through participation and triggering events
* RWAs do not represent rewards, reward rights, or future payments
* RWAs may reference aggregate reward expense metrics for reporting only

**Result:** No RWA alters tax characterization under IRC §§105, 125, or 213.

---

## Securities Law Posture

### Not Investment Contracts

RWAs are structured to avoid the elements of an investment contract under the Howey Test:

* No expectation of profit from managerial efforts of others for participants
* No pooling of participant capital
* No retail offering of RWA instruments

Where RWAs are issued to capital partners:

* Counterparties are institutional or accredited
* RWAs reference contractual cash flows, not speculative appreciation
* Transfer restrictions apply

**Result:** RWAs are not offered as retail securities.

---

## Banking & Custody Boundaries

* RWAs do not custody fiat
* RWAs do not substitute for bank accounts
* All fiat settlement occurs through regulated banking channels

On-chain systems are **read-only mirrors**, not custodial systems.

---

## Prohibited RWA Activities (Explicit)

The platform explicitly prohibits RWAs that:

* Represent insurance policies
* Represent plan benefits
* Represent participant entitlements
* Grant governance rights over plan operations
* Encumber plan assets or contributions

Any proposal triggering these conditions is rejected by design.

---

## Compliance Control Framework

Before any new RWA class is introduced:

1. Legal classification memo is prepared
2. ERISA asset analysis is performed
3. Tax characterization is reviewed
4. Securities posture is documented
5. Banking partner non-objection is obtained (where applicable)

---

## Documentation Requirements

All RWA issuances must be accompanied by:

* Clear disclaimers stating RWAs do not represent plan benefits
* Explicit acknowledgment of regulatory boundaries
* Restriction on transfer to non-qualified parties
* Acknowledgment of read-only nature of representations

---

## Regulatory Reporting Implications

RWAs do not alter existing regulatory reporting obligations:

* Form 5500 filings remain unchanged
* Plan audits are conducted using traditional methods
* IRS reporting follows existing guidance
* ACA reporting is unaffected

RWAs may be used as **internal reconciliation tools** to support, not replace, regulatory filings.

---

## International Considerations

Where platform operations extend internationally:

* Local securities laws are evaluated independently
* RWAs are not issued in jurisdictions where classification is uncertain
* Legal opinions are obtained before cross-border deployment

---

## Summary

This boundary framework allows AYG to leverage RWA infrastructure for transparency and capital efficiency while preserving strict compliance with U.S. benefits, tax, and financial regulations.

**RWAs enhance observability—not legal rights.**

---

## Related Documentation

* [Program Architecture](../01-program-overview/program-architecture.md) — Technical implementation
* [Capital Efficiency Model](../03-economic-model/rwa-capital-efficiency.md) — Economic rationale
* [Risk Disclosures](../05-risk-disclosures) — Regulatory risk factors
