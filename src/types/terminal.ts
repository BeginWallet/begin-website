// Terminal types for price data and token information

export type ChainId =
  | 'cardano'
  | 'solana'
  | 'bitcoin'
  | 'ethereum'
  | 'base'
  | 'polygon'
  | 'arbitrum';

export interface TokenInfo {
  id: string;
  symbol: string;
  name: string;
  chain: ChainId;
  coingeckoId: string;
  decimals: number;
  image?: string;
  mint?: string; // Solana mint address
}

export interface PriceData {
  id: string;
  symbol: string;
  name: string;
  chain: ChainId;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  sparkline?: number[];
}

export interface BinanceTickerData {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
}

export interface PriceCallback {
  (data: BinanceTickerData): void;
}
