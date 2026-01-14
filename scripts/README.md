# Scripts

Validation and utility scripts for the repository.

## State Machine Validation

### validate_state_machines.py

Validates YAML state machines against schema and business rules.

**Usage**:
```bash
python scripts/validate_state_machines.py
```

**Validations**:
- ✅ Required fields (name, description, states, initial_state)
- ✅ State structure (id, name, required_evidence, controls)
- ✅ Evidence structure (id, owner_role, storage_ref)
- ✅ Control references (files exist in compliance/controls/)
- ✅ Transition validity (target states exist)
- ✅ Guard structure (type field present)
- ✅ Initial state exists
- ✅ No duplicate state IDs

**Exit Codes**:
- `0`: All validations passed
- `1`: One or more validations failed

**Example Output**:
```
############################################################
# State Machine Validation
############################################################

============================================================
Validating: rwa_issuance.yaml
============================================================
✓ PASSED

============================================================
Validating: stablecoin_lifecycle.yaml
============================================================
✓ PASSED
  WARNING: State 'launch': evidence missing 'owner_role'

============================================================
SUMMARY
============================================================
Total: 3 | Passed: 3 | Failed: 0
```

## Future Scripts

### validate_contracts.sh (TODO)
Run Foundry tests and check code coverage.

### validate_jurisdictions.py (TODO)
Check jurisdiction documentation completeness (sources, citations).

### generate_compliance_report.py (TODO)
Generate compliance coverage report across state machines, controls, and jurisdictions.
