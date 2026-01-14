# Cosmos / IBC Modules

Cosmos SDK modules for RWA and stablecoin workflows.

## Structure

- `x/rwa/` — RWA token module with compliance hooks
- `x/stablecoin/` — Stablecoin module with reserve attestation
- `x/compliance/` — Compliance registry module (KYC, sanctions)

## Build

Requires Go + Cosmos SDK:

```bash
go build ./...
```

## IBC Integration

- ICS-20 token transfers with compliance middleware
- Custom IBC packets for cross-chain attestation

## Notes

- Modules can be integrated into custom Cosmos chain
- Use wasmd for CosmWasm smart contract alternative
- Consider IBC rate limiting for stablecoin transfers
