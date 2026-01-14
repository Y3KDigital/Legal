# SWIFT Integration

## Overview

**SWIFT** (Society for Worldwide Interbank Financial Telecommunication) is the global messaging network for cross-border financial transactions.

**Use cases**:
- Fiat on-ramp: Bank wire  stablecoin mint
- Fiat off-ramp: Stablecoin burn  bank wire  
- Settlement instructions for RWA token trades
- Atomic settlement (DvP - Delivery vs Payment)
- Cross-border payments for institutional clients

## Message Types

### MT103 (Single Customer Credit Transfer)
Wire transfer from sender to beneficiary.

**Example**:
\\\
{1:F01BANKUS33AXXX0000000000}
{2:I103BANKGB2LXXXXN}
{4:
:20:REFERENCE123
:23B:CRED
:32A:230115USD100000,00
:50K:/1234567890
JOHN DOE
123 MAIN ST
NEW YORK NY 10001 US
:59:/0987654321
JANE SMITH
456 HIGH ST
LONDON EC1A 1BB GB
:70:STABLECOIN PURCHASE
:71A:OUR
-}
\\\

### MT202 (General Financial Institution Transfer)
Bank-to-bank transfer (no customer info).

### MT202COV (Cover Payment)
Used with MT103 for correspondent banking.

### ISO 20022 (Modern Replacement)
XML-based messages replacing MT messages:
- \pacs.008\ (Customer Credit Transfer)
- \pacs.009\ (Financial Institution Credit Transfer)

## Integration Flow

### Fiat-to-Stablecoin (On-Ramp)

1. User initiates wire transfer via bank (SWIFT MT103 or ISO 20022 pacs.008)
2. SWIFT message routed through correspondent banks (if needed)
3. Stablecoin issuer's bank receives funds (credit notification)
4. Bank notifies issuer via API or file feed (MT940 statement)
5. Issuer verifies KYC, sanctions, amount
6. Issuer mints stablecoin on-chain
7. User receives stablecoin in wallet

**Timing**: 1-3 business days (depends on correspondent banking)

### Stablecoin-to-Fiat (Off-Ramp)

1. User submits redemption request (burns stablecoin on-chain)
2. Smart contract emits Burn event
3. Issuer system monitors blockchain for burn events
4. Issuer verifies KYC and bank account
5. Issuer constructs and sends SWIFT MT103
6. SWIFT message routed to user's bank
7. User's bank credits user account
8. Issuer records reserve decrease

**Timing**: 1-2 business days

## Control Mapping

- Maps to \kyc_aml\ (SWIFT requires sender/beneficiary info)
- Maps to \sanctions_screening\ (SWIFT messages screened by SWIFT Compliance)
- Maps to \eporting\ (SWIFT messages are audit trail for regulators)
- Maps to \eserve_custody\ (fiat reserves match minted tokens)

## Compliance Notes

- **SWIFT access**: Requires BIC code (must be regulated financial institution)
- **PII handling**: SWIFT messages contain personal data (GDPR implications)
- **Sanctions**: SWIFT has built-in screening, but issuer must also screen
- **KYC**: Bank-level KYC may not satisfy issuer's requirements (separate KYC needed)
- **AML**: Large or suspicious wires must be reported (SAR/STR)

## Implementation Checklist

- [ ] Partner with bank that has SWIFT access (or obtain BIC directly)
- [ ] Set up API integration (or SWIFT Alliance if direct)
- [ ] Implement MT103 / ISO 20022 message parsing
- [ ] Build webhook handler for incoming wires
- [ ] Integrate with KYC system (verify sender before mint)
- [ ] Integrate with sanctions screening
- [ ] Set up SWIFT message logging (audit trail)
- [ ] Implement reconciliation (fiat received = tokens minted)
- [ ] Test on-ramp flow (wire -> mint)
- [ ] Test off-ramp flow (burn -> wire)

## References

- [SWIFT Standards](https://www.swift.com/standards)
- [ISO 20022](https://www.iso20022.org/)
- [SWIFT GPI](https://www.swift.com/our-solutions/global-financial-messaging/payments-cash-management/swift-gpi)
