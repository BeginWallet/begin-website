// /pages/bitcoin-wallet.tsx

import Layout from "../components/layout";
import Navigation from "../components/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import screens from "../public/images/hero-app-screens-buy.png";
import mobile_screens from "../public/images/hero-mobile-app-screens-buy.png";
import { ShieldCheck, Globe, Zap, Layers, Target, ChevronDown } from "lucide-react";


const faqs = [
  {
    question: "How do I buy ADA or BTC with Apple Pay?",
    answer:
      "Buying crypto with Apple Pay is easy with Begin Wallet. Just open the app, tap 'Buy,' select ADA or BTC, choose Apple Pay as your payment method, and complete your purchase instantly.",
  },
  {
    question: "Can I sell ADA for USD, EUR, or other fiat currencies?",
    answer:
      "Yes! Begin Wallet allows you to sell ADA for fiat currencies like USD, EUR, GBP, and many more. Simply tap 'Sell' inside the app and choose your preferred payout method: credit card or bank transfer.",
  },
  {
    question: "What payment methods does Begin Wallet support?",
    answer:
      "Begin Wallet supports 130+ payment methods, including Apple Pay, Google Pay, Visa, Mastercard, Bank Transfers (SEPA, SWIFT), Revolut Pay, and local options like PIX and Faster Payments.",
  },
  {
    question: "Is Begin Wallet non-custodial?",
    answer:
      "Yes. Begin Wallet is fully non-custodial — you control your private keys, and only you can access your funds. Your crypto, your rules.",
  },
  {
    question: "What tokens can I swap in Begin Wallet?",
    answer:
      "You can swap any Cardano native asset (such as AGIX, SNEK, WMT, and more), plus cross-chain swaps between ADA and BTC. More assets are being added as liquidity options expand.",
  },
];

export default function BuySwapExchangePage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax effect for the hero image
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <Layout>
      <Head>
        <title>Buy, Swap & Exchange Crypto Instantly | Begin Wallet</title>
        <meta
          name="description"
          content="Buy ADA and BTC with Apple Pay, swap Cardano tokens, and exchange crypto instantly with Begin Wallet. 130+ payment methods, 145+ countries supported."
        />

        {/* Open Graph Meta */}
        <meta
          property="og:title"
          content="Buy, Swap & Exchange Crypto Instantly | Begin Wallet"
        />
        <meta
          property="og:description"
          content="Buy ADA and BTC with Apple Pay, swap Cardano tokens, and exchange crypto instantly with Begin Wallet. 130+ payment methods, 145+ countries supported."
        />
        <meta property="og:image" content="https://begin.is/og-image.png" />
        <meta property="og:url" content="https://begin.is/buy-swap-exchange" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Buy, Swap & Exchange Crypto Instantly | Begin Wallet"
        />
        <meta
          name="twitter:description"
          content="Buy ADA and BTC with Apple Pay, swap Cardano tokens, and exchange crypto instantly with Begin Wallet. 130+ payment methods, 145+ countries supported."
        />
        <meta name="twitter:image" content="https://begin.is/og-image.png" />

        {/* FAQ SEO Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How do I buy ADA or BTC with Apple Pay?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Buying crypto with Apple Pay is easy with Begin Wallet. Just open the app, tap 'Buy,' select ADA or BTC, choose Apple Pay as your payment method, and complete your purchase instantly."
              }
            },
            {
              "@type": "Question",
              "name": "Can I sell ADA for USD, EUR, or other fiat currencies?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Begin Wallet allows you to sell ADA for fiat currencies like USD, EUR, GBP, and many more. Simply tap 'Sell' inside the app and choose your preferred payout method: credit card or bank transfer."
              }
            },
            {
              "@type": "Question",
              "name": "What payment methods does Begin Wallet support?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Begin Wallet supports 130+ payment methods, including Apple Pay, Google Pay, Visa, Mastercard, Bank Transfers (SEPA, SWIFT), Revolut Pay, and local options like PIX and Faster Payments."
              }
            },
            {
              "@type": "Question",
              "name": "Is Begin Wallet non-custodial?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Begin Wallet is fully non-custodial — you control your private keys, and only you can access your funds. Your crypto, your rules."
              }
            },
            {
              "@type": "Question",
              "name": "What tokens can I swap in Begin Wallet?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can swap any Cardano native asset (such as AGIX, SNEK, WMT, and more), plus cross-chain swaps between ADA and BTC. More assets are being added as liquidity options expand."
              }
            }
          ]
        }
        `,
          }}
        />
      </Head>

      <Navigation />

      {/* Hero Section */}
      <section
        ref={ref}
        className="px-6 py-16 md:py-16 relative overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 sm:pt-0 md:pt-10 lg:pt-10 text-center"
        >
          <h1 className="text-4xl font-bold mt-12 mb-8 text-gray-900 dark:text-white">
            Buy, Swap, and Exchange Crypto <br />
            Instantly with Begin Wallet
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Crypto made simple. Buy ADA and BTC with Apple Pay, swap any Cardano
            token, and exchange ADA and Bitcoin — all in one non-custodial
            wallet.
          </p>
        </motion.div>

        <motion.div
          style={{ y }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeIn" }}
          className="relative mx-auto mt-12 w-[90%] max-w-[1000px] z-0 pointer-events-none aspect-[1000/537] hidden sm:hidden lg:block"
        >
          <Image
            src={screens}
            alt="Begin Wallet Screens"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 90vw"
            className="object-contain"
          />
        </motion.div>

        <motion.div
          style={{ y }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeIn" }}
          className="relative mx-auto mt-12 w-[90%] max-w-[578px] z-0 pointer-events-none aspect-[578/537] block sm:block lg:hidden"
        >
          <Image
            src={mobile_screens}
            alt="Begin Wallet Screens"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 90vw"
            className="object-contain"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 md:py-16 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          <div className="bg-gray-100 dark:bg-[#18181b] p-6 rounded-xl shadow hover:shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              Buy ADA and BTC — Your Way
            </h2>
            <ul className="list-disc list-inside text-gray-500 space-y-2">
              <li>
                Buy with Apple Pay, Google Pay, Debit/Credit Card, Bank
                Transfer, or Revolut Pay.
              </li>
              <li>25+ trusted onramps and 130+ payment methods.</li>
              <li>Fast processing, competitive fees, and zero hassle.</li>
            </ul>
          </div>

          <div className="bg-gray-100 dark:bg-[#18181b] p-6 rounded-xl shadow hover:shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              Sell ADA for Fiat in 145+ Countries
            </h2>
            <ul className="list-disc list-inside text-gray-500 space-y-2">
              <li>Sell ADA directly to your bank account or credit card.</li>
              <li>Available in 145+ countries globally.</li>
              <li>Powered by Transak for secure, reliable off-ramping.</li>
            </ul>
            <a
              href="https://docs.transak.com/docs/fiat-currency-country-payment-method-coverage-plus-fees-and-limits"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-cyan hover:underline"
            >
              See supported countries →
            </a>
          </div>
        </motion.div>
      </section>

      <section className="px-6 py-16 md:py-16 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          <div className="bg-gray-100 dark:bg-[#18181b] p-6 rounded-xl shadow hover:shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              Swap Any Cardano Native Token
            </h2>
            <ul className="list-disc list-inside text-gray-500 space-y-2">
              <li>Swap any Cardano native asset instantly.</li>
              <li>Aggregated liquidity via DexHunter for best rates.</li>
              <li>Thousands of tokens supported with low slippage.</li>
            </ul>
          </div>

          <div className="bg-gray-100 dark:bg-[#18181b] p-6 rounded-xl shadow hover:shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              Swap ADA and BTC — Instantly
            </h2>
            <ul className="list-disc list-inside text-gray-500 space-y-2">
              <li>Cross-chain swaps ADA ↔ BTC directly within Begin Wallet.</li>
              <li>Powered by XOSwap for lightning-fast execution.</li>
              <li>Secure, simple, and transparent swaps.</li>
            </ul>
          </div>
        </motion.div>
      </section>

      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-4 text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Why Choose Begin Wallet?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto text-left">
            <div className="flex items-center space-x-4">
              <ShieldCheck className="text-cyan w-8 h-8" />
              <span className="text-lg text-gray-500">
                Secure & Non-Custodial: You control your private keys.
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Globe className="text-cyan w-8 h-8" />
              <span className="text-lg text-gray-500">
                Global Access: 130+ payment methods, 145+ countries supported.
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Zap className="text-cyan w-8 h-8" />
              <span className="text-lg text-gray-500">
                Fast Transactions: Instant buy, sell, and swap.
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Layers className="text-cyan w-8 h-8" />
              <span className="text-lg text-gray-500">
                All-in-One: Cardano and Bitcoin under one roof.
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Target className="text-cyan w-8 h-8" />
              <span className="text-lg text-gray-500">
                Designed for Everyone: Beginner-friendly, expert-powerful.
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-20 px-6" id="faq">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-10"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-6 text-left">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={faqVariants}
                className="rounded-xl shadow p-5 bg-gray-50 dark:bg-[#18181b]"
              >
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full flex items-center justify-between text-left text-lg font-medium"
                >
                  {faq.question}
                  <ChevronDown
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`mt-3 text-lg text-gray-500 transition-all duration-300 overflow-hidden ${
                    openIndex === i
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p>{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
