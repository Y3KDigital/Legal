# Contributing

## Goals

- Build repeatable, compliant-by-design templates.
- Keep legal, tax, and engineering responsibilities clearly separated.
- Maintain a defensible audit trail for decisions.

## Ground Rules

- No jurisdiction-specific claims without citing primary sources in `docs/20-jurisdictions/<jurisdiction>/sources.md`.
- Every workflow step must reference a control/gate in a state machine in `compliance/state_machines/`.
- Changes that affect regulated characterization (security/commodity/payment instrument) require review from:
  - Legal owner (attorney)
  - Tax owner (CPA)
  - Engineering owner (smart contracts)

## Pull Requests

- Use the PR template.
- Link the issue.
- Include:
  - What changed
  - Why
  - Evidence / citations
  - Risk assessment
  - Rollback plan (if code)

## File Conventions

- `docs/` is narrative + checklists.
- `compliance/` is structured YAML/JSON used by tooling.
- `agents/` contains prompts and routing rules; do not store secrets.
