import { toBinanceSymbol } from './websocket';

export interface OHLCVData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type Timeframe = '1m' | '5m' | '15m' | '1h' | '4h' | '1D' | '1W';

// Map our timeframes to Binance kline intervals
const BINANCE_INTERVALS: Record<Timeframe, string> = {
  '1m': '1m',
  '5m': '5m',
  '15m': '15m',
  '1h': '1h',
  '4h': '4h',
  '1D': '1d',
  '1W': '1w',
};

// Number of candles to fetch per timeframe
const CANDLE_LIMITS: Record<Timeframe, number> = {
  '1m': 500,
  '5m': 500,
  '15m': 500,
  '1h': 500,
  '4h': 500,
  '1D': 365,
  '1W': 200,
};

/**
 * Fetch OHLCV candlestick data from Binance klines API
 */
export async function fetchOHLCV(
  symbol: string,
  timeframe: Timeframe
): Promise<OHLCVData[]> {
  const binanceSymbol = toBinanceSymbol(symbol);
  const interval = BINANCE_INTERVALS[timeframe];
  const limit = CANDLE_LIMITS[timeframe];

  const url = `https://api.binance.com/api/v3/klines?symbol=${binanceSymbol}&interval=${interval}&limit=${limit}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Binance API error: ${response.status}`);
  }

  const data: unknown[][] = await response.json();

  return data.map((kline) => ({
    time: (kline[0] as number) / 1000, // Convert ms to seconds for lightweight-charts
    open: parseFloat(kline[1] as string),
    high: parseFloat(kline[2] as string),
    low: parseFloat(kline[3] as string),
    close: parseFloat(kline[4] as string),
    volume: parseFloat(kline[5] as string),
  }));
}
