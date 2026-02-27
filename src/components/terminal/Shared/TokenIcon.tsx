import type { ChainId } from '@/types/terminal';
import { ChainBadge } from './ChainBadge';

interface TokenIconProps {
  symbol: string;
  chain: ChainId;
}

export function TokenIcon({ symbol, chain }: TokenIconProps) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <ChainBadge chain={chain} size="sm" />
      <span className="font-mono text-xs text-white font-medium">{symbol}</span>
    </span>
  );
}
