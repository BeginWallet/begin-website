export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

declare global {
  interface Window {
    gtag: any
    dataLayer: any[]
  }
}

// Google Analytics only loads after the visitor accepts analytics cookies
// (components/cookie-consent.tsx). Until then window.gtag is the stub defined
// in pages/_document.tsx, which only queues calls and sets no cookies.

const gtagSafe = (...args: any[]) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') window.gtag(...args)
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (!GA_TRACKING_ID) return
  gtagSafe('config', GA_TRACKING_ID, { page_path: url })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: { action: string; category?: string; label?: string; value?: any }) => {
  gtagSafe('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

let loaded = false

// Loads gtag.js and starts measurement. Call only after consent is granted.
export const loadAnalytics = () => {
  if (loaded || !GA_TRACKING_ID || typeof document === 'undefined') return
  loaded = true
  gtagSafe('consent', 'update', { analytics_storage: 'granted' })
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
  document.head.appendChild(s)
  gtagSafe('js', new Date())
  gtagSafe('config', GA_TRACKING_ID, { page_path: window.location.pathname })
}
