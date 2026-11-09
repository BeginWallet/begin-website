import { CSSProperties, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Wordmark from './wordmark'
import { openCookieSettings } from '../cookie-consent'
import { COMPANY } from '../../lib/company'
import styles from './transition.module.css'
import { Copy, Film, LOCALES, LOCALE_NAMES, Locale, COPY, FILMS, SUGGEST, localeFromTag, toLocale } from './i18n'
import {
  FACT_ICONS,
  FEE_STRONG,
  FOOTER_HREFS,
  GET_LINKS,
  ICONS,
  MORE_ICONS,
  PHONE_ACTION_ICONS,
  PHONE_COINS,
  PHONE_TAB_ICONS,
  PROOF_ICONS,
  STEP_IMAGES,
  STORES,
} from './content'

type IconProps = {
  d: string
  size?: number
  width?: number
  filled?: boolean
  className?: string
}

const Icon = ({ d, size = 20, width = 1.7, filled = false, className }: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke={filled ? 'none' : 'currentColor'}
    strokeWidth={width}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
)

const Dot = () => <span className={styles.dot}>.</span>

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ')

const stagger = (i: number) => ({ '--i': i }) as CSSProperties

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Balance on the phone mockup: starts $50 short and ticks up when the "+$50.00 from @maria" toast lands.
const BALANCE_TO = 2400
const BALANCE_FROM = BALANCE_TO - 50
const TOAST_AT_MS = 1700

// The film starts as a cover image with a play button in the middle. The video and its
// controls load only after a click, so the page doesn't download the film up front.
const FilmPlayer = ({ film }: { film: Film }) => {
  const ref = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)

  // A new language means a new film: go back to its cover.
  useEffect(() => setStarted(false), [film.src])

  const play = () => {
    setStarted(true)
    requestAnimationFrame(() => ref.current?.play().catch(() => undefined))
  }

  return (
    <div className={cx(styles.player, styles.reveal)}>
      <video
        ref={ref}
        className={styles.video}
        src={film.src}
        poster={film.poster}
        controls={started}
        playsInline
        preload="none"
        aria-label={film.label}
        onEnded={() => setStarted(false)}
      />
      {!started && (
        <button type="button" className={styles.playCover} onClick={play} aria-label={`${film.play}: ${film.label}`}>
          <span className={styles.playButton} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="30" height="30">
              <path
                d="M7 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L8.5 4.64A1 1 0 0 0 7 5.5Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className={styles.playTime} aria-hidden="true">
            0:33
          </span>
        </button>
      )}
    </div>
  )
}

const useBalance = () => {
  const [value, setValue] = useState(BALANCE_FROM)
  useEffect(() => {
    if (reducedMotion()) {
      setValue(BALANCE_TO)
      return
    }
    let raf = 0
    const timer = window.setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 700)
        const eased = 1 - Math.pow(1 - t, 3)
        setValue(Math.round(BALANCE_FROM + (BALANCE_TO - BALANCE_FROM) * eased))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, TOAST_AT_MS)
    return () => {
      window.clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [])
  return value
}

// Fades sections in as they scroll into view. Without JS, or with reduced motion, everything stays visible.
const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = ref.current
    if (!root || reducedMotion() || !('IntersectionObserver' in window)) return
    const items = Array.from(root.querySelectorAll<HTMLElement>(`.${styles.reveal}`))
    // Anything already on screen shows at once, so nothing blinks out after hydration.
    items.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add(styles.in)
    })
    root.classList.add(styles.motion)
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.in)
            io.unobserve(e.target)
          }
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    items.filter((el) => !el.classList.contains(styles.in)).forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return ref
}

const external = { target: '_blank', rel: 'noopener noreferrer' }

export const useLocale = (): Locale => toLocale(useRouter().locale)

const hrefFor = (l: Locale) => (l === 'en' ? '/' : `/${l}`)

// The visitor's language choice (footer links or the suggestion bar), kept in this browser only.
const CHOICE_KEY = 'begin-locale'
const saveChoice = (l: Locale) => {
  try {
    localStorage.setItem(CHOICE_KEY, l)
  } catch {}
}

// No redirects, so search engines index every language. When the browser prefers another
// language we have, a bar offers it in that language, until the visitor picks or closes it.
const LanguageSuggestion = ({ locale }: { locale: Locale }) => {
  const [target, setTarget] = useState<Locale | null>(null)
  useEffect(() => {
    let chosen: string | null = null
    try {
      chosen = localStorage.getItem(CHOICE_KEY)
    } catch {}
    if (chosen) return
    const preferred = (navigator.languages || [navigator.language]).map(localeFromTag).find(Boolean) || null
    if (preferred && preferred !== locale) setTarget(preferred)
  }, [locale])
  if (!target) return null
  const t = SUGGEST[target]
  return (
    <div className={styles.suggest} lang={target} role="region" aria-label={t.text}>
      <div className={cx(styles.wrap, styles.suggestInner)}>
        <Icon d={ICONS.globe} size={16} className={styles.icon} />
        <span>{t.text}</span>
        <a href={hrefFor(target)} hrefLang={target} onClick={() => saveChoice(target)} className={styles.suggestLink}>
          {t.cta}
        </a>
        <button
          type="button"
          aria-label={t.close}
          className={styles.suggestClose}
          onClick={() => {
            saveChoice(locale)
            setTarget(null)
          }}
        >
          <Icon d={ICONS.close} size={16} />
        </button>
      </div>
    </div>
  )
}

const Phone = ({ c }: { c: Copy }) => {
  const balance = useBalance()
  return (
    <div className={styles.phone} role="img" aria-label={c.hero.phoneLabel}>
      <div className={styles.screen} aria-hidden="true">
        <div className={styles.statusBar}>
          <span>9:41</span>
          <svg viewBox="0 0 64 12" width="54" height="10" fill="currentColor">
            <rect x="0" y="8" width="3" height="4" rx="1" />
            <rect x="5" y="6" width="3" height="6" rx="1" />
            <rect x="10" y="3.5" width="3" height="8.5" rx="1" />
            <rect x="15" y="1" width="3" height="11" rx="1" />
            <path d="M31 11.2 28.6 8.6a3.4 3.4 0 0 1 4.8 0L31 11.2Zm-4.3-4.6-1.5-1.6a8.2 8.2 0 0 1 11.6 0l-1.5 1.6a6 6 0 0 0-8.6 0ZM23.3 3l-1.5-1.6a13 13 0 0 1 18.4 0L38.7 3a10.8 10.8 0 0 0-15.4 0Z" />
            <rect x="44.5" y="1" width="16" height="10" rx="3" fill="none" stroke="currentColor" strokeOpacity="0.4" />
            <rect x="46.5" y="3" width="12" height="6" rx="1.5" />
            <path d="M62 4.5v3a1.6 1.6 0 0 0 0-3Z" fillOpacity="0.4" />
          </svg>
        </div>
        <div className={styles.appHeader}>
          <span className={styles.appAvatar}>A</span>
          <Wordmark height={15} />
          <span className={styles.appAvatar}>
            <Icon d={ICONS.scan} size={13} width={1.8} />
          </span>
        </div>
        <div className={styles.balance}>
          <span className={styles.balanceLabel}>{c.hero.yourDollars}</span>
          <span className={styles.balanceValue}>
            ${balance.toLocaleString('en-US')}
            <span className={styles.balanceCents}>.00</span>
          </span>
        </div>
        <div className={styles.actions}>
          {c.hero.actions.map((label, i) => (
            <span key={label} className={styles.action}>
              <span className={cx(styles.actionIcon, i === 0 && styles.actionIconPrimary)}>
                <Icon d={PHONE_ACTION_ICONS[i]} size={18} width={1.8} />
              </span>
              {label}
            </span>
          ))}
        </div>
        <div className={styles.coins}>
          {PHONE_COINS.map((coin) => (
            <div key={coin.sym} className={styles.coin}>
              <span className={styles.coinIcon}>{coin.ic}</span>
              <span className={styles.coinText}>
                {coin.sym}
                <span className={styles.coinNet}>{coin.euros ? `Solana · ${c.hero.euros}` : 'Solana'}</span>
              </span>
              <span className={styles.coinValue}>{coin.v}</span>
            </div>
          ))}
        </div>
        <div className={styles.earnRow}>
          <span className={styles.earnDot} />
          <span className={styles.coinText}>
            {c.hero.earn}
            <span className={styles.coinNet}>{c.hero.earnOff}</span>
          </span>
          <Icon d={ICONS.chevron} size={14} />
        </div>
        <div className={styles.tabBar}>
          {c.hero.tabs.map((label, i) => (
            <span key={label} className={cx(styles.tab, i === 0 && styles.tabActive)}>
              <Icon d={PHONE_TAB_ICONS[i]} size={18} width={1.7} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const TransitionLanding = () => {
  const ref = useReveal()
  const locale = useLocale()
  const c = COPY[locale]
  const film = FILMS[locale]

  return (
    <div id="top" ref={ref} className={styles.page}>
      <LanguageSuggestion locale={locale} />
      <header className={cx(styles.wrap, styles.header)}>
        <a href="#top" aria-label={c.nav.home} className={styles.logo}>
          <Wordmark height={26} />
        </a>
        <nav aria-label={c.nav.main} className={styles.nav}>
          <a href="#how">{c.nav.how}</a>
          <a href="#yours">{c.nav.yours}</a>
          <a href="#fees">{c.nav.fees}</a>
          <a href="#faq">{c.nav.help}</a>
        </nav>
        <a href="#get" className={cx(styles.btn, styles.btnPrimary, styles.headerCta)}>
          {c.nav.get}
        </a>
      </header>

      <main>
        <section aria-labelledby="heroH" className={cx(styles.wrap, styles.hero)}>
          <div className={styles.heroText}>
            <h1 id="heroH" className={styles.h1}>
              {c.hero.h1}
              <Dot />
            </h1>
            <p className={styles.heroLead}>{c.hero.lead}</p>
            <div className={styles.storeRow}>
              {STORES.map((s) => (
                <a
                  key={s.t}
                  href={s.href}
                  {...external}
                  className={cx(styles.btn, styles.storeBtn, s.primary ? styles.btnPrimary : styles.btnSoft)}
                >
                  <Icon d={s.icon} size={22} width={1.6} filled={s.filled} />
                  {s.t}
                </a>
              ))}
            </div>
            <span className={styles.heroNote}>{c.hero.note}</span>
          </div>

          <div className={styles.heroArt}>
            <div className={styles.heroPhoto}>
              <img src="/images/transition/ana-laptop.jpg" alt={c.hero.photoAlt} />
            </div>
            <div className={styles.toast}>
              <span className={styles.toastIcon}>
                <Icon d={ICONS.receive} size={18} width={1.8} />
              </span>
              <span className={styles.stack}>
                <span className={styles.toastTitle}>{c.hero.toastTitle}</span>
                <span className={styles.toastSub}>{c.hero.toastSub}</span>
              </span>
            </div>
            <Phone c={c} />
          </div>
        </section>

        <section aria-label={c.glance.label} className={styles.glance}>
          <div className={styles.wrap}>
            <ul className={styles.glanceGrid}>
              {c.glance.items.map((p, i) => (
                <li key={p.t} className={cx(styles.glanceItem, styles.reveal)} style={stagger(i)}>
                  <span className={styles.roundIcon}>
                    <Icon d={PROOF_ICONS[i]} size={20} />
                  </span>
                  <span className={styles.stack}>
                    <span className={styles.itemTitle}>{p.t}</span>
                    <span className={styles.itemBody}>{p.b}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="film" aria-labelledby="filmH" className={cx(styles.wrap, styles.section, styles.film)}>
          <div className={cx(styles.sectionHead, styles.reveal)}>
            <div className={styles.stack} style={{ gap: 12 }}>
              <span className={styles.eyebrow}>{film.eyebrow}</span>
              <h2 id="filmH" className={styles.h2} style={{ maxWidth: 760 }}>
                {film.h}
                <Dot />
              </h2>
            </div>
            <p className={styles.lead} style={{ maxWidth: 440 }}>
              {film.lead}
            </p>
          </div>
          <FilmPlayer film={film} />
        </section>

        <section id="how" aria-labelledby="howH" className={cx(styles.wrap, styles.section, styles.how)}>
          <div className={cx(styles.sectionHead, styles.reveal)}>
            <h2 id="howH" className={styles.h2} style={{ maxWidth: 720 }}>
              {c.how.h}
              <Dot />
            </h2>
            <p className={styles.lead} style={{ maxWidth: 440 }}>
              {c.how.lead}
            </p>
          </div>
          <ol className={styles.steps}>
            {c.how.steps.map((s, i) => (
              <li key={s.t} className={cx(styles.step, styles.reveal)} style={stagger(i)}>
                <div className={styles.stepTop}>
                  <span className={styles.eyebrow}>
                    {c.how.step} {i + 1}
                  </span>
                  <span className={styles.stepArt}>
                    <img src={STEP_IMAGES[i]} alt="" />
                  </span>
                </div>
                <h3 className={styles.stepTitle}>{s.t}</h3>
                <p className={styles.stepBody}>{s.b}</p>
                <span className={styles.stepTag}>{s.tag}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="yours" aria-labelledby="yoursH" className={cx(styles.wrap, styles.section)}>
          <div className={cx(styles.dark, styles.reveal)}>
            <div className={styles.darkIntro}>
              <span className={styles.darkArt}>
                <img src="/images/transition/only-yours-shield.png" alt="" />
              </span>
              <h2 id="yoursH" className={styles.h2}>
                {c.yours.h}
                <Dot />
              </h2>
              <p className={styles.darkLead}>{c.yours.lead}</p>
            </div>
            <ul className={styles.facts}>
              {c.yours.facts.map((f, i) => (
                <li key={f.t} className={cx(styles.fact, styles.reveal)} style={stagger(i + 2)}>
                  <span className={styles.factIcon}>
                    <Icon d={FACT_ICONS[i]} size={20} />
                  </span>
                  <span className={styles.stack} style={{ gap: 4 }}>
                    <span className={styles.factTitle}>{f.t}</span>
                    <span className={styles.factBody}>{f.b}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="more" aria-labelledby="moreH" className={cx(styles.wrap, styles.section, styles.more)}>
          <h2 id="moreH" className={cx(styles.h2Small, styles.reveal)}>
            {c.more.h}
            <Dot />
          </h2>
          <ul className={styles.moreGrid}>
            {c.more.items.map((m, i) => (
              <li key={m.t} className={cx(styles.moreCard, styles.reveal)} style={stagger(i)}>
                <span className={styles.moreIcon}>
                  <Icon d={MORE_ICONS[i]} size={22} />
                </span>
                <h3 className={styles.moreTitle}>{m.t}</h3>
                <p className={styles.moreBody}>{m.b}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="invite" aria-labelledby="inviteH" className={cx(styles.wrap, styles.section)}>
          <div className={cx(styles.invite, styles.reveal)}>
            <div className={styles.inviteText}>
              <span className={styles.eyebrow}>{c.invite.eyebrow}</span>
              <h2 id="inviteH" className={styles.h2}>
                {c.invite.h}
                <Dot />
              </h2>
              <p className={styles.lead} style={{ maxWidth: 460 }}>
                {c.invite.body}
              </p>
              <span className={styles.small}>{c.invite.small}</span>
            </div>
            <div className={styles.invitePhoto}>
              <img src="/images/transition/mom-kitchen.jpg" alt={c.invite.photoAlt} />
              <span className={styles.inviteChip}>
                <span className={styles.small}>{c.invite.chip}</span>
                <span className={styles.inviteAmount}>+$2.00</span>
              </span>
            </div>
          </div>
        </section>

        <section id="fees" aria-labelledby="feesH" className={cx(styles.wrap, styles.section, styles.split)}>
          <div className={cx(styles.splitIntro, styles.reveal)}>
            <h2 id="feesH" className={styles.h2}>
              {c.fees.h}
              <Dot />
            </h2>
            <p className={styles.lead} style={{ maxWidth: 400 }}>
              {c.fees.lead}
            </p>
          </div>
          <dl className={cx(styles.feeTable, styles.reveal)} style={{ margin: 0, ...stagger(1) }}>
            {c.fees.rows.map((f, i) => (
              <div key={f.k} className={styles.feeRow}>
                <dt>{f.k}</dt>
                <dd className={cx(styles.feeValue, FEE_STRONG[i] && styles.feeStrong)} style={{ margin: 0 }}>
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="faq" aria-labelledby="faqH" className={cx(styles.wrap, styles.section, styles.split)}>
          <div className={cx(styles.splitIntro, styles.reveal)}>
            <h2 id="faqH" className={styles.h2}>
              {c.faq.h}
              <Dot />
            </h2>
            <p className={styles.lead} style={{ maxWidth: 320 }}>
              {c.faq.lead}
            </p>
            <a href="/docs" className={cx(styles.btn, styles.btnSoft)} style={{ alignSelf: 'flex-start' }}>
              {c.faq.help}
            </a>
          </div>
          <div className={cx(styles.faqList, styles.reveal)} style={stagger(1)}>
            {c.faq.items.map((q) => (
              <details key={q.q}>
                <summary>
                  {q.q}
                  <Icon d={ICONS.plus} width={1.6} />
                </summary>
                <p className={styles.faqAnswer}>{q.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="get" aria-labelledby="getH" className={cx(styles.wrap, styles.section, styles.get)}>
          <div className={cx(styles.getCard, styles.reveal)}>
            <div className={styles.getText}>
              <h2 id="getH" className={styles.getTitle}>
                {c.get.h}
                <Dot />
              </h2>
              <p className={styles.lead} style={{ maxWidth: 420 }}>
                {c.get.lead}
              </p>
              <span className={styles.small}>{c.get.note}</span>
            </div>
            <div className={styles.getLinks}>
              {c.get.links.map((d, i) => (
                <a key={d.t} href={GET_LINKS[i].href} {...external} className={styles.getLink}>
                  <span className={styles.getLinkIcon}>
                    <Icon d={GET_LINKS[i].icon} size={22} width={1.6} filled={GET_LINKS[i].filled} />
                  </span>
                  <span className={styles.getLinkText}>
                    <span className={styles.itemTitle}>{d.t}</span>
                    <span className={styles.small}>{d.s}</span>
                  </span>
                  <Icon d={ICONS.chevron} size={18} />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={cx(styles.wrap, styles.footerInner)}>
          <div className={styles.footerTop}>
            <Wordmark height={32} />
            <nav aria-label={c.footer.nav} className={styles.footerNav}>
              {c.footer.links.map((t, i) => (
                <a key={t} href={FOOTER_HREFS[i]}>
                  {t}
                </a>
              ))}
              <button type="button" onClick={openCookieSettings} className={styles.footerButton}>
                {c.footer.cookies}
              </button>
            </nav>
          </div>
          <nav aria-label={c.footer.language} className={styles.languages}>
            <Icon d={ICONS.globe} size={16} className={styles.icon} />
            {LOCALES.map((l) => (
              <a
                key={l}
                href={hrefFor(l)}
                hrefLang={l}
                lang={l}
                aria-current={l === locale ? 'true' : undefined}
                onClick={() => saveChoice(l)}
              >
                {LOCALE_NAMES[l]}
              </a>
            ))}
          </nav>
          <div className={styles.footerLegal}>
            <span>{c.footer.legal}</span>
            <span>
              © {new Date().getFullYear()} {COMPANY.name} · {COMPANY.registeredOffice} · {c.footer.registered}{' '}
              {COMPANY.croNumber} · {c.footer.vat} {COMPANY.vatNumber}
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default TransitionLanding
