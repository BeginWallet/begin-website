import Layout from "../components/layout";
import Navigation from "../components/navigation";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import {
  Wallet,
  ShieldCheck,
  Cpu,
  Coins,
  ArrowLeftRight,
  Send,
  Check,
  Copy,
  Terminal,
} from "lucide-react";

// AI Assistant icons as simple SVG components
const ClaudeIcon = () => (
  <svg
    fill="currentColor"
    fill-rule="evenodd"
    viewBox="0 0 24 24"
    className="w-5 h-5"
  >
    <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z"></path>
  </svg>
);

const ChatGPTIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
  </svg>
);

const GeminiIcon = () => (
  <svg
    fill="currentColor"
    fill-rule="evenodd"
    viewBox="0 0 24 24"
    className="w-5 h-5"
  >
    <path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"></path>
  </svg>
);

const GrokIcon = () => (
  <svg fill="currentColor" fill-rule="evenodd" viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M9.27 15.29l7.978-5.897c.391-.29.95-.177 1.137.272.98 2.369.542 5.215-1.41 7.169-1.951 1.954-4.667 2.382-7.149 1.406l-2.711 1.257c3.889 2.661 8.611 2.003 11.562-.953 2.341-2.344 3.066-5.539 2.388-8.42l.006.007c-.983-4.232.242-5.924 2.75-9.383.06-.082.12-.164.179-.248l-3.301 3.305v-.01L9.267 15.292M7.623 16.723c-2.792-2.67-2.31-6.801.071-9.184 1.761-1.763 4.647-2.483 7.166-1.425l2.705-1.25a7.808 7.808 0 00-1.829-1A8.975 8.975 0 005.984 5.83c-2.533 2.536-3.33 6.436-1.962 9.764 1.022 2.487-.653 4.246-2.34 6.022-.599.63-1.199 1.259-1.682 1.925l7.62-6.815"></path>
  </svg>
);

const installCommand = "npm install -g begin-cli";

// Pre-filled prompt for AI assistants
const aiPrompt =
  "I want to set up begin-cli to manage my crypto wallet (Cardano, Bitcoin, Solana) from the terminal. Help me install and configure it.";
const encodedPrompt = encodeURIComponent(aiPrompt);

const aiAssistants = [
  {
    name: "Claude",
    url: `https://claude.ai/new?q=${encodedPrompt}`,
    Icon: ClaudeIcon,
  },
  {
    name: "ChatGPT",
    url: `https://chat.openai.com/?q=${encodedPrompt}`,
    Icon: ChatGPTIcon,
  },
  {
    name: "Gemini",
    url: `https://gemini.google.com/app?q=${encodedPrompt}`,
    Icon: GeminiIcon,
  },
  {
    name: "Grok",
    url: `https://x.com/i/grok?text=${encodedPrompt}`,
    Icon: GrokIcon,
  },
];

const features = [
  {
    title: "Multi-chain",
    description: "Cardano, Bitcoin, Solana — one CLI",
    Icon: Wallet,
  },
  {
    title: "Non-custodial",
    description: "Keys stay on your device",
    Icon: ShieldCheck,
  },
  {
    title: "AI-native",
    description: "Built for agents to call programmatically",
    Icon: Cpu,
  },
  {
    title: "Staking",
    description: "Delegate ADA directly from CLI",
    Icon: Coins,
  },
  {
    title: "Swaps",
    description: "Cross-chain token swaps",
    Icon: ArrowLeftRight,
  },
  {
    title: "Send & Receive",
    description: "Transfer assets across chains",
    Icon: Send,
  },
];

export default function AgentsPage() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

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
        <meta
          property="og:image"
          content="https://begin.is/images/begin_cover.png"
        />
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
        <meta
          name="twitter:image"
          content="https://begin.is/images/begin_cover.png"
        />
        <link rel="canonical" href="https://begin.is/agents" />
      </Head>

      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24 md:py-32 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
            Give your AI agent a wallet
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-12">
            Non-custodial. Multi-chain. One command.
          </p>

          {/* Install Command */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mb-8"
          >
            <div
              onClick={copyToClipboard}
              className="inline-flex items-center gap-3 bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-lg px-5 py-4 cursor-pointer hover:border-gray-300 dark:hover:border-gray-700 transition-colors group"
            >
              <Terminal className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <code className="text-cyan-light dark:text-cyan-dark font-mono text-sm md:text-base">
                {installCommand}
              </code>
              <button
                className="ml-2 p-1.5 rounded hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                aria-label="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-cyan-light dark:text-cyan-dark" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-300 dark:group-hover:text-gray-600" />
                )}
              </button>
            </div>
            {copied && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-500 dark:text-gray-400 mt-2"
              >
                Copied to clipboard!
              </motion.p>
            )}
          </motion.div>

          {/* AI Assistant Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">or install with</p>
            <div className="flex flex-wrap justify-center gap-3">
              {aiAssistants.map((assistant) => (
                <a
                  key={assistant.name}
                  href={assistant.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
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
          <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-700 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-16"
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
                className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-[#141414] flex items-center justify-center">
                    <feature.Icon className="w-5 h-5 text-cyan-light dark:text-cyan-dark" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
