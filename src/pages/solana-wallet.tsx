// /pages/solana-wallet.tsx

import Layout from "../components/layout";
import Navigation from "../components/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import screens from "../public/images/hero-begin-wallet-screens.png";
import mobile_screens from "../public/images/hero-mobile-app-screens.png";
import { Wallet, ArrowLeftRight, Coins, Image as ImageIcon, Compass, Layers } from "lucide-react";
import Feature from "../components/feature-item";

export default function SolanaWalletPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax effect for the hero image
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  return (
    <Layout>
      <Head>
        <title>Solana Wallet - Fast and Secure | Begin Wallet</title>
        <meta
          name="description"
          content="Manage your SOL securely with Begin Wallet. Swap tokens via Jupiter, access Solana DeFi, and hold all your SPL tokens — in one self-custodial multi-chain wallet."
        />
        <meta
          property="og:title"
          content="Solana Wallet - Fast and Secure | Begin Wallet"
        />
        <meta
          property="og:description"
          content="Manage your SOL securely with Begin Wallet. Swap tokens via Jupiter, access Solana DeFi, and hold all your SPL tokens — in one self-custodial multi-chain wallet."
        />
        <meta property="og:image" content="https://begin.is/images/begin_cover.png" />
        <meta property="og:image:alt" content="Begin Wallet" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Solana Wallet - Fast and Secure | Begin Wallet"
        />
        <meta
          name="twitter:description"
          content="Manage your SOL securely with Begin Wallet. Swap tokens via Jupiter, access Solana DeFi, and hold all your SPL tokens — in one self-custodial multi-chain wallet."
        />
        <meta name="twitter:image" content="https://begin.is/images/begin_cover.png" />
        <meta name="twitter:image:alt" content="Begin Wallet" />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" />
        <meta name="twitter:image:type" content="image/png" />
        <meta name="twitter:site" content="@beginwallet" />
        <meta name="twitter:creator" content="@beginwallet" />
        <meta name="twitter:domain" content="begin.is" />
        <meta name="twitter:site" content="https://begin.is" />
        <meta name="twitter:creator" content="@beginwallet" />
        <meta property="og:url" content="https://begin.is/solana-wallet" />
        <link rel="canonical" href="https://begin.is/solana-wallet" />
      </Head>

      <Navigation />

      <section
        ref={ref}
        className="px-6 py-16 md:py-16 relative overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 sm:pt-0 md:pt-10 lg:pt-10"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mt-12 mb-8">
              The Best Solana Wallet Experience
            </h1>
            <p className="text-lg text-gray-500">
              Begin Wallet gives you fast, secure access to the Solana
              ecosystem. Swap tokens via Jupiter, manage SPL tokens and NFTs,
              and explore Solana dApps — all in one non-custodial wallet.
            </p>
          </div>
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
          className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          <Feature
            title="Self-Custodial Control"
            description="Your private keys stay on your device. Your SOL, your tokens, fully under your control."
            Icon={Wallet}
          />
          <Feature
            title="Jupiter-Powered Swaps"
            description="Swap any Solana token instantly through Jupiter Exchange — the best rates, lowest fees, right inside your wallet."
            Icon={ArrowLeftRight}
          />
          <Feature
            title="SPL Token Support"
            description="Hold and manage all your SPL tokens and stablecoins including USDC, USDT, and BONK in one place."
            Icon={Coins}
          />
          <Feature
            title="Solana NFTs"
            description="View, manage, and interact with your Solana NFT collection directly in the wallet."
            Icon={ImageIcon}
          />
          <Feature
            title="dApp Browser"
            description="Connect to Solana dApps, DEXes, and DeFi protocols with Begin's built-in Web3 browser."
            Icon={Compass}
          />
          <Feature
            title="Multi-Chain Ready"
            description="Begin isn't just Solana — manage Bitcoin and Cardano alongside your SOL in the same wallet."
            Icon={Layers}
          />
        </motion.div>
      </section>
    </Layout>
  );
}
