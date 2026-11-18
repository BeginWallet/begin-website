import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { loadAnalytics, pageview } from '../lib/gtag'
import { COPY, toLocale } from './transition/i18n'

// Cookie consent for the Irish ePrivacy Regulations (S.I. 336/2011):
// analytics cookies are off until the visitor accepts them, and rejecting is
// as easy as accepting. The choice is kept in localStorage for 6 months.

const KEY = 'begin-cookie-consent'
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 182
export const OPEN_EVENT = 'begin:cookie-settings'

type Choice = 'granted' | 'denied'

const readChoice = (): Choice | null => {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return null
    const { choice, at } = JSON.parse(raw)
    if ((choice !== 'granted' && choice !== 'denied') || Date.now() - at > MAX_AGE_MS) return null
    return choice
  } catch {
    return null
  }
}

const saveChoice = (choice: Choice) => {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ choice, at: Date.now() }))
  } catch {
    /* storage blocked: the banner will ask again next visit */
  }
}

// Opens the banner again, e.g. from a "Cookie settings" link.
export const openCookieSettings = () => {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(OPEN_EVENT))
}

const CookieConsent = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [granted, setGranted] = useState(false)

  useEffect(() => {
    const choice = readChoice()
    if (choice === 'granted') {
      setGranted(true)
      loadAnalytics()
    } else if (choice === null) {
      setOpen(true)
    }
    const reopen = () => setOpen(true)
    window.addEventListener(OPEN_EVENT, reopen)
    return () => window.removeEventListener(OPEN_EVENT, reopen)
  }, [])

  useEffect(() => {
    if (!granted) return
    const onRoute = (url: string) => pageview(url)
    router.events.on('routeChangeComplete', onRoute)
    return () => router.events.off('routeChangeComplete', onRoute)
  }, [granted, router.events])

  const choose = (choice: Choice) => {
    saveChoice(choice)
    setOpen(false)
    if (choice === 'granted') {
      setGranted(true)
      loadAnalytics()
    } else if (granted) {
      // Withdrawing consent: stop measurement now and clear GA cookies.
      window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
      document.cookie.split(';').forEach((c) => {
        const name = c.split('=')[0].trim()
        if (name.startsWith('_ga')) {
          const host = window.location.hostname
          document.cookie = `${name}=; Max-Age=0; path=/`
          document.cookie = `${name}=; Max-Age=0; path=/; domain=.${host.replace(/^www\./, '')}`
        }
      })
      window.location.reload()
    }
  }

  if (!open) return null

  const locale = toLocale(router.locale)
  const t = COPY[locale].cookie
  const period = locale.startsWith('zh') ? '。' : '.'

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.title}
      style={{
        position: 'fixed',
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 1000,
        maxWidth: 440,
        marginLeft: 'auto',
        background: '#FFFFFF',
        color: '#0A0A0B',
        borderRadius: 24,
        boxShadow: '0 12px 40px rgba(10,10,11,0.18), 0 0 0 1px rgba(10,10,11,0.06)',
        padding: 20,
        fontFamily: "'Begin Sans', system-ui, -apple-system, 'Segoe UI', sans-serif",
        fontSize: 15,
        lineHeight: 1.5,
      }}
    >
      <p style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 500 }}>{t.title}</p>
      <p style={{ margin: '0 0 16px', color: '#3A3A3C' }}>
        {t.body}
        {locale.startsWith('zh') ? '' : ' '}
        <a href="/terms/privacy" style={{ color: '#0A0A0B', textDecoration: 'underline' }}>
          {t.privacy}
        </a>
        {period}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <button
          type="button"
          onClick={() => choose('granted')}
          style={{
            flex: '1 1 140px',
            height: 48,
            border: 0,
            borderRadius: 24,
            background: '#0A0A0B',
            color: '#FFFFFF',
            fontSize: 15,
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {t.accept}
        </button>
        <button
          type="button"
          onClick={() => choose('denied')}
          style={{
            flex: '1 1 140px',
            height: 48,
            border: 0,
            borderRadius: 24,
            background: '#F4F4F5',
            color: '#0A0A0B',
            fontSize: 15,
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {t.reject}
        </button>
      </div>
    </div>
  )
}

export default CookieConsent
