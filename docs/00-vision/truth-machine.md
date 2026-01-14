# Truth Machine Architecture

## Overview

A **truth machine** is a system that maintains an immutable, verifiable record of events and state transitions—a foundation for trust in decentralized systems.

**Core principles**:
1. **Immutability**: Once recorded, data cannot be altered
2. **Transparency**: All state transitions visible and auditable
3. **Verifiability**: Any party can cryptographically verify correctness
4. **Determinism**: Same inputs always produce same outputs
5. **Censorship resistance**: No single party can prevent valid transactions

## Components

### 1. Blockchain Layer (State Machine)
```
Block N-1 -> Block N -> Block N+1
    |           |           |
State S1 -> State S2 -> State S3
```

**Properties**:
- Cryptographic linking (hash chains)
- Consensus (BFT, PoS, PoW)
- Finality (probabilistic or deterministic)

### 2. Smart Contract Layer (Business Logic)
```solidity
contract TruthMachine {
    event StateTransition(
        bytes32 indexed previousState,
        bytes32 indexed newState,
        bytes32 proof
    );
    
    mapping(bytes32 => bool) public stateExists;
    mapping(bytes32 => bytes32) public stateTransitions;
    
    function recordTransition(
        bytes32 previousState,
        bytes32 newState,
        bytes calldata proof
    ) external {
        require(stateExists[previousState], "Invalid previous state");
        require(verifyProof(previousState, newState, proof), "Invalid proof");
        
        stateExists[newState] = true;
        stateTransitions[previousState] = newState;
        
        emit StateTransition(previousState, newState, keccak256(proof));
    }
}
```

### 3. Oracle Layer (External Truth)
Connect on-chain truth machine to off-chain reality.

**Use cases**:
- Price feeds (Chainlink)
- Proof of Reserve (attestation from auditor)
- Identity verification (KYC status from provider)
- Legal events (court order, regulatory change)

**Challenge**: Oracles are trusted third parties (weak link).

**Solution**: Decentralized oracles (multiple providers, stake-based)

### 4. Cryptographic Proof Layer (Zero-Knowledge)
Prove facts without revealing data.

**Examples**:
- Prove KYC status without revealing identity (RLN)
- Prove solvency without revealing holdings (Proof of Reserves via ZK)
- Prove compliance without revealing trade details

## Compliance-Native Truth Machine

### State Machine with Compliance Gates

```yaml
# State machine with compliance proofs required at each transition
state_machine:
  name: compliant_rwa_issuance
  states:
    - id: structuring
      required_evidence:
        - legal_opinion_hash
        - jurisdiction_analysis_hash
      compliance_gates:
        - verify_legal_opinion
        - verify_jurisdiction
    
    - id: offering_design
      required_evidence:
        - offering_memo_hash
        - risk_disclosures_hash
      compliance_gates:
        - verify_disclosures_complete
        - verify_accredited_investor_rules
    
    - id: launch
      required_evidence:
        - smart_contract_audit_hash
        - regulator_filing_hash
      compliance_gates:
        - verify_audit_complete
        - verify_regulatory_approval

  transitions:
    - from: structuring
      to: offering_design
      guard:
        type: evidence_complete
        verify: all_evidence_exists_on_chain
```

### On-Chain Evidence Storage

**Option A: Store Hash On-Chain, Data Off-Chain**
```solidity
contract EvidenceRegistry {
    struct Evidence {
        bytes32 documentHash;
        string ipfsUri;
        address submitter;
        uint256 timestamp;
    }
    
    mapping(bytes32 => Evidence) public evidence;
    
    function submitEvidence(
        bytes32 id,
        bytes32 documentHash,
        string memory ipfsUri
    ) external {
        evidence[id] = Evidence({
            documentHash: documentHash,
            ipfsUri: ipfsUri,
            submitter: msg.sender,
            timestamp: block.timestamp
        });
        
        emit EvidenceSubmitted(id, documentHash);
    }
    
    function verifyEvidence(
        bytes32 id,
        bytes memory document
    ) external view returns (bool) {
        return keccak256(document) == evidence[id].documentHash;
    }
}
```

**Option B: Store Data On-Chain (Expensive)**
Only for small, critical data (hashes, proofs, signatures).

### Audit Trail (Event Log)

Every state transition emits event:
```solidity
event StateTransition(
    bytes32 indexed stateId,
    bytes32 fromState,
    bytes32 toState,
    address indexed actor,
    bytes32[] evidenceIds,
    uint256 timestamp
);
```

Regulators can query event log to reconstruct full history.

## Web3 Infrastructure Stack

### Layer 1: Consensus + State
- Custom Rust L1 (Substrate)
- Or Ethereum, Polkadot, Cosmos

### Layer 2: Scalability
- Rollups (Optimistic or ZK)
- State channels
- Sidechains

### Layer 3: Application
- Smart contracts (Solidity, Rust, CosmWasm)
- Off-chain computation (Chainlink Functions, TEEs)

### Storage Layer
- IPFS (decentralized file storage)
- Arweave (permanent storage)
- Ceramic (decentralized database)

### Identity Layer
- DIDs (Decentralized Identifiers)
- VCs (Verifiable Credentials)
- ENS (Ethereum Name Service)

### Oracle Layer
- Chainlink (price feeds, Proof of Reserve, CCIP)
- UMA (optimistic oracle)
- API3 (first-party oracles)

### Compliance Layer (Custom)
- On-chain KYC registry
- Sanctions screening oracle
- Jurisdiction routing
- Transfer restriction engine

## Truth Machine for RWA/Stablecoin

### RWA Token Truth Machine

**Guarantees**:
1. Total supply matches real-world asset value (oracle-verified)
2. All transfers comply with securities laws (enforced on-chain)
3. Corporate actions (dividends, redemptions) immutably recorded
4. Ownership provenance fully auditable

**Implementation**:
```
Real-World Asset (Deed, Title, etc.)
        |
    Legal Wrapper (SPV, Trust)
        |
    Oracle (Attestation of Asset Existence)
        |
    Smart Contract (RWA Token)
        |
    Blockchain (Immutable Ledger)
```

### Stablecoin Truth Machine

**Guarantees**:
1. Total supply ≤ reserves (auditor-verified)
2. Reserves held in segregated custody (attestation)
3. All mints/burns match fiat movements (SWIFT integration)
4. Redemption always honored (reserve backing)

**Implementation**:
```
Fiat Reserves (Bank Account)
        |
    Auditor (Periodic Attestation)
        |
    Oracle (Reserve Balance Feed)
        |
    Smart Contract (Mint/Burn only if reserves sufficient)
        |
    Blockchain (Public Ledger)
```

### State Transition Verification

```rust
// Verify state transition is legal
fn verify_state_transition(
    from_state: State,
    to_state: State,
    evidence: Vec<Evidence>,
) -> Result<(), TransitionError> {
    // 1. Check state machine rules
    if !is_valid_transition(&from_state, &to_state) {
        return Err(TransitionError::InvalidTransition);
    }
    
    // 2. Check evidence completeness
    let required_evidence = get_required_evidence(&to_state);
    for req in required_evidence {
        if !evidence.iter().any(|e| e.evidence_type == req) {
            return Err(TransitionError::MissingEvidence(req));
        }
    }
    
    // 3. Verify cryptographic proofs
    for ev in evidence {
        if !verify_evidence_proof(&ev) {
            return Err(TransitionError::InvalidProof);
        }
    }
    
    // 4. Check compliance gates
    if !check_compliance_gates(&from_state, &to_state) {
        return Err(TransitionError::ComplianceViolation);
    }
    
    Ok(())
}
```

## Decentralization vs Compliance Trade-offs

### Fully Decentralized (Pure Truth Machine)
- ✅ Censorship resistant
- ✅ No single point of failure
- ❌ Hard to comply with court orders (freeze, claw-back)
- ❌ Hard to update rules (smart contract immutability)

### Permissioned (Compliance-First)
- ✅ Can freeze accounts (sanctions, fraud)
- ✅ Can upgrade contracts (regulatory changes)
- ❌ Centralization risk (admin keys)
- ❌ Not fully censorship resistant

### Hybrid (Recommended for RWA/Stablecoin)
- **Immutable core**: State transitions follow rules
- **Flexible governance**: Multi-sig or DAO can update rules
- **Emergency controls**: Pause, freeze (with transparency)
- **Transparency**: All admin actions logged on-chain

**Example**:
```solidity
contract HybridTruthMachine {
    address public governance; // Multi-sig or DAO
    bool public paused;
    
    modifier onlyGovernance() {
        require(msg.sender == governance, "Not authorized");
        _;
    }
    
    modifier whenNotPaused() {
        require(!paused, "System paused");
        _;
    }
    
    function recordTransition(...) external whenNotPaused {
        // Immutable state transition logic
    }
    
    function pause() external onlyGovernance {
        paused = true;
        emit SystemPaused(msg.sender, block.timestamp);
    }
    
    function updateGovernance(address newGovernance) external onlyGovernance {
        emit GovernanceUpdated(governance, newGovernance);
        governance = newGovernance;
    }
}
```

## Monitoring and Alerting

### On-Chain Monitoring
- Watch for state transitions (event logs)
- Alert on compliance violations
- Track evidence submissions

### Off-Chain Monitoring
- Oracle uptime (are price feeds working?)
- SWIFT message processing (fiat on/off-ramps)
- Reserve attestations (stablecoin backing)

### Dashboard (Grafana + Prometheus)
- Current state (which state machine, which state?)
- Evidence status (all required evidence submitted?)
- Compliance score (% of transfers that passed compliance checks)
- Reserve ratio (stablecoins: reserves / total supply)

## Audit and Forensics

### Full History Reconstruction
Query blockchain for all events:
```javascript
const events = await contract.queryFilter(
    contract.filters.StateTransition(),
    fromBlock,
    toBlock
);

// Reconstruct state machine history
const history = events.map(e => ({
    from: e.args.fromState,
    to: e.args.toState,
    actor: e.args.actor,
    evidence: e.args.evidenceIds,
    timestamp: e.args.timestamp
}));
```

### Merkle Proofs
Provide proof that specific transaction occurred without revealing full blockchain:
```
Merkle Root (Block Header)
    |
Merkle Branch
    |
Transaction (Specific State Transition)
```

Regulator can verify transaction authenticity without running full node.

## Implementation Checklist

- [ ] Choose blockchain (Ethereum, custom L1, etc.)
- [ ] Define state machine (states, transitions, evidence requirements)
- [ ] Implement smart contracts (state transition logic)
- [ ] Integrate oracles (price feeds, identity, legal events)
- [ ] Build evidence registry (on-chain hash, off-chain storage)
- [ ] Set up monitoring (events, compliance violations)
- [ ] Test state transitions (unit + integration tests)
- [ ] Security audit (code + cryptography)
- [ ] Deploy to testnet
- [ ] Run simulations (stress test, adversarial scenarios)
- [ ] Deploy to mainnet
- [ ] Document for regulators (how to audit system)

## References

- [Ethereum as Truth Machine](https://www.coindesk.com/learn/what-is-ethereum/)
- [State Machines in Blockchain](https://ethereum.org/en/developers/docs/evm/)
- [Byzantine Fault Tolerance](https://en.wikipedia.org/wiki/Byzantine_fault)
- [Zero-Knowledge Proofs](https://z.cash/technology/zksnarks/)
- [Merkle Trees](https://en.wikipedia.org/wiki/Merkle_tree)
