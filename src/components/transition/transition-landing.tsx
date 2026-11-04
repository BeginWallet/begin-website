import { FormEvent, useState } from 'react'
import Wordmark from './wordmark'
import { openCookieSettings } from '../cookie-consent'
import { COMPANY } from '../../lib/company'
import PhonePhoto from './phone-photo'
import styles from './transition.module.css'
import {
  CHANGES,
  DOWNLOADS,
  FAQ,
  FOOTER_LINKS,
  ICONS,
  JOBS,
  PLATFORMS,
  Platform,
  PROOF,
  SAME,
  TIMELINE,
  WALLET_POINTS,
} from './content'

const INK = '#0A0A0B'

type IconProps = { d: string; size?: number; width?: number; filled?: boolean; className?: string }

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

// Netlify Forms: the matching static form lives in public/__forms.html.
const WAITLIST_FORM = 'waitlist'

const Waitlist = () => {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    setState('sending')
    try {
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString()
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })
      if (!res.ok) throw new Error(String(res.status))
      setState('done')
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <span role="status" className={styles.status}>
        <span className={styles.statusDot} />
        You’re on the list. We’ll email you the day the new Begin is ready.
      </span>
    )
  }

  return (
    <form name={WAITLIST_FORM} onSubmit={submit} className={styles.form} noValidate>
      <input type="hidden" name="form-name" value={WAITLIST_FORM} />
      <p hidden>
        <label>
          Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <label htmlFor="wl-email" className={styles.label}>
        Email
      </label>
      <div className={styles.formRow}>
        <input
          id="wl-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <button type="submit" disabled={state === 'sending'} className={cx(styles.btn, styles.btnPrimary, styles.btnTall)}>
          {state === 'sending' ? 'Joining…' : 'Join the waitlist'}
        </button>
      </div>
      {state === 'error' ? (
        <span role="alert" className={styles.error}>
          That didn’t go through. Please try again in a moment.
        </span>
      ) : (
        <span className={styles.small}>One email when it’s ready. No spam.</span>
      )}
    </form>
  )
}

const TransitionLanding = () => {
  const [tab, setTab] = useState<Platform>('ios')
  const cur = PLATFORMS[tab]

  return (
    <div id="top" className={styles.page}>
      <div className={styles.bar}>
        <div className={cx(styles.wrap, styles.barInner)}>
          <span>The new Begin is coming soon, to iPhone first. Begin Wallet keeps working everywhere you use it.</span>
          <a href="#wallet" className={styles.barLink}>
            Get Begin Wallet
          </a>
        </div>
      </div>

      <header className={cx(styles.wrap, styles.header)}>
        <a href="#top" aria-label="Begin home" className={styles.logo}>
          <Wordmark height={26} />
        </a>
        <nav aria-label="Main" className={styles.nav}>
          <a href="#new">The new Begin</a>
          <a href="#wallet">Begin Wallet</a>
          <a href="#changing">What’s changing</a>
          <a href="#faq">Help</a>
        </nav>
        <a href="#get" className={cx(styles.btn, styles.btnSm, styles.btnPrimary)}>
          Join the waitlist
        </a>
      </header>

      <main>
        <section aria-labelledby="heroH" className={cx(styles.wrap, styles.hero)}>
          <div className={styles.heroTop}>
            <h1 id="heroH" className={styles.h1}>
              Begin is changing<Dot />
            </h1>
            <p className={styles.heroLead}>
              Begin started as a wallet. Soon it becomes a dollar account for people who earn across borders and send
              money home, starting on iPhone. Begin Wallet keeps working, everywhere you use it today.
            </p>
          </div>

          <div className={styles.heroCards}>
            <article className={styles.heroPhoto}>
              <img
                src="/images/transition/ana-laptop.jpg"
                alt="Ana, a freelance designer, smiling at her laptop by a sunny window"
                className={styles.heroPhotoImg}
              />
              <div className={styles.heroPanel}>
                <span className={styles.eyebrow}>Coming soon · iPhone first</span>
                <h2 className={styles.h2Card}>
                  Earn anywhere. Send home<Dot />
                </h2>
                <p className={styles.body}>
                  US and EU account details for your clients, and the full cost up front when you send money to family.
                </p>
                <div className={styles.btnRow} style={{ paddingTop: 4 }}>
                  <a href="#get" className={cx(styles.btn, styles.btnPrimary)}>
                    Join the waitlist
                  </a>
                  <a href="#new" className={cx(styles.btn, styles.btnSoft)}>
                    See what’s new
                  </a>
                </div>
              </div>
            </article>

            <article className={styles.walletCard}>
              <span className={styles.eyebrow}>Already use Begin Wallet</span>
              <h2 className={styles.h2Card}>
                Your wallet stays yours<Dot />
              </h2>
              <p className={styles.body}>
                Nothing moves and nothing is taken away. Begin Wallet keeps working on iPhone, Android and in your
                browser.
              </p>
              <ul className={styles.checks}>
                {WALLET_POINTS.map((p) => (
                  <li key={p}>
                    <Icon d={ICONS.check} size={18} width={1.8} className={styles.icon} />
                    {p}
                  </li>
                ))}
              </ul>
              <div className={styles.downloads}>
                {DOWNLOADS.map((d) => (
                  <a key={d.t} href={d.href} target="_blank" rel="noopener noreferrer" className={styles.download}>
                    <span className={styles.downloadIcon}>
                      <Icon d={d.icon} size={22} width={1.6} filled={d.filled} />
                    </span>
                    <span className={styles.downloadText}>
                      <span className={styles.downloadTitle}>{d.t}</span>
                      <span className={styles.small}>{d.s}</span>
                    </span>
                    <Icon d={ICONS.download} size={18} />
                  </a>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="new" aria-labelledby="newH" className={cx(styles.wrap, styles.newSection)}>
          <div className={styles.sectionHead}>
            <div className={styles.titleStack}>
              <span className={styles.eyebrow}>The new Begin</span>
              <h2 id="newH" className={styles.h2}>
                Built for two jobs<Dot />
              </h2>
            </div>
            <p className={styles.lead} style={{ maxWidth: 440 }}>
              We listened to how people used Begin. Most of you were getting paid from abroad and sending money to
              family. So that’s what the new Begin does best.
            </p>
          </div>
          <div className={styles.jobs}>
            {JOBS.map((j) => (
              <article key={j.label} className={styles.job}>
                <div className={styles.jobMedia}>
                  {j.phone ? (
                    <PhonePhoto alt={j.alt} />
                  ) : (
                    <img src={j.src} alt={j.alt} className={styles.jobImg} style={{ objectPosition: j.pos }} />
                  )}
                  <span className={styles.jobChip}>
                    <span className={styles.jobAmt}>{j.amt}</span>
                    <span className={styles.jobCap}>{j.cap}</span>
                  </span>
                </div>
                <div className={styles.jobBody}>
                  <span className={styles.eyebrow}>{j.label}</span>
                  <h3 className={styles.jobH}>{j.h}</h3>
                  <p className={styles.body} style={{ fontSize: 16 }}>
                    {j.b}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <ul className={styles.proof}>
            {PROOF.map((p) => (
              <li key={p.t}>
                <Icon d={p.d} size={22} width={1.6} className={styles.icon} />
                <span className={styles.stack2}>
                  <span className={styles.strong15}>{p.t}</span>
                  <span className={styles.small}>{p.b}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section id="wallet" aria-labelledby="walletH" className={styles.walletSection}>
          <div className={cx(styles.wrap, styles.walletInner)}>
            <div className={styles.sectionHead}>
              <div className={styles.titleStack}>
                <span className={styles.eyebrow} style={{ color: '#3A3A3C' }}>
                  Begin Wallet
                </span>
                <h2 id="walletH" className={styles.h2}>
                  Looking for Begin Wallet?
                </h2>
              </div>
              <p className={styles.lead}>
                It’s still here, on iPhone, Android and in your browser, and it still only answers to you. Pick where
                you use it.
              </p>
            </div>

            <div role="group" aria-label="Where you use Begin Wallet" className={styles.tabs}>
              {(Object.keys(PLATFORMS) as Platform[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={k === tab}
                  onClick={() => setTab(k)}
                  className={styles.tab}
                >
                  {PLATFORMS[k].label}
                </button>
              ))}
            </div>

            <div className={styles.walletCols}>
              <div className={styles.panel}>
                <span className={styles.platformIcon} style={{ color: INK }}>
                  <Icon d={cur.icon} size={32} width={1.5} filled={cur.filled} />
                </span>
                <h3 className={styles.platformH}>{cur.heading}</h3>
                <p className={styles.body} style={{ fontSize: 16, maxWidth: 480 }}>
                  {cur.body}
                </p>
                <div className={styles.btnRow} style={{ paddingTop: 6 }}>
                  {cur.ctas.map((c) => (
                    <a
                      key={c.t}
                      href={c.href}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className={cx(styles.btn, c.primary ? styles.btnPrimary : styles.btnSoft)}
                    >
                      {c.primary && <Icon d={ICONS.download} size={18} />}
                      {c.t}
                    </a>
                  ))}
                </div>
                <span className={styles.small}>{cur.note}</span>
              </div>

              <div className={cx(styles.panel, styles.panelNarrow)}>
                <h3 className={styles.h3} style={{ marginBottom: 10 }}>
                  Already set up? Nothing to do.
                </h3>
                <ol className={styles.steps}>
                  {cur.steps.map((s, i) => (
                    <li key={s.t}>
                      <span className={styles.stepNum}>{i + 1}</span>
                      <span className={styles.stack2}>
                        <span className={styles.strong16}>{s.t}</span>
                        <span className={styles.note14}>{s.b}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <p className={styles.note14} style={{ margin: 'auto 0 0', paddingTop: 16 }}>
                  Begin will never ask for your recovery phrase. Not by email, chat or phone.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="changing" aria-labelledby="changeH" className={cx(styles.wrap, styles.changing)}>
          <div className={styles.titleStack}>
            <span className={styles.eyebrow}>For people who already use Begin</span>
            <h2 id="changeH" className={styles.h2} style={{ maxWidth: 760 }}>
              What changes, and what doesn’t<Dot />
            </h2>
          </div>

          <div className={styles.compare}>
            <div className={styles.compareCard}>
              <h3 className={styles.h3} style={{ marginBottom: 12 }}>
                Stays the same
              </h3>
              {SAME.map((s) => (
                <div key={s.t} className={styles.compareRow}>
                  <Icon d={ICONS.check} width={1.8} className={styles.icon} />
                  <span className={styles.stack2}>
                    <span className={styles.strong16}>{s.t}</span>
                    <span className={styles.note14}>{s.b}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className={cx(styles.compareCard, styles.compareCardFilled)}>
              <h3 className={styles.h3} style={{ marginBottom: 12 }}>
                Changes
              </h3>
              {CHANGES.map((s) => (
                <div key={s.t} className={styles.compareRow}>
                  <Icon d={ICONS.arrow} width={1.8} className={styles.icon} />
                  <span className={styles.stack2}>
                    <span className={styles.strong16}>{s.t}</span>
                    <span className={styles.note14}>{s.b}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.titleStack} style={{ gap: 18 }}>
            <h3 className={styles.h3}>When</h3>
            <ol className={styles.timeline}>
              {TIMELINE.map((s) => (
                <li key={s.when} className={s.upcoming ? styles.later : undefined}>
                  <span className={styles.when}>
                    <span className={cx(styles.whenDot, s.current && styles.whenDotNow)} />
                    {s.when}
                  </span>
                  <span style={{ fontSize: 19, fontWeight: 500, letterSpacing: '-0.01em' }}>{s.t}</span>
                  <span className={styles.body}>{s.b}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="faq" aria-labelledby="faqH" className={cx(styles.wrap, styles.faq)}>
          <div className={styles.faqIntro}>
            <h2 id="faqH" className={styles.h2}>
              Questions<Dot />
            </h2>
            <p className={styles.body} style={{ maxWidth: 300 }}>
              Help at any hour. Ask Begin answers 24/7, and our team steps in when you need a person.
            </p>
            <a href="/docs" className={cx(styles.btn, styles.btnSoft)} style={{ alignSelf: 'flex-start', height: 48 }}>
              Get help
            </a>
          </div>
          <div className={styles.faqList}>
            {FAQ.map((q) => (
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

        <section id="get" aria-labelledby="getH" className={cx(styles.wrap, styles.get)}>
          <div className={styles.getCard}>
            <div className={styles.getText}>
              <h2 id="getH" className={styles.h2}>
                Be first in line<Dot />
              </h2>
              <p className={styles.lead} style={{ maxWidth: 420 }}>
                The new Begin is coming to iPhone first. Leave your email and we’ll tell you the day it’s ready.
              </p>
              <Waitlist />
              <span className={styles.note14} style={{ color: '#6E6E73' }}>
                Android follows. Begin Wallet keeps working in the meantime.{' '}
                <a href="#wallet" style={{ fontWeight: 500 }}>
                  Get Begin Wallet
                </a>
              </span>
            </div>
            <div className={styles.getArt}>
              <img src="/images/transition/waitlist-receipt.png" alt="" />
              <img src="/images/transition/waitlist-home.png" alt="" />
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={cx(styles.wrap, styles.footerInner)}>
          <div className={styles.footerTop}>
            <Wordmark height={32} />
            <nav aria-label="Footer" className={styles.footerNav}>
              {FOOTER_LINKS.map((l) => (
                <a key={l.t} href={l.href}>
                  {l.t}
                </a>
              ))}
              <button type="button" onClick={openCookieSettings} className={styles.footerButton}>
                Cookie settings
              </button>
            </nav>
          </div>
          <div className={styles.footerLegal}>
            <span>
              Begin is not a bank and does not hold customer funds. Balances in the new Begin are USDC, a digital dollar
              issued by Circle, in wallets that only customers control. Begin Wallet is self-custodial software; Begin
              can’t see or move what’s in it. Begin is a product of Neuralspark Limited.
            </span>
            <span>
              © {new Date().getFullYear()} {COMPANY.name} · {COMPANY.registeredOffice} · VAT {COMPANY.vatNumber}
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default TransitionLanding
