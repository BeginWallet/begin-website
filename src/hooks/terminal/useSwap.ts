import { useState, useEffect, useRef, useCallback } from 'react';
import {
  getJupiterQuote,
  getMinswapQuote,
  SOLANA_TOKENS,
  CARDANO_TOKENS,
  type SwapQuote,
} from '../../services/terminal/swap';
import { useWallet } from './useWallet';

type SwapChain = 'solana' | 'cardano';

export interface SwapToken {
  symbol: string;
  name: string;
  decimals: number;
  id: string; // mint (solana) or unit (cardano)
}

interface SwapState {
  chain: SwapChain;
  inputToken: SwapToken | null;
  outputToken: SwapToken | null;
  inputAmount: string;
  slippageBps: number;
  quote: SwapQuote | null;
  quoteLoading: boolean;
  quoteError: string | null;
  executing: boolean;
  executeError: string | null;
}

const DEBOUNCE_MS = 500;

function getTokenList(chain: SwapChain): SwapToken[] {
  if (chain === 'solana') {
    return Object.values(SOLANA_TOKENS).map((t) => ({
      symbol: t.symbol,
      name: t.name,
      decimals: t.decimals,
      id: t.mint,
    }));
  }
  return Object.values(CARDANO_TOKENS).map((t) => ({
    symbol: t.symbol,
    name: t.name,
    decimals: t.decimals,
    id: t.unit,
  }));
}

export function useSwap() {
  const { connected, addresses } = useWallet();

  const [state, setState] = useState<SwapState>(() => {
    const solTokens = getTokenList('solana');
    return {
      chain: 'solana',
      inputToken: solTokens[0] ?? null, // SOL
      outputToken: solTokens[1] ?? null, // USDC
      inputAmount: '',
      slippageBps: 50, // 0.5%
      quote: null,
      quoteLoading: false,
      quoteError: null,
      executing: false,
      executeError: null,
    };
  });

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const tokens = getTokenList(state.chain);

  // Fetch quote with debounce
  const fetchQuote = useCallback(async () => {
    const { inputToken, outputToken, inputAmount, slippageBps, chain } = state;

    if (!inputToken || !outputToken || !inputAmount || parseFloat(inputAmount) <= 0) {
      setState((s) => ({ ...s, quote: null, quoteError: null, quoteLoading: false }));
      return;
    }

    // Convert UI amount to raw amount
    const rawAmount = String(Math.floor(parseFloat(inputAmount) * Math.pow(10, inputToken.decimals)));

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState((s) => ({ ...s, quoteLoading: true, quoteError: null }));

    try {
      let quote: SwapQuote;
      if (chain === 'solana') {
        quote = await getJupiterQuote(inputToken.id, outputToken.id, rawAmount, slippageBps);
      } else {
        quote = await getMinswapQuote(inputToken.id, outputToken.id, rawAmount, slippageBps);
      }

      if (controller.signal.aborted) return;

      setState((s) => ({ ...s, quote, quoteLoading: false, quoteError: null }));
    } catch (err: any) {
      if (controller.signal.aborted) return;
      setState((s) => ({
        ...s,
        quote: null,
        quoteLoading: false,
        quoteError: err?.message || 'Failed to fetch quote',
      }));
    }
  }, [state.inputToken, state.outputToken, state.inputAmount, state.slippageBps, state.chain]);

  // Debounced quote fetching on input changes
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!state.inputAmount || parseFloat(state.inputAmount) <= 0) {
      setState((s) => ({ ...s, quote: null, quoteError: null, quoteLoading: false }));
      return;
    }

    setState((s) => ({ ...s, quoteLoading: true }));
    debounceRef.current = setTimeout(fetchQuote, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [fetchQuote]);

  const setChain = useCallback((chain: SwapChain) => {
    const list = getTokenList(chain);
    setState((s) => ({
      ...s,
      chain,
      inputToken: list[0] ?? null,
      outputToken: list[1] ?? null,
      inputAmount: '',
      quote: null,
      quoteError: null,
    }));
  }, []);

  const setInputToken = useCallback((token: SwapToken) => {
    setState((s) => {
      // If selecting same as output, swap them
      if (s.outputToken && token.id === s.outputToken.id) {
        return { ...s, inputToken: token, outputToken: s.inputToken, quote: null };
      }
      return { ...s, inputToken: token, quote: null };
    });
  }, []);

  const setOutputToken = useCallback((token: SwapToken) => {
    setState((s) => {
      if (s.inputToken && token.id === s.inputToken.id) {
        return { ...s, outputToken: token, inputToken: s.outputToken, quote: null };
      }
      return { ...s, outputToken: token, quote: null };
    });
  }, []);

  const setInputAmount = useCallback((amount: string) => {
    // Allow empty, or valid decimal numbers
    if (amount !== '' && !/^\d*\.?\d*$/.test(amount)) return;
    setState((s) => ({ ...s, inputAmount: amount }));
  }, []);

  const setSlippageBps = useCallback((bps: number) => {
    setState((s) => ({ ...s, slippageBps: bps, quote: null }));
  }, []);

  const flipTokens = useCallback(() => {
    setState((s) => ({
      ...s,
      inputToken: s.outputToken,
      outputToken: s.inputToken,
      inputAmount: '',
      quote: null,
    }));
  }, []);

  const executeSwap = useCallback(async () => {
    if (!connected || !state.quote) return;

    setState((s) => ({ ...s, executing: true, executeError: null }));

    try {
      // Swap execution requires transaction signing via wallet provider.
      // This is a placeholder — full execution would POST to Jupiter /swap
      // and sign with the connected wallet.
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error('Swap execution not yet implemented — connect wallet and sign transactions');
    } catch (err: any) {
      setState((s) => ({
        ...s,
        executing: false,
        executeError: err?.message || 'Swap failed',
      }));
    }
  }, [connected, state.quote]);

  return {
    ...state,
    tokens,
    connected,
    walletAddress: state.chain === 'solana' ? addresses.solana : addresses.cardano,
    setChain,
    setInputToken,
    setOutputToken,
    setInputAmount,
    setSlippageBps,
    flipTokens,
    executeSwap,
  };
}
