# Lawfirm + CPA Shared Repo (RWA / Securities / Stablecoins)

This repository is a shared working system for an attorney and CPA team building compliant product + protocol workflows for:

- RWA tokenization / issuance programs
- Securities analysis and offering workflows
- Stablecoin and payment-rail integration workflows
- Multi-chain smart contract implementations
- A modular, separated AI system to support legal/tax/compliance workstreams

## Important

- This repo is **not legal advice** and **not tax advice**.
- Jurisdiction-specific rules change. Treat all jurisdiction content as **draft until reviewed and signed off** by licensed professionals.
- “No mistakes / missing nothing” is not realistic for global compliance. The goal is **defensible process**: clear gates, review evidence, audit trails, and controlled templates.

## Repo Structure

- `docs/` — human-readable playbooks, checklists, flow trees  - `docs/ayg-platform/` – **AYG Insurance & Financial Services Platform** — Complete documentation for real-world RWA implementation including ERISA-compliant benefits, SPV capital structure, and institutional-grade RWA integration- `compliance/` — machine-readable policy packs + state machines
- `agents/` — AI agent separation: prompts, routing, tools, and boundaries
- `contracts/` — smart contract implementations by chain
- `integrations/` — payment rails, oracle, and messaging integrations (specs + adapters)
- `.github/` — PR templates, CODEOWNERS, CI

## Start Here

### For General RWA/Securities Work:

1. Read `docs/00-vision/vision.md`
2. Define the target product(s) in `docs/30-product-flows/`
3. Fill the jurisdiction matrix template in `docs/20-jurisdictions/jurisdiction-matrix.template.csv`
4. Customize state machines in `compliance/state_machines/`

### For AYG Platform Review:

1. Start with [`docs/ayg-platform/00-executive-summary/README.md`](docs/ayg-platform/00-executive-summary/README.md)
2. Review role-specific documentation per the [AYG Platform README](docs/ayg-platform/README.md)
3. See real-world implementation of RWA frameworks in regulated environment

## How We Work

- All deliverables must map to a state machine gate (evidence-based).
- Every jurisdiction has an explicit owner and review sign-off.
- AI assistance is separated by domain and must not cross boundaries without explicit escalation.

See `CONTRIBUTING.md`.
