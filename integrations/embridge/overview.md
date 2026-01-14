# Embridge Integration

## Overview

**Embridge** is a bridge protocol enabling cross-chain asset transfers with validation and attestation mechanisms.

## Architecture

```
Chain A <-> Embridge Validators <-> Chain B
            |
         Attestation Layer
```

## Use Cases

### 1. Cross-Chain RWA Transfers
Transfer RWA tokens between chains while maintaining compliance hooks and transfer restrictions.

**Flow**:
1. User locks RWA token on Chain A
2. Embridge validators attest to lock
3. Corresponding token minted on Chain B
4. Compliance checks executed on both chains

### 2. Stablecoin Cross-Chain Operations
Move stablecoins across chains for settlement or liquidity.

**Requirements**:
- Reserve attestation synchronized across chains
- Unified compliance registry (or cross-chain oracle)
- Atomic or provably-safe bridging

### 3. Collateral Bridging
Use assets on one chain as collateral for operations on another.

## Integration Points

### Smart Contract Integration
```solidity
interface IEmbridgeAdapter {
    function lockAndBridge(
        address token,
        uint256 amount,
        uint256 targetChainId,
        address recipient,
        bytes calldata complianceProof
    ) external returns (bytes32 bridgeRequestId);
    
    function receiveFromBridge(
        bytes32 bridgeRequestId,
        address token,
        uint256 amount,
        address recipient,
        bytes calldata attestation
    ) external;
}
```

### Validator Set
- Requires trusted validator set or decentralized validator network
- Validators must have KYC/compliance authority if bridging regulated tokens
- Slash conditions for false attestations

### Compliance Hooks
- Embridge must call compliance hooks before lock and after mint
- Cross-chain sanctions screening
- Jurisdiction-aware routing (can't bridge US-only tokens to non-compliant chain)

## Security Considerations

- **Bridge exploits**: History of major bridge hacks; use conservative approach
- **Validator collusion**: Ensure validator set is sufficiently decentralized
- **Finality differences**: Chain A finality must be confirmed before Chain B mint
- **Rollback handling**: What happens if Chain A reorgs after Chain B mint?

## Risk Mitigation

### Rate Limiting
Limit bridging volume per hour/day to cap potential exploit damage.

### Time Delays
Introduce time delay for large transfers (e.g., > $100k requires 24hr delay).

### Multi-Signature
Require multi-sig approval for bridge operations above threshold.

### Insurance
Maintain insurance fund or integrate with bridge insurance protocols.

## Control Mapping

- Maps to `kyc_aml` (cross-chain identity verification)
- Maps to `sanctions_screening` (screen on both chains)
- Maps to `reporting` (bridge transactions must be auditable)

## Compliance Notes

- Bridge operators may be money transmitters (jurisdiction-dependent)
- Cross-border transfers trigger additional AML requirements
- Must maintain audit trail on both chains

## Implementation Checklist

- [ ] Deploy bridge contracts on both chains
- [ ] Set up validator infrastructure
- [ ] Integrate compliance hooks on both sides
- [ ] Test finality handling and reorg scenarios
- [ ] Set up monitoring and alerting
- [ ] Prepare incident response plan
- [ ] Obtain legal review of bridge operator responsibilities

## References

- Embridge documentation (TODO: add link)
- Cross-chain bridge security best practices
- Bridge audit reports
