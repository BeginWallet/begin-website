// /pages/bitcoin-wallet.tsx

import Layout from "../components/layout";
import Navigation from "../components/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import screens from "../public/images/hero-app-screens-buy.png";
import mobile_screens from "../public/images/hero-mobile-app-screens-buy.png";
import { TrendingUp, DollarSign, Lock } from "lucide-react";
import Feature from "../components/feature-item";

export default function BuySwapPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax effect for the hero image
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  return (
    <Layout disableHeader={true}>
      <Head>
        <title>Buy & Swap Crypto Instantly | Begin Wallet</title>
        <meta
          name="description"
          content="Buy ADA and Bitcoin with Apple Pay, Google Pay, and 130+ payment methods. Swap Cardano tokens seamlessly. Fast, secure, and easy — only on Begin Wallet."
        />
        <meta
          property="og:title"
          content="Buy & Swap Crypto Instantly | Begin Wallet"
        />
        <meta
          property="og:description"
          content="Use Begin Wallet to buy ADA and BTC with Apple Pay, Google Pay, and 130+ payment methods. Swap tokens effortlessly. Get started today."
        />
        <meta property="og:image" content="https://begin.is/og-image.png" />
        <meta property="og:url" content="https://begin.is/buy-swap" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Buy & Swap Crypto Instantly | Begin Wallet"
        />
        <meta
          name="twitter:description"
          content="Buy ADA and Bitcoin instantly. Swap Cardano tokens with ease. All inside Begin Wallet."
        />
        <meta name="twitter:image" content="https://begin.is/og-image.png" />
        <link rel="canonical" href="https://begin.is/buy-swap" />
      </Head>

      <Navigation />

      {/* Hero Section */}
      <section
        ref={ref}
        className="text-center px-6 py-16 md:py-16 relative overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 sm:pt-0 md:pt-10 lg:pt-10 text-center"
        >
          <h1 className="text-4xl font-bold mt-12 mb-8 text-gray-900 dark:text-white">
            Buy & Swap Crypto Instantly
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Buy ADA and Bitcoin with Apple Pay, Google Pay, bank transfer, and
            130+ payment methods. Swap any Cardano native token, fast and
            secure.
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

        <motion.div
          id="learn-more"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 pt-10"
        >
          <div className="relative flex justify-center flex-wrap gap-4">
            <a
              href="/buy-swap-exchange"
              className="inline-flex items-center justify-center w-full lg:w-auto gap-2 bg-cyan text-black font-semibold px-5 py-3 rounded-full shadow hover:shadow-lg transition"
            >
              Learn More
            </a>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
