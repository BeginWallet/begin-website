# Begin brand guide

Version 1 · November 2026. The source of truth for how the new Begin looks and sounds on the website, in the app, in the stores and on social. Tokens live in [`tokens.css`](tokens.css) and [`tokens.json`](tokens.json); logo files in [`logo/`](logo).

## 1 · Who Begin is now

Begin used to be a crypto wallet. The new Begin is **a dollar account that only you control, for people who earn across borders and send money home.**

- Tagline: **Earn anywhere. Send home.**
- Two jobs: **Get paid** (US account details, a pay link) and **Send home** (fee and arrival time shown up front).
- **Today vs. later:** until Begin can actually move money to family (that needs a payout partner; today our provider, Onramper, covers buying and selling digital dollars only), we speak as a **dollar account** (built on USDC, a stablecoin). "Send home" is the target voice for when that ships. See [6 · Voice](#6--voice) for both.
- Direction: **Mono + Human**. Black and white do the work, real people bring the warmth.
- Crypto is built in, but it is an option, never the headline. The old wallet tools live under Me › Advanced.

### Names

| Where | Name |
| --- | --- |
| Display name everywhere (site, socials, app) | Begin |
| App Store listing | Begin Pay |
| Legacy product (Android, browser extension) | Begin Wallet |
| Legal entity, in every footer | Neuralspark Limited |

Until the new app is live, refer to it as **coming soon**. Never announce a date that isn't confirmed. Begin Wallet stays supported; never imply it has stopped working.

## 2 · Logo

The wordmark is a geometric lowercase **begin** drawn on an 11-unit stroke. The **b** has a 45° cut at the top of its stem. The **g** tail keeps its original length and ends in a 45° cut parallel to the b's cut.

| File | Use |
| --- | --- |
| `logo/begin-wordmark-ink.svg` | Default, on white or light photos (on a white pill) |
| `logo/begin-wordmark-white.svg` | On ink or black |
| `logo/begin-mark-ink.svg` / `-white.svg` | The **b** on its own: app icon, avatar, favicon |

Rules:

- Ink or white only. Never cyan, never a gradient, never a glow, never outlined.
- The i dot may be cyan only in motion pieces where it is the single cyan detail on screen.
- On a photo, put the logo on a white pill.
- Clear space on every side is at least the height of the **e**. Minimum width is 64 px on screen.
- Don't redraw, stretch, re-space, or set "begin" in a font as a logo.

Splash and logo-reveal motion use critically damped springs (no bounce): Smooth 0.45 s and Quick 0.35 s, damping 1.0.

## 3 · Color

Black and white do the work. Grey groups things, ink makes the one decision on each screen, mist frames photos and objects. **Cyan is a signal, never a theme.**

Rough share of any screen: white 64 · surface 20 · ink 9 · mist 4 · secondary 2 · cyan a sliver (at most three details).

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `bg` | `#FFFFFF` | `#000000` | The page. Most of every screen. |
| `surface` | `#F4F4F5` | `#141416` | Groups, tiles, secondary buttons. |
| `line` | `#ECECEE` | `#232326` | Hairline dividers and outlines. Decorative only. |
| `ink` | `#0A0A0B` | `#FFFFFF` | Text, the one primary button, app icon. 19.8:1 on white. |
| `ink-2` | `#6E6E73` | `#9A9AA0` | Supporting text, labels, captions. 5.1:1 on white. |
| `ink-3` | `#8E8E93` | `#68686D` | Greyed cents and large quiet numbers. 24 px and up only. |
| `mist` | `#E4E4E7` | `#1C1C1F` | Behind objects and photo crops. Background only; only ink or `#3A3A3C` text on it. |
| `signal` | `#1FD1E5` | `#1FD1E5` | Begin cyan. Signals only. |
| `alert` | `#B42318` | `#FF7A6B` | Errors. |

The old clay color (`#E9E7E3`) is retired. Don't use beige or warm greys.

**Where cyan is allowed:** a dot beside money on the way; the current bar on a chart; the small spark where Ask Begin speaks; caret, focus ring and the 2 px ring on a selected chip; the check in a completed step; the Begin full stop (one per display headline).

**Never:** cyan text on white (1.9:1); cyan buttons, cards or backgrounds; gradients, neon or glows; more than three cyan details on one screen; cyan in the wordmark.

**The one tint:** cyan wash `#DDF6F9` with deep teal text `#00505A` (8.1:1), only for small "New" and "Done by Begin" labels.

## 4 · Type

One family: **Open Sauce One**. Size and weight make the hierarchy, not boxes. Big things get lighter and tighter; small things get heavier.

- Light 300 for display and amounts. Regular 400 for reading. Medium 500 for labels and buttons. SemiBold 600 only for short emphasis.

| Role | Size / line height · weight · tracking |
| --- | --- |
| Display | 96 / 0.95 · 300 · −5% |
| Balance | 64 / 1.05 · 300 · −5% |
| Heading 1 | 48 / 1.05 · 300 · −4% |
| Heading 2 | 32 / 1.1 · 300 · −3% |
| Title | 20 / 1.3 · 500 · −2% |
| Body | 16 / 1.55 · 400 · 0 |
| Label | 14 / 1.4 · 500 · 0 |
| Caption | 12 / 1.4 · 400 · +1% |

- **Amounts:** Light and tight, with the cents in `ink-3` (24 px and up only): $8,420.00 (the ".00" in grey).
- **The Begin full stop:** one cyan full stop on a short display headline ("Sent home."). Never on body text, never twice on a screen.
- **Sentence case, always.** No all caps, no title case. Buttons are verbs: Get paid · Send home · Add money · Withdraw.

## 5 · System (Begin Mono v1)

Few parts, used well. The same tokens drive the app, web checkout and the website.

- **Spacing:** 4-point scale. Screen edges 20 · between groups 24–32 · inside tiles 16–20 · page sections 96–128.
- **Radius:** chip 12 · input 16 · tile 20 · card 28 · sheet 40. Buttons and chips are always full pills. Bigger things get rounder.
- **Elevation:** flat by default. One soft shadow, only for chips over photos and sheets over content.
- **Buttons:** primary 52 px, compact 44, icon 44. **One ink pill per screen.**
- **Selected chip:** a 2 px cyan ring, never a cyan fill. Focused input: cyan ring and caret.
- **Icons:** 24 grid, 1.6 stroke, round caps, line only. Filled shapes are reserved for the Begin spark and the done check.
- **Tabs (app):** Home · Send · Get paid · Activity. Me opens from your photo, top right. Ask Begin is a quiet spark on Home.

## 6 · Voice

### Two phases

| | **Now: dollar account** | **Later: send money home** |
| --- | --- | --- |
| When | Today, while money in and out runs through Onramper | Once a payout partner lets people send to family (bank, mobile wallet, cash pickup) |
| What we are | A dollar account that only you control, in digital dollars (USDC) you buy and sell with your card or bank | A dollar account for people who earn across borders and send money home |
| Lead line | A dollar account that is only yours. | Earn anywhere. Send home. |
| Jobs we promise | Buy dollars · Hold them · Send to another wallet · Sell back to your bank | Get paid · Send home |
| Stablecoin words | Allowed, explained in plain words the first time ("USDC, a digital dollar") | Back to Me › Advanced, FAQ and legal only |

Rules for **now**:

- Never promise sending money to family, payouts to GCash, banks or cash pickup, or arrival times, until it ships. "Send home" and the Mom examples below are for the later phase.
- Stablecoin, USDC and wallet are fine to say. Explain each once, in plain words, and keep the sentence about what the person gets: "USDC is a digital dollar. One USDC is meant to be worth one US dollar."
- Name Onramper as the provider where people buy or sell, and say its fees are shown before you pay.
- Be honest about risk: USDC is issued by Circle, not a bank deposit, and not insured by Begin.
- Still no crypto culture: no gas, bridge, on-chain, degen, moon, APY hype, token prices or charts.
- Still never say Begin holds or keeps your money. Only you can move it.

The four voice rules below hold in both phases.

### How we sound

**We say what happens.** Plain words, the full cost up front, a quiet confidence that never sells too hard.

1. **Plain-spoken.** Short sentences in everyday words. If a nurse in Dubai and a designer in Lisbon both get it on first read, it ships.
2. **Say what happens, and when.** Who gets what, by when, for how much. The full cost before anyone commits.
3. **Warm, not cute.** We talk about Mom and rent and clients. No jokes about money, no exclamation marks.
4. **Begin is quiet.** We report what we did in one line. We never cheer and never push.

Examples for **now**:

| We say | We don't say |
| --- | --- |
| Buy dollars with your card. You see Onramper's fee before you pay. | Ape into stablecoins with zero fees. |
| USDC, a digital dollar. Only you can move it. | Your funds are safe with us. |
| Sell back to your bank whenever you want. | Instant off-ramp to fiat rails. |

Examples for **later**:

| We say | We don't say |
| --- | --- |
| Mom gets ₱17,220.00 in her GCash. | Your USDC transfer has been bridged to the recipient wallet. |
| Your US account details | Your on-chain deposit address |
| Total fee $[FEE]. That's everything. | Network fees may apply. |
| We'll text Mom when it lands. | A notification will be dispatched upon settlement. |
| Only you can move your money. | Your funds are safe with us. |

**Words we use (later phase):** dollars, account, account details, send, get paid, add money, withdraw, fee, arrives, only you.

**Words we keep out (later phase; see Now rules above):** crypto, token, wallet address, gas, bridge, on-chain, stablecoin, seed phrase, custody, held by Begin. Also **remittance** (and remit, remitting) in any user-facing copy: say "send money home", "send to family" or "send home".

Exceptions, kept small:

- Name USDC only as "USDC, a digital dollar", and only where people ask what's underneath: balance details, the security page, FAQ and legal. A small "From a digital wallet (USDC)" line under ways to add money is fine.
- Never say Begin holds or keeps your money. You do.

### Claims we're careful with

- **Support:** help is 24/7, AI first. Write "Help at any hour · Ask Begin answers 24/7, and our team steps in." Never promise "real people 24/7" or "no bots".
- **Numbers:** exact or none. Real fees and arrival times, rates labelled as examples ("Example rate. You see the live rate before you send."). Unconfirmed facts stay as `[PLACEHOLDERS]` and the copy doesn't ship until they're filled.
- **Features:** only describe what has shipped. No dates, products or partners that aren't confirmed.
- **Earn (if shown):** plain money copy, "[RATE]% a year · variable", off by default, with the risk text right next to it.

## 7 · People and objects

**Real moments, quiet objects.** People bring the warmth: someone getting paid, a family receiving. Matte white objects introduce features.

- **Photos:** real moments (getting paid, receiving money, working). No posed stock smiles, no piles of cash. Natural light, muted color. Show the people we serve across Asia, Africa, LatAm and Europe. Commission or license every photo, with consent.
- **Objects:** cool matte white clay on pure white or mist, with one small cyan detail, soft daylight, no outlines. No beige. Only for feature intros, empty states and the website, one per screen. Never in lists or as tab icons.
- **Numbers on images:** amounts sit on a white chip with a soft shadow, bottom left. Never put text that must be read straight onto a photo.

## 8 · Social

Display name **Begin** everywhere. The voice rules above apply, plus:

- One idea per post. The first line stands alone as a complete sentence, then a blank line, then the detail.
- No exclamation marks, emoji, all caps or "huge news". A full stop is our loudest punctuation.
- No hashtags on X.
- One image per post: real people for the jobs, white objects for features, amounts on a white chip.
- Answer in the first sentence in public; anything about a person's own money moves to DM. Never ask for recovery details.
- Motion follows the logo motion rules above: calm springs, no bounce, no glow.
