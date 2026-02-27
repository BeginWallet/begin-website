'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, ExternalLink, Globe, Twitter } from 'lucide-react';
import { useTokenOverview } from '@/hooks/terminal/useTokenOverview';
import { useNews } from '@/hooks/terminal/useNews';
import { formatPrice, formatChange } from '@/services/terminal/prices';
import {
  formatLargeNumber,
  formatSupply,
  formatDate,
} from '@/services/terminal/token';
import { ChainBadge } from '../Shared/ChainBadge';
import PriceChart from '../Chart/PriceChart';
import type { NewsItem } from '@/services/terminal/news';

// ── Sub-components ───────────────────────────────────────────────────────────

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#1a1a1a] border border-[#333] rounded px-3 py-2">
      <div className="font-mono text-[10px] text-[#666] uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className="font-mono text-xs text-white">{value}</div>
    </div>
  );
}

function LinkButton({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof Globe;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1a1a] border border-[#333] rounded text-xs text-[#999] hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-colors font-mono"
    >
      <Icon className="w-3 h-3" />
      {label}
    </a>
  );
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return '0m';
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function SentimentDot({ sentiment }: { sentiment: NewsItem['sentiment'] }) {
  const colors = {
    positive: 'bg-[#00FF88]',
    negative: 'bg-[#FF4444]',
    neutral: 'bg-[#666]',
  };
  return (
    <span
      className={`inline-block w-1.5 h-1.5 rounded-full ${colors[sentiment]}`}
      title={sentiment}
    />
  );
}

function RelatedNews({ symbol }: { symbol: string }) {
  const chainMap: Record<string, string> = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    SOL: 'solana',
    ADA: 'cardano',
  };
  const chain = chainMap[symbol.toUpperCase()] || 'all';

  const { data, isLoading, error } = useNews({ chain, enabled: true });
  const items = data?.pages.flatMap((p) => p.items).slice(0, 5) ?? [];

  return (
    <div className="bg-[#1a1a1a] border border-[#333] rounded overflow-hidden">
      <div className="px-3 py-2 border-b border-[#333]">
        <span className="font-mono text-[10px] text-[#00E5FF] uppercase tracking-wider">
          Related News
        </span>
      </div>
      <div>
        {error ? (
          <div className="px-3 py-4 text-xs text-[#FF4444] font-mono">
            Error loading news
          </div>
        ) : isLoading ? (
          <div className="space-y-0">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="px-3 py-2 border-b border-[#252525] animate-pulse">
                <div className="h-3 bg-[#252525] rounded w-full mb-1" />
                <div className="h-3 bg-[#252525] rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="px-3 py-4 text-xs text-[#555] font-mono">
            No related news
          </div>
        ) : (
          items.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 px-3 py-1.5 border-b border-[#252525] hover:bg-[#222] transition-colors cursor-pointer group"
            >
              <span className="font-mono text-[10px] text-[#555] w-6 flex-shrink-0 pt-0.5">
                {formatTimeAgo(item.publishedAt)}
              </span>
              <span className="flex-1 text-xs text-[#ccc] leading-tight group-hover:text-white line-clamp-2">
                {item.title}
              </span>
              <SentimentDot sentiment={item.sentiment} />
            </a>
          ))
        )}
      </div>
    </div>
  );
}

// ── Loading skeleton ─────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#252525] rounded-full" />
        <div className="h-5 w-32 bg-[#252525] rounded" />
        <div className="h-4 w-24 bg-[#252525] rounded" />
      </div>
      <div className="h-[300px] bg-[#1a1a1a] border border-[#333] rounded" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-14 bg-[#1a1a1a] border border-[#333] rounded" />
        ))}
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

interface TokenOverviewProps {
  tokenId: string;
}

export default function TokenOverview({ tokenId }: TokenOverviewProps) {
  const router = useRouter();
  const { data: token, isLoading, error } = useTokenOverview(tokenId);
  const [descExpanded, setDescExpanded] = useState(false);

  if (isLoading) {
    return (
      <div className="h-full bg-[#141414] overflow-y-auto">
        <LoadingSkeleton />
      </div>
    );
  }

  if (error || !token) {
    return (
      <div className="h-full bg-[#141414] flex flex-col items-center justify-center gap-3">
        <span className="font-mono text-sm text-[#FF4444]">
          {error?.message === `Token not found: ${tokenId}`
            ? `Token "${tokenId}" not found`
            : 'Failed to load token data'}
        </span>
        <button
          onClick={() => router.push('/terminal')}
          className="font-mono text-xs text-[#00E5FF] hover:underline"
        >
          Back to Terminal
        </button>
      </div>
    );
  }

  const md = token.marketData;
  const changeColor =
    md.change24h === 0
      ? 'text-[#999]'
      : md.change24h > 0
        ? 'text-[#00FF88]'
        : 'text-[#FF4444]';

  const descriptionPreview =
    token.description.length > 300 && !descExpanded
      ? token.description.slice(0, 300) + '...'
      : token.description;

  return (
    <div className="h-full bg-[#141414] overflow-y-auto scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#141414] border-b border-[#333] px-4 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/terminal')}
              className="text-[#666] hover:text-white transition-colors"
              title="Back to terminal"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <img
              src={token.image}
              alt={token.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm font-semibold text-white">
              {token.name}
            </span>
            <span className="font-mono text-xs text-[#666]">
              {token.symbol}
            </span>
            <ChainBadge chain={token.chain} size="sm" />
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-white">
              {formatPrice(md.price)}
            </span>
            <span className={`font-mono text-xs ${changeColor}`}>
              {formatChange(md.change24h)}
            </span>
            <span className="font-mono text-[10px] text-[#555]">
              MCap {formatLargeNumber(md.marketCap)}
            </span>
            <span className="font-mono text-[10px] text-[#555]">
              Vol {formatLargeNumber(md.volume24h)}
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[350px] border-b border-[#333]">
        <PriceChart tokenId={token.symbol} initialTimeframe="1h" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Key metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <MetricCard label="Market Cap" value={formatLargeNumber(md.marketCap)} />
          <MetricCard label="24h Volume" value={formatLargeNumber(md.volume24h)} />
          <MetricCard label="24h High" value={formatPrice(md.high24h)} />
          <MetricCard label="24h Low" value={formatPrice(md.low24h)} />
          <MetricCard
            label="All-Time High"
            value={`${formatPrice(md.ath)} (${formatDate(md.athDate)})`}
          />
          <MetricCard
            label="All-Time Low"
            value={`${formatPrice(md.atl)} (${formatDate(md.atlDate)})`}
          />
          <MetricCard
            label="Circulating Supply"
            value={formatSupply(md.circulatingSupply)}
          />
          {md.maxSupply != null ? (
            <MetricCard label="Max Supply" value={formatSupply(md.maxSupply)} />
          ) : md.totalSupply != null ? (
            <MetricCard label="Total Supply" value={formatSupply(md.totalSupply)} />
          ) : (
            <MetricCard label="Max Supply" value="-" />
          )}
          {md.fdv != null && (
            <MetricCard label="FDV" value={formatLargeNumber(md.fdv)} />
          )}
          {md.tvl != null && (
            <MetricCard label="TVL" value={formatLargeNumber(md.tvl)} />
          )}
        </div>

        {/* Links */}
        {(token.links.website || token.links.twitter || token.links.explorer) && (
          <div className="flex items-center gap-2 flex-wrap">
            {token.links.website && (
              <LinkButton href={token.links.website} icon={Globe} label="Website" />
            )}
            {token.links.twitter && (
              <LinkButton href={token.links.twitter} icon={Twitter} label="Twitter" />
            )}
            {token.links.explorer && (
              <LinkButton
                href={token.links.explorer}
                icon={ExternalLink}
                label="Explorer"
              />
            )}
          </div>
        )}

        {/* Description */}
        {token.description && (
          <div className="bg-[#1a1a1a] border border-[#333] rounded px-3 py-2">
            <div className="font-mono text-[10px] text-[#00E5FF] uppercase tracking-wider mb-1.5">
              About {token.name}
            </div>
            <p className="text-xs text-[#999] leading-relaxed">
              {descriptionPreview}
            </p>
            {token.description.length > 300 && (
              <button
                onClick={() => setDescExpanded((v) => !v)}
                className="font-mono text-[10px] text-[#00E5FF] hover:underline mt-1"
              >
                {descExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
        )}

        {/* Related news */}
        <RelatedNews symbol={token.symbol} />
      </div>
    </div>
  );
}
