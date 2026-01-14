# RLN (Rate Limiting Nullifier) Integration

## Overview

**RLN** (Rate Limiting Nullifier) is a zero-knowledge protocol for rate limiting and spam prevention while preserving privacy.

Originally developed for private messaging systems, RLN can be applied to:
- Anti-spam for token distributions
- Proof-of-unique-human without revealing identity
- Rate-limited actions while maintaining privacy

## Architecture

```
User -> ZK Proof (RLN) -> Smart Contract -> Verify & Rate Limit
```

## Use Cases in Compliance Context

### 1. Privacy-Preserving KYC Attestation
User proves they are KYC'd without revealing which KYC provider or personal details.

**Flow**:
1. KYC provider issues RLN credential (Merkle tree membership proof)
2. User generates ZK proof of KYC status
3. Contract verifies proof without learning user identity
4. User can perform action (e.g., participate in offering)

### 2. Anti-Sybil for Token Distributions
Prevent single user from claiming multiple allocations.

**Example**: Airdrop where each KYC'd user can claim once
- User proves KYC status via RLN
- RLN nullifier prevents second claim
- Privacy preserved (no on-chain link between claims)

### 3. Rate-Limited Redemptions
Allow users to redeem stablecoins at limited rate without revealing total holdings.

**Example**: Stablecoin with withdrawal limit (e.g., $10k/day per user)
- User generates RLN proof with withdrawal amount
- Contract enforces rate limit via nullifier
- User's total balance remains private

## Integration Points

### Smart Contract Integration
```solidity
interface IRLN {
    function verifyProof(
        uint256 root,
        uint256 nullifierHash,
        uint256 signalHash,
        uint256 externalNullifier,
        uint256[8] calldata proof
    ) external view returns (bool);
    
    function isNullifierUsed(uint256 nullifierHash) external view returns (bool);
}
```

### RLN Proof Generation (Client-Side)
Users generate ZK proofs using RLN libraries:
- `@zk-kit/protocols` (JavaScript)
- `rln` (Rust)

### Credential Issuance
KYC/compliance providers issue RLN credentials (secret + Merkle tree position).

## Privacy vs Compliance Trade-offs

### What RLN Provides
- ✅ User can prove compliance status without revealing identity
- ✅ Rate limiting without surveillance
- ✅ Anti-Sybil guarantees

### What RLN Does NOT Provide
- ❌ Ability to reverse-lookup user from nullifier
- ❌ Ability to freeze/claw-back from specific user
- ❌ Ability to respond to court order for specific user data

### Hybrid Approach
Combine RLN with encrypted identity escrow:
- On-chain: RLN for privacy + rate limiting
- Off-chain: Encrypted identity data held by trusted party
- Court order: Decrypt identity from escrow

## Security Considerations

- **Secret compromise**: If user's RLN secret leaks, attacker can generate proofs
- **Merkle tree management**: Credential revocation requires tree update
- **Proof generation**: Client must run ZK prover (resource-intensive)
- **Setup ceremony**: Trusted setup required for certain ZK proof systems

## Control Mapping

- Maps to `kyc_aml` (privacy-preserving KYC proof)
- Maps to `sanctions_screening` (can prove non-sanctioned without revealing identity)
- Adds new control: `privacy_preserving_compliance`

## Compliance Notes

- Regulators may not accept privacy-preserving proofs (jurisdiction-dependent)
- May require legal opinion on whether RLN satisfies KYC requirements
- Hybrid model (RLN + encrypted escrow) more likely to be acceptable

## Implementation Checklist

- [ ] Deploy RLN verifier contracts
- [ ] Set up Merkle tree for credentials (on-chain or off-chain)
- [ ] Integrate with KYC provider for credential issuance
- [ ] Build client-side proof generation
- [ ] Test nullifier uniqueness and rate limiting
- [ ] Obtain legal review of privacy-preserving compliance approach

## References

- [RLN Specification](https://rate-limiting-nullifier.github.io/rln-docs/)
- [ZK-Kit RLN Implementation](https://github.com/privacy-scaling-explorations/zk-kit)
- Privacy-preserving compliance research papers
