# Finality (Fnality)

## Overview

**Fnality** is a wholesale payment system using distributed ledger technology for 24/7 central bank-backed settlement.

Fnality operates tokenized deposits (backed 1:1 by central bank reserves) on a permissioned DLT, enabling instant, final settlement between financial institutions.

## Architecture

```
FI A <-> Fnality DLT <-> FI B
         |
    Central Bank Reserve Account
```

## Use Cases

### 1. Wholesale Stablecoin Settlement
Use Fnality tokens (e.g., GBP, EUR, USD) for:
- Instant settlement between institutions
- Atomic DvP (Delivery vs Payment) for tokenized securities
- Cross-border payments with finality

### 2. RWA Settlement
Settle RWA token transactions using Fnality tokenized deposits:
- Tokenized asset transfer on your chain
- Payment leg settled on Fnality
- Atomic swap or coordinated settlement

## Integration Points

### API Integration
- Fnality provides API for payment instructions
- Webhook notifications for settlement confirmations
- Reconciliation reports

### Smart Contract Integration (if supported)
- Atomic swap contracts linking your token transfer to Fnality payment
- Escrow patterns for DvP

## Membership & Onboarding

- Fnality is **permissioned**: only approved financial institutions can participate
- Requires onboarding, legal agreements, and connectivity setup
- Each jurisdiction (UK, EU, US, etc.) may have separate Fnality entity

## Risk Considerations

- **Permissioned access**: Not open to all; requires institutional status
- **Jurisdiction-specific**: Fnality operates separate networks per currency/region
- **Finality guarantees**: Payments are final, but technical failures could delay
- **Central bank dependency**: Tokens backed by CB reserves; CB policy changes could affect operations

## Control Mapping

- Maps to `reserve_custody` (Fnality tokens are backed by CB reserves)
- Maps to `reporting` (Fnality provides settlement records for audit)
- Maps to `kyc_aml` (Fnality members are regulated financial institutions)

## Compliance Notes

- Fnality members are already regulated entities (banks, broker-dealers)
- Your integration inherits Fnality's compliance posture (strong)
- Ensure your token is compatible with Fnality's DvP requirements (atomic settlement)

## References

- [Fnality International](https://www.fnality.org/)
- Fnality whitepapers and technical documentation (requires member access)
