import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useWallet } from './useWallet';
import { usePrices } from './usePrices';
import {
  fetchAllBalances,
  fetchAllTransactions,
  type BalanceInfo,
  type TransactionInfo,
} from '../../services/terminal/portfolio';
import type { ChainId, PriceData } from '../../types/terminal';

// ── Types ────────────────────────────────────────────────────────────────────

export interface HoldingData {
  token: string;
  chain: ChainId;
  amount: number;
  valueUsd: number;
  change24h: number;
  price: number;
}

export interface PortfolioSnapshot {
  holdings: HoldingData[];
  totalValue: number;
  change24h: number;
  change24hPercent: number;
  transactions: TransactionInfo[];
  isLoading: boolean;
  error: string | null;
}

// ── Token symbol → price ID mapping ─────────────────────────────────────────

const TOKEN_PRICE_MAP: Record<string, string> = {
  BTC: 'btc',
  ETH: 'eth',
  SOL: 'sol',
  ADA: 'ada',
  MATIC: 'matic',
  USDC: 'usdc',
  USDT: 'usdt',
  DOT: 'dot',
  AVAX: 'avax',
  BNB: 'bnb',
};

function findPrice(prices: PriceData[] | undefined, symbol: string): PriceData | undefined {
  if (!prices) return undefined;
  const id = TOKEN_PRICE_MAP[symbol];
  if (!id) return undefined;
  return prices.find((p) => p.id === id);
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function usePortfolio(): PortfolioSnapshot {
  const { connected, addresses } = useWallet();

  // Fetch balances from all chains
  const {
    data: balances,
    isLoading: balancesLoading,
    error: balancesError,
  } = useQuery<BalanceInfo[], Error>({
    queryKey: ['portfolio-balances', addresses.cardano, addresses.solana, addresses.evm],
    queryFn: () => fetchAllBalances(addresses),
    enabled: connected && Object.keys(addresses).length > 0,
    staleTime: 60_000,
    refetchInterval: 60_000,
    retry: 2,
  });

  // Fetch recent transactions
  const {
    data: transactions,
    isLoading: txLoading,
  } = useQuery<TransactionInfo[], Error>({
    queryKey: ['portfolio-transactions', addresses.cardano, addresses.solana],
    queryFn: () => fetchAllTransactions(addresses),
    enabled: connected && Object.keys(addresses).length > 0,
    staleTime: 120_000,
    refetchInterval: 120_000,
    retry: 1,
  });

  // Get price IDs from balances
  const priceIds = useMemo(() => {
    if (!balances) return [];
    return balances
      .map((b) => TOKEN_PRICE_MAP[b.token])
      .filter(Boolean) as string[];
  }, [balances]);

  const { data: prices, isLoading: pricesLoading } = usePrices(
    priceIds.length > 0 ? priceIds : undefined
  );

  // Build holdings with USD values
  const holdings = useMemo((): HoldingData[] => {
    if (!balances) return [];

    return balances
      .map((b) => {
        const priceData = findPrice(prices, b.token);
        const price = priceData?.price ?? 0;
        const valueUsd = b.amount * price;
        const change24h = priceData?.change24h ?? 0;

        return {
          token: b.token,
          chain: b.chain,
          amount: b.amount,
          valueUsd,
          change24h,
          price,
        };
      })
      .sort((a, b) => b.valueUsd - a.valueUsd);
  }, [balances, prices]);

  // Compute totals
  const totalValue = useMemo(
    () => holdings.reduce((sum, h) => sum + h.valueUsd, 0),
    [holdings]
  );

  const change24h = useMemo(() => {
    if (totalValue === 0) return 0;
    // Weighted average of 24h change
    return holdings.reduce((sum, h) => {
      const weight = h.valueUsd / totalValue;
      return sum + h.change24h * weight;
    }, 0);
  }, [holdings, totalValue]);

  const change24hAbs = useMemo(
    () => totalValue * (change24h / 100),
    [totalValue, change24h]
  );

  const isLoading = balancesLoading || pricesLoading || txLoading;
  const error = balancesError?.message ?? null;

  return {
    holdings,
    totalValue,
    change24h,
    change24hPercent: change24h,
    transactions: transactions ?? [],
    isLoading,
    error,
  };
}
