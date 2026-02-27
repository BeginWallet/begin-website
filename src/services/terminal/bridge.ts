// Bridge service — XOSwap (Exodus Exchange API v3) cross-chain bridge

const XOSWAP_BASE = 'https://exchange.exodus.io/v3';
const XOSWAP_HEADERS = {
  'Content-Type': 'application/json',
  'App-Name': 'begin-wallet',
  'App-Version': '1',
};

export type BridgeAsset = 'ADA' | 'SOL' | 'BTC' | 'ETH' | 'MATIC' | 'AVAX' | 'BNB';

export interface BridgeRate {
  pair: string;
  rate: number;
  minerFee: number;
  min: number;
  max: number;
}

export type OrderStatus = 'awaiting_deposit' | 'confirming' | 'exchanging' | 'complete' | 'failed' | 'refunded';

export interface BridgeOrder {
  orderId: string;
  pair: string;
  status: OrderStatus;
  fromAmount: number;
  toAmount: number;
  depositAddress: string;
  destinationAddress: string;
  txIdIn?: string;
  txIdOut?: string;
  createdAt: string;
}

export const BRIDGE_ASSETS: Record<BridgeAsset, { symbol: string; name: string; chain: string; color: string }> = {
  ADA: { symbol: 'ADA', name: 'Cardano', chain: 'cardano', color: '#0033AD' },
  SOL: { symbol: 'SOL', name: 'Solana', chain: 'solana', color: '#9945FF' },
  BTC: { symbol: 'BTC', name: 'Bitcoin', chain: 'bitcoin', color: '#F7931A' },
  ETH: { symbol: 'ETH', name: 'Ethereum', chain: 'ethereum', color: '#627EEA' },
  MATIC: { symbol: 'MATIC', name: 'Polygon', chain: 'polygon', color: '#8247E5' },
  AVAX: { symbol: 'AVAX', name: 'Avalanche', chain: 'avalanche', color: '#E84142' },
  BNB: { symbol: 'BNB', name: 'BNB Chain', chain: 'bnb', color: '#F0B90B' },
};

/**
 * Get exchange rate for a pair (e.g. "BTC_SOL")
 */
export async function getRate(pair: string, amount: number): Promise<BridgeRate> {
  const params = new URLSearchParams({ amount: String(amount) });
  const res = await fetch(`${XOSWAP_BASE}/pairs/${pair}/rates?${params}`, {
    headers: XOSWAP_HEADERS,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`XOSwap rate error: ${res.status} — ${text}`);
  }

  const data = await res.json();

  return {
    pair,
    rate: parseFloat(data.rate ?? data.price ?? '0'),
    minerFee: parseFloat(data.minerFee ?? data.miner_fee ?? '0'),
    min: parseFloat(data.min ?? data.minimum ?? '0'),
    max: parseFloat(data.max ?? data.maximum ?? '0'),
  };
}

/**
 * Create a bridge order
 */
export async function createOrder(
  pair: string,
  fromAddress: string,
  toAddress: string,
  fromAmount: number,
  toAmount: number,
  slippage?: number
): Promise<BridgeOrder> {
  const body: Record<string, unknown> = {
    pair,
    fromAddress,
    toAddress,
    fromAmount: String(fromAmount),
    toAmount: String(toAmount),
  };
  if (slippage !== undefined) body.slippage = String(slippage);

  const res = await fetch(`${XOSWAP_BASE}/orders`, {
    method: 'POST',
    headers: XOSWAP_HEADERS,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`XOSwap order error: ${res.status} — ${text}`);
  }

  const data = await res.json();

  return parseOrder(data);
}

/**
 * Update an order with the deposit transaction ID
 */
export async function updateOrder(orderId: string, txId: string): Promise<BridgeOrder> {
  const res = await fetch(`${XOSWAP_BASE}/orders/${orderId}`, {
    method: 'PATCH',
    headers: XOSWAP_HEADERS,
    body: JSON.stringify({ txId }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`XOSwap update error: ${res.status} — ${text}`);
  }

  const data = await res.json();
  return parseOrder(data);
}

/**
 * Get order status
 */
export async function getOrder(orderId: string): Promise<BridgeOrder> {
  const res = await fetch(`${XOSWAP_BASE}/orders/${orderId}`, {
    headers: XOSWAP_HEADERS,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`XOSwap order fetch error: ${res.status} — ${text}`);
  }

  const data = await res.json();
  return parseOrder(data);
}

function parseOrder(data: any): BridgeOrder {
  return {
    orderId: data.orderId ?? data.id ?? '',
    pair: data.pair ?? '',
    status: data.status ?? 'awaiting_deposit',
    fromAmount: parseFloat(data.fromAmount ?? '0'),
    toAmount: parseFloat(data.toAmount ?? '0'),
    depositAddress: data.depositAddress ?? data.deposit_address ?? '',
    destinationAddress: data.destinationAddress ?? data.destination_address ?? '',
    txIdIn: data.txIdIn ?? data.tx_id_in,
    txIdOut: data.txIdOut ?? data.tx_id_out,
    createdAt: data.createdAt ?? data.created_at ?? new Date().toISOString(),
  };
}
