import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useCallback, useRef } from 'react';
import { fetchPrices, TOP_TOKENS } from '../../services/terminal/prices';
import {
  subscribeToPrices,
  toBinanceSymbol,
} from '../../services/terminal/websocket';
import type { PriceData, BinanceTickerData } from '../../types/terminal';

const PRICE_QUERY_KEY = 'terminal-prices';
const STALE_TIME = 30 * 1000; // 30 seconds
const REFETCH_INTERVAL = 30 * 1000; // 30 seconds

/**
 * Hook to fetch prices for multiple tokens using React Query
 * Automatically refreshes every 30 seconds
 */
export function usePrices(ids?: string[]) {
  // Default to all top tokens if no IDs provided
  const tokenIds = ids ?? TOP_TOKENS.map((t) => t.id);

  return useQuery<PriceData[], Error>({
    queryKey: [PRICE_QUERY_KEY, tokenIds.sort().join(',')],
    queryFn: () => fetchPrices(tokenIds),
    staleTime: STALE_TIME,
    refetchInterval: REFETCH_INTERVAL,
    refetchOnWindowFocus: true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

/**
 * Hook for a single token price with React Query
 */
export function usePrice(id: string) {
  const { data, ...rest } = usePrices([id]);

  return {
    ...rest,
    data: data?.[0],
  };
}

/**
 * Hook for real-time price updates via Binance WebSocket
 * Returns live price data that updates in real-time
 */
export function useLivePrice(symbol: string) {
  const [price, setPrice] = useState<BinanceTickerData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const queryClient = useQueryClient();
  const cleanupRef = useRef<(() => void) | null>(null);

  const handlePriceUpdate = useCallback(
    (data: BinanceTickerData) => {
      setPrice(data);
      setIsConnected(true);
      setError(null);

      // Also update the React Query cache for consistency
      queryClient.setQueryData<PriceData[]>(
        [PRICE_QUERY_KEY],
        (oldData) => {
          if (!oldData) return oldData;

          return oldData.map((p) => {
            if (toBinanceSymbol(p.symbol) === data.symbol) {
              return {
                ...p,
                price: data.price,
                change24h: data.change24h,
                volume24h: data.volume24h,
              };
            }
            return p;
          });
        }
      );
    },
    [queryClient]
  );

  useEffect(() => {
    if (!symbol) return;

    const binanceSymbol = toBinanceSymbol(symbol);

    try {
      cleanupRef.current = subscribeToPrices(binanceSymbol, handlePriceUpdate);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('WebSocket error'));
      setIsConnected(false);
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [symbol, handlePriceUpdate]);

  return {
    price,
    isConnected,
    error,
  };
}

/**
 * Hook for multiple live prices via Binance WebSocket
 */
export function useLivePrices(symbols: string[]) {
  const [prices, setPrices] = useState<Map<string, BinanceTickerData>>(
    new Map()
  );
  const [isConnected, setIsConnected] = useState(false);
  const cleanupsRef = useRef<Map<string, () => void>>(new Map());

  useEffect(() => {
    if (symbols.length === 0) return;

    const newPrices = new Map<string, BinanceTickerData>();

    symbols.forEach((symbol) => {
      const binanceSymbol = toBinanceSymbol(symbol);

      const cleanup = subscribeToPrices(binanceSymbol, (data) => {
        setPrices((prev) => {
          const updated = new Map(prev);
          updated.set(binanceSymbol, data);
          return updated;
        });
        setIsConnected(true);
      });

      cleanupsRef.current.set(binanceSymbol, cleanup);
    });

    return () => {
      cleanupsRef.current.forEach((cleanup) => cleanup());
      cleanupsRef.current.clear();
    };
  }, [symbols.join(',')]);

  return {
    prices,
    isConnected,
  };
}

/**
 * Prefetch prices for SSR or initial load
 */
export function prefetchPrices(
  queryClient: ReturnType<typeof useQueryClient>,
  ids?: string[]
) {
  const tokenIds = ids ?? TOP_TOKENS.map((t) => t.id);

  return queryClient.prefetchQuery({
    queryKey: [PRICE_QUERY_KEY, tokenIds.sort().join(',')],
    queryFn: () => fetchPrices(tokenIds),
    staleTime: STALE_TIME,
  });
}
