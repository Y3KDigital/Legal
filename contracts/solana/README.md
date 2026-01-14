# Solana Programs (Rust)

Solana-specific token programs for RWA and stablecoin issuance.

## Structure

- `rwa-token/` — RWA token program with transfer restrictions
- `stablecoin/` — Stablecoin program with mint/burn authority separation
- `compliance/` — On-chain compliance registry (allowlist, sanctions screening)

## Build

Requires Rust + Solana CLI:

```bash
cargo build-bpf
```

## Deploy

```bash
solana program deploy target/deploy/rwa_token.so
```

## Notes

- Use Anchor framework for production
- Implement CPI to compliance program for checks
- Consider using Token-2022 (Token Extensions) for native transfer hooks
