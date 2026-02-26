import { useState } from 'react'
import { ChevronDown, Wallet } from 'lucide-react'
import Image from 'next/image'
import PanelGrid from './PanelGrid'
import StatusBar from './StatusBar'
import { useTerminalStore } from '../../../hooks/terminal/useTerminalStore'

const layoutOptions = [
  { name: '2x2 Grid', cols: 2 },
  { name: '3 Column', cols: 3 },
  { name: '1 Column', cols: 1 },
]

const TerminalShell = () => {
  const { layoutConfig, setLayoutConfig } = useTerminalStore()
  const [isLayoutDropdownOpen, setIsLayoutDropdownOpen] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)

  const handleLayoutSelect = (option: typeof layoutOptions[0]) => {
    setLayoutConfig({
      ...layoutConfig,
      name: option.name,
      cols: option.cols,
    })
    setIsLayoutDropdownOpen(false)
  }

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

        {/* Center - Layout Selector */}
        <div className="relative">
          <button
            onClick={() => setIsLayoutDropdownOpen(!isLayoutDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] border border-[#333] rounded hover:border-[#444] transition-colors"
          >
            <span className="text-sm text-white">{layoutConfig.name}</span>
            <ChevronDown className="w-4 h-4 text-[#999]" />
          </button>

          {isLayoutDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsLayoutDropdownOpen(false)}
              />
              <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-[#333] rounded shadow-lg z-20 min-w-[140px]">
                {layoutOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => handleLayoutSelect(option)}
                    className={`w-full px-3 py-2 text-left text-sm hover:bg-[#333] transition-colors ${
                      layoutConfig.name === option.name
                        ? 'text-[#00E5FF]'
                        : 'text-white'
                    }`}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

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
