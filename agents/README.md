# AI Systems (Separated)

This repo assumes **separate AI systems** per domain to reduce cross-contamination and to enforce review gates.

## Domains

- `agents/securities/` — securities characterization + offering process (jurisdiction-sensitive)
- `agents/tax/` — tax posture and memos (CPA)
- `agents/contracts/` — smart contract drafting + analysis (engineering)
- `agents/jurisdiction/` — jurisdiction pack assistance; never asserts without sources
- `agents/orchestrator/` — routing + escalation rules

## Safety & Compliance

- AI output is never final; it produces drafts, checklists, and issue-spotting.
- Jurisdiction claims require sources and human review sign-off.
