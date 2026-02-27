// Swap service — Jupiter (Solana) and Minswap (Cardano) quote fetching

export interface SwapQuote {
  inputMint: string;
  outputMint: string;
  inputAmount: string;
  outputAmount: string;
  outputAmountUi: number;
  priceImpactPct: number;
  platformFeeBps: number;
  routePlan: RouteLeg[];
  slippageBps: number;
  provider: 'jupiter' | 'minswap';
}

export interface RouteLeg {
  ammKey: string;
  label: string;
  inputMint: string;
  outputMint: string;
  feeAmount: string;
  feeMint: string;
  percent: number;
}

// Well-known Solana token mints
export const SOLANA_TOKENS: Record<string, { symbol: string; name: string; decimals: number; mint: string }> = {
  SOL: {
    symbol: 'SOL',
    name: 'Solana',
    decimals: 9,
    mint: 'So11111111111111111111111111111111111111112',
  },
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  },
  USDT: {
    symbol: 'USDT',
    name: 'Tether',
    decimals: 6,
    mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
  },
  JUP: {
    symbol: 'JUP',
    name: 'Jupiter',
    decimals: 6,
    mint: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
  },
  BONK: {
    symbol: 'BONK',
    name: 'Bonk',
    decimals: 5,
    mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
  },
  RAY: {
    symbol: 'RAY',
    name: 'Raydium',
    decimals: 6,
    mint: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
  },
};

// Well-known Cardano tokens (policy ID + asset name hex)
export const CARDANO_TOKENS: Record<string, { symbol: string; name: string; decimals: number; unit: string }> = {
  ADA: {
    symbol: 'ADA',
    name: 'Cardano',
    decimals: 6,
    unit: 'lovelace',
  },
  MIN: {
    symbol: 'MIN',
    name: 'Minswap',
    decimals: 6,
    unit: '29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c64d494e',
  },
  SNEK: {
    symbol: 'SNEK',
    name: 'Snek',
    decimals: 0,
    unit: '279c909f348e533da5808898f87f9a14bb2c3dfbbacccd631d927a3f534e454b',
  },
};

const JUPITER_QUOTE_URL = 'https://api.jup.ag/swap/v1/quote';

/**
 * Fetch a swap quote from Jupiter (Solana DEX aggregator)
 */
export async function getJupiterQuote(
  inputMint: string,
  outputMint: string,
  amount: string,
  slippageBps: number
): Promise<SwapQuote> {
  const feeBps = parseInt(process.env.NEXT_PUBLIC_SWAP_FEE_BPS || '0', 10);

  const params = new URLSearchParams({
    inputMint,
    outputMint,
    amount,
    slippageBps: String(slippageBps),
    ...(feeBps > 0 ? { platformFeeBps: String(feeBps) } : {}),
  });

  const response = await fetch(`${JUPITER_QUOTE_URL}?${params}`);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Jupiter quote error: ${response.status} — ${text}`);
  }

  const data = await response.json();

  const routePlan: RouteLeg[] = (data.routePlan ?? []).map((leg: any) => ({
    ammKey: leg.swapInfo?.ammKey ?? '',
    label: leg.swapInfo?.label ?? 'Unknown',
    inputMint: leg.swapInfo?.inputMint ?? '',
    outputMint: leg.swapInfo?.outputMint ?? '',
    feeAmount: leg.swapInfo?.feeAmount ?? '0',
    feeMint: leg.swapInfo?.feeMint ?? '',
    percent: leg.percent ?? 100,
  }));

  return {
    inputMint: data.inputMint,
    outputMint: data.outputMint,
    inputAmount: data.inAmount,
    outputAmount: data.outAmount,
    outputAmountUi: parseFloat(data.outAmount) / Math.pow(10, getDecimalsForMint(data.outputMint)),
    priceImpactPct: parseFloat(data.priceImpactPct ?? '0'),
    platformFeeBps: feeBps,
    routePlan,
    slippageBps,
    provider: 'jupiter',
  };
}

/**
 * Minswap quote placeholder for Cardano swaps.
 * Minswap does not expose a simple REST quote API — a full integration requires
 * their SDK and on-chain order construction. This placeholder returns a
 * structured error so the UI can display a "coming soon" state.
 */
export async function getMinswapQuote(
  inputUnit: string,
  outputUnit: string,
  amount: string,
  slippageBps: number
): Promise<SwapQuote> {
  // Placeholder: Minswap integration requires their SDK for on-chain order construction.
  // Return a mock quote structure so the UI can render a "coming soon" state.
  return {
    inputMint: inputUnit,
    outputMint: outputUnit,
    inputAmount: amount,
    outputAmount: '0',
    outputAmountUi: 0,
    priceImpactPct: 0,
    platformFeeBps: 0,
    routePlan: [],
    slippageBps,
    provider: 'minswap',
  };
}

function getDecimalsForMint(mint: string): number {
  const token = Object.values(SOLANA_TOKENS).find((t) => t.mint === mint);
  return token?.decimals ?? 6;
}
