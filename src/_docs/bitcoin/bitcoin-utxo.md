---
title: 'Understanding Bitcoin UTXOs'
excerpt: 'Learn what Bitcoin UTXOs are, how they work, and why they matter for managing your BTC in Begin Wallet.'
coverImage: '/images/begin_cover.png'
date: '2025-05-01'
author:
  name: Begin Wallet Team
  picture: '/images/logo_begin.png'
ogImage:
  url: '/images/begin_cover.png'
hero: false
group: 'Bitcoin 101'
index: 5
---

# Understanding Bitcoin UTXOs

If you're using Bitcoin, you’re managing UTXOs — even if you don’t know it. Begin Wallet gives you visibility into these inputs and helps optimize your transactions.

Let’s have Jamie explain what UTXOs are and how they affect your BTC usage.

---

## 💡 What is a UTXO?

UTXO stands for **Unspent Transaction Output**. It’s how Bitcoin keeps track of who owns what.

Think of UTXOs like physical cash:
- If someone gives you two $10 bills, you don’t “have $20” in one chunk — you have two separate $10 bills.
- When you spend $15, the system gives you $5 back in change — this is a new UTXO.

In Bitcoin, **each received transaction creates a UTXO**, and each time you send BTC, those UTXOs are consumed and new ones are created.

---

## 🧩 Why UTXOs matter

- **Transaction Size**: The more UTXOs you have, the larger (and more expensive) a transaction may be.
- **Privacy**: UTXOs can be linked. Consolidating UTXOs could reveal past transactions.
- **Optimization**: Begin Wallet helps you group UTXOs efficiently when you send BTC.

---

## 🔍 View UTXOs in Begin

1. Tap your **Bitcoin wallet**
2. Scroll to the **UTXO View**
3. See each unspent output:
   - Amount
   - Origin address
   - Linked transaction
   - Age (block height)

This gives you full transparency into how your BTC is stored and spent.

---

## ✅ Jamie’s Notes

- UTXOs are **Bitcoin’s accounting system** — different from Cardano’s model (which also uses UTXOs but in an extended form).
- You can’t “partially spend” a UTXO — it must be fully used and will return any leftover as change.
- Begin handles UTXOs under the hood, but gives you the power to inspect them if needed.

---

## What’s next?

- 👉 [Send Bitcoin with optimized fees](#)  
- 👉 [Receive new UTXOs](#)  
- 👉 [Export your BTC wallet](#)
