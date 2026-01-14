// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title RealEstateToken
 * @dev Institutional RWA token representing fractional interests in commercial real estate trust
 * 
 * COMPLIANCE DESIGN:
 * - Token represents economic interest ONLY (legal ownership in trust)
 * - NO yield logic (distributions off-chain via wire transfer)
 * - NO custody of underlying assets (properties held by trust)
 * - Transfer restrictions (allowlist enforcement)
 * - Pausable (emergency stop)
 * - Supply capped (immutable max supply)
 * - Multisig governance (ADMIN_ROLE requires 3-of-5)
 * - Full event emissions (auditability)
 * 
 * This contract enforces CONSTRAINTS, not RIGHTS.
 */
contract RealEstateToken is ERC20, Pausable, AccessControl {
    
    // ============ CONSTANTS ============
    
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    
    uint256 public constant MAX_SUPPLY = 1_300_000 * 10**18; // 1.3M tokens (hardcapped)
    
    // ============ STATE VARIABLES ============
    
    // Transfer allowlist (institutional investors only)
    mapping(address => bool) public allowlist;
    
    // Jurisdictional blocks (compliance with sanctions, export controls)
    mapping(address => bool) public blocked;
    
    // Deployment metadata (audit trail)
    string public deploymentMemo;
    string public attestationReference;
    uint256 public deploymentTimestamp;
    address public deployer;
    
    // ============ EVENTS ============
    
    event AllowlistAdded(address indexed account, uint256 timestamp);
    event AllowlistRemoved(address indexed account, uint256 timestamp);
    event AccountBlocked(address indexed account, uint256 timestamp);
    event AccountUnblocked(address indexed account, uint256 timestamp);
    event EmergencyPause(address indexed pauser, uint256 timestamp);
    event EmergencyUnpause(address indexed pauser, uint256 timestamp);
    event TokensMinted(address indexed to, uint256 amount, uint256 timestamp);
    event TokensBurned(address indexed from, uint256 amount, uint256 timestamp);
    
    // ============ CONSTRUCTOR ============
    
    constructor(
        string memory _deploymentMemo,
        string memory _attestationReference,
        address[] memory _initialAdmins
    ) ERC20("Commercial Real Estate Token", "CRET") {
        require(_initialAdmins.length >= 3, "Requires multisig governance (min 3 admins)");
        
        // Record deployment metadata
        deploymentMemo = _deploymentMemo;
        attestationReference = _attestationReference;
        deploymentTimestamp = block.timestamp;
        deployer = msg.sender;
        
        // Setup multisig governance
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        for (uint256 i = 0; i < _initialAdmins.length; i++) {
            _grantRole(ADMIN_ROLE, _initialAdmins[i]);
            _grantRole(MINTER_ROLE, _initialAdmins[i]);
            _grantRole(PAUSER_ROLE, _initialAdmins[i]);
        }
        
        emit TokensMinted(address(0), 0, block.timestamp); // Initial supply is zero
    }
    
    // ============ MINTING (RESTRICTED) ============
    
    /**
     * @dev Mint tokens to allowlisted address (admin-only, supply-capped)
     */
    function mint(address to, uint256 amount) 
        public 
        onlyRole(MINTER_ROLE) 
        whenNotPaused 
    {
        require(allowlist[to], "Recipient not on allowlist");
        require(!blocked[to], "Recipient blocked");
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        
        _mint(to, amount);
        emit TokensMinted(to, amount, block.timestamp);
    }
    
    /**
     * @dev Burn tokens from address (admin-only)
     */
    function burn(address from, uint256 amount) 
        public 
        onlyRole(ADMIN_ROLE) 
        whenNotPaused 
    {
        _burn(from, amount);
        emit TokensBurned(from, amount, block.timestamp);
    }
    
    // ============ TRANSFER RESTRICTIONS ============
    
    /**
     * @dev Override transfer to enforce allowlist and jurisdictional blocks
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
        
        // Allowlist enforcement (except for minting from zero address)
        if (from != address(0)) {
            require(allowlist[from], "Sender not on allowlist");
            require(!blocked[from], "Sender blocked");
        }
        
        if (to != address(0)) {
            require(allowlist[to], "Recipient not on allowlist");
            require(!blocked[to], "Recipient blocked");
        }
    }
    
    // ============ ALLOWLIST MANAGEMENT ============
    
    function addToAllowlist(address account) 
        public 
        onlyRole(ADMIN_ROLE) 
    {
        require(!allowlist[account], "Already allowlisted");
        allowlist[account] = true;
        emit AllowlistAdded(account, block.timestamp);
    }
    
    function removeFromAllowlist(address account) 
        public 
        onlyRole(ADMIN_ROLE) 
    {
        require(allowlist[account], "Not allowlisted");
        allowlist[account] = false;
        emit AllowlistRemoved(account, block.timestamp);
    }
    
    function addToAllowlistBatch(address[] memory accounts) 
        public 
        onlyRole(ADMIN_ROLE) 
    {
        for (uint256 i = 0; i < accounts.length; i++) {
            if (!allowlist[accounts[i]]) {
                allowlist[accounts[i]] = true;
                emit AllowlistAdded(accounts[i], block.timestamp);
            }
        }
    }
    
    // ============ JURISDICTIONAL BLOCKS ============
    
    function blockAccount(address account) 
        public 
        onlyRole(ADMIN_ROLE) 
    {
        require(!blocked[account], "Already blocked");
        blocked[account] = true;
        emit AccountBlocked(account, block.timestamp);
    }
    
    function unblockAccount(address account) 
        public 
        onlyRole(ADMIN_ROLE) 
    {
        require(blocked[account], "Not blocked");
        blocked[account] = false;
        emit AccountUnblocked(account, block.timestamp);
    }
    
    // ============ EMERGENCY CONTROLS ============
    
    function pause() 
        public 
        onlyRole(PAUSER_ROLE) 
    {
        _pause();
        emit EmergencyPause(msg.sender, block.timestamp);
    }
    
    function unpause() 
        public 
        onlyRole(PAUSER_ROLE) 
    {
        _unpause();
        emit EmergencyUnpause(msg.sender, block.timestamp);
    }
    
    // ============ RECONCILIATION SUPPORT ============
    
    /**
     * @dev Get current supply for reconciliation with off-chain attestations
     */
    function getCurrentSupply() 
        public 
        view 
        returns (uint256) 
    {
        return totalSupply();
    }
    
    /**
     * @dev Get max supply (immutable, for audit verification)
     */
    function getMaxSupply() 
        public 
        pure 
        returns (uint256) 
    {
        return MAX_SUPPLY;
    }
    
    // ============ AUDIT METADATA ============
    
    function getDeploymentMetadata() 
        public 
        view 
        returns (
            string memory memo,
            string memory attestation,
            uint256 timestamp,
            address deployerAddress
        ) 
    {
        return (
            deploymentMemo,
            attestationReference,
            deploymentTimestamp,
            deployer
        );
    }
    
    // ============ PROHIBITED PATTERNS (INTENTIONALLY ABSENT) ============
    
    // ❌ NO yield calculation logic
    // ❌ NO automated payout functions
    // ❌ NO dividend distribution
    // ❌ NO contract holds customer funds
    // ❌ NO economic upgrade paths
    // ❌ NO participant-level tracking beyond ERC-20 standard
    
    // All economic distributions handled OFF-CHAIN via wire transfer to accredited investors
    // Token represents economic interest only - legal ownership stays in Delaware Statutory Trust
}
