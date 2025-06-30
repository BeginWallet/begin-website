---
title: 'Cardano eUTXO'
excerpt: 'Learn about the eUTXO model in Cardano and how it enhances security and transaction processing.'
coverImage: '/images/begin_cover.png'
date: '2025-05-01'
author:
  name: Begin Wallet Team
  picture: '/images/logo_begin.png'
ogImage:
  url: '/images/begin_cover.png'
hero: false
group: 'Cardano 101'
index: 5
---

# Cardano eUTXO

Cardano’s **eUTXO (Extended Unspent Transaction Output)** model is one of the key features that sets it apart from other blockchain platforms. By using this model, Cardano can offer enhanced **security**, **scalability**, and more efficient transaction processing.

Jamie will walk you through the eUTXO model and how it works within the Cardano ecosystem.

---

## 🔍 What is eUTXO?

The **eUTXO** model is an advanced version of the traditional **UTXO** (Unspent Transaction Output) model, which is commonly used by Bitcoin and other blockchains. The main difference is that **eUTXO** allows for more flexibility and smart contract integration while maintaining the security and simplicity of the UTXO model.

In simple terms, **eUTXO** improves how transactions are processed by allowing for more complex and sophisticated operations while still ensuring that **transactions** are **secure** and **decentralized**.

### Key Features of eUTXO:
- **Transaction Outputs**: Each transaction creates an output that can be used in future transactions.
- **Atomicity**: eUTXO ensures that each transaction is atomic, meaning it either happens completely or not at all. This makes it very reliable.
- **Smart Contract Integration**: Unlike Bitcoin’s UTXO model, eUTXO integrates seamlessly with **smart contracts**, allowing for more complex functionality.

---

## ⚙️ How eUTXO Works

1. **UTXOs as Building Blocks**
   - In the eUTXO model, every transaction has **inputs** and **outputs**.
   - The outputs are unspent transaction outputs (UTXOs) that can be used in future transactions.

2. **Inputs and Outputs**
   - **Inputs** are the UTXOs you’re spending.
   - **Outputs** are the new UTXOs created as a result of the transaction, which will be available to others for future use.

3. **Transaction Validation**
   - Transactions are validated based on the inputs (UTXOs) and outputs (new UTXOs) to ensure that no ADA is double-spent.

4. **Atomic Transactions**
   - eUTXO ensures that transactions happen in one atomic operation: all inputs must be valid, and all outputs must be correctly created. This prevents incomplete transactions or errors.

5. **Smart Contract Use**
   - eUTXO is designed to support **smart contracts**, enabling decentralized applications (dApps) on the Cardano network to operate securely and predictably.

---

## 🚀 Benefits of eUTXO

- **Security**: Transactions are secure and predictable, with every output needing to be spent in full.
- **Scalability**: The model allows Cardano to scale efficiently, as it handles complex transactions without compromising performance.
- **Enhanced Functionality**: The eUTXO model facilitates more sophisticated transaction logic, enabling smart contracts and multi-signature setups.

---

## ⚠️ Jamie’s Notes

- While **eUTXO** provides powerful benefits for scalability and security, it’s important to note that it can also make certain **complex transactions** more challenging for new users to understand.
- Cardano’s **native tokens** and **smart contracts** benefit greatly from this model, providing **decentralized applications** with more control over transaction outcomes.

---

## What’s next?

- 👉 [Learn how to use smart contracts on Cardano](#)  
- 👉 [Explore Cardano staking](#)  
- 👉 [Send and receive ADA securely](#)
