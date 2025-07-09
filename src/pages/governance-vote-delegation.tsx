// /pages/bitcoin-wallet.tsx

import Layout from '../components/layout'
import Navigation from '../components/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import screens from '../public/images/hero-app-screens-gov.png';
import mobile_screens from '../public/images/hero-mobile-app-screens-gov.png';
import { Handshake, ShieldCheck, Users } from 'lucide-react'
import Feature from '../components/feature-item'


export default function GovernanceVoteDelegation() {
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
        <title>Governance Vote Delegation for Cardano | Begin Wallet</title>
        <meta
          name="description"
          content="Participate in Cardano governance effortlessly. Delegate your voting power to a DRep with Begin Wallet — secure, transparent, and decentralized."
        />
        <meta
          property="og:title"
          content="Governance Vote Delegation for Cardano | Begin Wallet"
        />
        <meta
          property="og:description"
          content="Participate in Cardano governance effortlessly. Delegate your voting power to a DRep with Begin Wallet — secure, transparent, and decentralized."
        />
        <meta property="og:image" content="https://begin.is/images/begin_cover.png" />
        <meta property="og:url" content="https://begin.is/governance-vote-delegation" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Governance Vote Delegation for Cardano | Begin Wallet"
        />
        <meta
          name="twitter:description"
          content="Participate in Cardano governance effortlessly. Delegate your voting power to a DRep with Begin Wallet — secure, transparent, and decentralized."
        />
        <meta name="twitter:image" content="https://begin.is/images/begin_cover.png" />
        <link rel="canonical" href="https://begin.is/governance-vote-delegation" />
        <link rel="icon" href="/favicon.ico" />
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
            Participate in Cardano Governance
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Empower the future of Cardano by delegating your vote to a trusted DRep. Begin Wallet makes governance simple, secure, and fully decentralized.
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
            title="Delegate Easily"
            description="Choose your preferred DRep and delegate your voting power in just a few taps within Begin Wallet."
            Icon={Handshake}
          />
          <Feature
            title="Secure and Transparent"
            description="All delegation happens fully on-chain. You stay in control — your vote, your decision."
            Icon={ShieldCheck}
          />
          <Feature
            title="Strengthen Cardano"
            description="Support decentralization and shape Cardano’s roadmap by participating in governance activities."
            Icon={Users}
          />
        </motion.div>
      </section>

    </Layout>
  )
}