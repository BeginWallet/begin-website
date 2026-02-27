import { create } from 'zustand';

const STORAGE_KEY = 'begin-wallet-connected';

type Chain = 'cardano' | 'solana' | 'evm';

interface WalletAddresses {
  cardano?: string;
  solana?: string;
  evm?: string;
}

interface WalletState {
  connected: boolean;
  connecting: boolean;
  addresses: WalletAddresses;
  error: string | null;
  beginDetected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  checkBeginDetected: () => boolean;
}

function detectBegin(): { cardano: boolean; solana: boolean } {
  if (typeof window === 'undefined') return { cardano: false, solana: false };
  return {
    cardano: !!(window as any).cardano?.begin,
    solana: !!(window as any).begin?.solana,
  };
}

function isBeginInstalled(): boolean {
  const { cardano, solana } = detectBegin();
  return cardano || solana;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  connected: false,
  connecting: false,
  addresses: {},
  error: null,
  beginDetected: typeof window !== 'undefined' ? isBeginInstalled() : false,

  checkBeginDetected: () => {
    const detected = isBeginInstalled();
    set({ beginDetected: detected });
    return detected;
  },

  connectWallet: async () => {
    if (get().connecting) return;
    set({ connecting: true, error: null });

    try {
      const detected = detectBegin();
      if (!detected.cardano && !detected.solana) {
        set({ connecting: false, error: 'Begin wallet not detected' });
        return;
      }

      const addresses: WalletAddresses = {};

      // Connect Cardano via CIP-30
      if (detected.cardano) {
        try {
          const api = await (window as any).cardano.begin.enable();
          const usedAddresses: string[] = await api.getUsedAddresses();
          const unusedAddresses: string[] = await api.getUnusedAddresses();
          const addr = usedAddresses[0] || unusedAddresses[0];
          if (addr) addresses.cardano = addr;
        } catch (e) {
          console.warn('Cardano connection failed:', e);
        }
      }

      // Connect Solana
      if (detected.solana) {
        try {
          const solProvider = (window as any).begin.solana;
          const resp = await solProvider.connect();
          if (resp?.publicKey) {
            addresses.solana = resp.publicKey.toString();
          }
        } catch (e) {
          console.warn('Solana connection failed:', e);
        }
      }

      if (!addresses.cardano && !addresses.solana) {
        set({ connecting: false, error: 'Connection rejected or no addresses found' });
        return;
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, 'true');
      }

      set({ connected: true, connecting: false, addresses, error: null });
    } catch (err: any) {
      set({
        connecting: false,
        error: err?.message || 'Failed to connect wallet',
      });
    }
  },

  disconnectWallet: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    set({ connected: false, connecting: false, addresses: {}, error: null });
  },
}));

// Auto-reconnect on mount (call from a useEffect in your app)
export function initWalletAutoReconnect() {
  if (typeof window === 'undefined') return;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'true' && isBeginInstalled()) {
    useWalletStore.getState().connectWallet();
  } else {
    // Update detection state after page load
    useWalletStore.getState().checkBeginDetected();
  }
}

// Convenience hook (re-exports the store)
export const useWallet = useWalletStore;
