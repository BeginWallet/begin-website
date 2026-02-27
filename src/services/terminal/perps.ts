// ── Hyperliquid Perpetual Futures API ─────────────────────────────────

const HL_API = 'https://api.hyperliquid.xyz';

// ── Types ─────────────────────────────────────────────────────────────

export interface PerpMarket {
  coin: string;
  szDecimals: number;
  maxLeverage: number;
  onlyIsolated: boolean;
}

export interface OrderBookLevel {
  price: number;
  size: number;
}

export interface OrderBook {
  coin: string;
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
}

export interface FundingRate {
  coin: string;
  funding: number;
  premium: number;
  openInterest: number;
}

export interface PerpPosition {
  coin: string;
  side: 'long' | 'short';
  size: number;
  entryPrice: number;
  markPrice: number;
  leverage: number;
  unrealizedPnl: number;
  liquidationPrice: number | null;
  marginUsed: number;
}

// ── API helpers ───────────────────────────────────────────────────────

async function hlPost<T>(body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${HL_API}/info`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Hyperliquid ${res.status}: ${res.statusText}`);
  return res.json() as Promise<T>;
}

// ── Public endpoints ──────────────────────────────────────────────────

interface MetaResponse {
  universe: Array<{
    name: string;
    szDecimals: number;
    maxLeverage: number;
    onlyIsolated: boolean;
  }>;
}

export async function fetchMarkets(): Promise<PerpMarket[]> {
  const data = await hlPost<MetaResponse>({ type: 'meta' });
  return data.universe.map((m) => ({
    coin: m.name,
    szDecimals: m.szDecimals,
    maxLeverage: m.maxLeverage,
    onlyIsolated: m.onlyIsolated,
  }));
}

export async function fetchMidPrices(): Promise<Record<string, number>> {
  const data = await hlPost<Record<string, string>>({ type: 'allMids' });
  const result: Record<string, number> = {};
  for (const [coin, price] of Object.entries(data)) {
    result[coin] = parseFloat(price);
  }
  return result;
}

export async function fetchOrderBook(coin: string): Promise<OrderBook> {
  const data = await hlPost<{
    coin: string;
    levels: [Array<{ px: string; sz: string; n: number }>, Array<{ px: string; sz: string; n: number }>];
  }>({ type: 'l2Book', coin });

  return {
    coin: data.coin,
    bids: data.levels[0].map((l) => ({ price: parseFloat(l.px), size: parseFloat(l.sz) })),
    asks: data.levels[1].map((l) => ({ price: parseFloat(l.px), size: parseFloat(l.sz) })),
  };
}

interface FundingResponse {
  coin: string;
  funding: string;
  premium: string;
  openInterest: string;
}

export async function fetchFundingRates(): Promise<FundingRate[]> {
  const [meta, ctxs] = await hlPost<[MetaResponse, FundingResponse[]]>({ type: 'metaAndAssetCtxs' });
  return ctxs.map((ctx, i) => ({
    coin: meta.universe[i].name,
    funding: parseFloat(ctx.funding),
    premium: parseFloat(ctx.premium),
    openInterest: parseFloat(ctx.openInterest),
  }));
}

// ── Formatting helpers ────────────────────────────────────────────────

export function formatPerpPrice(price: number): string {
  if (price >= 1000) return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (price >= 1) return price.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 });
  return price.toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 6 });
}

export function formatFunding(rate: number): string {
  return `${(rate * 100).toFixed(4)}%`;
}
