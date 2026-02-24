import Layout from '../components/layout'
import Navigation from '../components/navigation'
import { motion } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import {
  Wallet,
  ShieldCheck,
  Cpu,
  Coins,
  ArrowLeftRight,
  Send,
  Check,
  Copy,
  Terminal
} from 'lucide-react'

// AI Assistant icons as simple SVG components
const ClaudeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z"/>
  </svg>
)

const ChatGPTIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
  </svg>
)

const GeminiIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
)

const GrokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const installCommand = 'npm install -g begin-cli'

// Pre-filled prompt for AI assistants
const aiPrompt = "I want to set up begin-cli to manage my crypto wallet (Cardano, Bitcoin, Solana) from the terminal. Help me install and configure it."
const encodedPrompt = encodeURIComponent(aiPrompt)

const aiAssistants = [
  {
    name: 'Claude',
    url: `https://claude.ai/new?q=${encodedPrompt}`,
    Icon: ClaudeIcon
  },
  {
    name: 'ChatGPT',
    url: `https://chat.openai.com/?q=${encodedPrompt}`,
    Icon: ChatGPTIcon
  },
  {
    name: 'Gemini',
    url: `https://gemini.google.com/app?q=${encodedPrompt}`,
    Icon: GeminiIcon
  },
  {
    name: 'Grok',
    url: `https://x.com/i/grok?text=${encodedPrompt}`,
    Icon: GrokIcon
  },
]

const features = [
  {
    title: 'Multi-chain',
    description: 'Cardano, Bitcoin, Solana — one CLI',
    Icon: Wallet,
  },
  {
    title: 'Non-custodial',
    description: 'Keys stay on your device',
    Icon: ShieldCheck,
  },
  {
    title: 'AI-native',
    description: 'Built for agents to call programmatically',
    Icon: Cpu,
  },
  {
    title: 'Staking',
    description: 'Delegate ADA directly from CLI',
    Icon: Coins,
  },
  {
    title: 'Swaps',
    description: 'Cross-chain token swaps',
    Icon: ArrowLeftRight,
  },
  {
    title: 'Send & Receive',
    description: 'Transfer assets across chains',
    Icon: Send,
  },
]

export default function AgentsPage() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(installCommand)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Layout>
      <Head>
        <title>Give Your AI Agent a Wallet | Begin CLI</title>
        <meta
          name="description"
          content="Non-custodial, multi-chain crypto wallet CLI for AI agents. Manage Cardano, Bitcoin, and Solana with one command."
        />
        <meta
          property="og:title"
          content="Give Your AI Agent a Wallet | Begin CLI"
        />
        <meta
          property="og:description"
          content="Non-custodial, multi-chain crypto wallet CLI for AI agents. Manage Cardano, Bitcoin, and Solana with one command."
        />
        <meta property="og:image" content="https://begin.is/images/begin_cover.png" />
        <meta property="og:url" content="https://begin.is/agents" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Give Your AI Agent a Wallet | Begin CLI"
        />
        <meta
          name="twitter:description"
          content="Non-custodial, multi-chain crypto wallet CLI for AI agents. Manage Cardano, Bitcoin, and Solana with one command."
        />
        <meta name="twitter:image" content="https://begin.is/images/begin_cover.png" />
        <link rel="canonical" href="https://begin.is/agents" />
      </Head>

      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24 md:py-32 relative overflow-hidden bg-[#141414]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight">
            Give your AI agent a wallet
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-12">
            Non-custodial. Multi-chain. One command.
          </p>

          {/* Install Command */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="mb-8"
          >
            <div
              onClick={copyToClipboard}
              className="inline-flex items-center gap-3 bg-[#1a1a1a] border border-gray-800 rounded-lg px-5 py-4 cursor-pointer hover:border-gray-700 transition-colors group"
            >
              <Terminal className="w-5 h-5 text-gray-500" />
              <code className="text-cyan-light dark:text-cyan-dark font-mono text-sm md:text-base">
                {installCommand}
              </code>
              <button
                className="ml-2 p-1.5 rounded hover:bg-gray-800 transition-colors"
                aria-label="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
                )}
              </button>
            </div>
            {copied && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-500 mt-2"
              >
                Copied to clipboard!
              </motion.p>
            )}
          </motion.div>

          {/* AI Assistant Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-sm text-gray-500">or install with</p>
            <div className="flex flex-wrap justify-center gap-3">
              {aiAssistants.map((assistant) => (
                <a
                  key={assistant.name}
                  href={assistant.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-gray-800 rounded-full text-sm text-gray-300 hover:text-white hover:border-gray-600 transition-colors"
                >
                  <assistant.Icon />
                  {assistant.name}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 md:py-28 bg-[#141414]">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-white text-center mb-16"
          >
            Built for the agentic era
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#141414] flex items-center justify-center">
                    <feature.Icon className="w-5 h-5 text-cyan-light dark:text-cyan-dark" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Links Section */}
      <section className="px-6 py-16 bg-[#141414] border-t border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a
              href="https://github.com/nicholasgasior/begin-cli"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <Link
              href="https://begin.is/docs"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms
            </Link>
          </div>
          <p className="text-gray-600 text-xs mt-8">
            &copy; {new Date().getFullYear()} Begin. All rights reserved.
          </p>
        </div>
      </section>
    </Layout>
  )
}
