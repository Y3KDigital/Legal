// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../../src/rwa/RWAToken.sol";
import "../../src/shared/ComplianceHooks.sol";

contract MockComplianceHook is IComplianceHook {
    mapping(address => bool) public allowedAddresses;
    
    function setAllowed(address account, bool allowed) external {
        allowedAddresses[account] = allowed;
    }
    
    function canTransfer(
        address from,
        address to,
        uint256 /* amount */
    ) external view override returns (bool, string memory) {
        if (!allowedAddresses[to]) {
            return (false, "Recipient not allowed");
        }
        return (true, "");
    }
    
    function canMint(
        address to,
        uint256 /* amount */
    ) external view override returns (bool, string memory) {
        if (!allowedAddresses[to]) {
            return (false, "Recipient not allowed");
        }
        return (true, "");
    }
    
    function canBurn(
        address from,
        uint256 /* amount */
    ) external view override returns (bool, string memory) {
        return (true, "");
    }
}

contract RWATokenTest is Test {
    RWAToken public token;
    MockComplianceHook public complianceHook;
    
    address public issuer = address(1);
    address public compliance = address(2);
    address public investor1 = address(3);
    address public investor2 = address(4);
    address public unauthorized = address(5);
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Mint(address indexed to, uint256 amount);
    event Burn(address indexed from, uint256 amount);
    
    function setUp() public {
        // Deploy mock compliance hook
        complianceHook = new MockComplianceHook();
        
        // Deploy RWA token
        vm.prank(issuer);
        token = new RWAToken(
            "Real Estate Token",
            "RET",
            issuer,
            address(complianceHook)
        );
        
        // Grant compliance role
        vm.prank(issuer);
        token.grantRole(token.COMPLIANCE_ROLE(), compliance);
        
        // Allowlist investors via compliance hook
        complianceHook.setAllowed(issuer, true);
        complianceHook.setAllowed(investor1, true);
        complianceHook.setAllowed(investor2, true);
        
        // Add investors to allowlist
        vm.startPrank(compliance);
        token.setAllowlist(issuer, true);
        token.setAllowlist(investor1, true);
        token.setAllowlist(investor2, true);
        vm.stopPrank();
    }
    
    function testInitialState() public view {
        assertEq(token.name(), "Real Estate Token");
        assertEq(token.symbol(), "RET");
        assertEq(token.totalSupply(), 0);
        assertTrue(token.hasRole(token.ISSUER_ROLE(), issuer));
        assertTrue(token.hasRole(token.COMPLIANCE_ROLE(), compliance));
    }
    
    function testMintByIssuer() public {
        uint256 amount = 1000 * 10**18;
        
        vm.prank(issuer);
        vm.expectEmit(true, true, false, true);
        emit Mint(investor1, amount);
        token.mint(investor1, amount);
        
        assertEq(token.balanceOf(investor1), amount);
        assertEq(token.totalSupply(), amount);
    }
    
    function testMintFailsForNonIssuer() public {
        uint256 amount = 1000 * 10**18;
        
        vm.prank(unauthorized);
        vm.expectRevert();
        token.mint(investor1, amount);
    }
    
    function testMintFailsForNonAllowlisted() public {
        uint256 amount = 1000 * 10**18;
        
        vm.prank(issuer);
        vm.expectRevert("RWAToken: recipient not on allowlist");
        token.mint(unauthorized, amount);
    }
    
    function testTransferBetweenAllowlisted() public {
        // Mint tokens to investor1
        uint256 amount = 1000 * 10**18;
        vm.prank(issuer);
        token.mint(investor1, amount);
        
        // Transfer from investor1 to investor2
        uint256 transferAmount = 500 * 10**18;
        vm.prank(investor1);
        vm.expectEmit(true, true, false, true);
        emit Transfer(investor1, investor2, transferAmount);
        token.transfer(investor2, transferAmount);
        
        assertEq(token.balanceOf(investor1), amount - transferAmount);
        assertEq(token.balanceOf(investor2), transferAmount);
    }
    
    function testTransferFailsToNonAllowlisted() public {
        // Mint tokens to investor1
        uint256 amount = 1000 * 10**18;
        vm.prank(issuer);
        token.mint(investor1, amount);
        
        // Try to transfer to non-allowlisted address
        vm.prank(investor1);
        vm.expectRevert("RWAToken: recipient not on allowlist");
        token.transfer(unauthorized, 100 * 10**18);
    }
    
    function testBurnByIssuer() public {
        // Mint tokens
        uint256 amount = 1000 * 10**18;
        vm.prank(issuer);
        token.mint(investor1, amount);
        
        // Burn tokens
        uint256 burnAmount = 200 * 10**18;
        vm.prank(issuer);
        vm.expectEmit(true, false, false, true);
        emit Burn(investor1, burnAmount);
        token.burn(investor1, burnAmount);
        
        assertEq(token.balanceOf(investor1), amount - burnAmount);
        assertEq(token.totalSupply(), amount - burnAmount);
    }
    
    function testBurnFailsForNonIssuer() public {
        uint256 amount = 1000 * 10**18;
        vm.prank(issuer);
        token.mint(investor1, amount);
        
        vm.prank(unauthorized);
        vm.expectRevert();
        token.burn(investor1, 100 * 10**18);
    }
    
    function testPauseByPauser() public {
        vm.prank(issuer);
        token.pause();
        
        assertTrue(token.paused());
        
        // Transfers should fail when paused
        vm.prank(issuer);
        token.mint(investor1, 1000 * 10**18);
        
        vm.prank(investor1);
        vm.expectRevert();
        token.transfer(investor2, 100 * 10**18);
    }
    
    function testUnpause() public {
        vm.prank(issuer);
        token.pause();
        assertTrue(token.paused());
        
        vm.prank(issuer);
        token.unpause();
        assertFalse(token.paused());
        
        // Transfers should work again
        vm.prank(issuer);
        token.mint(investor1, 1000 * 10**18);
        
        vm.prank(investor1);
        token.transfer(investor2, 100 * 10**18);
        assertEq(token.balanceOf(investor2), 100 * 10**18);
    }
    
    function testSetAllowlistByComplianceRole() public {
        address newInvestor = address(6);
        
        vm.prank(compliance);
        token.setAllowlist(newInvestor, true);
        
        assertTrue(token.isAllowlisted(newInvestor));
    }
    
    function testSetAllowlistFailsForUnauthorized() public {
        address newInvestor = address(6);
        
        vm.prank(unauthorized);
        vm.expectRevert();
        token.setAllowlist(newInvestor, true);
    }
    
    function testComplianceHookIntegration() public {
        // Mint tokens to investor1
        uint256 amount = 1000 * 10**18;
        vm.prank(issuer);
        token.mint(investor1, amount);
        
        // Remove investor2 from compliance hook (but keep on allowlist)
        complianceHook.setAllowed(investor2, false);
        
        // Transfer should fail due to compliance hook
        vm.prank(investor1);
        vm.expectRevert("RWAToken: compliance check failed: Recipient not allowed");
        token.transfer(investor2, 100 * 10**18);
    }
    
    function testUpdateComplianceHook() public {
        MockComplianceHook newHook = new MockComplianceHook();
        
        vm.prank(issuer);
        token.updateComplianceHook(address(newHook));
        
        assertEq(address(token.complianceHook()), address(newHook));
    }
    
    function testUpdateComplianceHookFailsForNonIssuer() public {
        MockComplianceHook newHook = new MockComplianceHook();
        
        vm.prank(unauthorized);
        vm.expectRevert();
        token.updateComplianceHook(address(newHook));
    }
}
