import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  fetchMarkets,
  fetchMidPrices,
  fetchOrderBook,
  fetchFundingRates,
  type PerpMarket,
  type OrderBook,
  type FundingRate,
  type PerpPosition,
} from '../../services/terminal/perps';

// ── Types ─────────────────────────────────────────────────────────────

export type OrderSide = 'long' | 'short';
export type OrderType = 'market' | 'limit';

interface PerpsState {
  markets: PerpMarket[];
  selectedCoin: string;
  midPrices: Record<string, number>;
  orderBook: OrderBook | null;
  fundingRates: FundingRate[];
  positions: PerpPosition[];
  side: OrderSide;
  orderType: OrderType;
  leverage: number;
  amount: string;
  limitPrice: string;
  loading: boolean;
  error: string | null;
}

const DEFAULT_COIN = 'BTC';
const POLL_INTERVAL = 5000;

// ── Hook ──────────────────────────────────────────────────────────────

export function usePerps() {
  const [state, setState] = useState<PerpsState>({
    markets: [],
    selectedCoin: DEFAULT_COIN,
    midPrices: {},
    orderBook: null,
    fundingRates: [],
    positions: [],
    side: 'long',
    orderType: 'market',
    leverage: 1,
    amount: '',
    limitPrice: '',
    loading: true,
    error: null,
  });

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mountedRef = useRef(true);

  // ── Fetch all market data ────────────────────────────────────────
  const fetchData = useCallback(async (coin: string) => {
    try {
      const [markets, midPrices, book, funding] = await Promise.all([
        fetchMarkets(),
        fetchMidPrices(),
        fetchOrderBook(coin),
        fetchFundingRates(),
      ]);

      if (!mountedRef.current) return;

      setState((prev) => ({
        ...prev,
        markets,
        midPrices,
        orderBook: book,
        fundingRates: funding,
        loading: false,
        error: null,
      }));
    } catch (err: unknown) {
      if (!mountedRef.current) return;
      const msg = err instanceof Error ? err.message : 'Failed to fetch market data';
      setState((prev) => ({ ...prev, loading: false, error: msg }));
    }
  }, []);

  // ── Initial load + polling ───────────────────────────────────────
  useEffect(() => {
    mountedRef.current = true;
    fetchData(state.selectedCoin);

    pollRef.current = setInterval(() => {
      fetchData(state.selectedCoin);
    }, POLL_INTERVAL);

    return () => {
      mountedRef.current = false;
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [state.selectedCoin, fetchData]);

  // ── Setters ──────────────────────────────────────────────────────
  const setSelectedCoin = useCallback((coin: string) => {
    setState((prev) => ({ ...prev, selectedCoin: coin, orderBook: null, loading: true }));
  }, []);

  const setSide = useCallback((side: OrderSide) => {
    setState((prev) => ({ ...prev, side }));
  }, []);

  const setOrderType = useCallback((orderType: OrderType) => {
    setState((prev) => ({ ...prev, orderType }));
  }, []);

  const setLeverage = useCallback((leverage: number) => {
    setState((prev) => ({ ...prev, leverage: Math.max(1, Math.min(50, leverage)) }));
  }, []);

  const setAmount = useCallback((amount: string) => {
    if (amount === '' || /^\d*\.?\d*$/.test(amount)) {
      setState((prev) => ({ ...prev, amount }));
    }
  }, []);

  const setLimitPrice = useCallback((limitPrice: string) => {
    if (limitPrice === '' || /^\d*\.?\d*$/.test(limitPrice)) {
      setState((prev) => ({ ...prev, limitPrice }));
    }
  }, []);

  // ── Derived data ─────────────────────────────────────────────────
  const currentPrice = state.midPrices[state.selectedCoin] ?? 0;

  const currentFunding = useMemo(() => {
    return state.fundingRates.find((f) => f.coin === state.selectedCoin) ?? null;
  }, [state.fundingRates, state.selectedCoin]);

  const positionSize = useMemo(() => {
    const amt = parseFloat(state.amount);
    if (!amt || !currentPrice) return 0;
    return (amt * state.leverage) / currentPrice;
  }, [state.amount, state.leverage, currentPrice]);

  const notionalValue = useMemo(() => {
    const amt = parseFloat(state.amount);
    if (!amt) return 0;
    return amt * state.leverage;
  }, [state.amount, state.leverage]);

  return {
    ...state,
    currentPrice,
    currentFunding,
    positionSize,
    notionalValue,
    setSelectedCoin,
    setSide,
    setOrderType,
    setLeverage,
    setAmount,
    setLimitPrice,
  };
}
