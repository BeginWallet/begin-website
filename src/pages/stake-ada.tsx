// /pages/bitcoin-wallet.tsx

import Layout from '../components/layout'
import Navigation from '../components/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import screens from '../public/images/hero-app-screens-stake.png';
import mobile_screens from '../public/images/hero-mobile-app-screens-stake.png';
import { Trophy, ShieldCheck, Wallet } from 'lucide-react';
import Feature from '../components/feature-item'


export default function StakeAda() {
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
        <title>Stake ADA Easily with Begin Wallet | Begin</title>
        <meta
          name="description"
          content="Stake your ADA effortlessly with Begin Wallet. Secure, self-custodial, and rewarding — earn up to 3% APY while supporting Cardano decentralization."
        />
        <meta
          property="og:title"
          content="Stake ADA Easily with Begin Wallet | Begin"
        />
        <meta
          property="og:description"
          content="Stake your ADA effortlessly with Begin Wallet. Secure, self-custodial, and rewarding — earn up to 3% APY while supporting Cardano decentralization."
        />
        <meta property="og:image" content="https://begin.is/images/begin_cover.png" />
        <meta property="og:url" content="https://begin.is/stake-ada" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Stake ADA Easily with Begin Wallet | Begin"
        />
        <meta
          name="twitter:description"
          content="Stake your ADA effortlessly with Begin Wallet. Secure, self-custodial, and rewarding — earn up to 3% APY while supporting Cardano decentralization."
        />
        <meta name="twitter:image" content="https://begin.is/images/begin_cover.png" />
        <link rel="canonical" href="https://begin.is/stake-ada" />
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
            Stake ADA Easily with Begin Wallet
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Start earning rewards while helping secure the Cardano network. With Begin Wallet, you can delegate your ADA with just a few clicks — all while keeping full control over your crypto.
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
            title="Easy Delegation"
            description="Delegate your ADA securely to any pool — no custodial risks, no complicated steps."
            Icon={Wallet}
          />
          <Feature
            title="Earn Passive Income"
            description="Enjoy up to 3% APY returns simply by staking your ADA directly from your wallet."
            Icon={Trophy}
          />
          <Feature
            title="Stay in Control"
            description="You stay in full control of your funds at all times. Stake, unstake, and manage your rewards seamlessly."
            Icon={ShieldCheck}
          />
        </motion.div>
      </section>

    </Layout>
  )
}