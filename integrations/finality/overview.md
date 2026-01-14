# Finality Concepts

**Note**: This file addresses general "finality" concepts. For **Fnality** (the wholesale payment system), see [../fnality/overview.md](../fnality/overview.md).

## What is Finality?

**Finality** = the point at which a transaction is irreversible and cannot be rolled back.

## Types of Finality

### 1. Probabilistic Finality (Bitcoin, Ethereum PoW)
- More blocks = more expensive to reorg
- Never 100% final, but practically final after N confirmations

### 2. Deterministic Finality (Ethereum PoS, Cosmos Tendermint)
- Once finalized, transaction cannot be reverted without majority validator collusion
- Faster and more certain

### 3. Legal/Settlement Finality
- Finality defined by legal framework (e.g., UCC Article 4A for wire transfers)
- On-chain finality ≠ legal finality (depends on jurisdiction)

## Implications for Compliance

- **Securities settlement**: T+0 on-chain may still require T+1 legal settlement
- **Payment finality**: Important for stablecoin redemptions (when is payment irrevocable?)
- **Dispute resolution**: If on-chain transaction is final but legally disputed, what happens?

## Operational Assumptions

- Assume deterministic finality for Ethereum PoS (2 epochs = ~13 minutes)
- Assume probabilistic finality for Bitcoin (6 confirmations = ~1 hour)
- Assume instant finality for permissioned chains (e.g., Fnality, enterprise DLT)

## Dispute Handling

- On-chain finality does not prevent legal disputes
- Build dispute resolution into legal agreements (arbitration, courts)
- Consider insurance/indemnification for finality-related losses

## Control Mapping

- Maps to `reporting` control (finality timestamp is key for audit trails)
- Maps to state machine transitions (e.g., "payment finalized" gate)
