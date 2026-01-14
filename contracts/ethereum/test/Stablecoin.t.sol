// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../../src/stablecoin/Stablecoin.sol";
import "../../src/shared/ComplianceHooks.sol";

contract MockComplianceHook is IComplianceHook {
    mapping(address => bool) public allowedAddresses;
    
    function setAllowed(address account, bool allowed) external {
        allowedAddresses[account] = allowed;
    }
    
    function canTransfer(
        address /* from */,
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
        address /* from */,
        uint256 /* amount */
    ) external view override returns (bool, string memory) {
        return (true, "");
    }
}

contract StablecoinTest is Test {
    Stablecoin public stablecoin;
    MockComplianceHook public complianceHook;
    
    address public admin = address(1);
    address public minter = address(2);
    address public burner = address(3);
    address public attestor = address(4);
    address public user1 = address(5);
    address public user2 = address(6);
    address public unauthorized = address(7);
    
    event Mint(address indexed to, uint256 amount);
    event Burn(address indexed from, uint256 amount);
    event ReserveAttestationRecorded(
        uint256 indexed attestationId,
        uint256 reserveBalance,
        uint256 totalSupply,
        string ipfsUri,
        address attestor
    );
    
    function setUp() public {
        // Deploy mock compliance hook
        complianceHook = new MockComplianceHook();
        
        // Deploy stablecoin
        vm.prank(admin);
        stablecoin = new Stablecoin(
            "USD Stablecoin",
            "USDS",
            admin,
            address(complianceHook)
        );
        
        // Grant roles
        vm.startPrank(admin);
        stablecoin.grantRole(stablecoin.MINTER_ROLE(), minter);
        stablecoin.grantRole(stablecoin.BURNER_ROLE(), burner);
        stablecoin.grantRole(stablecoin.ATTESTATION_ROLE(), attestor);
        vm.stopPrank();
        
        // Allow addresses in compliance hook
        complianceHook.setAllowed(user1, true);
        complianceHook.setAllowed(user2, true);
    }
    
    function testInitialState() public view {
        assertEq(stablecoin.name(), "USD Stablecoin");
        assertEq(stablecoin.symbol(), "USDS");
        assertEq(stablecoin.totalSupply(), 0);
        assertTrue(stablecoin.hasRole(stablecoin.MINTER_ROLE(), minter));
        assertTrue(stablecoin.hasRole(stablecoin.BURNER_ROLE(), burner));
        assertTrue(stablecoin.hasRole(stablecoin.ATTESTATION_ROLE(), attestor));
    }
    
    function testMintByMinter() public {
        uint256 amount = 10000 * 10**18;
        
        vm.prank(minter);
        vm.expectEmit(true, false, false, true);
        emit Mint(user1, amount);
        stablecoin.mint(user1, amount);
        
        assertEq(stablecoin.balanceOf(user1), amount);
        assertEq(stablecoin.totalSupply(), amount);
    }
    
    function testMintFailsForNonMinter() public {
        uint256 amount = 10000 * 10**18;
        
        vm.prank(unauthorized);
        vm.expectRevert();
        stablecoin.mint(user1, amount);
    }
    
    function testMintFailsForNonCompliantRecipient() public {
        uint256 amount = 10000 * 10**18;
        
        vm.prank(minter);
        vm.expectRevert("Stablecoin: compliance check failed: Recipient not allowed");
        stablecoin.mint(unauthorized, amount);
    }
    
    function testBurnByBurner() public {
        // First mint some tokens
        uint256 mintAmount = 10000 * 10**18;
        vm.prank(minter);
        stablecoin.mint(user1, mintAmount);
        
        // Then burn some
        uint256 burnAmount = 3000 * 10**18;
        vm.prank(burner);
        vm.expectEmit(true, false, false, true);
        emit Burn(user1, burnAmount);
        stablecoin.burn(user1, burnAmount);
        
        assertEq(stablecoin.balanceOf(user1), mintAmount - burnAmount);
        assertEq(stablecoin.totalSupply(), mintAmount - burnAmount);
    }
    
    function testBurnFailsForNonBurner() public {
        uint256 mintAmount = 10000 * 10**18;
        vm.prank(minter);
        stablecoin.mint(user1, mintAmount);
        
        vm.prank(unauthorized);
        vm.expectRevert();
        stablecoin.burn(user1, 1000 * 10**18);
    }
    
    function testBurnFailsForInsufficientBalance() public {
        uint256 mintAmount = 1000 * 10**18;
        vm.prank(minter);
        stablecoin.mint(user1, mintAmount);
        
        vm.prank(burner);
        vm.expectRevert();
        stablecoin.burn(user1, 2000 * 10**18);
    }
    
    function testRecordAttestation() public {
        // Mint some tokens
        uint256 supply = 1000000 * 10**18;
        vm.prank(minter);
        stablecoin.mint(user1, supply);
        
        // Record attestation
        uint256 reserveBalance = 1000000 * 10**6; // $1M in cents
        string memory ipfsUri = "ipfs://Qm123abc...";
        
        vm.prank(attestor);
        vm.expectEmit(true, false, false, true);
        emit ReserveAttestationRecorded(1, reserveBalance, supply, ipfsUri, attestor);
        uint256 attestationId = stablecoin.recordAttestation(reserveBalance, ipfsUri);
        
        assertEq(attestationId, 1);
        
        (
            uint256 storedReserve,
            uint256 storedSupply,
            string memory storedUri,
            address storedAttestor,
            uint256 timestamp
        ) = stablecoin.attestations(attestationId);
        
        assertEq(storedReserve, reserveBalance);
        assertEq(storedSupply, supply);
        assertEq(storedUri, ipfsUri);
        assertEq(storedAttestor, attestor);
        assertGt(timestamp, 0);
    }
    
    function testRecordAttestationFailsForNonAttestor() public {
        vm.prank(unauthorized);
        vm.expectRevert();
        stablecoin.recordAttestation(1000000 * 10**6, "ipfs://test");
    }
    
    function testMultipleAttestations() public {
        vm.prank(minter);
        stablecoin.mint(user1, 1000000 * 10**18);
        
        vm.startPrank(attestor);
        
        uint256 id1 = stablecoin.recordAttestation(1000000 * 10**6, "ipfs://attestation1");
        assertEq(id1, 1);
        
        uint256 id2 = stablecoin.recordAttestation(1100000 * 10**6, "ipfs://attestation2");
        assertEq(id2, 2);
        
        uint256 id3 = stablecoin.recordAttestation(1200000 * 10**6, "ipfs://attestation3");
        assertEq(id3, 3);
        
        vm.stopPrank();
        
        assertEq(stablecoin.attestationCount(), 3);
    }
    
    function testTransferWithCompliance() public {
        // Mint tokens to user1
        uint256 amount = 10000 * 10**18;
        vm.prank(minter);
        stablecoin.mint(user1, amount);
        
        // Transfer from user1 to user2 (both compliant)
        uint256 transferAmount = 5000 * 10**18;
        vm.prank(user1);
        stablecoin.transfer(user2, transferAmount);
        
        assertEq(stablecoin.balanceOf(user1), amount - transferAmount);
        assertEq(stablecoin.balanceOf(user2), transferAmount);
    }
    
    function testTransferFailsToNonCompliant() public {
        uint256 amount = 10000 * 10**18;
        vm.prank(minter);
        stablecoin.mint(user1, amount);
        
        vm.prank(user1);
        vm.expectRevert("Stablecoin: compliance check failed: Recipient not allowed");
        stablecoin.transfer(unauthorized, 1000 * 10**18);
    }
    
    function testPause() public {
        vm.prank(admin);
        stablecoin.pause();
        assertTrue(stablecoin.paused());
        
        // Minting should fail when paused
        vm.prank(minter);
        vm.expectRevert();
        stablecoin.mint(user1, 1000 * 10**18);
    }
    
    function testUnpause() public {
        vm.prank(admin);
        stablecoin.pause();
        
        vm.prank(admin);
        stablecoin.unpause();
        assertFalse(stablecoin.paused());
        
        // Minting should work again
        vm.prank(minter);
        stablecoin.mint(user1, 1000 * 10**18);
        assertEq(stablecoin.balanceOf(user1), 1000 * 10**18);
    }
    
    function testUpdateComplianceHook() public {
        MockComplianceHook newHook = new MockComplianceHook();
        
        vm.prank(admin);
        stablecoin.updateComplianceHook(address(newHook));
        
        assertEq(address(stablecoin.complianceHook()), address(newHook));
    }
    
    function testUpdateComplianceHookFailsForNonAdmin() public {
        MockComplianceHook newHook = new MockComplianceHook();
        
        vm.prank(unauthorized);
        vm.expectRevert();
        stablecoin.updateComplianceHook(address(newHook));
    }
    
    function testReserveRatio() public {
        // Mint 1M tokens
        uint256 supply = 1000000 * 10**18;
        vm.prank(minter);
        stablecoin.mint(user1, supply);
        
        // Record attestation with 1M USD reserves (1:1 ratio)
        vm.prank(attestor);
        stablecoin.recordAttestation(1000000 * 10**6, "ipfs://test");
        
        // Get latest attestation
        (
            uint256 reserves,
            uint256 attSupply,
            ,
            ,
        ) = stablecoin.attestations(1);
        
        // Verify 1:1 backing (reserves in cents, supply in wei)
        assertEq(reserves * 10**12, attSupply); // Convert cents to wei
    }
}
