# Smart Contract Tutorials

Comprehensive guides for building compliant smart contracts across multiple chains.

## Tutorials

### Beginner
1. [Hello World Token](01-hello-world-token.md) - Basic ERC20 token
2. [Adding Access Control](02-access-control.md) - Roles and permissions
3. [Pausable Contracts](03-pausable.md) - Emergency stop mechanism

### Intermediate
4. [Compliance Hooks](04-compliance-hooks.md) - Pluggable compliance checks
5. [Transfer Restrictions](05-transfer-restrictions.md) - Allowlists, lock-ups, vesting
6. [Upgradeability](06-upgradeability.md) - Proxy patterns for upgrades
7. [Multi-Chain Deployment](07-multi-chain.md) - Deploy to Ethereum, Polygon, etc.

### Advanced
8. [RWA Token Implementation](08-rwa-token.md) - Full RWA token with corporate actions
9. [Stablecoin Architecture](09-stablecoin.md) - Reserve-backed stablecoin
10. [Atomic Swaps](10-atomic-swaps.md) - Cross-chain HTLC implementation
11. [Privacy with ZK](11-zk-privacy.md) - Zero-knowledge proofs for compliance
12. [DAO Governance](12-dao-governance.md) - On-chain governance for token holders

### Chain-Specific
13. [Solana Programs](13-solana-programs.md) - Rust smart contracts on Solana
14. [Cosmos Modules](14-cosmos-modules.md) - Go modules for Cosmos SDK
15. [Hyperledger Fabric Chaincode](15-fabric-chaincode.md) - Go chaincode
16. [XRPL Issued Currencies](16-xrpl-currencies.md) - Tokenization on XRPL
17. [Polkadot Pallets](17-polkadot-pallets.md) - Substrate pallets in Rust

## Best Practices

### Security
- ✅ Use well-audited libraries (OpenZeppelin)
- ✅ Follow checks-effects-interactions pattern
- ✅ Avoid reentrancy vulnerabilities
- ✅ Implement emergency pause
- ✅ Use SafeMath (or Solidity 0.8+)
- ✅ External security audit before mainnet

### Compliance
- ✅ Separate compliance logic from core token logic
- ✅ Emit events for all state changes (audit trail)
- ✅ Map contract functions to compliance controls
- ✅ Document assumptions and edge cases
- ✅ Test with real-world compliance scenarios
- ✅ Legal review of contract behavior

### Gas Optimization
- ✅ Use `calldata` instead of `memory` when possible
- ✅ Pack storage variables
- ✅ Use events instead of storage for historical data
- ✅ Batch operations where possible
- ✅ Consider L2 deployment (Arbitrum, Optimism, Polygon)

### Upgradeability
- ✅ Use proxy pattern (UUPS or Transparent)
- ✅ Include timelock for upgrades
- ✅ Test upgrade path on testnet
- ✅ Document what is upgradeable vs immutable
- ✅ Consider implications for compliance (can rules change?)

## Testing Framework

### Unit Tests (Foundry)
```solidity
// test/RWAToken.t.sol
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../contracts/ethereum/rwa/RWAToken.sol";

contract RWATokenTest is Test {
    RWAToken token;
    address issuer = address(1);
    address investor = address(2);
    
    function setUp() public {
        vm.prank(issuer);
        token = new RWAToken("Real Estate Token", "RET", issuer, address(complianceHook));
        
        // Setup compliance
        token.setAllowlist(investor, true);
    }
    
    function testMint() public {
        vm.prank(issuer);
        token.mint(investor, 100e18);
        
        assertEq(token.balanceOf(investor), 100e18);
    }
    
    function testTransferRestriction() public {
        // Mint to investor
        vm.prank(issuer);
        token.mint(investor, 100e18);
        
        // Try to transfer to non-allowlisted address
        address nonKYC = address(3);
        vm.prank(investor);
        vm.expectRevert("RWAToken: address not on allowlist");
        token.transfer(nonKYC, 50e18);
    }
}
```

### Integration Tests
Test full lifecycle flows:
1. Mint token
2. Transfer between users
3. Corporate action (dividend)
4. Redemption

### Compliance Scenario Tests
Test edge cases:
- User gets sanctioned mid-holding period (freeze)
- Jurisdiction change (transfer restrictions updated)
- Emergency pause (all transfers blocked)
- Upgrade contract (state preserved)

## Deployment Scripts

### Foundry Deployment Script
```solidity
// script/DeployRWA.s.sol
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../contracts/ethereum/rwa/RWAToken.sol";
import "../contracts/ethereum/shared/ComplianceHooks.sol";

contract DeployRWA is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy compliance hook
        ComplianceHook complianceHook = new ComplianceHook();
        console.log("ComplianceHook deployed at:", address(complianceHook));
        
        // Deploy RWA token
        RWAToken token = new RWAToken(
            "Real Estate RWA",
            "RWA-RE",
            msg.sender,
            address(complianceHook)
        );
        console.log("RWAToken deployed at:", address(token));
        
        vm.stopBroadcast();
    }
}
```

```bash
# Deploy to sepolia testnet
forge script script/DeployRWA.s.sol:DeployRWA \
    --rpc-url $SEPOLIA_RPC_URL \
    --broadcast \
    --verify
```

## Audit Checklist

Before mainnet deployment:

### Code Quality
- [ ] All tests passing
- [ ] >90% code coverage
- [ ] Static analysis (Slither, Mythril) with no critical issues
- [ ] Manual code review by 2+ engineers

### Security
- [ ] External security audit (Trail of Bits, OpenZeppelin, etc.)
- [ ] Audit findings remediated
- [ ] Re-audit if major changes
- [ ] Bug bounty program live

### Compliance
- [ ] Legal review of contract behavior
- [ ] Compliance controls tested (KYC, sanctions, transfer restrictions)
- [ ] Regulator consultation (if applicable)
- [ ] Documentation for auditors (mapping contract to legal requirements)

### Operations
- [ ] Deployment script tested on testnet
- [ ] Multi-sig for admin roles
- [ ] Emergency pause tested
- [ ] Upgrade process documented
- [ ] Monitoring and alerting configured
- [ ] Incident response plan

## Next Steps

1. **Start with tutorial 01** (Hello World Token)
2. **Work through tutorials sequentially**
3. **Build your own RWA/stablecoin contract**
4. **Test thoroughly**
5. **Get security audit**
6. **Get legal review**
7. **Deploy to testnet**
8. **Deploy to mainnet**

## Resources

- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Foundry Book](https://book.getfoundry.sh/)
- [Ethereum Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)
- [Solidity Documentation](https://docs.soliditylang.org/)
