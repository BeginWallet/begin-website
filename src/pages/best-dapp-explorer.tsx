// /pages/bitcoin-wallet.tsx

import Layout from '../components/layout'
import Navigation from '../components/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import screens from '../public/images/hero-app-screens-dapps.png';
import mobile_screens from '../public/images/hero-mobile-app-screens-dapps.png';
import { Star, Search, Database } from 'lucide-react'
import Feature from '../components/feature-item'


export default function BestDappExplorer() {
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
        <title>Best dApp Explorer for Cardano | Begin Wallet</title>
        <meta
          name="description"
          content="Discover, explore, and rate Cardano dApps seamlessly with Begin Wallet’s decentralized dApp Explorer. Real ratings, secured on-chain."
        />
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
            Discover the Best Cardano decentralized apps (dApps)
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Explore real Cardano dApps and rate them on-chain. Begin Wallet brings transparency, user feedback, and a true decentralized dApp experience.
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
            title="Explore Verified dApps"
            description="Find dApps listed by Cardano Cube directly inside Begin Wallet. Always up-to-date and verified."
            Icon={Search}
          />
          <Feature
            title="Rate On-Chain"
            description="Leave real ratings stored immutably on Cardano blockchain. One vote per user, fully decentralized."
            Icon={Star}
          />
          <Feature
            title="Transparent Data"
            description="Access open and auditable rating data anytime. No centralized manipulation, just honest community feedback."
            Icon={Database}
          />
        </motion.div>
      </section>

    </Layout>
  )
}