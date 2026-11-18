import { NextRequest, NextResponse } from 'next/server'

// Old placeholder locales (/cn, /jp) are gone: send them to the matching language with a
// permanent redirect. Visitors are never redirected by browser language; each language has its
// own URL with hreflang tags, and the landing page offers the browser's language in a small bar.

export function middleware(req: NextRequest) {
  // The raw path, before Next.js strips the locale.
  const old = new URL(req.url).pathname.match(/^\/(cn|jp)(\/.*)?$/)
  if (!old) return NextResponse.next()
  const url = req.nextUrl.clone()
  url.locale = old[1] === 'cn' ? 'zh-Hans' : 'ja'
  url.pathname = old[2] || '/'
  return NextResponse.redirect(url, 308)
}

// No matcher on purpose: with i18n, Next.js 14 compiles matchers in a way that skips some paths.
// The middleware runs on every request and returns at once for anything but /cn and /jp.
