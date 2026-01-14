# Layer 1 Rust Implementation Specification

## Overview

Build a custom Layer 1 blockchain optimized for compliant RWA and stablecoin operations, written in Rust.

**Key Features**:
- Compliance-native (KYC, sanctions, transfer restrictions at protocol level)
- Deterministic finality (no probabilistic settlement)
- Modular architecture (pluggable consensus, state transition)
- High performance (target 1000+ TPS)
- EVM compatibility (optional module for Solidity contracts)

## Framework Choice

### Option A: Substrate (Polkadot SDK)

**Pros**:
- Mature, production-ready
- Rich ecosystem of pallets (modules)
- Native cross-chain (XCM - Cross-Consensus Messaging)
- Easy to launch as parachain on Polkadot

**Cons**:
- Polkadot-specific concepts (some overhead if not joining Polkadot)

### Option B: Cosmos SDK (Rust Port via CosmWasm)

**Pros**:
- IBC (Inter-Blockchain Communication) for cross-chain
- Tendermint BFT consensus (proven)
- Modular architecture

**Cons**:
- Primary SDK is Go (Rust support via CosmWasm)

### Option C: Custom Rust Chain

**Pros**:
- Full control
- Optimized for exact use case

**Cons**:
- Significant development effort
- Need to build consensus, networking, etc.

**Recommendation**: **Substrate** for faster time-to-market with compliance modules.

## Architecture (Substrate-Based)

```
Application Layer (UI/Wallets)
        |
    RPC/API (JSON-RPC, WebSocket)
        |
    Runtime (WASM)
        |
    +---+---+---+---+---+
    |   |   |   |   |   |
  Compliance RWA Stablecoin Governance Utility
   Pallet  Pallet Pallet   Pallet   Pallets
    |   |   |   |   |   |
    +---+---+---+---+---+
        |
  Substrate Core (Consensus, Networking, Storage)
```

## Compliance Pallet (Rust)

### Features
- On-chain identity registry (KYC status, jurisdiction)
- Sanctions screening (allowlist/blocklist)
- Transfer restrictions (lock-ups, vesting, accredited-only)
- Policy packs (jurisdiction-specific rules)

### Interface
```rust
// pallets/compliance/src/lib.rs
#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet::*;

#[frame_support::pallet]
pub mod pallet {
    use frame_support::pallet_prelude::*;
    use frame_system::pallet_prelude::*;

    #[pallet::config]
    pub trait Config: frame_system::Config {
        type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
        type ComplianceOrigin: EnsureOrigin<Self::RuntimeOrigin>;
    }

    #[pallet::pallet]
    pub struct Pallet<T>(_);

    // Identity Registry
    #[pallet::storage]
    pub type Identities<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        T::AccountId,
        Identity<T>,
        OptionQuery
    >;

    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub struct Identity<T: Config> {
        pub kyc_status: KYCStatus,
        pub jurisdiction: Jurisdiction,
        pub accredited_investor: bool,
        pub sanctions_cleared: bool,
    }

    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub enum KYCStatus {
        None,
        Pending,
        Approved,
        Rejected,
    }

    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub enum Jurisdiction {
        US,
        EU,
        UK,
        SG,
        Other,
    }

    #[pallet::event]
    #[pallet::generate_deposit(pub(super) fn deposit_event)]
    pub enum Event<T: Config> {
        IdentityRegistered { account: T::AccountId },
        KYCApproved { account: T::AccountId },
        KYCRevoked { account: T::AccountId },
        SanctionsFlag { account: T::AccountId },
    }

    #[pallet::error]
    pub enum Error<T> {
        IdentityNotFound,
        NotKYCApproved,
        SanctionsViolation,
        JurisdictionRestriction,
    }

    #[pallet::call]
    impl<T: Config> Pallet<T> {
        /// Register identity (KYC provider calls this)
        #[pallet::weight(10_000)]
        pub fn register_identity(
            origin: OriginFor<T>,
            account: T::AccountId,
            jurisdiction: Jurisdiction,
            accredited: bool,
        ) -> DispatchResult {
            T::ComplianceOrigin::ensure_origin(origin)?;

            let identity = Identity {
                kyc_status: KYCStatus::Pending,
                jurisdiction,
                accredited_investor: accredited,
                sanctions_cleared: false,
            };

            Identities::<T>::insert(&account, identity);
            Self::deposit_event(Event::IdentityRegistered { account });

            Ok(())
        }

        /// Approve KYC (after review)
        #[pallet::weight(10_000)]
        pub fn approve_kyc(
            origin: OriginFor<T>,
            account: T::AccountId,
        ) -> DispatchResult {
            T::ComplianceOrigin::ensure_origin(origin)?;

            Identities::<T>::try_mutate(&account, |maybe_identity| -> DispatchResult {
                let identity = maybe_identity.as_mut().ok_or(Error::<T>::IdentityNotFound)?;
                identity.kyc_status = KYCStatus::Approved;
                identity.sanctions_cleared = true;

                Self::deposit_event(Event::KYCApproved { account: account.clone() });
                Ok(())
            })
        }

        /// Revoke KYC (sanctions, fraud, etc.)
        #[pallet::weight(10_000)]
        pub fn revoke_kyc(
            origin: OriginFor<T>,
            account: T::AccountId,
        ) -> DispatchResult {
            T::ComplianceOrigin::ensure_origin(origin)?;

            Identities::<T>::try_mutate(&account, |maybe_identity| -> DispatchResult {
                let identity = maybe_identity.as_mut().ok_or(Error::<T>::IdentityNotFound)?;
                identity.kyc_status = KYCStatus::Rejected;
                identity.sanctions_cleared = false;

                Self::deposit_event(Event::KYCRevoked { account: account.clone() });
                Ok(())
            })
        }
    }

    // Helper functions (callable from other pallets)
    impl<T: Config> Pallet<T> {
        pub fn is_kyc_approved(account: &T::AccountId) -> bool {
            Identities::<T>::get(account)
                .map(|id| id.kyc_status == KYCStatus::Approved && id.sanctions_cleared)
                .unwrap_or(false)
        }

        pub fn is_accredited(account: &T::AccountId) -> bool {
            Identities::<T>::get(account)
                .map(|id| id.accredited_investor)
                .unwrap_or(false)
        }

        pub fn get_jurisdiction(account: &T::AccountId) -> Option<Jurisdiction> {
            Identities::<T>::get(account).map(|id| id.jurisdiction)
        }
    }
}
```

## RWA Pallet (Rust)

### Features
- Issue RWA tokens (ERC20-like)
- Transfer with compliance checks (calls Compliance pallet)
- Corporate actions (dividends, splits)
- Redemption

### Interface
```rust
// pallets/rwa/src/lib.rs
#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet::*;

#[frame_support::pallet]
pub mod pallet {
    use frame_support::pallet_prelude::*;
    use frame_system::pallet_prelude::*;
    use super::super::compliance;

    #[pallet::config]
    pub trait Config: frame_system::Config + compliance::Config {
        type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
    }

    #[pallet::pallet]
    pub struct Pallet<T>(_);

    // Token balances
    #[pallet::storage]
    pub type Balances<T: Config> = StorageDoubleMap<
        _,
        Blake2_128Concat,
        TokenId,
        Blake2_128Concat,
        T::AccountId,
        u128,
        ValueQuery
    >;

    pub type TokenId = u64;

    #[pallet::storage]
    pub type TokenMetadata<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        TokenId,
        Token<T>,
        OptionQuery
    >;

    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo)]
    pub struct Token<T: Config> {
        pub name: Vec<u8>,
        pub symbol: Vec<u8>,
        pub total_supply: u128,
        pub issuer: T::AccountId,
        pub accredited_only: bool,
    }

    #[pallet::event]
    #[pallet::generate_deposit(pub(super) fn deposit_event)]
    pub enum Event<T: Config> {
        TokenIssued { token_id: TokenId, issuer: T::AccountId, supply: u128 },
        Transfer { token_id: TokenId, from: T::AccountId, to: T::AccountId, amount: u128 },
        Mint { token_id: TokenId, to: T::AccountId, amount: u128 },
        Burn { token_id: TokenId, from: T::AccountId, amount: u128 },
    }

    #[pallet::error]
    pub enum Error<T> {
        TokenNotFound,
        InsufficientBalance,
        ComplianceCheckFailed,
        AccreditedInvestorRequired,
        JurisdictionMismatch,
    }

    #[pallet::call]
    impl<T: Config> Pallet<T> {
        /// Issue new RWA token
        #[pallet::weight(10_000)]
        pub fn issue_token(
            origin: OriginFor<T>,
            name: Vec<u8>,
            symbol: Vec<u8>,
            supply: u128,
            accredited_only: bool,
        ) -> DispatchResult {
            let issuer = ensure_signed(origin)?;

            let token_id = Self::next_token_id();
            let token = Token {
                name,
                symbol,
                total_supply: supply,
                issuer: issuer.clone(),
                accredited_only,
            };

            TokenMetadata::<T>::insert(token_id, token);
            Balances::<T>::insert(token_id, &issuer, supply);

            Self::deposit_event(Event::TokenIssued { token_id, issuer, supply });

            Ok(())
        }

        /// Transfer tokens with compliance checks
        #[pallet::weight(10_000)]
        pub fn transfer(
            origin: OriginFor<T>,
            token_id: TokenId,
            to: T::AccountId,
            amount: u128,
        ) -> DispatchResult {
            let from = ensure_signed(origin)?;

            // Compliance checks
            ensure!(
                compliance::Pallet::<T>::is_kyc_approved(&from),
                Error::<T>::ComplianceCheckFailed
            );
            ensure!(
                compliance::Pallet::<T>::is_kyc_approved(&to),
                Error::<T>::ComplianceCheckFailed
            );

            let token = TokenMetadata::<T>::get(token_id).ok_or(Error::<T>::TokenNotFound)?;

            // Check accredited investor requirement
            if token.accredited_only {
                ensure!(
                    compliance::Pallet::<T>::is_accredited(&to),
                    Error::<T>::AccreditedInvestorRequired
                );
            }

            // Check balance
            let from_balance = Balances::<T>::get(token_id, &from);
            ensure!(from_balance >= amount, Error::<T>::InsufficientBalance);

            // Update balances
            Balances::<T>::insert(token_id, &from, from_balance - amount);
            let to_balance = Balances::<T>::get(token_id, &to);
            Balances::<T>::insert(token_id, &to, to_balance + amount);

            Self::deposit_event(Event::Transfer { token_id, from, to, amount });

            Ok(())
        }
    }

    impl<T: Config> Pallet<T> {
        fn next_token_id() -> TokenId {
            // Implementation: increment counter
            1
        }
    }
}
```

## Stablecoin Pallet

Similar to RWA pallet but with:
- Reserve attestation integration
- Mint/burn controls (only authorized minters)
- Peg maintenance mechanisms

(See full implementation in `pallets/stablecoin/`)

## Consensus

### GRANDPA + BABE (Substrate Default)
- **BABE**: Block production (VRF-based slot assignment)
- **GRANDPA**: Finality gadget (deterministic finality)

### BEEFY (Bridge Efficiency Enabling Finality Yielder)
For Ethereum light client (if bridging to Ethereum)

### Custom Consensus (Optional)
Replace BABE with custom leader election (e.g., PoA with known validators)

## Genesis Configuration

```rust
// node/src/chain_spec.rs
use sc_service::ChainType;
use sp_core::{sr25519, Pair, Public};

pub fn development_config() -> Result<ChainSpec, String> {
    let wasm_binary = WASM_BINARY.ok_or("Wasm binary not available")?;

    Ok(ChainSpec::from_genesis(
        "RWA Chain Development",
        "rwa_dev",
        ChainType::Development,
        move || testnet_genesis(
            wasm_binary,
            vec![
                authority_keys_from_seed("Alice"),
                authority_keys_from_seed("Bob"),
            ],
            get_account_id_from_seed::<sr25519::Public>("Alice"),
            vec![
                get_account_id_from_seed::<sr25519::Public>("Alice"),
                get_account_id_from_seed::<sr25519::Public>("Bob"),
                get_account_id_from_seed::<sr25519::Public>("Charlie"),
            ],
            true,
        ),
        vec![],
        None,
        None,
        None,
        None,
    ))
}

fn testnet_genesis(
    wasm_binary: &[u8],
    initial_authorities: Vec<(AccountId, AccountId, GrandpaId, BabeId)>,
    root_key: AccountId,
    endowed_accounts: Vec<AccountId>,
    _enable_println: bool,
) -> GenesisConfig {
    GenesisConfig {
        system: SystemConfig {
            code: wasm_binary.to_vec(),
        },
        balances: BalancesConfig {
            balances: endowed_accounts.iter().cloned().map(|k| (k, 1 << 60)).collect(),
        },
        compliance: ComplianceConfig {
            // Pre-approve Alice and Bob for testing
            identities: vec![
                (get_account_id_from_seed::<sr25519::Public>("Alice"), Identity {
                    kyc_status: KYCStatus::Approved,
                    jurisdiction: Jurisdiction::US,
                    accredited_investor: true,
                    sanctions_cleared: true,
                }),
                (get_account_id_from_seed::<sr25519::Public>("Bob"), Identity {
                    kyc_status: KYCStatus::Approved,
                    jurisdiction: Jurisdiction::EU,
                    accredited_investor: false,
                    sanctions_cleared: true,
                }),
            ],
        },
        sudo: SudoConfig { key: Some(root_key) },
        // ... other pallets
    }
}
```

## Building and Running

### Build Runtime
```bash
cargo build --release

# Check runtime size (WASM must be < 5MB for optimal performance)
ls -lh target/release/wbuild/rwa-runtime/rwa_runtime.compact.wasm
```

### Run Node
```bash
# Dev mode (single validator)
./target/release/rwa-node --dev

# Multi-validator testnet
./target/release/rwa-node \
    --chain=local \
    --alice \
    --port 30333 \
    --rpc-port 9933 \
    --node-key 0000000000000000000000000000000000000000000000000000000000000001
```

### Deploy as Parachain on Polkadot
1. Build parachain runtime
2. Generate genesis state and WASM
3. Acquire parachain slot (auction or lease)
4. Register parachain on relay chain

## Testing

### Unit Tests
```rust
#[cfg(test)]
mod tests {
    use super::*;
    use frame_support::{assert_ok, assert_noop};
    use sp_core::H256;

    #[test]
    fn transfer_with_compliance_works() {
        new_test_ext().execute_with(|| {
            // Register and approve KYC for Alice and Bob
            assert_ok!(Compliance::register_identity(
                RuntimeOrigin::root(),
                alice(),
                Jurisdiction::US,
                true
            ));
            assert_ok!(Compliance::approve_kyc(RuntimeOrigin::root(), alice()));
            
            // Issue token
            assert_ok!(RWA::issue_token(
                RuntimeOrigin::signed(alice()),
                b"Real Estate".to_vec(),
                b"RWA-RE".to_vec(),
                1_000_000,
                false
            ));

            // Transfer
            assert_ok!(RWA::transfer(RuntimeOrigin::signed(alice()), 1, bob(), 100));
            assert_eq!(RWA::balance_of(1, bob()), 100);
        });
    }

    #[test]
    fn transfer_without_kyc_fails() {
        new_test_ext().execute_with(|| {
            // Issue token
            assert_ok!(RWA::issue_token(RuntimeOrigin::signed(alice()), ...));

            // Try to transfer without KYC
            assert_noop!(
                RWA::transfer(RuntimeOrigin::signed(alice()), 1, bob(), 100),
                Error::<Test>::ComplianceCheckFailed
            );
        });
    }
}
```

### Integration Tests
Test full lifecycle: register identity, approve KYC, issue token, transfer, corporate action, redeem.

## EVM Compatibility (Optional)

Add Frontier pallet for Solidity contract support:
```rust
// Cargo.toml
[dependencies]
pallet-evm = { version = "6.0.0", default-features = false }
pallet-ethereum = { version = "4.0.0", default-features = false }
```

Allows deployment of existing Solidity contracts (RWAToken.sol, Stablecoin.sol) on custom L1.

## Next Steps

1. **Set up Substrate project**: `substrate-node-template`
2. **Implement Compliance pallet** (identity, KYC, sanctions)
3. **Implement RWA pallet** (issuance, transfer with compliance)
4. **Implement Stablecoin pallet** (mint/burn with reserve attestation)
5. **Write tests** (unit + integration)
6. **Deploy local testnet** (3+ validators)
7. **Benchmark performance** (TPS, finality time)
8. **Security audit** (Rust code + runtime logic)
9. **Deploy public testnet**
10. **Launch mainnet** (or as Polkadot parachain)

## References

- [Substrate Documentation](https://docs.substrate.io/)
- [Substrate Runtime Development](https://docs.substrate.io/build/runtime-development/)
- [Polkadot Parachains](https://wiki.polkadot.network/docs/learn-parachains)
- [Frontier (EVM on Substrate)](https://github.com/paritytech/frontier)
