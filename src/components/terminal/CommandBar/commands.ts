import Router from 'next/router';
import {
  Bitcoin,
  CircleDollarSign,
  Coins,
  Wallet,
  Eye,
  Newspaper,
  ArrowLeftRight,
  Landmark,
  Settings,
  Home,
  BarChart3,
  Bell,
  HelpCircle,
  LucideIcon,
} from 'lucide-react';

export type CommandGroup = 'tokens' | 'commands' | 'navigation';

export interface Command {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  group: CommandGroup;
  action: () => void;
  shortcut?: string;
  chain?: string;
  symbol?: string;
}

// Token commands
const tokenCommands: Command[] = [
  {
    id: 'btc',
    label: 'BTC',
    description: 'Bitcoin',
    icon: Bitcoin,
    group: 'tokens',
    symbol: 'BTC',
    chain: 'Bitcoin',
    action: () => Router.push('/terminal/BTC'),
  },
  {
    id: 'eth',
    label: 'ETH',
    description: 'Ethereum',
    icon: Coins,
    group: 'tokens',
    symbol: 'ETH',
    chain: 'Ethereum',
    action: () => Router.push('/terminal/ETH'),
  },
  {
    id: 'sol',
    label: 'SOL',
    description: 'Solana',
    icon: Coins,
    group: 'tokens',
    symbol: 'SOL',
    chain: 'Solana',
    action: () => Router.push('/terminal/SOL'),
  },
  {
    id: 'ada',
    label: 'ADA',
    description: 'Cardano',
    icon: Coins,
    group: 'tokens',
    symbol: 'ADA',
    chain: 'Cardano',
    action: () => Router.push('/terminal/ADA'),
  },
  {
    id: 'usdc',
    label: 'USDC',
    description: 'USD Coin',
    icon: CircleDollarSign,
    group: 'tokens',
    symbol: 'USDC',
    chain: 'Multi-chain',
    action: () => Router.push('/terminal/USDC'),
  },
  {
    id: 'usdt',
    label: 'USDT',
    description: 'Tether',
    icon: CircleDollarSign,
    group: 'tokens',
    symbol: 'USDT',
    chain: 'Multi-chain',
    action: () => Router.push('/terminal/USDT'),
  },
  {
    id: 'bnb',
    label: 'BNB',
    description: 'BNB Chain',
    icon: Coins,
    group: 'tokens',
    symbol: 'BNB',
    chain: 'BNB Chain',
    action: () => Router.push('/terminal/BNB'),
  },
  {
    id: 'xrp',
    label: 'XRP',
    description: 'Ripple',
    icon: Coins,
    group: 'tokens',
    symbol: 'XRP',
    chain: 'XRP Ledger',
    action: () => Router.push('/terminal/XRP'),
  },
  {
    id: 'doge',
    label: 'DOGE',
    description: 'Dogecoin',
    icon: Coins,
    group: 'tokens',
    symbol: 'DOGE',
    chain: 'Dogecoin',
    action: () => Router.push('/terminal/DOGE'),
  },
  {
    id: 'avax',
    label: 'AVAX',
    description: 'Avalanche',
    icon: Coins,
    group: 'tokens',
    symbol: 'AVAX',
    chain: 'Avalanche',
    action: () => Router.push('/terminal/AVAX'),
  },
];

// Action commands
const actionCommands: Command[] = [
  {
    id: 'portfolio',
    label: 'PORTFOLIO',
    description: 'View your portfolio',
    icon: Wallet,
    group: 'commands',
    shortcut: '⌘P',
    action: () => console.log('Open portfolio'),
  },
  {
    id: 'watchlist',
    label: 'WATCHLIST',
    description: 'Manage watchlist',
    icon: Eye,
    group: 'commands',
    shortcut: '⌘W',
    action: () => console.log('Open watchlist'),
  },
  {
    id: 'news',
    label: 'NEWS',
    description: 'Latest crypto news',
    icon: Newspaper,
    group: 'commands',
    shortcut: '⌘N',
    action: () => console.log('Open news'),
  },
  {
    id: 'swap',
    label: 'SWAP',
    description: 'Swap tokens',
    icon: ArrowLeftRight,
    group: 'commands',
    shortcut: '⌘S',
    action: () => console.log('Open swap'),
  },
  {
    id: 'bridge',
    label: 'BRIDGE',
    description: 'Bridge assets cross-chain',
    icon: ArrowLeftRight,
    group: 'commands',
    shortcut: '⌘B',
    action: () => console.log('Open bridge'),
  },
  {
    id: 'stake',
    label: 'STAKE',
    description: 'Stake your assets',
    icon: Landmark,
    group: 'commands',
    action: () => console.log('Open stake'),
  },
  {
    id: 'settings',
    label: 'SETTINGS',
    description: 'Terminal settings',
    icon: Settings,
    group: 'commands',
    shortcut: '⌘,',
    action: () => console.log('Open settings'),
  },
];

// Navigation commands
const navigationCommands: Command[] = [
  {
    id: 'home',
    label: 'HOME',
    description: 'Go to home',
    icon: Home,
    group: 'navigation',
    action: () => console.log('Navigate home'),
  },
  {
    id: 'markets',
    label: 'MARKETS',
    description: 'View all markets',
    icon: BarChart3,
    group: 'navigation',
    action: () => console.log('Navigate to markets'),
  },
  {
    id: 'alerts',
    label: 'ALERTS',
    description: 'Price alerts',
    icon: Bell,
    group: 'navigation',
    action: () => console.log('Navigate to alerts'),
  },
  {
    id: 'help',
    label: 'HELP',
    description: 'Help & documentation',
    icon: HelpCircle,
    group: 'navigation',
    shortcut: '?',
    action: () => console.log('Open help'),
  },
];

// All commands combined
export const commands: Command[] = [
  ...tokenCommands,
  ...actionCommands,
  ...navigationCommands,
];

// Get commands by group
export const getCommandsByGroup = (group: CommandGroup): Command[] => {
  return commands.filter((cmd) => cmd.group === group);
};

// Fuzzy search function
export const searchCommands = (query: string): Command[] => {
  if (!query.trim()) {
    return commands;
  }

  const normalizedQuery = query.toLowerCase().trim();

  return commands
    .map((cmd) => {
      let score = 0;

      const label = cmd.label.toLowerCase();
      const description = cmd.description.toLowerCase();
      const symbol = cmd.symbol?.toLowerCase() || '';
      const chain = cmd.chain?.toLowerCase() || '';

      // Exact match on label or symbol (highest priority)
      if (label === normalizedQuery || symbol === normalizedQuery) {
        score = 100;
      }
      // Starts with query (high priority)
      else if (label.startsWith(normalizedQuery) || symbol.startsWith(normalizedQuery)) {
        score = 80;
      }
      // Contains query in label or symbol
      else if (label.includes(normalizedQuery) || symbol.includes(normalizedQuery)) {
        score = 60;
      }
      // Contains in description
      else if (description.includes(normalizedQuery)) {
        score = 40;
      }
      // Contains in chain
      else if (chain.includes(normalizedQuery)) {
        score = 30;
      }
      // Fuzzy match (character sequence matching)
      else {
        const fuzzyScore = fuzzyMatch(normalizedQuery, label + ' ' + description);
        if (fuzzyScore > 0) {
          score = fuzzyScore;
        }
      }

      return { cmd, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ cmd }) => cmd);
};

// Simple fuzzy matching algorithm
const fuzzyMatch = (query: string, text: string): number => {
  let queryIndex = 0;
  let consecutiveMatches = 0;
  let maxConsecutive = 0;
  let totalMatches = 0;

  for (let i = 0; i < text.length && queryIndex < query.length; i++) {
    if (text[i] === query[queryIndex]) {
      queryIndex++;
      totalMatches++;
      consecutiveMatches++;
      maxConsecutive = Math.max(maxConsecutive, consecutiveMatches);
    } else {
      consecutiveMatches = 0;
    }
  }

  // All characters must match
  if (queryIndex !== query.length) {
    return 0;
  }

  // Score based on matches and consecutive matches
  return Math.min(20, totalMatches * 2 + maxConsecutive * 3);
};

// Group labels for display
export const groupLabels: Record<CommandGroup, string> = {
  tokens: 'Tokens',
  commands: 'Commands',
  navigation: 'Navigation',
};
