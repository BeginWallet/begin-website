import type { PriceData, TokenInfo, ChainId } from '../../types/terminal';

// Top tokens with CoinGecko IDs
export const TOP_TOKENS: TokenInfo[] = [
  {
    id: 'btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    chain: 'bitcoin',
    coingeckoId: 'bitcoin',
    decimals: 8,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  },
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    chain: 'ethereum',
    coingeckoId: 'ethereum',
    decimals: 18,
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
  },
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    chain: 'solana',
    coingeckoId: 'solana',
    decimals: 9,
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
  },
  {
    id: 'ada',
    symbol: 'ADA',
    name: 'Cardano',
    chain: 'cardano',
    coingeckoId: 'cardano',
    decimals: 6,
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
  },
  {
    id: 'usdc',
    symbol: 'USDC',
    name: 'USD Coin',
    chain: 'ethereum',
    coingeckoId: 'usd-coin',
    decimals: 6,
    image: 'https://assets.coingecko.com/coins/images/6319/large/usdc.png',
  },
  {
    id: 'usdt',
    symbol: 'USDT',
    name: 'Tether',
    chain: 'ethereum',
    coingeckoId: 'tether',
    decimals: 6,
    image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
  },
  {
    id: 'dot',
    symbol: 'DOT',
    name: 'Polkadot',
    chain: 'ethereum',
    coingeckoId: 'polkadot',
    decimals: 10,
    image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png',
  },
  {
    id: 'avax',
    symbol: 'AVAX',
    name: 'Avalanche',
    chain: 'ethereum',
    coingeckoId: 'avalanche-2',
    decimals: 18,
    image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png',
  },
  {
    id: 'matic',
    symbol: 'MATIC',
    name: 'Polygon',
    chain: 'polygon',
    coingeckoId: 'matic-network',
    decimals: 18,
    image: 'https://assets.coingecko.com/coins/images/4713/large/polygon.png',
  },
  {
    id: 'bnb',
    symbol: 'BNB',
    name: 'BNB',
    chain: 'ethereum',
    coingeckoId: 'binancecoin',
    decimals: 18,
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
  },
];

// Rate limiting queue for CoinGecko (30 requests/min)
const REQUEST_INTERVAL_MS = 2100; // ~28 requests per minute to stay safe
let lastRequestTime = 0;

async function rateLimitedFetch(url: string): Promise<Response> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < REQUEST_INTERVAL_MS) {
    await new Promise((resolve) =>
      setTimeout(resolve, REQUEST_INTERVAL_MS - timeSinceLastRequest)
    );
  }

  lastRequestTime = Date.now();
  return fetch(url);
}

// Map CoinGecko ID to token info
function getTokenInfo(coingeckoId: string): TokenInfo | undefined {
  return TOP_TOKENS.find((t) => t.coingeckoId === coingeckoId);
}

/**
 * Fetch prices for multiple tokens from CoinGecko
 * Uses the free /simple/price endpoint (30 requests/min limit)
 */
export async function fetchPrices(ids: string[]): Promise<PriceData[]> {
  if (ids.length === 0) return [];

  const coingeckoIds = ids
    .map((id) => {
      const token = TOP_TOKENS.find((t) => t.id === id || t.coingeckoId === id);
      return token?.coingeckoId;
    })
    .filter(Boolean)
    .join(',');

  if (!coingeckoIds) return [];

  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoIds}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true`;

  const response = await rateLimitedFetch(url);

  if (!response.ok) {
    throw new Error(`CoinGecko API error: ${response.status}`);
  }

  const data = await response.json();

  const prices: PriceData[] = [];

  for (const [coingeckoId, priceInfo] of Object.entries(data)) {
    const info = priceInfo as {
      usd: number;
      usd_24h_change: number;
      usd_24h_vol: number;
      usd_market_cap: number;
    };
    const token = getTokenInfo(coingeckoId);

    if (token) {
      prices.push({
        id: token.id,
        symbol: token.symbol,
        name: token.name,
        chain: token.chain,
        price: info.usd ?? 0,
        change24h: info.usd_24h_change ?? 0,
        volume24h: info.usd_24h_vol ?? 0,
        marketCap: info.usd_market_cap ?? 0,
      });
    }
  }

  return prices;
}

/**
 * Fetch Solana token price from Jupiter Price API
 */
export async function fetchSolanaTokenPrice(mint: string): Promise<number> {
  const url = `https://price.jup.ag/v6/price?ids=${mint}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Jupiter API error: ${response.status}`);
  }

  const data = await response.json();
  return data.data?.[mint]?.price ?? 0;
}

/**
 * Format price with appropriate decimal places
 */
export function formatPrice(price: number, decimals?: number): string {
  if (price === 0) return '$0.00';

  // Auto-determine decimals based on price magnitude
  let decimalPlaces = decimals;
  if (decimalPlaces === undefined) {
    if (price >= 1000) {
      decimalPlaces = 2;
    } else if (price >= 1) {
      decimalPlaces = 2;
    } else if (price >= 0.01) {
      decimalPlaces = 4;
    } else {
      decimalPlaces = 6;
    }
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(price);
}

/**
 * Format percentage change with + prefix for positive values
 */
export function formatChange(change: number): string {
  const prefix = change > 0 ? '+' : '';
  return `${prefix}${change.toFixed(2)}%`;
}

/**
 * Format large volumes (1.2B, 340M, etc.)
 */
export function formatVolume(volume: number): string {
  if (volume >= 1_000_000_000) {
    return `$${(volume / 1_000_000_000).toFixed(2)}B`;
  }
  if (volume >= 1_000_000) {
    return `$${(volume / 1_000_000).toFixed(2)}M`;
  }
  if (volume >= 1_000) {
    return `$${(volume / 1_000).toFixed(2)}K`;
  }
  return `$${volume.toFixed(2)}`;
}
