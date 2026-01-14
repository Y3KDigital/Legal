// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "../shared/ComplianceHooks.sol";

/**
 * @title RWAToken
 * @notice ERC20 token representing real-world assets with transfer restrictions and compliance hooks
 * @dev Implements role-based access control, pausability, and pluggable compliance checks
 */
contract RWAToken is ERC20, AccessControl, Pausable {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");
    bytes32 public constant COMPLIANCE_ROLE = keccak256("COMPLIANCE_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    IComplianceHook public complianceHook;
    
    // Transfer restrictions per address
    mapping(address => bool) public allowlist;
    bool public allowlistEnabled;

    event ComplianceHookUpdated(address indexed oldHook, address indexed newHook);
    event AllowlistUpdated(address indexed account, bool status);
    event AllowlistModeChanged(bool enabled);

    constructor(
        string memory name,
        string memory symbol,
        address admin,
        address complianceHook_
    ) ERC20(name, symbol) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ISSUER_ROLE, admin);
        _grantRole(COMPLIANCE_ROLE, admin);
        _grantRole(PAUSER_ROLE, admin);
        
        complianceHook = IComplianceHook(complianceHook_);
        allowlistEnabled = true;
    }

    /**
     * @notice Mint tokens (restricted to ISSUER_ROLE)
     */
    function mint(address to, uint256 amount) external onlyRole(ISSUER_ROLE) {
        require(complianceHook.canMint(to, amount), "RWAToken: mint not allowed by compliance");
        _mint(to, amount);
    }

    /**
     * @notice Burn tokens (restricted to ISSUER_ROLE)
     */
    function burn(address from, uint256 amount) external onlyRole(ISSUER_ROLE) {
        require(complianceHook.canBurn(from, amount), "RWAToken: burn not allowed by compliance");
        _burn(from, amount);
    }

    /**
     * @notice Pause transfers (restricted to PAUSER_ROLE)
     */
    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }

    /**
     * @notice Unpause transfers (restricted to PAUSER_ROLE)
     */
    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    /**
     * @notice Update compliance hook (restricted to COMPLIANCE_ROLE)
     */
    function setComplianceHook(address newHook) external onlyRole(COMPLIANCE_ROLE) {
        address oldHook = address(complianceHook);
        complianceHook = IComplianceHook(newHook);
        emit ComplianceHookUpdated(oldHook, newHook);
    }

    /**
     * @notice Update allowlist for address (restricted to COMPLIANCE_ROLE)
     */
    function setAllowlist(address account, bool status) external onlyRole(COMPLIANCE_ROLE) {
        allowlist[account] = status;
        emit AllowlistUpdated(account, status);
    }

    /**
     * @notice Batch update allowlist (restricted to COMPLIANCE_ROLE)
     */
    function setAllowlistBatch(address[] calldata accounts, bool status) external onlyRole(COMPLIANCE_ROLE) {
        for (uint256 i = 0; i < accounts.length; i++) {
            allowlist[accounts[i]] = status;
            emit AllowlistUpdated(accounts[i], status);
        }
    }

    /**
     * @notice Enable/disable allowlist mode (restricted to COMPLIANCE_ROLE)
     */
    function setAllowlistMode(bool enabled) external onlyRole(COMPLIANCE_ROLE) {
        allowlistEnabled = enabled;
        emit AllowlistModeChanged(enabled);
    }

    /**
     * @dev Override transfer with compliance checks
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        if (from != address(0) && to != address(0)) {
            // Skip checks for mint/burn
            if (allowlistEnabled) {
                require(allowlist[from] && allowlist[to], "RWAToken: address not on allowlist");
            }
            require(complianceHook.canTransfer(from, to, amount), "RWAToken: transfer not allowed by compliance");
        }
        super._beforeTokenTransfer(from, to, amount);
    }
}
