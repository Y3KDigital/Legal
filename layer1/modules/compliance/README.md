# Compliance Module

On-chain compliance enforcement module for custom Layer 1.

## Features

- Identity registry (KYC status, jurisdiction)
- Sanctions screening (oracle-based or on-chain list)
- Transfer restriction enforcement
- Policy pack storage and evaluation

## State

```rust
pub struct Identity {
    pub address: AccountId,
    pub kyc_status: KYCStatus,
    pub jurisdiction: String,
    pub tier: u8, // 0 = none, 1 = basic, 2 = enhanced
    pub expiry: BlockNumber,
}

pub struct PolicyPack {
    pub jurisdiction: String,
    pub version: String,
    pub uri: String, // IPFS or on-chain storage
}

pub struct SanctionsEntry {
    pub address: AccountId,
    pub listed_at: BlockNumber,
    pub source: String, // "OFAC", "UN", etc.
}
```

## Extrinsics (Transactions)

### `register_identity(address, kyc_status, jurisdiction, proof)`
Register or update identity. Requires proof from KYC oracle or authorized provider.

### `add_to_sanctions_list(address, source)`
Add address to sanctions list. Requires `COMPLIANCE_ROLE` authority.

### `update_policy_pack(jurisdiction, version, uri)`
Update jurisdiction policy pack. Requires governance approval.

## Hooks

### `before_transfer(from, to, amount) -> Result<(), Error>`
Called before every token transfer. Checks:
- KYC status of both parties
- Sanctions screening
- Jurisdiction policy compliance
- Transfer restrictions

### `before_mint(to, amount) -> Result<(), Error>`
Called before minting. Checks policy pack rules for issuance.

## Events

```rust
IdentityRegistered { address, jurisdiction, tier }
SanctionsListed { address, source }
PolicyPackUpdated { jurisdiction, version }
ComplianceCheckFailed { from, to, reason }
```

## Queries

- `get_identity(address) -> Option<Identity>`
- `is_sanctioned(address) -> bool`
- `get_policy_pack(jurisdiction) -> Option<PolicyPack>`
- `can_transfer(from, to, amount) -> bool`

## Implementation Notes

- Use Cosmos SDK `x/compliance` module (if Cosmos)
- Use Substrate `pallet-compliance` (if Substrate)
- Integrate with oracle for off-chain KYC data
