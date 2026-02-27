import { useQuery } from '@tanstack/react-query';
import {
  fetchTokenDetail,
  resolveCoingeckoId,
  type TokenDetail,
} from '../../services/terminal/token';

const TOKEN_DETAIL_KEY = 'terminal-token-detail';
const STALE_TIME = 60 * 1000; // 1 minute
const REFETCH_INTERVAL = 60 * 1000; // 1 minute

/**
 * Hook to fetch detailed token data from CoinGecko /coins/{id}.
 * Accepts a ticker (BTC, ETH) or CoinGecko ID (bitcoin, ethereum).
 */
export function useTokenOverview(tokenInput: string) {
  const coingeckoId = resolveCoingeckoId(tokenInput);

  return useQuery<TokenDetail, Error>({
    queryKey: [TOKEN_DETAIL_KEY, coingeckoId],
    queryFn: () => fetchTokenDetail(coingeckoId!),
    enabled: !!coingeckoId,
    staleTime: STALE_TIME,
    refetchInterval: REFETCH_INTERVAL,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
  });
}
