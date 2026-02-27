'use client';

import { ChainBadge } from '../Shared/ChainBadge';
import { getTxExplorerUrl, type TransactionInfo } from '@/services/terminal/portfolio';

// ── Time ago ─────────────────────────────────────────────────────────────────

function timeAgo(timestamp: number): string {
  if (!timestamp) return '--';
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

// ── Type badge colors ────────────────────────────────────────────────────────

const TYPE_COLORS: Record<string, string> = {
  send: 'text-[#FF4444]',
  receive: 'text-[#00FF88]',
  swap: 'text-[#00E5FF]',
  stake: 'text-[#9945FF]',
};

const TYPE_LABELS: Record<string, string> = {
  send: 'SEND',
  receive: 'RECV',
  swap: 'SWAP',
  stake: 'STAKE',
};

// ── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2 px-2 py-1.5 border-b border-[#252525] animate-pulse">
          <div className="h-3 w-8 bg-[#252525] rounded" />
          <div className="h-3 w-16 bg-[#252525] rounded" />
          <div className="flex-1" />
          <div className="h-3 w-12 bg-[#252525] rounded" />
        </div>
      ))}
    </>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

interface ActivityProps {
  transactions: TransactionInfo[];
  isLoading: boolean;
}

export function Activity({ transactions, isLoading }: ActivityProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-2 py-1 border-b border-[#333]">
        <span className="font-mono text-[10px] text-[#666] uppercase tracking-wider">
          Activity
        </span>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
        {isLoading ? (
          <SkeletonRows />
        ) : transactions.length === 0 ? (
          <div className="flex items-center justify-center h-full text-[10px] text-[#555] font-mono">
            No recent activity
          </div>
        ) : (
          transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center gap-2 px-2 py-1.5 border-b border-[#252525] hover:bg-[#222] transition-colors duration-75"
            >
              {/* Type badge */}
              <span
                className={`font-mono text-[10px] font-medium w-10 ${TYPE_COLORS[tx.type] ?? 'text-[#999]'}`}
              >
                {TYPE_LABELS[tx.type] ?? tx.type.toUpperCase()}
              </span>

              {/* Chain + token */}
              <span className="inline-flex items-center gap-1">
                <ChainBadge chain={tx.chain} size="sm" />
                <span className="font-mono text-xs text-white">{tx.token}</span>
              </span>

              {/* Amount (if available) */}
              {tx.amount > 0 && (
                <span className="font-mono text-[10px] text-[#999] tabular-nums">
                  {tx.amount < 0.001
                    ? tx.amount.toExponential(2)
                    : tx.amount.toFixed(4)}
                </span>
              )}

              <span className="flex-1" />

              {/* Time ago */}
              <span className="font-mono text-[10px] text-[#555] whitespace-nowrap">
                {timeAgo(tx.timestamp)}
              </span>

              {/* Tx hash link */}
              <a
                href={getTxExplorerUrl(tx.chain, tx.txHash)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-[10px] text-[#444] hover:text-[#00E5FF] transition-colors truncate max-w-[60px]"
                title={tx.txHash}
              >
                {tx.txHash.slice(0, 8)}…
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
