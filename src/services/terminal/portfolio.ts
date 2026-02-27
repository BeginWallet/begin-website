import type { ChainId } from '../../types/terminal';

// ── Types ────────────────────────────────────────────────────────────────────

export interface BalanceInfo {
  token: string;
  chain: ChainId;
  amount: number;
}

export interface TransactionInfo {
  id: string;
  type: 'send' | 'receive' | 'swap' | 'stake';
  amount: number;
  token: string;
  chain: ChainId;
  timestamp: number;
  txHash: string;
}

// ── Explorer URLs ────────────────────────────────────────────────────────────

const EXPLORER_TX: Record<string, string> = {
  cardano: 'https://cardanoscan.io/transaction/',
  solana: 'https://solscan.io/tx/',
  bitcoin: 'https://blockstream.info/tx/',
  ethereum: 'https://etherscan.io/tx/',
  polygon: 'https://polygonscan.com/tx/',
  base: 'https://basescan.org/tx/',
  arbitrum: 'https://arbiscan.io/tx/',
};

export function getTxExplorerUrl(chain: ChainId, txHash: string): string {
  const base = EXPLORER_TX[chain] ?? EXPLORER_TX.ethereum;
  return `${base}${txHash}`;
}

// ── Cardano via Blockfrost ───────────────────────────────────────────────────

const BLOCKFROST_URL = 'https://cardano-mainnet.blockfrost.io/api/v0';
const BLOCKFROST_KEY = process.env.NEXT_PUBLIC_BLOCKFROST_KEY ?? '';

async function fetchCardanoBalance(address: string): Promise<BalanceInfo[]> {
  if (!address || !BLOCKFROST_KEY) return [];

  try {
    const resp = await fetch(`${BLOCKFROST_URL}/addresses/${address}`, {
      headers: { project_id: BLOCKFROST_KEY },
    });
    if (!resp.ok) return [];
    const data = await resp.json();
    const lovelace = parseInt(data.amount?.[0]?.quantity ?? '0', 10);
    return [{ token: 'ADA', chain: 'cardano', amount: lovelace / 1_000_000 }];
  } catch {
    return [];
  }
}

async function fetchCardanoTransactions(address: string): Promise<TransactionInfo[]> {
  if (!address || !BLOCKFROST_KEY) return [];

  try {
    const resp = await fetch(
      `${BLOCKFROST_URL}/addresses/${address}/transactions?count=10&order=desc`,
      { headers: { project_id: BLOCKFROST_KEY } }
    );
    if (!resp.ok) return [];
    const txs: { tx_hash: string; block_time: number }[] = await resp.json();

    return txs.map((tx) => ({
      id: tx.tx_hash.slice(0, 12),
      type: 'receive' as const,
      amount: 0,
      token: 'ADA',
      chain: 'cardano' as ChainId,
      timestamp: tx.block_time * 1000,
      txHash: tx.tx_hash,
    }));
  } catch {
    return [];
  }
}

// ── Solana via RPC ───────────────────────────────────────────────────────────

const SOLANA_RPC = 'https://api.mainnet-beta.solana.com';

async function fetchSolanaBalance(address: string): Promise<BalanceInfo[]> {
  if (!address) return [];

  try {
    const resp = await fetch(SOLANA_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getBalance',
        params: [address],
      }),
    });
    if (!resp.ok) return [];
    const data = await resp.json();
    const lamports = data.result?.value ?? 0;
    return [{ token: 'SOL', chain: 'solana', amount: lamports / 1_000_000_000 }];
  } catch {
    return [];
  }
}

async function fetchSolanaTransactions(address: string): Promise<TransactionInfo[]> {
  if (!address) return [];

  try {
    const resp = await fetch(SOLANA_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getSignaturesForAddress',
        params: [address, { limit: 10 }],
      }),
    });
    if (!resp.ok) return [];
    const data = await resp.json();
    const sigs: { signature: string; blockTime: number | null }[] =
      data.result ?? [];

    return sigs.map((sig) => ({
      id: sig.signature.slice(0, 12),
      type: 'receive' as const,
      amount: 0,
      token: 'SOL',
      chain: 'solana' as ChainId,
      timestamp: (sig.blockTime ?? 0) * 1000,
      txHash: sig.signature,
    }));
  } catch {
    return [];
  }
}

// ── Bitcoin via Blockstream ──────────────────────────────────────────────────

const BLOCKSTREAM_URL = 'https://blockstream.info/api';

async function fetchBtcBalance(address: string): Promise<BalanceInfo[]> {
  if (!address) return [];

  try {
    const resp = await fetch(`${BLOCKSTREAM_URL}/address/${address}`);
    if (!resp.ok) return [];
    const data = await resp.json();
    const funded = data.chain_stats?.funded_txo_sum ?? 0;
    const spent = data.chain_stats?.spent_txo_sum ?? 0;
    return [{ token: 'BTC', chain: 'bitcoin', amount: (funded - spent) / 1e8 }];
  } catch {
    return [];
  }
}

async function fetchBtcTransactions(address: string): Promise<TransactionInfo[]> {
  if (!address) return [];

  try {
    const resp = await fetch(`${BLOCKSTREAM_URL}/address/${address}/txs`);
    if (!resp.ok) return [];
    const txs: { txid: string; status: { block_time?: number } }[] =
      await resp.json();

    return txs.slice(0, 10).map((tx) => ({
      id: tx.txid.slice(0, 12),
      type: 'receive' as const,
      amount: 0,
      token: 'BTC',
      chain: 'bitcoin' as ChainId,
      timestamp: (tx.status.block_time ?? 0) * 1000,
      txHash: tx.txid,
    }));
  } catch {
    return [];
  }
}

// ── EVM via JSON-RPC ─────────────────────────────────────────────────────────

const EVM_RPCS: Partial<Record<ChainId, string>> = {
  ethereum: 'https://eth.llamarpc.com',
  polygon: 'https://polygon-rpc.com',
  base: 'https://mainnet.base.org',
  arbitrum: 'https://arb1.arbitrum.io/rpc',
};

async function fetchEvmBalance(
  address: string,
  chain: ChainId,
  rpcUrl: string
): Promise<BalanceInfo[]> {
  if (!address) return [];

  const tokenMap: Record<string, string> = {
    ethereum: 'ETH',
    polygon: 'MATIC',
    base: 'ETH',
    arbitrum: 'ETH',
  };

  try {
    const resp = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_getBalance',
        params: [address, 'latest'],
      }),
    });
    if (!resp.ok) return [];
    const data = await resp.json();
    const wei = parseInt(data.result ?? '0x0', 16);
    return [{ token: tokenMap[chain] ?? 'ETH', chain, amount: wei / 1e18 }];
  } catch {
    return [];
  }
}

// ── Aggregators ──────────────────────────────────────────────────────────────

export interface WalletAddresses {
  cardano?: string;
  solana?: string;
  evm?: string;
}

export async function fetchAllBalances(
  addresses: WalletAddresses
): Promise<BalanceInfo[]> {
  const tasks: Promise<BalanceInfo[]>[] = [];

  if (addresses.cardano) {
    tasks.push(fetchCardanoBalance(addresses.cardano));
  }
  if (addresses.solana) {
    tasks.push(fetchSolanaBalance(addresses.solana));
  }
  if (addresses.evm) {
    for (const [chain, rpc] of Object.entries(EVM_RPCS)) {
      tasks.push(fetchEvmBalance(addresses.evm, chain as ChainId, rpc));
    }
  }

  const results = await Promise.allSettled(tasks);
  return results
    .filter((r): r is PromiseFulfilledResult<BalanceInfo[]> => r.status === 'fulfilled')
    .flatMap((r) => r.value)
    .filter((b) => b.amount > 0);
}

export async function fetchAllTransactions(
  addresses: WalletAddresses
): Promise<TransactionInfo[]> {
  const tasks: Promise<TransactionInfo[]>[] = [];

  if (addresses.cardano) {
    tasks.push(fetchCardanoTransactions(addresses.cardano));
  }
  if (addresses.solana) {
    tasks.push(fetchSolanaTransactions(addresses.solana));
  }
  // BTC: only if we had a BTC address (not currently in wallet)
  // EVM: most RPCs don't support tx listing; would need Etherscan API

  const results = await Promise.allSettled(tasks);
  const all = results
    .filter((r): r is PromiseFulfilledResult<TransactionInfo[]> => r.status === 'fulfilled')
    .flatMap((r) => r.value);

  return all.sort((a, b) => b.timestamp - a.timestamp).slice(0, 20);
}
