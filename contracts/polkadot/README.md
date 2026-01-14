# Polkadot / Substrate Pallets

Substrate pallets for RWA and stablecoin issuance on Polkadot/Kusama or custom Substrate chains.

## Structure

- `pallet-rwa/` — RWA token pallet with transfer restrictions
- `pallet-stablecoin/` — Stablecoin pallet with reserve controls
- `pallet-compliance/` — Compliance registry pallet

## Build

Requires Rust + Substrate:

```bash
cargo build --release
```

## Integration

Add to runtime's `construct_runtime!` macro and configure in `lib.rs`.

## Notes

- Can use XCM for cross-parachain transfers
- Consider using Assets pallet as base and extend with compliance logic
- Ink! smart contracts are alternative to pallets for simpler deployments
