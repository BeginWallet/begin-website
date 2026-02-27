'use client';

import { useWallet } from '@/hooks/terminal/useWallet';
import { usePortfolio } from '@/hooks/terminal/usePortfolio';
import { formatPrice, formatChange } from '@/services/terminal/prices';
import { Holdings } from './Holdings';
import { Allocation } from './Allocation';
import { Performance } from './Performance';
import { Activity } from './Activity';

// ── Wallet Required Overlay ──────────────────────────────────────────────────

function WalletRequired() {
  const { connectWallet, connecting, beginDetected } = useWallet();

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#1a1a1a]/95 backdrop-blur-sm">
      <div className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center">
        <svg
          className="w-5 h-5 text-[#555]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
          />
        </svg>
      </div>
      <span className="font-mono text-xs text-[#888]">
        Connect wallet to view portfolio
      </span>
      <button
        onClick={() => connectWallet()}
        disabled={connecting}
        className="px-4 py-1.5 bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] font-mono text-xs rounded hover:bg-[#00E5FF]/20 transition-colors disabled:opacity-50"
      >
        {connecting ? 'Connecting…' : beginDetected ? 'Connect Begin' : 'Connect Wallet'}
      </button>
    </div>
  );
}

// ── Dashboard ────────────────────────────────────────────────────────────────

export function PortfolioDashboard() {
  const { connected } = useWallet();
  const {
    holdings,
    totalValue,
    change24h,
    change24hPercent,
    transactions,
    isLoading,
    error,
  } = usePortfolio();

  const changeColor =
    change24hPercent === 0
      ? 'text-[#999]'
      : change24hPercent > 0
        ? 'text-[#00FF88]'
        : 'text-[#FF4444]';

  const changeAbs = totalValue * (change24hPercent / 100);

  return (
    <div className="relative flex flex-col h-full w-full bg-[#1a1a1a] overflow-hidden">
      {/* Wallet overlay */}
      {!connected && <WalletRequired />}

      {/* Total value header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#333] flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-[#666] uppercase tracking-wider">
            Portfolio
          </span>
          {connected && (
            <>
              <span className="font-mono text-sm text-white font-semibold tabular-nums">
                {isLoading ? '…' : formatPrice(totalValue)}
              </span>
              {!isLoading && totalValue > 0 && (
                <span className={`font-mono text-xs tabular-nums ${changeColor}`}>
                  {formatChange(change24hPercent)}
                  <span className="text-[10px] ml-1">
                    ({changeAbs >= 0 ? '+' : ''}
                    {formatPrice(Math.abs(changeAbs))})
                  </span>
                </span>
              )}
            </>
          )}
        </div>
        {error && (
          <span className="font-mono text-[10px] text-[#FF4444]">
            {error}
          </span>
        )}
      </div>

      {/* 2×2 sub-grid */}
      <div className="flex-1 grid grid-cols-2 grid-rows-2 min-h-0 overflow-hidden">
        {/* Top-left: Holdings */}
        <div className="border-r border-b border-[#333] overflow-hidden">
          <Holdings holdings={holdings} isLoading={isLoading} />
        </div>

        {/* Top-right: Performance chart */}
        <div className="border-b border-[#333] overflow-hidden">
          <Performance totalValue={totalValue} change24hPercent={change24hPercent} />
        </div>

        {/* Bottom-left: Allocation */}
        <div className="border-r border-[#333] overflow-hidden">
          <Allocation holdings={holdings} totalValue={totalValue} />
        </div>

        {/* Bottom-right: Activity */}
        <div className="overflow-hidden">
          <Activity transactions={transactions} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
