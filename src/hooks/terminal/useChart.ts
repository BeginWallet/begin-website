import { useQuery } from '@tanstack/react-query';
import { fetchOHLCV, type Timeframe } from '../../services/terminal/charts';

const CHART_QUERY_KEY = 'terminal-chart';

// Shorter timeframes refresh more frequently
const REFETCH_INTERVALS: Record<Timeframe, number> = {
  '1m': 15_000,
  '5m': 30_000,
  '15m': 60_000,
  '1h': 120_000,
  '4h': 300_000,
  '1D': 600_000,
  '1W': 600_000,
};

/**
 * React Query hook for OHLCV chart data
 */
export function useChart(symbol: string, timeframe: Timeframe) {
  return useQuery({
    queryKey: [CHART_QUERY_KEY, symbol, timeframe],
    queryFn: () => fetchOHLCV(symbol, timeframe),
    staleTime: REFETCH_INTERVALS[timeframe],
    refetchInterval: REFETCH_INTERVALS[timeframe],
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: !!symbol,
  });
}
