import type { ChainId } from '@/types/terminal';

const CHAIN_COLORS: Record<ChainId, string> = {
  bitcoin: '#F7931A',
  ethereum: '#627EEA',
  solana: '#9945FF',
  cardano: '#0033AD',
  polygon: '#8247E5',
  base: '#0052FF',
  arbitrum: '#28A0F0',
};

const CHAIN_LABELS: Record<ChainId, string> = {
  bitcoin: 'BTC',
  ethereum: 'ETH',
  solana: 'SOL',
  cardano: 'ADA',
  polygon: 'MATIC',
  base: 'BASE',
  arbitrum: 'ARB',
};

interface ChainBadgeProps {
  chain: ChainId;
  size?: 'sm' | 'md';
}

export function ChainBadge({ chain, size = 'sm' }: ChainBadgeProps) {
  const color = CHAIN_COLORS[chain] ?? '#666';
  const dim = size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5';

  return (
    <span
      className={`inline-block ${dim} rounded-full flex-shrink-0`}
      style={{ backgroundColor: color }}
      title={CHAIN_LABELS[chain] ?? chain}
    />
  );
}
