# Atomic Swaps & Cross-Chain Architecture

## Overview

**Atomic swaps** enable trustless exchange of assets across chains without intermediaries.

**Use cases**:
- Swap RWA token on Ethereum for payment on XRPL
- Stablecoin cross-chain arbitrage
- Multi-chain portfolio rebalancing

## Atomic Swap Mechanisms

### 1. Hash Time-Locked Contracts (HTLCs)

#### Concept
Two parties lock assets on separate chains using same hash. Reveal of preimage unlocks both, or timeout returns funds.

#### Flow
```
Alice (Chain A)          Bob (Chain B)
    |                        |
1.  | Generate secret S      |
2.  | Lock A1 on Chain A     |
    | (hash(S), timeout T)   |
    |                        |
3.  |  <-- Verify lock -->   |
4.  |                        | Lock B1 on Chain B
    |                        | (hash(S), timeout T-∆)
5.  | Reveal S, claim B1     |
    |                        |
6.  |                        | Use S to claim A1
    |                        |
Or timeout:                 |
7.  | Refund after T         | Refund after T-∆
```

#### Solidity HTLC Example
```solidity
contract HTLC {
    struct Swap {
        address payable sender;
        address payable receiver;
        uint256 amount;
        bytes32 hashlock;
        uint256 timelock;
        bool withdrawn;
        bool refunded;
    }
    
    mapping(bytes32 => Swap) public swaps;
    
    function lock(
        address payable receiver,
        bytes32 hashlock,
        uint256 timelock
    ) external payable returns (bytes32 swapId) {
        swapId = keccak256(abi.encodePacked(msg.sender, receiver, msg.value, hashlock, timelock));
        
        swaps[swapId] = Swap({
            sender: payable(msg.sender),
            receiver: receiver,
            amount: msg.value,
            hashlock: hashlock,
            timelock: timelock,
            withdrawn: false,
            refunded: false
        });
    }
    
    function withdraw(bytes32 swapId, bytes32 preimage) external {
        Swap storage swap = swaps[swapId];
        require(swap.receiver == msg.sender, "Not receiver");
        require(sha256(abi.encodePacked(preimage)) == swap.hashlock, "Invalid preimage");
        require(!swap.withdrawn, "Already withdrawn");
        require(!swap.refunded, "Already refunded");
        
        swap.withdrawn = true;
        swap.receiver.transfer(swap.amount);
    }
    
    function refund(bytes32 swapId) external {
        Swap storage swap = swaps[swapId];
        require(swap.sender == msg.sender, "Not sender");
        require(block.timestamp >= swap.timelock, "Too early");
        require(!swap.withdrawn, "Already withdrawn");
        require(!swap.refunded, "Already refunded");
        
        swap.refunded = true;
        swap.sender.transfer(swap.amount);
    }
}
```

### 2. Signature-Based Swaps

#### Concept
Use multi-sig or threshold signatures to coordinate swap across chains.

#### Flow
```
1. Both parties lock funds in 2-of-2 multisig
2. Exchange partial signatures
3. Both complete signature and claim funds simultaneously
```

**Advantage**: No timelock needed, faster execution

**Disadvantage**: Requires compatible signature schemes across chains

### 3. Bridge-Based Swaps

#### Concept
Use trusted or decentralized bridge to lock on Chain A, mint on Chain B.

See [embridge/overview.md](../embridge/overview.md) for bridge details.

## Cross-Chain Messaging

### Chainlink CCIP
```solidity
interface IRouterClient {
    function ccipSend(
        uint64 destinationChainSelector,
        Client.EVM2AnyMessage calldata message
    ) external payable returns (bytes32 messageId);
}

// Send message from Chain A to Chain B
function sendCrossChainMessage(
    uint64 destChainSelector,
    address receiver,
    bytes calldata data
) external {
    Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
        receiver: abi.encode(receiver),
        data: data,
        tokenAmounts: new Client.EVMTokenAmount[](0),
        feeToken: address(0),
        extraArgs: ""
    });
    
    router.ccipSend{value: msg.value}(destChainSelector, message);
}
```

### LayerZero
```solidity
interface ILayerZeroEndpoint {
    function send(
        uint16 _dstChainId,
        bytes calldata _destination,
        bytes calldata _payload,
        address payable _refundAddress,
        address _zroPaymentAddress,
        bytes calldata _adapterParams
    ) external payable;
}
```

## Compliance Considerations

### Problem: Cross-Chain Compliance Divergence
- Token compliant on Chain A (KYC'd users)
- Swap to Chain B where compliance not enforced
- Regulatory arbitrage

### Solution: Compliance State Sync

#### Option A: Shared Compliance Registry (Oracle)
- Centralized or decentralized oracle maintains KYC/sanctions list
- Both chains query same oracle
- Atomic swap only proceeds if both chains verify compliance

#### Option B: Proof-Based Compliance
- Chain A issues ZK proof of compliance
- Chain B verifies proof before unlocking
- Preserves privacy while enforcing rules

#### Option C: Restricted Counterparty Set
- Atomic swaps only between pre-approved addresses
- Both parties must be KYC'd on both chains
- Allowlist enforced in HTLC contracts

### Jurisdiction Mapping
If swapping between jurisdictions (e.g., US token <-> EU token):
- Both tokens must be compliant in both jurisdictions, OR
- Swap restricted to users eligible in both jurisdictions

## Atomic Wallet Architecture

### Concept
Single wallet interface managing assets across multiple chains.

### Components

#### 1. Multi-Chain Key Management
```
Master Seed (BIP39)
    |
    +-> Ethereum keypair (BIP44 m/44'/60'/0'/0)
    +-> XRPL keypair (BIP44 m/44'/144'/0'/0)
    +-> Cosmos keypair (BIP44 m/44'/118'/0'/0)
    +-> Solana keypair (BIP44 m/44'/501'/0'/0)
```

#### 2. Unified Balance View
Display balances from all chains in single interface.

#### 3. Cross-Chain Transaction Builder
User selects "Pay $100 USDC" -> wallet finds optimal route:
- Option A: Pay from Ethereum (high gas)
- Option B: Pay from Polygon (low gas)
- Option C: Bridge from XRPL -> Ethereum -> pay (if no USDC on other chains)

#### 4. Compliance Integration
- Wallet checks KYC status before allowing cross-chain transaction
- Displays compliance warnings if swapping to less-regulated chain

### Reference Architecture
```
User Interface (Web/Mobile)
        |
    Wallet Core (Rust/TypeScript)
        |
    +---+---+---+---+
    |   |   |   |   |
   ETH XRP SOL COSMOS
    |   |   |   |   |
  Chain Clients
    |   |   |   |   |
  Compliance Hooks
```

## Implementation Checklist

### Atomic Swaps
- [ ] Deploy HTLC contracts on both chains
- [ ] Test happy path (successful swap)
- [ ] Test refund path (timeout)
- [ ] Integrate with UI (swap interface)
- [ ] Add compliance checks (both parties KYC'd)
- [ ] Monitor for stuck swaps (automated refund)

### Atomic Wallet
- [ ] Implement BIP39/BIP44 key derivation
- [ ] Integrate chain clients (Web3, xrpl.js, @solana/web3.js, cosmjs)
- [ ] Build unified balance view
- [ ] Implement cross-chain transaction routing
- [ ] Add compliance checks (wallet-level)
- [ ] Secure key storage (hardware wallet, secure enclave)

## Security Considerations

- **Timelock ordering**: Ensure Chain B timeout < Chain A timeout
- **Fee market risk**: High gas fees may prevent claim/refund
- **Chain reorgs**: Wait for finality before revealing preimage
- **Key compromise**: Atomic wallet = single point of failure
- **Malicious bridge**: If using bridge-based swaps, bridge can steal funds

## Control Mapping

- Maps to `kyc_aml` (compliance checks before swap)
- Maps to `sanctions_screening` (cross-chain sanctions list)
- Maps to `reporting` (cross-chain transaction audit trail)
- Adds: `atomic_execution` (swap succeeds or fully reverts)

## References

- [Bitcoin Wiki: Atomic Swap](https://en.bitcoin.it/wiki/Atomic_swap)
- [Chainlink CCIP](https://docs.chain.link/ccip)
- [LayerZero](https://layerzero.network/)
- [BIP44: Multi-Account Hierarchy](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
