# remigroup
# Create new token:
```bash
$ spl-token create-token
Address:  AsipeKV7JsvdRm53SxzgLgyT3XRrAp8npaZUkjsCR2ez
Decimals:  9

Signature: 2txkaMiTf4xUgUhRB46bLF8KEgVMW7f5oHTfpX417BEhWYqpqUT8Tzeh7KTYwkGmxefFGewB6QVZhmKBSeDNM7Vf
```

# Create new token address for handle token
```bash
$ spl-token create-account AsipeKV7JsvdRm53SxzgLgyT3XRrAp8npaZUkjsCR2ez

Creating account 2tpWVxf4stMp4kJFPNhK8xYsRBqc9Gd95v8o7SRW5gij

Signature: 4HmpiVdd3KptbtzA6kVahxJcYxipsD4Z9tQK6dHF98hZoPadXFYYPSL3Dzun55Hdvscn2n2KQKHt3dPYKrmZ578s
```
# Mint token
```bash
$ spl-token mint AsipeKV7JsvdRm53SxzgLgyT3XRrAp8npaZUkjsCR2ez 1000000 2tpWVxf4stMp4kJFPNhK8xYsRBqc9Gd95v8o7SRW5gij

Minting 1000000 tokens
  Token: AsipeKV7JsvdRm53SxzgLgyT3XRrAp8npaZUkjsCR2ez
  Recipient: 2tpWVxf4stMp4kJFPNhK8xYsRBqc9Gd95v8o7SRW5gij

Signature: L3ju54GuFn55a7xJ7aGr4pQT3J2oa3itBbDNRkiPzmYDSTzzYn5W8JttmwAcziu8nDrnfMv13oEWJNpFEwGhtp7
```
# Check token balance
```bash
$ spl-token accounts
Token                                         Balance
-----------------------------------------------------
AsipeKV7JsvdRm53SxzgLgyT3XRrAp8npaZUkjsCR2ez  1000000
```

# build token-swap
```bash
$ cd programs/token-swap
$ cargo build
$ anchor build

$ solana program deploy ../../target/deploy/spl_token_swap.so
Blockhash expired. 4 retries remaining
Program Id: GHycX7Bxopndrsm4aCbVi32UoN1tA5uSxiQKpzHqBJhV

$ solana program show GHycX7Bxopndrsm4aCbVi32UoN1tA5uSxiQKpzHqBJhV

Program Id: GHycX7Bxopndrsm4aCbVi32UoN1tA5uSxiQKpzHqBJhV
Owner: BPFLoaderUpgradeab1e11111111111111111111111
ProgramData Address: 4AWduaKcF8oMv6GLRBAgvjfapkANg3uYKjGS9Borweyk
Authority: 4ATRce7hYTCbU7tsgZrbUZBF5ByRsvn82miN2VU2ewUU
Last Deployed In Slot: 203282943
Data Length: 432992 (0x69b60) bytes
Balance: 3.0148284 SOL
```

# Build token swap
```bash
$ cd js
$ npm run init-testnet
```