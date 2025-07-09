import cardanoIcon from 'images/cardano-ada-blue.svg';
import bitcoinIcon from 'images/bitcoin-btc-logo.svg';

export const chains = {
  cardano: {
    name: 'Cardano',
    value: 'cardano',
    icon: cardanoIcon,
  },
  bitcoin: {
    name: 'Bitcoin',
    value: 'bitcoin',
    icon: bitcoinIcon,
  },
};

// ['usdm', 'usda', 'iusd', 'usdc', 'usdt', 'djed', 'myusd']
export const stablecoins = [
  'c48cbb3d5e57ed56e276bc45f99ab39abe94e6cd7ac39fb402da47ad0014df105553444d',
  'fe7c786ab321f41c654ef6c1af7b3250a613c24e4213e0425a7ae45655534441',
  'f66d78b4a3cb3d37afa0ec36461e51ecbde00f26c8f0a68f94b6988069555344',
  '25c5de5f5b286073c593edfd77b48abc7a48e5a4f3d4cd9d428ff93555534443',
  '25c5de5f5b286073c593edfd77b48abc7a48e5a4f3d4cd9d428ff93555534454',
  '8db269c3ec630e06ae29f74bc39edd1f87c819f1056206e879a1cd61446a65644d6963726f555344',
  '92776616f1f32c65a173392e4410a3d8c39dcf6ef768c73af164779c4d79555344',
];

export const stableTokens = [
  {
    token_id: 'c48cbb3d5e57ed56e276bc45f99ab39abe94e6cd7ac39fb402da47ad0014df105553444d',
    name: 'USDM',
  },
  {
    token_id: 'fe7c786ab321f41c654ef6c1af7b3250a613c24e4213e0425a7ae45655534441',
    name: 'USDA',
  },
  {
    token_id: 'f66d78b4a3cb3d37afa0ec36461e51ecbde00f26c8f0a68f94b6988069555344',
    name: 'iUSD',
  },
  {
    token_id: '8db269c3ec630e06ae29f74bc39edd1f87c819f1056206e879a1cd61446a65644d6963726f555344',
    name: 'DJED',
  },
  {
    token_id: '25c5de5f5b286073c593edfd77b48abc7a48e5a4f3d4cd9d428ff93555534443',
    name: 'USDC',
  },
  {
    token_id: '25c5de5f5b286073c593edfd77b48abc7a48e5a4f3d4cd9d428ff93555534454',
    name: 'USDT',
  },
  {
    token_id: '25c5de5f5b286073c593edfd77b48abc7a48e5a4f3d4cd9d428ff93545555243',
    name: 'EURC',
  },
  {
    token_id: '25c5de5f5b286073c593edfd77b48abc7a48e5a4f3d4cd9d428ff9355059555344',
    name: 'PYUSD',
  },
];
