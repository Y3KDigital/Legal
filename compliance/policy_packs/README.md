# Policy Packs

Policy packs are **jurisdiction-specific overrides and additions** to the base compliance state machines and controls.

## Structure

Each jurisdiction has a policy pack YAML file:

```
policy_packs/
  us.yaml
  eu.yaml
  uk.yaml
  sg.yaml
  ...
```

## Schema

```yaml
jurisdiction: US
version: 0.1
overrides:
  - state_machine: rwa_issuance
    state: offering_design
    additional_evidence:
      - id: form_d_filing
        type: filing
        owner_role: legal
        storage_ref: "docs/filings/"
    additional_controls:
      - accredited_investor_verification
  
  - control: kyc_aml
    additional_requirements:
      - id: 31 CFR 1010.220 CIP
        description: "Customer Identification Program per Bank Secrecy Act"
        owner_role: compliance

additions:
  - control_id: accredited_investor_verification
    description: "Verify accredited investor status per Reg D"
    requirements:
      - id: income_verification
        description: "Verify $200k income or $1m net worth"
        owner_role: compliance
```

## Usage

When evaluating compliance for a jurisdiction:
1. Load base state machine / control
2. Apply jurisdiction policy pack overrides
3. Add jurisdiction-specific requirements

## Notes

- Policy packs are **source-controlled** and **versioned**
- Changes to policy packs require legal review
- Multiple jurisdictions may apply (user in US, issuer in SG, trading in EU)
