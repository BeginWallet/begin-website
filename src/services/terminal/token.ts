import type { ChainId } from '../../types/terminal';
import { TOP_TOKENS } from './prices';

// ── Types ────────────────────────────────────────────────────────────────────

export interface TokenDetail {
  id: string;
  symbol: string;
  name: string;
  image: string;
  chain: ChainId;
  description: string;
  links: {
    website: string | null;
    twitter: string | null;
    explorer: string | null;
  };
  marketData: {
    price: number;
    change24h: number;
    marketCap: number;
    volume24h: number;
    high24h: number;
    low24h: number;
    ath: number;
    athDate: string;
    atl: number;
    atlDate: string;
    circulatingSupply: number;
    totalSupply: number | null;
    maxSupply: number | null;
    fdv: number | null;
    tvl: number | null;
  };
}

// ── Ticker → CoinGecko ID mapping ───────────────────────────────────────────

const EXTRA_TICKER_MAP: Record<string, { coingeckoId: string; chain: ChainId }> = {
  XRP: { coingeckoId: 'ripple', chain: 'ethereum' },
  DOGE: { coingeckoId: 'dogecoin', chain: 'ethereum' },
  LINK: { coingeckoId: 'chainlink', chain: 'ethereum' },
  UNI: { coingeckoId: 'uniswap', chain: 'ethereum' },
  AAVE: { coingeckoId: 'aave', chain: 'ethereum' },
  LTC: { coingeckoId: 'litecoin', chain: 'bitcoin' },
  ATOM: { coingeckoId: 'cosmos', chain: 'ethereum' },
  NEAR: { coingeckoId: 'near', chain: 'ethereum' },
  ARB: { coingeckoId: 'arbitrum', chain: 'arbitrum' },
  OP: { coingeckoId: 'optimism', chain: 'ethereum' },
};

/**
 * Resolve a ticker symbol (e.g. "BTC") or CoinGecko ID (e.g. "bitcoin")
 * to a CoinGecko ID. Returns null if no mapping is found.
 */
export function resolveCoingeckoId(input: string): string | null {
  const upper = input.toUpperCase();
  const lower = input.toLowerCase();

  // Check TOP_TOKENS by symbol or id
  const topToken = TOP_TOKENS.find(
    (t) => t.symbol === upper || t.id === lower || t.coingeckoId === lower
  );
  if (topToken) return topToken.coingeckoId;

  // Check extra mappings
  const extra = EXTRA_TICKER_MAP[upper];
  if (extra) return extra.coingeckoId;

  // Fallback: treat the input itself as a CoinGecko ID
  return lower;
}

/**
 * Resolve the chain for a given ticker/id.
 */
export function resolveChain(input: string): ChainId {
  const upper = input.toUpperCase();
  const lower = input.toLowerCase();

  const topToken = TOP_TOKENS.find(
    (t) => t.symbol === upper || t.id === lower || t.coingeckoId === lower
  );
  if (topToken) return topToken.chain;

  const extra = EXTRA_TICKER_MAP[upper];
  if (extra) return extra.chain;

  return 'ethereum';
}

// ── CoinGecko API ────────────────────────────────────────────────────────────

interface CoinGeckoDetailResponse {
  id: string;
  symbol: string;
  name: string;
  image: { large: string; small: string; thumb: string };
  description: { en: string };
  links: {
    homepage: string[];
    twitter_screen_name: string;
    blockchain_site: string[];
  };
  market_data: {
    current_price: { usd: number };
    price_change_percentage_24h: number;
    market_cap: { usd: number };
    total_volume: { usd: number };
    high_24h: { usd: number };
    low_24h: { usd: number };
    ath: { usd: number };
    ath_date: { usd: string };
    atl: { usd: number };
    atl_date: { usd: string };
    circulating_supply: number;
    total_supply: number | null;
    max_supply: number | null;
    fully_diluted_valuation: { usd: number | null };
    total_value_locked: { usd: number } | null;
  };
  categories: string[];
}

/**
 * Fetch detailed token information from CoinGecko /coins/{id}
 */
export async function fetchTokenDetail(coingeckoId: string): Promise<TokenDetail> {
  const url = `https://api.coingecko.com/api/v3/coins/${coingeckoId}?localization=false&tickers=false&community_data=false&developer_data=false`;

  const response = await fetch(url);

  if (response.status === 404) {
    throw new Error(`Token not found: ${coingeckoId}`);
  }

  if (!response.ok) {
    throw new Error(`CoinGecko API error: ${response.status}`);
  }

  const data: CoinGeckoDetailResponse = await response.json();
  const chain = resolveChain(data.symbol);

  const homepage = data.links.homepage.find((u) => u && u.length > 0) ?? null;
  const twitter = data.links.twitter_screen_name
    ? `https://twitter.com/${data.links.twitter_screen_name}`
    : null;
  const explorer = data.links.blockchain_site.find((u) => u && u.length > 0) ?? null;

  const md = data.market_data;

  return {
    id: data.id,
    symbol: data.symbol.toUpperCase(),
    name: data.name,
    image: data.image.large,
    chain,
    description: stripHtml(data.description.en),
    links: { website: homepage, twitter, explorer },
    marketData: {
      price: md.current_price.usd ?? 0,
      change24h: md.price_change_percentage_24h ?? 0,
      marketCap: md.market_cap.usd ?? 0,
      volume24h: md.total_volume.usd ?? 0,
      high24h: md.high_24h.usd ?? 0,
      low24h: md.low_24h.usd ?? 0,
      ath: md.ath.usd ?? 0,
      athDate: md.ath_date.usd ?? '',
      atl: md.atl.usd ?? 0,
      atlDate: md.atl_date.usd ?? '',
      circulatingSupply: md.circulating_supply ?? 0,
      totalSupply: md.total_supply,
      maxSupply: md.max_supply,
      fdv: md.fully_diluted_valuation?.usd ?? null,
      tvl: md.total_value_locked?.usd ?? null,
    },
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Strip HTML tags from a string (CoinGecko descriptions contain HTML).
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Format a large number as a compact string (e.g. 1.23T, 456.78B, 12.34M).
 */
export function formatLargeNumber(value: number | null | undefined): string {
  if (value == null || value === 0) return '-';
  if (value >= 1_000_000_000_000) return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(2)}K`;
  return `$${value.toFixed(2)}`;
}

/**
 * Format a supply number without $ prefix.
 */
export function formatSupply(value: number | null | undefined): string {
  if (value == null || value === 0) return '-';
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(2)}K`;
  return value.toFixed(0);
}

/**
 * Format a date string into a short date like "Jan 15, 2024".
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
