import Wordmark from "./wordmark";
import { openCookieSettings } from "../cookie-consent";
import { COMPANY } from "../../lib/company";
import styles from "./transition.module.css";
import {
  FACTS,
  FAQ,
  FEES,
  FOOTER_LINKS,
  GET_LINKS,
  ICONS,
  MORE,
  PHONE_ACTIONS,
  PHONE_COINS,
  PHONE_TABS,
  PROOF,
  STEPS,
  STORES,
} from "./content";

type IconProps = {
  d: string;
  size?: number;
  width?: number;
  filled?: boolean;
  className?: string;
};

const Icon = ({
  d,
  size = 20,
  width = 1.7,
  filled = false,
  className,
}: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke={filled ? "none" : "currentColor"}
    strokeWidth={width}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

const Dot = () => <span className={styles.dot}>.</span>;

const cx = (...c: (string | false | undefined)[]) =>
  c.filter(Boolean).join(" ");

const external = { target: "_blank", rel: "noopener noreferrer" };

const Phone = () => (
  <div
    className={styles.phone}
    role="img"
    aria-label="The Begin app Home screen: $2,400.00 in your dollars, with Add, Send, Receive and Cash out"
  >
    <div className={styles.screen} aria-hidden="true">
      <div className={styles.balance}>
        <span className={styles.balanceLabel}>Your dollars</span>
        <span className={styles.balanceValue}>
          $2,400<span className={styles.balanceCents}>.00</span>
        </span>
      </div>
      <div className={styles.actions}>
        {PHONE_ACTIONS.map((a) => (
          <span key={a.l} className={styles.action}>
            <span
              className={cx(
                styles.actionIcon,
                a.primary && styles.actionIconPrimary,
              )}
            >
              <Icon d={a.d} size={18} width={1.8} />
            </span>
            {a.l}
          </span>
        ))}
      </div>
      <div className={styles.coins}>
        {PHONE_COINS.map((c) => (
          <div key={c.sym} className={styles.coin}>
            <span className={styles.coinIcon}>{c.ic}</span>
            <span className={styles.coinText}>
              {c.sym}
              <span className={styles.coinNet}>{c.net}</span>
            </span>
            <span className={styles.coinValue}>{c.v}</span>
          </div>
        ))}
      </div>
      <div className={styles.earnRow}>
        <span className={styles.earnDot} />
        <span className={styles.coinText}>
          Earn on your dollars
          <span className={styles.coinNet}>Off until you turn it on</span>
        </span>
        <Icon d={ICONS.chevron} size={14} />
      </div>
      <div className={styles.tabBar}>
        {PHONE_TABS.map((t) => (
          <span
            key={t.l}
            className={cx(styles.tab, t.active && styles.tabActive)}
          >
            <Icon d={t.d} size={18} width={1.7} />
            {t.l}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const TransitionLanding = () => (
  <div id="top" className={styles.page}>
    <header className={cx(styles.wrap, styles.header)}>
      <a href="#top" aria-label="Begin home" className={styles.logo}>
        <Wordmark height={26} />
      </a>
      <nav aria-label="Main" className={styles.nav}>
        <a href="#how">How it works</a>
        <a href="#yours">Only yours</a>
        <a href="#fees">Fees</a>
        <a href="#faq">Help</a>
      </nav>
      <a
        href="#get"
        className={cx(styles.btn, styles.btnPrimary, styles.headerCta)}
      >
        Get Begin
      </a>
    </header>

    <main>
      <section aria-labelledby="heroH" className={cx(styles.wrap, styles.hero)}>
        <div className={styles.heroText}>
          <h1 id="heroH" className={styles.h1}>
            Only you can open it
            <Dot />
          </h1>
          <p className={styles.heroLead}>
            A dollar account on your phone, in digital dollars. Hold them, send
            them free to anyone on Begin in about five seconds, and cash out to
            your bank when you need to. Begin can’t move your money.
          </p>
          <div className={styles.storeRow}>
            {STORES.map((s) => (
              <a
                key={s.t}
                href={s.href}
                {...external}
                className={cx(
                  styles.btn,
                  styles.storeBtn,
                  s.primary ? styles.btnPrimary : styles.btnSoft,
                )}
              >
                <Icon d={s.icon} size={22} width={1.6} filled={s.filled} />
                {s.t}
              </a>
            ))}
          </div>
          <span className={styles.heroNote}>
            Free to download · iPhone, Android and Chrome
          </span>
        </div>

        <div className={styles.heroArt}>
          <div className={styles.heroPhoto}>
            <img
              src="/images/transition/ana-laptop.jpg"
              alt="A young woman smiling at her laptop by a sunny window"
            />
          </div>
          <div className={styles.toast}>
            <span className={styles.toastIcon}>
              <Icon d={ICONS.receive} size={18} width={1.8} />
            </span>
            <span className={styles.stack}>
              <span className={styles.toastTitle}>+$50.00 from @maria</span>
              <span className={styles.toastSub}>
                Arrived in 5 seconds · free
              </span>
            </span>
          </div>
          <Phone />
        </div>
      </section>

      <section aria-label="At a glance" className={styles.glance}>
        <div className={styles.wrap}>
          <ul className={styles.glanceGrid}>
            {PROOF.map((p) => (
              <li key={p.t} className={styles.glanceItem}>
                <span className={styles.roundIcon}>
                  <Icon d={p.d} size={20} />
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

      <section
        id="how"
        aria-labelledby="howH"
        className={cx(styles.wrap, styles.section, styles.how)}
      >
        <div className={styles.sectionHead}>
          <h2 id="howH" className={styles.h2} style={{ maxWidth: 720 }}>
            Add dollars. Send them. Cash out
            <Dot />
          </h2>
          <p className={styles.lead} style={{ maxWidth: 440 }}>
            Your balance is USDC, a digital dollar. One USDC is meant to be
            worth one US dollar, and it sits in a wallet on Solana that only you
            control.
          </p>
        </div>
        <ol className={styles.steps}>
          {STEPS.map((s) => (
            <li key={s.n} className={styles.step}>
              <div className={styles.stepTop}>
                <span className={styles.eyebrow}>Step {s.n}</span>
                <span className={styles.stepArt}>
                  <img src={s.src} alt="" />
                </span>
              </div>
              <h3 className={styles.stepTitle}>{s.t}</h3>
              <p className={styles.stepBody}>{s.b}</p>
              <span className={styles.stepTag}>{s.tag}</span>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="yours"
        aria-labelledby="yoursH"
        className={cx(styles.wrap, styles.section)}
      >
        <div className={styles.dark}>
          <div className={styles.darkIntro}>
            <span className={styles.darkArt}>
              <img src="/images/transition/only-yours-shield.png" alt="" />
            </span>
            <h2 id="yoursH" className={styles.h2}>
              Begin can’t move your money
              <Dot />
            </h2>
            <p className={styles.darkLead}>
              Begin isn’t a bank, and it doesn’t hold your dollars. They sit in
              a wallet on your phone. If a company closes or freezes its app,
              your wallet still opens, because only you have the way in.
            </p>
          </div>
          <ul className={styles.facts}>
            {FACTS.map((f) => (
              <li key={f.t} className={styles.fact}>
                <span className={styles.factIcon}>
                  <Icon d={f.d} size={20} />
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

      <section
        id="more"
        aria-labelledby="moreH"
        className={cx(styles.wrap, styles.section, styles.more)}
      >
        <h2 id="moreH" className={styles.h2Small}>
          Also in the app
          <Dot />
        </h2>
        <ul className={styles.moreGrid}>
          {MORE.map((m) => (
            <li key={m.t} className={styles.moreCard}>
              <span className={styles.moreIcon}>
                <Icon d={m.d} size={22} />
              </span>
              <h3 className={styles.moreTitle}>{m.t}</h3>
              <p className={styles.moreBody}>{m.b}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="invite"
        aria-labelledby="inviteH"
        className={cx(styles.wrap, styles.section)}
      >
        <div className={styles.invite}>
          <div className={styles.inviteText}>
            <span className={styles.eyebrow}>Invite a friend</span>
            <h2 id="inviteH" className={styles.h2}>
              They get $2. You get $1
              <Dot />
            </h2>
            <p className={styles.lead} style={{ maxWidth: 460 }}>
              Paid in dollars once your friend adds $20 or more, keeps it for 7
              days and sends once on Begin. Up to 10 friends.
            </p>
            <span className={styles.small}>
              Money you send your friend doesn’t count toward their $20.
            </span>
          </div>
          <div className={styles.invitePhoto}>
            <img
              src="/images/transition/mom-kitchen.jpg"
              alt="A woman in her kitchen smiling at her phone"
            />
            <span className={styles.inviteChip}>
              <span className={styles.small}>Added to your dollars</span>
              <span className={styles.inviteAmount}>+$2.00</span>
            </span>
          </div>
        </div>
      </section>

      <section
        id="fees"
        aria-labelledby="feesH"
        className={cx(styles.wrap, styles.section, styles.split)}
      >
        <div className={styles.splitIntro}>
          <h2 id="feesH" className={styles.h2}>
            Fees, before you pay
            <Dot />
          </h2>
          <p className={styles.lead} style={{ maxWidth: 400 }}>
            Moving dollars inside Begin is free. When money comes in from a card
            or goes out to a bank, our partner charges a fee, and you see all of
            it before you confirm.
          </p>
        </div>
        <dl className={styles.feeTable} style={{ margin: 0 }}>
          {FEES.map((f) => (
            <div key={f.k} className={styles.feeRow}>
              <dt>{f.k}</dt>
              <dd
                className={cx(styles.feeValue, f.strong && styles.feeStrong)}
                style={{ margin: 0 }}
              >
                {f.v}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        id="faq"
        aria-labelledby="faqH"
        className={cx(styles.wrap, styles.section, styles.split)}
      >
        <div className={styles.splitIntro}>
          <h2 id="faqH" className={styles.h2}>
            Questions
            <Dot />
          </h2>
          <p className={styles.lead} style={{ maxWidth: 320 }}>
            Help at any hour. Ask Begin answers 24/7, and our team steps in when
            you need a person.
          </p>
          <a
            href="/docs"
            className={cx(styles.btn, styles.btnSoft)}
            style={{ alignSelf: "flex-start" }}
          >
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

      <section
        id="get"
        aria-labelledby="getH"
        className={cx(styles.wrap, styles.section, styles.get)}
      >
        <div className={styles.getCard}>
          <div className={styles.getText}>
            <h2 id="getH" className={styles.getTitle}>
              Get Begin
              <Dot />
            </h2>
            <p className={styles.lead} style={{ maxWidth: 420 }}>
              A dollar account on your phone that only you can open.
            </p>
            <span className={styles.small}>
              Only download Begin from the App Store, Google Play, the Chrome
              Web Store or begin.is.
            </span>
          </div>
          <div className={styles.getLinks}>
            {GET_LINKS.map((d) => (
              <a
                key={d.t}
                href={d.href}
                {...external}
                className={styles.getLink}
              >
                <span className={styles.getLinkIcon}>
                  <Icon d={d.icon} size={22} width={1.6} filled={d.filled} />
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
          <nav aria-label="Footer" className={styles.footerNav}>
            {FOOTER_LINKS.map((l) => (
              <a key={l.t} href={l.href}>
                {l.t}
              </a>
            ))}
            <button
              type="button"
              onClick={openCookieSettings}
              className={styles.footerButton}
            >
              Cookie settings
            </button>
          </nav>
        </div>
        <div className={styles.footerLegal}>
          <span>
            Begin is not a bank and does not hold customer funds. Your balance
            is USDC, a digital dollar issued by Circle, in a wallet that only
            you control. USDC is not a bank deposit, is not covered by any
            deposit guarantee and can lose its peg. Adding money and cashing out
            are provided by our payment partner and depend on your country.
            Begin is a product of {COMPANY.name}.
          </span>
          <span>
            © {new Date().getFullYear()} {COMPANY.name} ·{" "}
            {COMPANY.registeredOffice} · Registered in Ireland, no.{" "}
            {COMPANY.croNumber} · VAT {COMPANY.vatNumber}
          </span>
        </div>
      </div>
    </footer>
  </div>
);

export default TransitionLanding;
