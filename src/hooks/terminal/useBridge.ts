import { useState, useEffect, useRef, useCallback } from 'react';
import {
  getRate,
  createOrder,
  updateOrder,
  getOrder,
  BRIDGE_ASSETS,
  type BridgeAsset,
  type BridgeRate,
  type BridgeOrder,
  type OrderStatus,
} from '../../services/terminal/bridge';
import { useWallet } from './useWallet';

export type BridgeStep = 'quote' | 'deposit' | 'status';

interface BridgeState {
  fromAsset: BridgeAsset;
  toAsset: BridgeAsset;
  amount: string;
  rate: BridgeRate | null;
  rateLoading: boolean;
  rateError: string | null;
  order: BridgeOrder | null;
  orderLoading: boolean;
  orderError: string | null;
  step: BridgeStep;
}

const DEBOUNCE_MS = 600;
const POLL_INTERVAL_MS = 5000;

const ASSET_LIST = Object.keys(BRIDGE_ASSETS) as BridgeAsset[];

function makePair(from: BridgeAsset, to: BridgeAsset): string {
  return `${from}_${to}`;
}

export function useBridge() {
  const { connected, addresses } = useWallet();

  const [state, setState] = useState<BridgeState>({
    fromAsset: 'BTC',
    toAsset: 'SOL',
    amount: '',
    rate: null,
    rateLoading: false,
    rateError: null,
    order: null,
    orderLoading: false,
    orderError: null,
    step: 'quote',
  });

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Available destination assets (exclude source)
  const fromAssets = ASSET_LIST;
  const toAssets = ASSET_LIST.filter((a) => a !== state.fromAsset);

  // Fetch rate with debounce
  const fetchRate = useCallback(async () => {
    const { fromAsset, toAsset, amount } = state;
    const numAmount = parseFloat(amount);

    if (!amount || numAmount <= 0) {
      setState((s) => ({ ...s, rate: null, rateError: null, rateLoading: false }));
      return;
    }

    setState((s) => ({ ...s, rateLoading: true, rateError: null }));

    try {
      const pair = makePair(fromAsset, toAsset);
      const result = await getRate(pair, numAmount);
      setState((s) => ({ ...s, rate: result, rateLoading: false, rateError: null }));
    } catch (err: any) {
      setState((s) => ({
        ...s,
        rate: null,
        rateLoading: false,
        rateError: err?.message || 'Failed to fetch rate',
      }));
    }
  }, [state.fromAsset, state.toAsset, state.amount]);

  // Debounced rate fetching
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!state.amount || parseFloat(state.amount) <= 0) {
      setState((s) => ({ ...s, rate: null, rateError: null, rateLoading: false }));
      return;
    }

    setState((s) => ({ ...s, rateLoading: true }));
    debounceRef.current = setTimeout(fetchRate, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [fetchRate]);

  // Poll order status
  useEffect(() => {
    if (!state.order || state.step !== 'status') return;

    const terminalStatuses: OrderStatus[] = ['complete', 'failed', 'refunded'];
    if (terminalStatuses.includes(state.order.status)) return;

    pollRef.current = setInterval(async () => {
      try {
        const updated = await getOrder(state.order!.orderId);
        setState((s) => ({ ...s, order: updated }));

        if (terminalStatuses.includes(updated.status)) {
          if (pollRef.current) clearInterval(pollRef.current);
        }
      } catch {
        // Silently retry on next interval
      }
    }, POLL_INTERVAL_MS);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [state.order?.orderId, state.step, state.order?.status]);

  const setFromAsset = useCallback((asset: BridgeAsset) => {
    setState((s) => ({
      ...s,
      fromAsset: asset,
      toAsset: asset === s.toAsset ? s.fromAsset : s.toAsset,
      rate: null,
      rateError: null,
    }));
  }, []);

  const setToAsset = useCallback((asset: BridgeAsset) => {
    setState((s) => ({
      ...s,
      toAsset: asset,
      rate: null,
      rateError: null,
    }));
  }, []);

  const setAmount = useCallback((amount: string) => {
    if (amount !== '' && !/^\d*\.?\d*$/.test(amount)) return;
    setState((s) => ({ ...s, amount }));
  }, []);

  const flipAssets = useCallback(() => {
    setState((s) => ({
      ...s,
      fromAsset: s.toAsset,
      toAsset: s.fromAsset,
      amount: '',
      rate: null,
      rateError: null,
    }));
  }, []);

  const executeBridge = useCallback(async () => {
    if (!connected || !state.rate) return;

    const { fromAsset, toAsset, amount, rate } = state;
    const numAmount = parseFloat(amount);

    // Determine addresses based on chain
    const chainMap: Record<string, string | undefined> = {
      cardano: addresses.cardano,
      solana: addresses.solana,
      ethereum: addresses.evm,
      polygon: addresses.evm,
      bnb: addresses.evm,
      avalanche: addresses.evm,
      bitcoin: undefined, // User would need to supply
    };

    const fromChain = BRIDGE_ASSETS[fromAsset].chain;
    const toChain = BRIDGE_ASSETS[toAsset].chain;
    const fromAddr = chainMap[fromChain] || '';
    const toAddr = chainMap[toChain] || '';

    if (!toAddr) {
      setState((s) => ({ ...s, orderError: `No ${BRIDGE_ASSETS[toAsset].name} address found. Connect wallet.` }));
      return;
    }

    setState((s) => ({ ...s, orderLoading: true, orderError: null }));

    try {
      const pair = makePair(fromAsset, toAsset);
      const toAmount = numAmount * rate.rate;
      const order = await createOrder(pair, fromAddr, toAddr, numAmount, toAmount);

      setState((s) => ({
        ...s,
        order,
        orderLoading: false,
        orderError: null,
        step: 'deposit',
      }));
    } catch (err: any) {
      setState((s) => ({
        ...s,
        orderLoading: false,
        orderError: err?.message || 'Failed to create order',
      }));
    }
  }, [connected, state.rate, state.fromAsset, state.toAsset, state.amount, addresses]);

  const confirmDeposit = useCallback(async (txId: string) => {
    if (!state.order) return;

    setState((s) => ({ ...s, orderLoading: true, orderError: null }));

    try {
      const updated = await updateOrder(state.order.orderId, txId);
      setState((s) => ({
        ...s,
        order: updated,
        orderLoading: false,
        step: 'status',
      }));
    } catch (err: any) {
      setState((s) => ({
        ...s,
        orderLoading: false,
        orderError: err?.message || 'Failed to update order',
      }));
    }
  }, [state.order]);

  const resetBridge = useCallback(() => {
    if (pollRef.current) clearInterval(pollRef.current);
    setState((s) => ({
      ...s,
      amount: '',
      rate: null,
      rateError: null,
      order: null,
      orderLoading: false,
      orderError: null,
      step: 'quote',
    }));
  }, []);

  return {
    ...state,
    fromAssets,
    toAssets,
    connected,
    setFromAsset,
    setToAsset,
    setAmount,
    flipAssets,
    executeBridge,
    confirmDeposit,
    resetBridge,
  };
}
