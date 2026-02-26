import React from 'react';

interface NewsFiltersProps {
  activeChain: string;
  activeCategory: string;
  onChainChange: (chain: string) => void;
  onCategoryChange: (category: string) => void;
}

const CHAINS = [
  { id: 'all', label: 'ALL' },
  { id: 'cardano', label: 'ADA' },
  { id: 'solana', label: 'SOL' },
  { id: 'bitcoin', label: 'BTC' },
  { id: 'ethereum', label: 'ETH' },
];

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'market', label: 'Market' },
  { id: 'defi', label: 'DeFi' },
  { id: 'regulation', label: 'Regulation' },
  { id: 'technology', label: 'Technology' },
];

export function NewsFilters({
  activeChain,
  activeCategory,
  onChainChange,
  onCategoryChange,
}: NewsFiltersProps) {
  return (
    <div className="flex flex-col gap-2 p-2 border-b border-[#333]">
      <div className="flex gap-1">
        {CHAINS.map((chain) => (
          <button
            key={chain.id}
            onClick={() => onChainChange(chain.id)}
            className={`
              px-3 py-1 text-xs font-mono uppercase tracking-wider
              border transition-colors duration-150
              ${
                activeChain === chain.id
                  ? 'bg-[#00E5FF]/10 border-[#00E5FF] text-[#00E5FF]'
                  : 'bg-transparent border-[#333] text-[#888] hover:border-[#555] hover:text-[#aaa]'
              }
            `}
          >
            {chain.label}
          </button>
        ))}
      </div>
      <div className="flex gap-1 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`
              px-2 py-0.5 text-xs font-mono rounded-sm
              transition-colors duration-150
              ${
                activeCategory === cat.id
                  ? 'bg-[#00E5FF]/20 text-[#00E5FF]'
                  : 'bg-[#252525] text-[#666] hover:bg-[#2a2a2a] hover:text-[#888]'
              }
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
