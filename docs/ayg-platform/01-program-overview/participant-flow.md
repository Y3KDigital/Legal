# Participant Flow & Lifecycle

## Purpose

This document describes the end-to-end participant journey through the AYG platform, from eligibility determination through ongoing engagement and benefit realization.

---

## Phase 1: Eligibility & Enrollment

### Employer Setup

1. Employer adopts Cafeteria Plan under IRC §125
2. Employer establishes Self-Insured Concierge Managed Medical Plan
3. Employer configures eligibility criteria (typically: full-time employees, 30+ days of service)
4. Employer communicates open enrollment or new hire eligibility

### Participant Election

1. Eligible employee receives enrollment materials
2. Employee elects:
   * Minimum Essential Coverage (MEC) — typically required
   * Health FSA contribution amount (optional, pre-tax)
   * After-Tax Account (ATA) contribution (optional, post-tax)
   * Wellness program participation (optional)

3. Elections are made through salary reduction agreement for pre-tax components
4. ATA elections processed as post-tax payroll deductions

### Tax Characterization at Enrollment

| Component | Tax Treatment | Source |
|-----------|---------------|--------|
| MEC Premium | Pre-tax (IRC §125) | Salary reduction |
| Health FSA | Pre-tax (IRC §125) | Salary reduction |
| ATA Contribution | Post-tax | After-tax deduction |
| Employer Contribution | N/A (not income to employee) | Employer funds |

---

## Phase 2: Active Participation

### Medical Services Access

1. Participant schedules preventive care appointment
2. Services are provided by network providers or concierge service
3. Claims are processed by TPA
4. Eligible expenses are paid from appropriate account (MEC, FSA, ATA)

### Wellness Engagement

1. Participant completes wellness activities:
   * Health risk assessments
   * Biometric screenings
   * Condition management programs
   * Educational modules

2. Activities are tracked in platform system
3. Completion triggers eligibility for certain rewards (subject to program rules)

### Contribution Flow

```
Employee Paycheck
    ↓
Pre-tax: §125 Salary Reduction → MEC + FSA
Post-tax: Payroll Deduction → ATA
    ↓
Administrator/TPA Holds Funds
    ↓
Claims Processing & Reimbursement
```

---

## Phase 3: Rewards & Incentives

### Triggering Events

Rewards may be earned based on:

* Completion of wellness activities
* Participation in preventive care
* Engagement milestones
* Specific health outcomes (subject to regulatory limits)

**Important:** Rewards are **not** guaranteed payments. They are contingent on participation and program rules.

### Tax Treatment of Rewards

Reward payments are generally taxable income to the participant unless:

* Structured as medical care reimbursements under IRC §213(d)
* Qualify under specific IRS guidance for wellness program rewards

Detailed tax treatment is documented in [tax-treatment.md](tax-treatment.md).

### Payment Mechanics

1. Participant completes qualifying activity
2. Activity is verified by administrator
3. Reward is calculated per program rules
4. Payment is issued (typically via check, direct deposit, or account credit)
5. Tax reporting occurs as required (W-2 or 1099-MISC)

---

## Phase 4: Claims & Reimbursements

### Health FSA Claims

1. Participant incurs eligible medical expense
2. Participant submits claim with documentation
3. Administrator verifies eligibility under IRC §213(d)
4. Reimbursement issued from FSA balance

### ATA Utilization

1. Participant elects to use ATA balance
2. Funds are available for participant direction
3. No tax consequences on distribution (already taxed at contribution)

### MEC Benefits

1. Covered services are provided
2. Claims processed by TPA
3. Benefits paid according to plan terms

---

## Phase 5: Ongoing Compliance & Maintenance

### COBRA Continuation

If participant experiences qualifying event:

1. Employer provides COBRA notice
2. Participant elects to continue coverage
3. Participant pays full premium plus 2% admin fee
4. Coverage continues for qualified period (typically 18 months)

### ACA Reporting

1. Employer reports MEC coverage on Form 1095-C
2. Participant receives copy for tax filing
3. Satisfies individual mandate requirement (if applicable)

### Annual Re-enrollment

1. Open enrollment period occurs annually
2. Participant reviews and updates elections
3. New salary reduction agreements executed
4. Changes effective for new plan year

---

## Phase 6: Separation & Termination

### Employee Termination

1. Employment ends
2. Benefits cease per plan terms (typically end of month)
3. Final paycheck processed with final deductions
4. COBRA notice provided (if applicable)
5. Unused FSA balance subject to forfeiture rules
6. ATA balance treatment per plan terms

### Plan Termination

If employer terminates plan:

1. Advance notice provided to participants
2. Claims processed through termination date
3. FSA balances settled per plan rules
4. COBRA rights evaluated

---

## Data Flow & Privacy

Throughout lifecycle:

* Participant data is protected under HIPAA (medical information)
* Payroll data handled per standard employment practices
* Plan administration data shared only with service providers
* No participant-specific data exposed to RWA layer

---

## Participant Rights & Protections

Participants retain all rights under:

* ERISA (if applicable)
* ACA
* COBRA
* HIPAA
* State insurance laws

No RWA, token, or on-chain representation alters these rights.

---

## Summary

The participant lifecycle is structured to maximize compliance while providing flexible, tax-advantaged benefits. RWA infrastructure operates entirely separately and does not touch participant data or benefits.

---

## Related Documentation

* [Program Architecture](program-architecture.md) — System design
* [Tax Treatment](../02-legal-compliance/tax-treatment.md) — Detailed tax analysis
* [Regulatory Mapping](../02-legal-compliance/regulatory-mapping.md) — Compliance framework
