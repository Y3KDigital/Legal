# XRPL (XRP Ledger) Integration

## Overview

**XRP Ledger (XRPL)** is a decentralized ledger with native support for:
- **Fast settlement** (3-5 second finality)
- **Low fees** (fractions of a cent)
- **Built-in DEX** (on-ledger order book)
- **Tokenization** (fungible and NFTs via amendments)
- **Payment channels** (off-ledger scalability)

## Architecture

```
Application -> rippled (XRPL Node) -> XRPL Network
                |
         Token (Issued Currency)
         or
         NFT (NFTokenMint)
```

## Use Cases

### 1. Fast Cross-Border Stablecoin Settlement
Issue USD stablecoin on XRPL for instant settlement.

**Benefits**:
- 3-5 second finality (vs minutes/hours for wire transfers)
- Low fees (~$0.0001 per transaction)
- Native DEX for trading stablecoin <-> XRP or other currencies

### 2. RWA Tokenization via Issued Currencies
Represent real-world assets as XRPL-issued currencies.

**Example**: Real estate token
- Issuer issues "PROPERTY123" currency (fungible)
- Each unit = ownership fraction
- Transfer restrictions via trust line freeze

### 3. NFT-Based Securities
Use XRPL NFTs for unique securities (e.g., bonds, loans).

**Example**: Tokenized bonds
- Each bond = NFT with metadata (maturity, coupon, etc.)
- Transfer with compliance via transfer hooks (planned feature)

## Token Standards on XRPL

### Issued Currencies (Fungible Tokens)
```json
{
  "TransactionType": "Payment",
  "Account": "rIssuer...",
  "Destination": "rRecipient...",
  "Amount": {
    "currency": "USD",
    "value": "100",
    "issuer": "rIssuer..."
  }
}
```

**Trust Lines**: Recipients must set trust line to issuer before receiving tokens.

**Freeze**: Issuer can freeze individual trust lines or globally freeze all tokens.

### NFTs (Non-Fungible Tokens)
```json
{
  "TransactionType": "NFTokenMint",
  "Account": "rIssuer...",
  "URI": "697066733A2F2F...",
  "NFTokenTaxon": 0,
  "TransferFee": 1000,
  "Flags": 8
}
```

**Transfer**: `NFTokenCreateOffer` + `NFTokenAcceptOffer`

**Royalties**: Built-in transfer fee (up to 50%)

## Compliance Features

### Trust Line Freeze
Issuer can freeze specific user's tokens (e.g., sanctions, court order).

```json
{
  "TransactionType": "TrustSet",
  "Account": "rIssuer...",
  "LimitAmount": {
    "currency": "USD",
    "value": "0",
    "issuer": "rRecipient..."
  },
  "Flags": 131072  // SetFreeze flag
}
```

### Global Freeze
Freeze all tokens issued by account (emergency stop).

```json
{
  "TransactionType": "AccountSet",
  "Account": "rIssuer...",
  "SetFlag": 7  // asfGlobalFreeze
}
```

### Authorized Trust Lines (RequireAuth)
Require issuer approval before users can hold tokens.

```json
{
  "TransactionType": "AccountSet",
  "Account": "rIssuer...",
  "SetFlag": 2  // asfRequireAuth
}
```

**Workflow**:
1. User sets trust line
2. Issuer reviews KYC
3. Issuer authorizes trust line
4. User can now receive tokens

### No Rippling (asfNoRipple)
Prevent tokens from being automatically exchanged through issuer account.

## Smart Contracts on XRPL

### Hooks (Amendment in Progress)
XRPL Hooks are WebAssembly smart contracts that execute on transaction events.

**Example**: Compliance hook
```c
// Pseudocode - actual Hooks use C/WASM
int64_t hook(uint32_t reserved) {
    // Read transaction
    uint8_t tx_hash[32];
    otxn_id(tx_hash, 32, 0);
    
    // Check compliance (KYC, sanctions)
    if (!is_kyc_approved(account)) {
        rollback(SBUF("KYC required"), 1);
    }
    
    // Check transfer restrictions
    if (is_sanctioned(destination)) {
        rollback(SBUF("Sanctioned address"), 1);
    }
    
    accept(0);
}
```

**Note**: Hooks not yet live on XRPL mainnet; check amendment status.

### Alternative: Off-Ledger Compliance
Until Hooks are live, enforce compliance off-ledger:
- Monitor XRPL ledger for transfers
- If non-compliant transfer detected, issuer freezes recipient
- Require pre-approval (RequireAuth) before users can hold tokens

## Integration Points

### XRPL Libraries
- **JavaScript**: `xrpl.js`
- **Python**: `xrpl-py`
- **Java**: `xrpl4j`

### Example: Issue Stablecoin
```javascript
const xrpl = require('xrpl');

// Connect to XRPL
const client = new xrpl.Client('wss://s1.ripple.com');
await client.connect();

// Enable RequireAuth
const accountSetTx = {
  TransactionType: 'AccountSet',
  Account: issuerWallet.address,
  SetFlag: xrpl.AccountSetAsfFlags.asfRequireAuth
};
await client.submitAndWait(accountSetTx, { wallet: issuerWallet });

// User creates trust line (after KYC)
const trustSetTx = {
  TransactionType: 'TrustSet',
  Account: userWallet.address,
  LimitAmount: {
    currency: 'USD',
    issuer: issuerWallet.address,
    value: '1000000'
  }
};
await client.submitAndWait(trustSetTx, { wallet: userWallet });

// Issuer authorizes (after KYC review)
const authorizeTx = {
  TransactionType: 'TrustSet',
  Account: issuerWallet.address,
  LimitAmount: {
    currency: 'USD',
    issuer: userWallet.address,
    value: '0'
  },
  Flags: xrpl.TrustSetFlags.tfSetfAuth
};
await client.submitAndWait(authorizeTx, { wallet: issuerWallet });

// Issue tokens
const paymentTx = {
  TransactionType: 'Payment',
  Account: issuerWallet.address,
  Destination: userWallet.address,
  Amount: {
    currency: 'USD',
    issuer: issuerWallet.address,
    value: '100'
  }
};
await client.submitAndWait(paymentTx, { wallet: issuerWallet });
```

## Control Mapping

- Maps to `kyc_aml` (RequireAuth + off-ledger KYC)
- Maps to `sanctions_screening` (freeze capability)
- Maps to `reporting` (all transactions on public ledger)
- Adds: `fast_settlement` (3-5 second finality)

## Compliance Notes

- XRPL is public; all transactions visible (consider privacy implications)
- Freeze capability provides emergency controls
- RequireAuth provides KYC gate
- For stronger compliance, wait for Hooks amendment or use hybrid approach

## Deployment Options

### Option A: Public XRPL Mainnet
- Use public validators
- Low cost, high reliability
- All transactions public

### Option B: Private XRPL Sidechain
- Run your own validators
- Private transactions
- Requires infrastructure

### Option C: Hybrid
- Issue tokens on public XRPL
- Store sensitive data off-chain
- Use RequireAuth + freeze for compliance

## Implementation Checklist

- [ ] Set up issuer account (cold wallet + operational hot wallet)
- [ ] Enable RequireAuth flag
- [ ] Integrate with KYC provider (authorize trust lines after KYC)
- [ ] Build trust line management system
- [ ] Implement monitoring for transfers (detect non-compliant activity)
- [ ] Set up freeze procedures (manual or automated)
- [ ] Test payment channels (if needed for high-volume)
- [ ] Document reserve requirements (XRP reserves for trust lines)
- [ ] Plan for Hooks integration (when amendment goes live)

## References

- [XRPL Documentation](https://xrpl.org/)
- [Issued Currencies](https://xrpl.org/issued-currencies.html)
- [NFTs on XRPL](https://xrpl.org/nfts.html)
- [Hooks (Amendment Proposal)](https://hooks.xrpl.org/)
- [Freeze Feature](https://xrpl.org/freezes.html)
