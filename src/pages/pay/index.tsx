import Layout from '../../components/layout'
import Navigation from '../../components/navigation'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { QRCode } from 'react-qrcode-logo'
import {
  Send,
  Globe,
  Shield,
  Zap,
  ArrowRight,
  Copy,
  Check,
  Smartphone,
  CreditCard,
  Link as LinkIcon,
} from 'lucide-react'

const features = [
  {
    icon: <LinkIcon className="w-6 h-6" />,
    title: 'Payment Links',
    description:
      'Share a link. Get paid. No wallet address needed — just begin.is/pay/@you.',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Multi-Chain',
    description:
      'Accept payments in ADA, SOL, BTC, ETH and tokens across Cardano, Solana, Bitcoin, and EVM chains.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Instant',
    description:
      'On-chain settlement in seconds. No intermediaries, no processing delays, no chargebacks.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Self-Custody',
    description:
      'Funds go directly to your wallet. We never hold your money. You own your keys.',
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: 'Zero Fees',
    description:
      'No platform fees. Just network transaction costs. Keep what you earn.',
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Mobile Ready',
    description:
      'Works on any device. Scan QR codes or tap payment links — it just works.',
  },
]

const useCases = [
  {
    emoji: '🎨',
    title: 'Creators',
    description: 'Accept tips, sell digital art, get paid for commissions',
  },
  {
    emoji: '🏪',
    title: 'Small Business',
    description: 'Add crypto payments to your checkout in minutes',
  },
  {
    emoji: '👥',
    title: 'Friends & Family',
    description: 'Split bills, send money, pay back loans — across borders',
  },
  {
    emoji: '🤖',
    title: 'AI Agents',
    description: 'Programmatic payments via begin-cli and MCP integration',
  },
]

export default function PayLanding() {
  const [username, setUsername] = useState('')
  const [copied, setCopied] = useState(false)

  const payLink = username ? `begin.is/pay/@${username}` : 'begin.is/pay/@yourname'

  const copyLink = () => {
    navigator.clipboard.writeText(`https://${payLink}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Layout>
      <Head>
        <title>Begin Pay — Crypto Payment Links | Send & Receive Crypto Instantly</title>
        <meta
          name="description"
          content="Create your personal crypto payment link. Accept ADA, SOL, BTC, ETH and more. No fees, no intermediaries, instant settlement. begin.is/pay/@you"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@BeginWallet" />
        <meta name="twitter:title" content="Begin Pay — Crypto Payment Links" />
        <meta
          name="twitter:description"
          content="Send and receive crypto with a simple link. Multi-chain. Zero fees. Self-custody."
        />
        <meta name="twitter:image" content="https://begin.is/images/begin_cover.png" />
        <meta property="og:title" content="Begin Pay — Crypto Payment Links" />
        <meta
          property="og:description"
          content="Send and receive crypto with a simple link. Multi-chain. Zero fees. Self-custody."
        />
        <meta property="og:image" content="https://begin.is/images/begin_cover.png" />
      </Head>
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 lg:pt-36 lg:pb-24 text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-400 rounded-full px-4 py-1.5 text-sm font-medium mb-8 border border-cyan-500/20">
            <Send className="w-4 h-4" />
            Payment Links for Crypto
          </div>

          <h1 className="text-4xl lg:text-7xl font-bold tracking-tight mb-6">
            Get paid with a{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              simple link
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            No wallet address needed. No chain selection. Just share your link and get paid
            in ADA, SOL, BTC, ETH — across Cardano, Solana, Bitcoin, and Ethereum.
          </p>

          {/* Interactive Link Builder */}
          <div className="max-w-lg mx-auto mb-12">
            <div className="flex items-center bg-gray-900 border border-gray-700 rounded-xl overflow-hidden focus-within:border-cyan-500 transition-colors">
              <span className="text-gray-500 pl-4 pr-1 text-sm lg:text-base whitespace-nowrap">
                begin.is/pay/@
              </span>
              <input
                type="text"
                placeholder="yourname"
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
                className="flex-1 bg-transparent text-white py-3.5 pr-2 outline-none text-sm lg:text-base"
              />
              <button
                onClick={copyLink}
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-5 py-3.5 transition-colors text-sm"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="text-gray-600 text-xs mt-2">
              Share this link anywhere — social media, invoices, websites, messages.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://chrome.google.com/webstore/detail/begin-wallet/nhbicdelgedinnbcidconlnfeionhbml"
              className="inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Get Begin Wallet
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 border border-gray-600 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-900 transition-colors"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      {/* Supported Chains */}
      <section className="border-y border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-wrap items-center justify-center gap-8 lg:gap-16 text-gray-500 text-sm">
          <span className="font-medium text-gray-400">Supported chains:</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span> Cardano
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span> Solana
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span> Bitcoin
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span> Ethereum
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-300"></span> Base
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span> Polygon
          </span>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
          Three steps. That&apos;s it.
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-lg mx-auto">
          No signup, no KYC, no API keys. Just your wallet and a link.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Create your link',
              description:
                'Install Begin Wallet and claim your payment link: begin.is/pay/@yourname',
            },
            {
              step: '02',
              title: 'Share it anywhere',
              description:
                'Put it in your bio, send it in a message, add it to your invoice. Works everywhere.',
            },
            {
              step: '03',
              title: 'Get paid instantly',
              description:
                'Sender picks the token and amount. Funds arrive directly in your wallet. Done.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="relative p-8 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <span className="text-5xl font-bold text-gray-800 absolute top-6 right-6">
                {item.step}
              </span>
              <h3 className="text-xl font-semibold mb-3 mt-4">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-950 border-y border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
            Built for the multi-chain era
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-lg mx-auto">
            One link, every chain. No compromises.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl border border-gray-800 hover:border-cyan-900 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
          Who uses Begin Pay?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="text-center p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <span className="text-4xl mb-4 block">{useCase.emoji}</span>
              <h3 className="font-semibold mb-2">{useCase.title}</h3>
              <p className="text-gray-400 text-sm">{useCase.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-800">
        <div className="max-w-3xl mx-auto px-6 py-20 lg:py-28 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to get paid?
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Download Begin Wallet, create your payment link, and start accepting crypto in
            under a minute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://chrome.google.com/webstore/detail/begin-wallet/nhbicdelgedinnbcidconlnfeionhbml"
              className="inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-3.5 rounded-xl transition-colors"
            >
              Download Begin Wallet
            </Link>
            <Link
              href="/agents"
              className="inline-flex items-center justify-center gap-2 border border-gray-600 text-white px-8 py-3.5 rounded-xl hover:bg-gray-900 transition-colors"
            >
              For AI Agents →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
