---
title: 'Solana Account Model'
excerpt: 'Learn how Solana stores data using accounts, programs, and rent -- and how it differs from UTXO-based blockchains.'
coverImage: '/images/begin_cover.png'
date: '2025-05-01'
author:
  name: Begin Wallet Team
  picture: '/images/logo_begin.png'
ogImage:
  url: '/images/begin_cover.png'
hero: false
group: 'Solana 101'
index: 5
---

# Solana's Account Model

If you have used Bitcoin or Cardano, you are familiar with the UTXO model -- where your balance is made up of individual unspent outputs. Solana takes a fundamentally different approach with its **account-based model**.

Jamie will walk you through how Solana handles data and why it matters for your wallet.

---

## What is an account on Solana?

On Solana, everything is an **account**. Accounts are the basic unit of storage on the network. They hold data, SOL balances, and even executable code.

There are a few types of accounts you will encounter:

- **System accounts**: Regular user wallets that hold SOL.
- **Token accounts**: Created to hold SPL tokens (Solana's token standard). Each token you own gets its own associated token account.
- **Program accounts**: These contain executable code -- what other blockchains call "smart contracts." On Solana, they are simply called **programs**.
- **Data accounts**: Programs can create additional accounts to store application state.

---

## How it differs from UTXO

In Bitcoin and Cardano, your balance is the sum of discrete UTXOs. Spending means consuming those outputs and creating new ones. On Solana, the model is more like a traditional database:

- Your wallet has a **single account** with a balance.
- Sending SOL directly reduces your balance and increases the recipient's balance.
- There are no "change" outputs or UTXO management to worry about.

This makes the mental model simpler for everyday transactions, though it introduces different considerations for more advanced use cases like concurrent access to shared state.

---

## Programs and ownership

Solana programs are **stateless** -- they do not store data inside themselves. Instead, they operate on accounts that are passed to them during a transaction. Each account has an **owner** field that determines which program can modify it.

For example:
- The **System Program** owns basic SOL wallets.
- The **Token Program** owns SPL token accounts.
- Custom programs own the data accounts they create.

This separation of code and data is one of the key architectural decisions behind Solana's performance.

---

## Rent

Solana charges **rent** to store data on-chain. Every account must maintain a minimum SOL balance (the "rent-exempt" threshold) to stay alive. For most users, this is handled automatically:

- When you create a new token account, a small deposit of SOL is reserved for rent.
- If an account is closed, the rent deposit is returned to you.
- Rent-exempt accounts (which meet the minimum balance) are never charged ongoing fees.

In practice, rent costs are small -- typically around 0.002 SOL for a standard token account.

---

## Jamie's Notes

- Solana's account model makes simple transfers straightforward, but understanding accounts, ownership, and rent helps when you start interacting with dApps.
- **You always need a small SOL balance** in your wallet to cover transaction fees and rent for new token accounts.
- Unlike UTXO chains, there is no concept of "change" on Solana -- transfers are direct balance updates.
- Programs on Solana are most commonly written in **Rust**, though frameworks like **Anchor** make development more accessible.

---

## What's next?

- [Send SOL from Begin Wallet](#)
- [Receive SOL into your wallet](#)
- [Explore Solana 101](#)
