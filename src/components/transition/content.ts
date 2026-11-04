// Copy and links for the transition landing page.
// Source: "Transition landing" artboard on the Begin "Brand & Landing" canvas.

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
  apple:
    'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z',
  android:
    'M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 0 0-.83.22l-1.88 3.24a11.463 11.463 0 0 0-8.94 0L5.65 5.67a.643.643 0 0 0-.87-.2c-.28.18-.37.54-.22.83L6.4 9.48A10.78 10.78 0 0 0 1 18h22a10.78 10.78 0 0 0-5.4-8.52M7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5m10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z',
  ext:
    'M10 4.5a2 2 0 1 1 4 0V6h4a1 1 0 0 1 1 1v4h-1.5a2 2 0 1 0 0 4H19v4a1 1 0 0 1-1 1h-4v-1.5a2 2 0 1 0-4 0V20H6a1 1 0 0 1-1-1v-4h1.5a2 2 0 1 0 0-4H5V7a1 1 0 0 1 1-1h4z',
  lock: 'M7 10h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2zM8 10V7a4 4 0 0 1 8 0v3',
  chat: 'M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4z',
  receipt: 'M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6M9 16h3',
  globe:
    'M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  download: 'M12 4v12M7 11l5 5 5-5M5 20h14',
  plus: 'M12 5v14M5 12h14',
}

export type Platform = 'ios' | 'android' | 'ext'

type Cta = { t: string; href: string; primary?: boolean; external?: boolean }

export type PlatformInfo = {
  label: string
  icon: string
  filled: boolean
  heading: string
  body: string
  ctas: Cta[]
  note: string
  steps: { t: string; b: string }[]
}

export const PLATFORMS: Record<Platform, PlatformInfo> = {
  ios: {
    label: 'iPhone',
    icon: ICONS.apple,
    filled: true,
    heading: 'Begin Wallet for iPhone.',
    body: 'The same wallet you know, with your accounts and history in place. Keep using it exactly as you do today.',
    ctas: [
      { t: 'Download on the App Store', href: LINKS.appStore, primary: true, external: true },
      { t: 'What’s changing', href: '#changing' },
    ],
    note: 'Only download Begin Wallet from the App Store or our website.',
    steps: [
      { t: 'Open Begin Wallet as usual', b: 'Your wallet, balances and history are where you left them.' },
      { t: 'Keep it updated', b: 'We keep shipping security fixes. Turn on automatic updates in the App Store.' },
      { t: 'When the new Begin arrives', b: 'You choose if and when to bring your wallet in. Nothing moves until you say so.' },
    ],
  },
  android: {
    label: 'Android',
    icon: ICONS.android,
    filled: true,
    heading: 'Begin Wallet for Android.',
    body: 'The same wallet you know, with your accounts and history in place. Keep using it exactly as you do today.',
    ctas: [
      { t: 'Get it on Google Play', href: LINKS.googlePlay, primary: true, external: true },
      { t: 'What’s changing', href: '#changing' },
    ],
    note: 'Only download Begin Wallet from Google Play or our website.',
    steps: [
      { t: 'Open Begin Wallet as usual', b: 'Your wallet, balances and history are where you left them.' },
      { t: 'Update when asked', b: 'We keep shipping security fixes. Turn on automatic updates in Google Play.' },
      { t: 'The new Begin comes later', b: 'It launches on iPhone first, then Android. Nothing moves until you say so.' },
    ],
  },
  ext: {
    label: 'Browser extension',
    icon: ICONS.ext,
    filled: false,
    heading: 'Begin Wallet for your browser.',
    body: 'Connect to apps and sign from your desktop, like before. The extension isn’t going anywhere.',
    ctas: [
      { t: 'Add to Chrome', href: LINKS.chromeStore, primary: true, external: true },
      { t: 'What’s changing', href: '#changing' },
    ],
    note: 'Works in Chrome, Brave and Edge. Only install it from the Chrome Web Store link on our website.',
    steps: [
      { t: 'Keep the extension pinned', b: 'Your wallets and connected apps stay as they are.' },
      { t: 'Let it update itself', b: 'Your browser installs our security fixes automatically.' },
      { t: 'Use both if you like', b: 'The extension and the new Begin can live side by side.' },
    ],
  },
}

export const WALLET_POINTS = [
  'Your wallet and history stay where they are',
  'Begin Wallet still only answers to you',
  'Security updates keep coming',
]

export const DOWNLOADS = [
  { t: 'Begin Wallet for iPhone', s: 'App Store', href: LINKS.appStore, icon: ICONS.apple, filled: true },
  { t: 'Begin Wallet for Android', s: 'Google Play', href: LINKS.googlePlay, icon: ICONS.android, filled: true },
  { t: 'Begin Wallet extension', s: 'Chrome, Brave and Edge', href: LINKS.chromeStore, icon: ICONS.ext, filled: false },
]

export const JOBS = [
  {
    label: 'Get paid',
    h: 'Dollars and euros, held as USDC and EURC.',
    b: 'Get paid with your pay link or your @name. Add money by card, Apple Pay or bank transfer, and withdraw to your own bank when you need to.',
    phone: true,
    src: '/images/transition/phone-cafe.jpg',
    alt: 'Hands holding a phone showing the Begin app, over a café table',
    pos: '50% 50%',
    amt: '+$2,400.00',
    cap: 'Lumen Labs paid Ana',
  },
  {
    label: 'Send',
    h: 'Send to anyone, fee up front.',
    b: 'Send dollars to family and friends in seconds, and see the fee before you send. They keep it in their own Begin account or withdraw to their bank.',
    phone: false,
    src: '/images/transition/mom-kitchen.jpg',
    alt: 'Ana’s mom in her kitchen, smiling at her phone',
    pos: '50% 35%',
    amt: '$300.00',
    cap: 'Mom received it',
  },
]

export const PROOF = [
  { d: ICONS.receipt, t: 'Every fee up front', b: 'The total cost before you send' },
  { d: ICONS.chat, t: 'Help at any hour', b: 'Ask Begin answers 24/7, and our team steps in' },
  { d: ICONS.lock, t: 'Only you control it', b: 'Begin never holds your money' },
  { d: ICONS.globe, t: 'Your crypto, one tab away', b: 'Everything Begin Wallet does, in the Crypto tab' },
]

export const SAME = [
  { t: 'Your wallet is yours', b: 'Only you control it. Begin can’t see your recovery phrase or move anything.' },
  { t: 'iPhone, Android and browser', b: 'Begin Wallet keeps working on all three, with security updates.' },
  { t: 'Your history', b: 'Every past transaction stays in Begin Wallet.' },
  { t: 'How you get in', b: 'Same recovery phrase, same passcode. No new setup.' },
]

export const CHANGES = [
  { t: 'A new app is coming, iPhone first', b: 'The new Begin is a stablecoin account for getting paid and sending money. Android follows.' },
  { t: 'New features go to the new Begin', b: 'Begin Wallet gets fixes and security updates. The new Begin’s Crypto tab carries what Begin Wallet does today.' },
  { t: 'You choose when to move', b: 'When the new Begin arrives, you decide if and when to bring your wallet in. Nothing moves on its own.' },
  { t: 'A new way to get help', b: 'Ask Begin answers 24/7, and our team steps in. It helps with Begin Wallet too.' },
]

export const TIMELINE = [
  { when: 'Now', t: 'Nothing to do', b: 'Begin Wallet works on iPhone, Android and in your browser, as it always has.', current: true, upcoming: false },
  { when: 'Coming soon', t: 'The new Begin on iPhone', b: 'Join the waitlist and we’ll tell you the day it’s ready.', current: false, upcoming: false },
  { when: 'After that', t: 'The new Begin on Android', b: 'Begin Wallet stays installed and working until you decide otherwise.', current: false, upcoming: true },
]

export const FAQ = [
  { q: 'Do I have to move to the new Begin?', a: 'No. Begin Wallet keeps working on iPhone, Android and as a browser extension. Move when you want to, or not at all.' },
  { q: 'Is anything happening to what’s in my wallet?', a: 'No. Nothing moves and nothing converts. Your wallet only answers to you, and that hasn’t changed.' },
  { q: 'What is a stablecoin account?', a: 'Your balance is held as USDC (digital dollars) and EURC (digital euros), issued by Circle, in a wallet only you control. Begin never holds your money.' },
  { q: 'Can I still use my crypto in the new Begin?', a: 'Yes. The Crypto tab shows your other assets and lets you convert, send and receive them, using decentralized services straight from your wallet.' },
  { q: 'When does the new Begin launch?', a: 'Soon, on iPhone first, then Android. We don’t have a date to share yet. Join the waitlist and we’ll email you the day it’s ready.' },
  { q: 'Will Begin Wallet keep getting updates?', a: 'Yes, security fixes and updates to keep it working. New features go to the new Begin.' },
  { q: 'Someone says they’re from Begin and asks for my recovery phrase.', a: 'It’s a scam. Begin will never ask for it, by email, chat, phone or DM. Don’t share it with anyone.' },
  { q: 'How do I get help?', a: 'Ask Begin answers 24/7, in the app and on our website. When something needs a person, it passes you to our team with the details, so you never explain twice.' },
]

export const FOOTER_LINKS = [
  { t: 'The new Begin', href: '#new' },
  { t: 'Begin Wallet', href: '#wallet' },
  { t: 'Help centre', href: LINKS.help },
  { t: 'Security', href: LINKS.security },
  { t: 'Blog', href: '/blog' },
  { t: 'Terms', href: LINKS.terms },
  { t: 'Privacy', href: LINKS.privacy },
]
