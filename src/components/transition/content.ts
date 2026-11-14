// Links, icons and images for the landing page. The words live in i18n.ts.
// Source: "Landing · step 0 · dollar account" board on the Begin "Brand & Landing" canvas.

export const LINKS = {
  appStore: 'https://apps.apple.com/app/begin-bitcoin-cardano-wallet/id1642488837',
  googlePlay: 'https://play.google.com/store/apps/details?id=is.begin.app',
  chromeStore: 'https://chromewebstore.google.com/detail/begin-bitcoin-cardano-wal/nhbicdelgedinnbcidconlnfeionhbml',
  help: '/docs',
  security: '/docs/settings/security',
  terms: '/terms/service',
  privacy: '/terms/privacy',
}

export const ICONS = {
  scan: 'M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2M7 12h10',
  apple:
    'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z',
  android:
    'M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 0 0-.83.22l-1.88 3.24a11.463 11.463 0 0 0-8.94 0L5.65 5.67a.643.643 0 0 0-.87-.2c-.28.18-.37.54-.22.83L6.4 9.48A10.78 10.78 0 0 0 1 18h22a10.78 10.78 0 0 0-5.4-8.52M7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5m10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z',
  ext: 'M10 4.5a2 2 0 1 1 4 0V6h4a1 1 0 0 1 1 1v4h-1.5a2 2 0 1 0 0 4H19v4a1 1 0 0 1-1 1h-4v-1.5a2 2 0 1 0-4 0V20H6a1 1 0 0 1-1-1v-4h1.5a2 2 0 1 0 0-4H5V7a1 1 0 0 1 1-1h4z',
  gift: 'M4 11h16v9H4zM3 7h18v4H3zM12 7v13M12 7c-1.5-3-5-3-5-1s2.5 1 5 1zM12 7c1.5-3 5-3 5-1s-2.5 1-5 1z',
  clock: 'M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0M12 7v5l3 2',
  receipt: 'M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6M9 16h3',
  dollar:
    'M12 3v18M16.5 7.5c-.8-1.3-2.4-2-4.5-2-2.8 0-4.5 1.3-4.5 3.2 0 4.6 9 2.4 9 6.8 0 2-1.8 3.3-4.5 3.3-2.2 0-3.9-.8-4.8-2.2',
  key: 'M15 7a4 4 0 1 1-3.9 5H4v3h3v3h3v-3h1.1A4 4 0 0 1 15 7zM16 11h.01',
  restore: 'M4 12a8 8 0 1 0 2.3-5.7M4 4v4h4',
  bank: 'M3 10h18M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18M12 3l9 5H3z',
  convert: 'M7 4v16M3 8l4-4 4 4M17 20V4M13 16l4 4 4-4',
  earn: 'M7 20h10M10 20c5.5-2.5.8-6.4 3-10M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8zM14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z',
  sim: 'M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM9 12h6v6H9zM12 12v6M9 15h6',
  coins: 'M9 9a6 6 0 1 0 0 12a6 6 0 1 0 0-12M15 3a6 6 0 0 1 0 12',
  home: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  list: 'M4 6h16M4 12h16M4 18h10',
  plus: 'M12 5v14M5 12h14',
  send: 'M7 17 17 7M8 7h9v9',
  receive: 'M17 7 7 17M7 8v9h9',
  cashOut: 'M12 4v12M7 11l5 5 5-5M5 20h14',
  chevron: 'm9 6 6 6-6 6',
  close: 'M6 6l12 12M18 6 6 18',
  globe:
    'M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z',
}

export const STORES = [
  { t: 'App Store', href: LINKS.appStore, icon: ICONS.apple, filled: true, primary: true },
  { t: 'Google Play', href: LINKS.googlePlay, icon: ICONS.android, filled: true, primary: false },
  { t: 'Chrome', href: LINKS.chromeStore, icon: ICONS.ext, filled: false, primary: false },
]

// Each list below lines up, item by item, with the matching list in i18n.ts.
export const PHONE_ACTION_ICONS = [ICONS.plus, ICONS.send, ICONS.receive, ICONS.cashOut]

export const PHONE_COINS = [
  { ic: '$', sym: 'USDC', euros: false, v: '$2,100.00' },
  { ic: '$', sym: 'USDT', euros: false, v: '$300.00' },
  { ic: '€', sym: 'EURC', euros: true, v: '€150.00' },
]

export const PHONE_TAB_ICONS = [ICONS.home, ICONS.convert, ICONS.earn, ICONS.list]

export const PROOF_ICONS = [ICONS.gift, ICONS.clock, ICONS.receipt, ICONS.key]

export const STEP_IMAGES = [
  '/images/transition/step-add.png',
  '/images/transition/step-send.png',
  '/images/transition/step-cash-out.png',
]

export const FACT_ICONS = [ICONS.key, ICONS.restore, ICONS.dollar, ICONS.bank]

export const MORE_ICONS = [ICONS.convert, ICONS.earn, ICONS.sim, ICONS.coins]

// Fee rows shown in bold (the free ones).
export const FEE_STRONG = [true, true, false, false, false]

export const GET_LINKS = [
  { href: LINKS.appStore, icon: ICONS.apple, filled: true },
  { href: LINKS.googlePlay, icon: ICONS.android, filled: true },
  { href: LINKS.chromeStore, icon: ICONS.ext, filled: false },
]

export const FOOTER_HREFS = ['#how', '#fees', LINKS.help, LINKS.security, '/blog', LINKS.terms, LINKS.privacy]
