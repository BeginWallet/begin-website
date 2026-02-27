export interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  chains: string[];
  category: 'market' | 'defi' | 'regulation' | 'technology' | 'general';
}

interface CryptoPanicPost {
  id: number;
  title: string;
  url: string;
  published_at: string;
  source: {
    title: string;
    domain: string;
  };
  votes: {
    positive: number;
    negative: number;
    important: number;
    liked: number;
    disliked: number;
  };
  currencies?: Array<{
    code: string;
    title: string;
    slug: string;
  }>;
  kind: string;
}

interface CryptoPanicResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CryptoPanicPost[];
}

const CHAIN_MAPPINGS: Record<string, string[]> = {
  cardano: ['ADA', 'CARDANO'],
  solana: ['SOL', 'SOLANA'],
  bitcoin: ['BTC', 'BITCOIN'],
  ethereum: ['ETH', 'ETHEREUM'],
};

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  defi: ['defi', 'lending', 'yield', 'liquidity', 'swap', 'amm', 'staking', 'vault'],
  regulation: ['sec', 'regulation', 'regulatory', 'lawsuit', 'legal', 'ban', 'law', 'compliance', 'government'],
  technology: ['upgrade', 'launch', 'protocol', 'network', 'blockchain', 'development', 'release', 'fork'],
  market: ['price', 'trading', 'volume', 'market', 'bull', 'bear', 'rally', 'crash', 'pump', 'dump'],
};

function detectChains(post: CryptoPanicPost): string[] {
  const chains: string[] = [];
  const titleLower = post.title.toLowerCase();

  if (post.currencies) {
    for (const currency of post.currencies) {
      const code = currency.code.toUpperCase();
      for (const [chain, codes] of Object.entries(CHAIN_MAPPINGS)) {
        if (codes.includes(code)) {
          chains.push(chain);
        }
      }
    }
  }

  for (const [chain, keywords] of Object.entries(CHAIN_MAPPINGS)) {
    if (keywords.some(kw => titleLower.includes(kw.toLowerCase())) && !chains.includes(chain)) {
      chains.push(chain);
    }
  }

  return chains;
}

function detectCategory(post: CryptoPanicPost): NewsItem['category'] {
  const titleLower = post.title.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(kw => titleLower.includes(kw))) {
      return category as NewsItem['category'];
    }
  }

  if (post.kind === 'news') return 'market';
  return 'general';
}

function detectSentiment(post: CryptoPanicPost): NewsItem['sentiment'] {
  const { positive, negative } = post.votes;

  if (positive > negative + 2) return 'positive';
  if (negative > positive + 2) return 'negative';
  return 'neutral';
}

function transformPost(post: CryptoPanicPost): NewsItem {
  return {
    id: String(post.id),
    title: post.title,
    source: post.source.title,
    url: post.url,
    publishedAt: post.published_at,
    sentiment: detectSentiment(post),
    chains: detectChains(post),
    category: detectCategory(post),
  };
}

export interface FetchNewsOptions {
  chain?: string;
  category?: string;
  cursor?: string | null;
}

export interface NewsResponse {
  items: NewsItem[];
  nextCursor: string | null;
  hasMore: boolean;
}

export async function fetchNews(options: FetchNewsOptions = {}): Promise<NewsResponse> {
  const { chain, category, cursor } = options;

  let url = cursor || 'https://cryptopanic.com/api/v1/posts/?auth_token=free&public=true';

  if (!cursor && chain && chain !== 'all') {
    const chainCodes = CHAIN_MAPPINGS[chain.toLowerCase()];
    if (chainCodes && chainCodes[0]) {
      url += `&currencies=${chainCodes[0]}`;
    }
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.status}`);
  }

  const data: CryptoPanicResponse = await response.json();

  let items = data.results.map(transformPost);

  if (category && category !== 'all') {
    items = items.filter(item => item.category === category);
  }

  return {
    items,
    nextCursor: data.next,
    hasMore: data.next !== null,
  };
}
