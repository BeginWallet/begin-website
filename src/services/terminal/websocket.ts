import type { BinanceTickerData, PriceCallback } from '../../types/terminal';

const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws';

interface WebSocketState {
  ws: WebSocket | null;
  reconnectAttempts: number;
  maxReconnectAttempts: number;
  reconnectDelay: number;
  subscriptions: Map<string, Set<PriceCallback>>;
  isConnecting: boolean;
}

const state: WebSocketState = {
  ws: null,
  reconnectAttempts: 0,
  maxReconnectAttempts: 5,
  reconnectDelay: 1000,
  subscriptions: new Map(),
  isConnecting: false,
};

interface BinanceMiniTicker {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  c: string; // Close price
  o: string; // Open price
  h: string; // High price
  l: string; // Low price
  v: string; // Total traded base asset volume
  q: string; // Total traded quote asset volume
}

function parseMiniTicker(data: BinanceMiniTicker): BinanceTickerData {
  const closePrice = parseFloat(data.c);
  const openPrice = parseFloat(data.o);
  const change24h = openPrice > 0 ? ((closePrice - openPrice) / openPrice) * 100 : 0;

  return {
    symbol: data.s,
    price: closePrice,
    change24h,
    volume24h: parseFloat(data.q), // Quote volume (in USDT)
  };
}

function notifySubscribers(symbol: string, data: BinanceTickerData): void {
  const callbacks = state.subscriptions.get(symbol);
  if (callbacks) {
    callbacks.forEach((callback) => {
      try {
        callback(data);
      } catch (err) {
        console.error(`Error in price callback for ${symbol}:`, err);
      }
    });
  }
}

function handleMessage(event: MessageEvent): void {
  try {
    const data = JSON.parse(event.data);

    // Handle array of tickers (combined stream)
    if (Array.isArray(data)) {
      data.forEach((ticker: BinanceMiniTicker) => {
        if (ticker.e === '24hrMiniTicker') {
          const parsed = parseMiniTicker(ticker);
          notifySubscribers(ticker.s, parsed);
        }
      });
    }
    // Handle single ticker
    else if (data.e === '24hrMiniTicker') {
      const parsed = parseMiniTicker(data);
      notifySubscribers(data.s, parsed);
    }
    // Handle stream wrapper format
    else if (data.stream && data.data) {
      const ticker = data.data as BinanceMiniTicker;
      if (ticker.e === '24hrMiniTicker') {
        const parsed = parseMiniTicker(ticker);
        notifySubscribers(ticker.s, parsed);
      }
    }
  } catch (err) {
    console.error('Error parsing WebSocket message:', err);
  }
}

function connect(): void {
  if (state.isConnecting || state.ws?.readyState === WebSocket.OPEN) {
    return;
  }

  state.isConnecting = true;

  // Build streams list from current subscriptions
  const symbols = Array.from(state.subscriptions.keys());
  if (symbols.length === 0) {
    state.isConnecting = false;
    return;
  }

  const streams = symbols.map((s) => `${s.toLowerCase()}@miniTicker`).join('/');
  const url = `${BINANCE_WS_URL}/${streams}`;

  try {
    state.ws = new WebSocket(url);

    state.ws.onopen = () => {
      state.isConnecting = false;
      state.reconnectAttempts = 0;
      console.log('Binance WebSocket connected');
    };

    state.ws.onmessage = handleMessage;

    state.ws.onerror = (error) => {
      console.error('Binance WebSocket error:', error);
    };

    state.ws.onclose = () => {
      state.isConnecting = false;
      state.ws = null;

      // Attempt reconnection if we still have subscriptions
      if (state.subscriptions.size > 0) {
        scheduleReconnect();
      }
    };
  } catch (err) {
    state.isConnecting = false;
    console.error('Failed to create WebSocket:', err);
    scheduleReconnect();
  }
}

function scheduleReconnect(): void {
  if (state.reconnectAttempts >= state.maxReconnectAttempts) {
    console.error('Max reconnection attempts reached');
    return;
  }

  const delay = state.reconnectDelay * Math.pow(2, state.reconnectAttempts);
  state.reconnectAttempts++;

  console.log(`Reconnecting in ${delay}ms (attempt ${state.reconnectAttempts})`);

  setTimeout(() => {
    if (state.subscriptions.size > 0) {
      connect();
    }
  }, delay);
}

function disconnect(): void {
  if (state.ws) {
    state.ws.close();
    state.ws = null;
  }
  state.reconnectAttempts = 0;
}

/**
 * Subscribe to real-time price updates for a symbol
 * @param symbol - Trading pair symbol (e.g., 'BTCUSDT', 'ETHUSDT')
 * @param callback - Function called with price updates
 * @returns Cleanup function to unsubscribe
 */
export function subscribeToPrices(
  symbol: string,
  callback: PriceCallback
): () => void {
  const upperSymbol = symbol.toUpperCase();

  // Add to subscriptions
  if (!state.subscriptions.has(upperSymbol)) {
    state.subscriptions.set(upperSymbol, new Set());
  }
  state.subscriptions.get(upperSymbol)!.add(callback);

  // Connect or reconnect with new symbol
  if (state.ws?.readyState === WebSocket.OPEN) {
    // Need to reconnect with the new stream
    disconnect();
  }
  connect();

  // Return cleanup function
  return () => {
    const callbacks = state.subscriptions.get(upperSymbol);
    if (callbacks) {
      callbacks.delete(callback);
      if (callbacks.size === 0) {
        state.subscriptions.delete(upperSymbol);
      }
    }

    // Disconnect if no more subscriptions
    if (state.subscriptions.size === 0) {
      disconnect();
    } else if (state.ws?.readyState === WebSocket.OPEN) {
      // Reconnect without this symbol
      disconnect();
      connect();
    }
  };
}

/**
 * Map token symbol to Binance trading pair
 */
export function toBinanceSymbol(symbol: string): string {
  const upper = symbol.toUpperCase();
  // Add USDT suffix if not already present
  if (!upper.endsWith('USDT') && !upper.endsWith('BUSD')) {
    return `${upper}USDT`;
  }
  return upper;
}

/**
 * Check if WebSocket is connected
 */
export function isConnected(): boolean {
  return state.ws?.readyState === WebSocket.OPEN;
}

/**
 * Get current subscription count
 */
export function getSubscriptionCount(): number {
  return state.subscriptions.size;
}
