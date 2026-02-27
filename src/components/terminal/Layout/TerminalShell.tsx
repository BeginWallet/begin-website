import { useEffect } from 'react'
import { Wallet } from 'lucide-react'
import Image from 'next/image'
import PanelGrid from './PanelGrid'
import StatusBar from './StatusBar'
import { LayoutPresets } from './LayoutPresets'
import { useTerminalStore } from '../../../hooks/terminal/useTerminalStore'
import { useKeyboardShortcuts } from '../../../hooks/terminal/useKeyboardShortcuts'
import { useState } from 'react'

const TerminalShell = () => {
  const { loadPersistedLayout } = useTerminalStore()
  const [walletConnected, setWalletConnected] = useState(false)

  useKeyboardShortcuts()

  useEffect(() => {
    loadPersistedLayout()
  }, [loadPersistedLayout])

  return (
    <div className="h-screen flex flex-col bg-[#141414]">
      {/* Header */}
      <header className="h-14 bg-[#141414] border-b border-[#333] px-4 flex items-center justify-between flex-shrink-0">
        {/* Left - Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo_begin_pfp_64.png"
            alt="Begin"
            width={28}
            height={28}
            className="rounded"
          />
          <span className="text-white font-semibold text-lg">Begin Terminal</span>
        </div>

        {/* Center - Layout Preset Selector */}
        <LayoutPresets />

        {/* Right - Wallet Connection */}
        <button
          onClick={() => setWalletConnected(!walletConnected)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ${
            walletConnected
              ? 'bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF]'
              : 'bg-[#1a1a1a] border border-[#333] text-white hover:border-[#444]'
          }`}
        >
          <Wallet className="w-4 h-4" />
          <span className="text-sm font-medium">
            {walletConnected ? 'Connected' : 'Connect Wallet'}
          </span>
        </button>
      </header>

      {/* Main Content - Panel Grid */}
      <main className="flex-1 overflow-hidden flex flex-col">
        <PanelGrid />
      </main>

      {/* Status Bar */}
      <StatusBar />
    </div>
  )
}

export default TerminalShell
