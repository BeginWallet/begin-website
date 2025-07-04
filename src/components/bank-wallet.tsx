'use client';

import {
  Key,
  Globe,
  Clock,
  Banknote,
  TrendingUp,
  EyeOff,
  ShieldCheck,
  Vote,
  Sparkles,
  Scale,
} from 'lucide-react';

import { motion } from "framer-motion";

const featureItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const comparisons = [
  {
    label: 'Custody',
    icon: <Key className="w-6 h-6 text-cyan-light dark:text-cyan-dark" />,
    bank: 'Bank holds your money',
    wallet: 'You hold your keys — full control',
  },
  {
    label: 'Access',
    icon: <Globe className="w-6 h-6 text-cyan-light dark:text-cyan-dark" />,
    bank: 'Requires ID, approvals, local presence',
    wallet: 'Global access, no gatekeepers',
  },
  {
    label: 'Availability',
    icon: <Clock className="w-6 h-6 text-cyan-light dark:text-cyan-dark" />,
    bank: 'Limited to business hours',
    wallet: 'Always on: 24/7/365',
  },
  {
    label: 'Transfers',
    icon: <Banknote className="w-6 h-6 text-cyan-light dark:text-cyan-dark" />,
    bank: 'Slow and expensive',
    wallet: 'Seconds to Minutes, low-fee transactions',
  },
  {
    label: 'Lending & Yield',
    icon: <TrendingUp className="w-6 h-6 text-cyan-light dark:text-cyan-dark" />,
    bank: 'Bank earns interest on your money',
    wallet: 'You earn yield via DeFi protocols',
  },
  {
    label: 'Transparency',
    icon: <EyeOff className="w-6 h-6 text-cyan-light dark:text-cyan-dark" />,
    bank: 'Closed systems, hidden fees',
    wallet: 'Open-source, auditable smart contracts',
  },
  {
    label: 'Privacy',
    icon: <ShieldCheck className="w-6 h-6 text-cyan-light dark:text-cyan-dark" />,
    bank: 'Surveillance-based identity',
    wallet: 'Self-sovereign identity (Begin ID) *Soon',
  },
  {
    label: 'Voting Rights',
    icon: <Vote className="w-6 h-6 text-cyan-light dark:text-cyan-dark" />,
    bank: 'No say in decisions',
    wallet: 'On-chain governance participation',
  },
  {
    label: 'Innovation Speed',
    icon: <Sparkles className="w-6 h-6 text-cyan-light dark:text-cyan-dark" />,
    bank: 'Years between features',
    wallet: 'Constantly evolving ecosystem',
  },
  {
    label: 'Trust Model',
    icon: <Scale className="w-6 h-6 text-cyan-light dark:text-cyan-dark" />,
    bank: 'Legal & institutional',
    wallet: 'Math, cryptography, and open code',
  },
];

export default function BankVsWalletSection() {
  return (
    <section className="px-6 py-16" id="bank-vs-wallet">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Skip the Middlemen. Own Your Finance.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-500 text-lg max-w-2xl mx-auto mb-12"
        >
          Traditional banks are built on trust in institutions. Begin Wallet is built on trust in code. Here’s how DeFi puts you in control.
        </motion.p>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse bg-gray-100 dark:bg-[#18181b] shadow-sm rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider p-4">Feature</th>
                <th className="text-sm font-semibold text-gray-700 dark:text-gray-100 p-4">TradFi Bank 🏦</th>
                <th className="text-sm font-semibold text-gray-700 dark:text-gray-100 p-4">Begin Wallet 🔐</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {comparisons.map((item, i) => (
                <tr key={i}>
                  <td className="p-4 font-medium text-gray-900 dark:text-white flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">{item.bank}</td>
                  <td className="p-4 text-cyan-light dark:text-cyan-dark font-semibold">{item.wallet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-6">
          {comparisons.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={featureItemVariants}
              className="bg-gray-100 dark:bg-[#18181b] p-6 rounded-xl shadow hover:shadow-md"
            >
              <div className="flex items-center gap-3 mb-2">
                {item.icon}
                <h3 className="text-xl font-semibold">{item.label}</h3>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-semibold text-gray-800 dark:text-gray-200">TradFi Bank: </span>
                {item.bank}
              </div>
              <div className="text-sm text-cyan-light dark:text-cyan-dark font-semibold">
                Begin Wallet: {item.wallet}
              </div>
            </motion.div>
            // <div
            //   key={i}
            //   className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-200 dark:border-gray-700"
            // >
              
            // </div>
          ))}
        </div>
      </div>
    </section>
  );
}
