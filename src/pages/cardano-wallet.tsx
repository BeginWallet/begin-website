// /pages/bitcoin-wallet.tsx

import Layout from "../components/layout";
import Navigation from "../components/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import screens from "../public/images/hero-begin-wallet-screens.png";
import mobile_screens from "../public/images/hero-mobile-app-screens.png";
import { Wallet, Banknote, HandCoins, Vote, Compass, Code } from "lucide-react"; // Importing icons directly
import Feature from "../components/feature-item";

export default function CardanoWalletPage() {
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
        <title>Cardano Wallet - Secure and Open-Source | Begin Wallet</title>
        <meta
          name="description"
          content="Manage your ADA securely with Begin Wallet. Stake, delegate, lend, and explore dApps — all in one self-custodial open-source wallet for Cardano."
        />
        <meta
          property="og:title"
          content="Cardano Wallet - Secure and Open-Source | Begin Wallet"
        />
        <meta
          property="og:description"
          content="Manage your ADA securely with Begin Wallet. Stake, delegate, lend, and explore dApps — all in one self-custodial open-source wallet for Cardano."
        />
        <meta property="og:image" content="https://begin.is/images/begin_cover.png" />
        <meta property="og:image:alt" content="Begin Wallet" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Cardano Wallet - Secure and Open-Source | Begin Wallet"
        />
        <meta
          name="twitter:description"
          content="Manage your ADA securely with Begin Wallet. Stake, delegate, lend, and explore dApps — all in one self-custodial open-source wallet for Cardano."
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
        <meta property="og:url" content="https://begin.is/cardano-wallet" />
        <link rel="canonical" href="https://begin.is/cardano-wallet" />
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
              The Most Advanced Cardano Wallet
            </h1>
            <p className="text-lg text-gray-500">
              Begin Wallet empowers you to securely manage your ADA — with
              staking, lending, governance delegation, and real dApp discovery.
              Your keys, your coins, full self-custody.
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
            description="Only you hold the keys. Your ADA stays safe, secure, and completely under your control."
            Icon={Wallet}
          />
          <Feature
            title="Stake and Earn Rewards"
            description="Easily stake your ADA to top-performing pools and earn passive rewards — up to 3% APY."
            Icon={Banknote}
          />
          <Feature
            title="Lend ADA for High Yield"
            description="Boost your earnings with Liqwid protocol, offering over 20% APY for ADA and stablecoin lending."
            Icon={HandCoins}
          />
          <Feature
            title="Governance Participation"
            description="Easily delegate your voting power to a DRep and help shape Cardano’s decentralized future."
            Icon={Vote}
          />
          <Feature
            title="Explore Real dApps"
            description="Discover the best dApps with real user ratings — secured on-chain for transparency and trust."
            Icon={Compass}
          />
          <Feature
            title="Open-Source Core"
            description="Our crypto core is fully open-source and transparent — audited and trusted by the OpenWallet Foundation."
            Icon={Code}
          />
        </motion.div>
      </section>
    </Layout>
  );
}
