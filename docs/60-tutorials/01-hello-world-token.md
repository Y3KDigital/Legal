# Tutorial 01: Hello World Token

## Overview

Build a simple ERC20 token using OpenZeppelin.

## Prerequisites

- Foundry installed
- Basic Solidity knowledge

## Step 1: Create Contract

```solidity
// contracts/tutorial/HelloWorldToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title HelloWorldToken
 * @notice A basic ERC20 token for learning
 */
contract HelloWorldToken is ERC20 {
    constructor() ERC20("Hello World Token", "HELLO") {
        // Mint 1 million tokens to deployer
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }
}
```

## Step 2: Write Tests

```solidity
// test/HelloWorldToken.t.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../contracts/tutorial/HelloWorldToken.sol";

contract HelloWorldTokenTest is Test {
    HelloWorldToken token;
    address alice = address(1);
    address bob = address(2);
    
    function setUp() public {
        token = new HelloWorldToken();
    }
    
    function testInitialSupply() public {
        assertEq(token.totalSupply(), 1_000_000 * 10 ** 18);
        assertEq(token.balanceOf(address(this)), 1_000_000 * 10 ** 18);
    }
    
    function testTransfer() public {
        uint256 amount = 100 * 10 ** 18;
        
        token.transfer(alice, amount);
        
        assertEq(token.balanceOf(alice), amount);
        assertEq(token.balanceOf(address(this)), 1_000_000 * 10 ** 18 - amount);
    }
    
    function testApproveAndTransferFrom() public {
        uint256 amount = 50 * 10 ** 18;
        
        // Approve alice to spend tokens
        token.approve(alice, amount);
        assertEq(token.allowance(address(this), alice), amount);
        
        // Alice transfers tokens to bob
        vm.prank(alice);
        token.transferFrom(address(this), bob, amount);
        
        assertEq(token.balanceOf(bob), amount);
    }
}
```

## Step 3: Run Tests

```bash
forge test -vv
```

Expected output:
```
[PASS] testInitialSupply() (gas: 12345)
[PASS] testTransfer() (gas: 56789)
[PASS] testApproveAndTransferFrom() (gas: 67890)
```

## Step 4: Deploy to Testnet

```solidity
// script/DeployHelloWorld.s.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../contracts/tutorial/HelloWorldToken.sol";

contract DeployHelloWorld is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        
        HelloWorldToken token = new HelloWorldToken();
        console.log("HelloWorldToken deployed at:", address(token));
        
        vm.stopBroadcast();
    }
}
```

```bash
# Deploy to Sepolia
forge script script/DeployHelloWorld.s.sol:DeployHelloWorld \
    --rpc-url $SEPOLIA_RPC_URL \
    --broadcast \
    --verify
```

## What We Learned

✅ ERC20 standard interface  
✅ Using OpenZeppelin contracts  
✅ Writing tests with Foundry  
✅ Deploying to testnet  

## Next Tutorial

[Tutorial 02: Access Control](02-access-control.md) - Add roles and permissions to control who can mint tokens.

## Exercise

Modify `HelloWorldToken` to:
1. Set initial supply via constructor parameter
2. Add a `burn()` function
3. Test the new burn function

<details>
<summary>Solution</summary>

```solidity
contract HelloWorldToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Hello World Token", "HELLO") {
        _mint(msg.sender, initialSupply);
    }
    
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
```

Test:
```solidity
function testBurn() public {
    uint256 burnAmount = 100 * 10 ** 18;
    uint256 initialBalance = token.balanceOf(address(this));
    
    token.burn(burnAmount);
    
    assertEq(token.balanceOf(address(this)), initialBalance - burnAmount);
    assertEq(token.totalSupply(), 1_000_000 * 10 ** 18 - burnAmount);
}
```

</details>
