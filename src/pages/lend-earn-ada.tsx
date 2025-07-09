// /pages/bitcoin-wallet.tsx

import Layout from '../components/layout'
import Navigation from '../components/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import screens from '../public/images/hero-app-screens-invest.png';
import mobile_screens from '../public/images/hero-mobile-app-screens-invest.png';
import { TrendingUp, DollarSign, Lock } from 'lucide-react'
import Feature from '../components/feature-item'


export default function LendEarnAda() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
    });

    // Parallax effect for the hero image
    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  return (
    <Layout>
      <Head>
        <title>Lend and Earn ADA with High Yields | Begin</title>
        <meta
          name="description"
          content="Boost your crypto portfolio with Begin Wallet. Lend ADA and stablecoins easily through Liqwid Protocol and earn over 20% APY — fully self-custodial."
        />
        <meta
          property="og:title"
          content="Lend and Earn ADA with High Yields | Begin"
        />
        <meta
          property="og:description"
          content="Boost your crypto portfolio with Begin Wallet. Lend ADA and stablecoins easily through Liqwid Protocol and earn over 20% APY — fully self-custodial."
        />
        <meta property="og:image" content="https://begin.is/images/begin_cover.png" />
        <meta property="og:url" content="https://begin.is/lend-earn-ada" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Lend and Earn ADA with High Yields | Begin"
        />
        <meta
          name="twitter:description"
          content="Boost your crypto portfolio with Begin Wallet. Lend ADA and stablecoins easily through Liqwid Protocol and earn over 20% APY — fully self-custodial."
        />
        <meta name="twitter:image" content="https://begin.is/images/begin_cover.png" />
        <link rel="canonical" href="https://begin.is/lend-earn-ada" />
      </Head>

      <Navigation />

      {/* Hero Section */}
      <section ref={ref} className="px-6 py-16 md:py-16 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 sm:pt-0 md:pt-10 lg:pt-10 text-center"
        >
          <h1 className="text-4xl font-bold mt-12 mb-8 text-gray-900 dark:text-white">
            Lend and Earn ADA with High Yields
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Unlock new earning opportunities by lending your ADA and stablecoins through Liqwid Protocol — directly inside Begin Wallet. Enjoy yields over 20% APY, safely and securely.
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
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          <Feature
            title="High APY Returns"
            description="Lend your ADA and stablecoins via Liqwid and earn competitive returns over 20% APY."
            Icon={TrendingUp}
          />
          <Feature
            title="Self-Custody Lending"
            description="Maintain full control of your crypto at all times. No centralized risks or third-party custody."
            Icon={Lock}
          />
          <Feature
            title="Seamless Experience"
            description="Lend, track earnings, and withdraw — all from the simple and intuitive Begin Wallet app."
            Icon={DollarSign}
          />
        </motion.div>
      </section>

    </Layout>
  )
}