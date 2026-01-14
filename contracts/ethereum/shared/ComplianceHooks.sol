// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @notice Minimal interface for pluggable compliance checks.
/// @dev This is a placeholder; wire to your chosen registry/oracle/policy engine.
interface IComplianceHook {
    function canTransfer(address from, address to, uint256 amount) external view returns (bool);
    function canMint(address to, uint256 amount) external view returns (bool);
    function canBurn(address from, uint256 amount) external view returns (bool);
}
