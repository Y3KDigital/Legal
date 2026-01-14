// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "../shared/ComplianceHooks.sol";

/**
 * @title Stablecoin
 * @notice ERC20 stablecoin with mint/burn controls, compliance hooks, and reserve attestation events
 * @dev Implements role-based mint/burn, pausability, and pluggable compliance
 */
contract Stablecoin is ERC20, AccessControl, Pausable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant COMPLIANCE_ROLE = keccak256("COMPLIANCE_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant ATTESTATION_ROLE = keccak256("ATTESTATION_ROLE");

    IComplianceHook public complianceHook;
    
    // Reserve attestation tracking
    uint256 public lastAttestationBlock;
    string public lastAttestationURI;

    event ComplianceHookUpdated(address indexed oldHook, address indexed newHook);
    event ReserveAttestation(uint256 indexed blockNumber, string uri, uint256 totalSupply);

    constructor(
        string memory name,
        string memory symbol,
        address admin,
        address complianceHook_
    ) ERC20(name, symbol) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(MINTER_ROLE, admin);
        _grantRole(BURNER_ROLE, admin);
        _grantRole(COMPLIANCE_ROLE, admin);
        _grantRole(PAUSER_ROLE, admin);
        _grantRole(ATTESTATION_ROLE, admin);
        
        complianceHook = IComplianceHook(complianceHook_);
    }

    /**
     * @notice Mint tokens (restricted to MINTER_ROLE)
     */
    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        require(complianceHook.canMint(to, amount), "Stablecoin: mint not allowed by compliance");
        _mint(to, amount);
    }

    /**
     * @notice Burn tokens from caller
     */
    function burn(uint256 amount) external {
        require(complianceHook.canBurn(msg.sender, amount), "Stablecoin: burn not allowed by compliance");
        _burn(msg.sender, amount);
    }

    /**
     * @notice Burn tokens from address (restricted to BURNER_ROLE)
     */
    function burnFrom(address from, uint256 amount) external onlyRole(BURNER_ROLE) {
        require(complianceHook.canBurn(from, amount), "Stablecoin: burn not allowed by compliance");
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
     * @notice Record reserve attestation (restricted to ATTESTATION_ROLE)
     * @param uri URI pointing to attestation report (e.g., IPFS hash)
     */
    function recordAttestation(string calldata uri) external onlyRole(ATTESTATION_ROLE) {
        lastAttestationBlock = block.number;
        lastAttestationURI = uri;
        emit ReserveAttestation(block.number, uri, totalSupply());
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
            require(complianceHook.canTransfer(from, to, amount), "Stablecoin: transfer not allowed by compliance");
        }
        super._beforeTokenTransfer(from, to, amount);
    }
}
