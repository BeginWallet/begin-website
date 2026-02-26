import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import Navigation from '../../components/navigation'
import Head from 'next/head'
import { QRCode } from 'react-qrcode-logo'
import { useState, useEffect } from 'react'
import { Copy, Check, ExternalLink, Wallet } from 'lucide-react'

const SUPPORTED_TOKENS = [
  { symbol: 'ADA', name: 'Cardano', chain: 'cardano', color: '#0033AD', decimals: 6 },
  { symbol: 'SOL', name: 'Solana', chain: 'solana', color: '#9945FF', decimals: 9 },
  { symbol: 'BTC', name: 'Bitcoin', chain: 'bitcoin', color: '#F7931A', decimals: 8 },
  { symbol: 'ETH', name: 'Ethereum', chain: 'ethereum', color: '#627EEA', decimals: 18 },
]

export default function PayUser() {
  const router = useRouter()
  const { username: rawUsername } = router.query
  const username = typeof rawUsername === 'string' ? rawUsername.replace(/^@/, '') : ''

  const [selectedToken, setSelectedToken] = useState(SUPPORTED_TOKENS[0])
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [copied, setCopied] = useState(false)

  const paymentUrl = `https://begin.is/pay/@${username}`

  const copyLink = () => {
    navigator.clipboard.writeText(paymentUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Generate deep link for Begin wallet
  const getDeepLink = () => {
    if (selectedToken.chain === 'cardano') {
      const amountLovelace = amount ? Math.floor(parseFloat(amount) * 1_000_000) : 0
      return `web+cardano:$${username}?amount=${amountLovelace}&token=${selectedToken.symbol}&note=${encodeURIComponent(note)}`
    }
    // For other chains, open Begin wallet with params
    return `https://begin-wallet.app.link/send?coinType=${selectedToken.chain}&address=$${username}&amount=${amount || 0}&note=${encodeURIComponent(note)}`
  }

  if (!username) {
    return null
  }

  return (
    <Layout>
      <Head>
        <title>Pay @{username} with Crypto | Begin Pay</title>
        <meta
          name="description"
          content={`Send crypto to @${username} instantly. Pay with ADA, SOL, BTC, ETH and more via Begin Wallet.`}
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@BeginWallet" />
        <meta name="twitter:title" content={`Pay @${username} with Crypto`} />
        <meta
          name="twitter:description"
          content={`Send crypto to @${username} instantly via Begin Pay. No fees, instant settlement.`}
        />
        <meta property="og:title" content={`Pay @${username} with Crypto | Begin Pay`} />
        <meta
          property="og:description"
          content={`Send crypto to @${username} instantly via Begin Pay. No fees, instant settlement.`}
        />
      </Head>
      <Navigation />

      <div className="min-h-screen flex items-start justify-center pt-24 lg:pt-32 px-4">
        <div className="w-full max-w-md">
          {/* Payment Card */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="p-6 pb-4 border-b border-gray-800">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">@{username}</h1>
                  <p className="text-gray-500 text-sm">via Begin Pay</p>
                </div>
              </div>
            </div>

            {/* Token Selector */}
            <div className="p-6 pb-4">
              <label className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2 block">
                Token
              </label>
              <div className="grid grid-cols-4 gap-2">
                {SUPPORTED_TOKENS.map((token) => (
                  <button
                    key={token.symbol}
                    onClick={() => setSelectedToken(token)}
                    className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                      selectedToken.symbol === token.symbol
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                        : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    {token.symbol}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div className="px-6 pb-4">
              <label className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2 block">
                Amount ({selectedToken.symbol})
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-lg outline-none focus:border-cyan-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            {/* Note */}
            <div className="px-6 pb-6">
              <label className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2 block">
                Note (optional)
              </label>
              <input
                type="text"
                placeholder="What's this for?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={100}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Pay Button */}
            <div className="px-6 pb-6">
              <a
                href={getDeepLink()}
                className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3.5 rounded-xl transition-colors text-base"
              >
                Pay{amount ? ` ${amount} ${selectedToken.symbol}` : ''} with Begin
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-center text-gray-600 text-xs mt-3">
                Opens in Begin Wallet. Don&apos;t have it?{' '}
                <a
                  href="https://begin.is"
                  className="text-cyan-500 hover:text-cyan-400"
                >
                  Download here
                </a>
              </p>
            </div>
          </div>

          {/* Share Link */}
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-500 text-sm truncate">
              {paymentUrl}
            </div>
            <button
              onClick={copyLink}
              className="bg-gray-900 border border-gray-800 rounded-lg p-2.5 text-gray-400 hover:text-white transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Powered by */}
          <p className="text-center text-gray-700 text-xs mt-6">
            Powered by{' '}
            <a href="https://begin.is" className="text-gray-500 hover:text-gray-400">
              Begin Wallet
            </a>{' '}
            — Multi-chain self-custody
          </p>
        </div>
      </div>
    </Layout>
  )
}
