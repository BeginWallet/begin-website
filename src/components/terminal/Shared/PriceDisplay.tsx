import { formatPrice, formatChange } from '@/services/terminal/prices';

interface PriceDisplayProps {
  price: number;
  change24h?: number;
  showChange?: boolean;
}

export function PriceDisplay({ price, change24h, showChange = true }: PriceDisplayProps) {
  const changeColor =
    change24h === undefined || change24h === 0
      ? 'text-[#999]'
      : change24h > 0
        ? 'text-[#00FF88]'
        : 'text-[#FF4444]';

  return (
    <span className="inline-flex items-center gap-2">
      <span className="font-mono text-xs text-white">{formatPrice(price)}</span>
      {showChange && change24h !== undefined && (
        <span className={`font-mono text-xs ${changeColor}`}>
          {formatChange(change24h)}
        </span>
      )}
    </span>
  );
}
