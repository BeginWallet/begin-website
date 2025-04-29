// /pages/bitcoin-wallet.tsx

import Layout from '../components/layout'
import Navigation from '../components/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import { KeyRound, Wallet, Smartphone } from 'lucide-react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import screens from '../public/images/hero-app-screens-btc.png';
import mobile_screens from '../public/images/hero-mobile-app-screens-btc.png';

export default function BitcoinWalletPage() {
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
        <title>Secure Bitcoin Wallet - Begin Wallet</title>
        <meta name="description" content="Secure your Bitcoin with Begin Wallet. Self-custody, open-source, easy to use. Available on iOS, Android, and Chrome Extension." />
        <meta property="og:title" content="Secure Bitcoin Wallet - Begin Wallet" />
        <meta property="og:description" content="Secure your Bitcoin with Begin Wallet. Self-custody, open-source, available on mobile and browser." />
        <meta property="og:image" content="/og-bitcoin-wallet.png" />
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
          <h1 className="text-4xl md:text-5xl font-bold mt-12 mb-8">
            Your Secure Bitcoin Wallet
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Self-custody your BTC with ease. Full control. Full freedom.
          </p>
          {/* Optional: Add Bitcoin image below
          <div className="mt-10">
            <img src="/images/bitcoin-wallet-mockup.png" alt="Bitcoin Wallet Mockup" className="mx-auto w-full max-w-md" />
          </div> */}
        </motion.div>

        <motion.div
            style={{ y }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeIn' }}
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
            transition={{ duration: 0.8, ease: 'easeIn' }}
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
            title="Self-Custody First"
            description="Only you control your Bitcoin. No middlemen. No compromises."
            Icon={KeyRound}
          />
          <Feature
            title="Multi-Chain Ready"
            description="Manage both Bitcoin and Cardano under one secure wallet."
            Icon={Wallet}
          />
          <Feature
            title="Mobile & Browser"
            description="Use Begin on iOS, Android, and Chrome Extension."
            Icon={Smartphone}
          />
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 md:py-16 relative overflow-hidden text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Take Control of Your Bitcoin?
          </h2>
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
            Download Begin Wallet today and experience self-custody freedom.
          </p>
          <Link href="/#download" legacyBehavior>
            <a className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-4 rounded-full transition">
              Download Now
            </a>
          </Link>
        </motion.div>
      </section>
    </Layout>
  )
}

function Feature({ title, description, Icon }: { title: string; description: string; Icon: React.ElementType }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-gray-100 dark:bg-[#18181b] p-6 rounded-xl shadow hover:shadow-md text-center"
      >
        <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 bg-yellow-100 dark:bg-yellow-900 rounded-full">
          <Icon className="w-8 h-8 text-yellow-500" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
      </motion.div>
    )
  }