import Head from 'next/head'
import Meta from '../components/meta'
import TransitionLanding, { useLocale } from '../components/transition/transition-landing'
import { COPY, LOCALES, OG_LOCALE } from '../components/transition/i18n'

// Homepage: Begin as a dollar account (USDC on Solana) that only the user can open.
// The previous Begin Wallet homepage is in git history (pages/index.tsx).

const SITE = 'https://begin.is'
const urlFor = (l: string) => (l === 'en' ? `${SITE}/` : `${SITE}/${l}`)
const IMAGE = 'https://begin.is/images/begin_cover.png'

const Index = () => {
  const locale = useLocale()
  const { title: TITLE, description: DESCRIPTION } = COPY[locale].meta
  const url = urlFor(locale)
  return (
    <>
      <Meta />
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta httpEquiv="Content-Security-Policy" content="frame-ancestors 'none'" />
        <link rel="canonical" href={url} />
        {LOCALES.map((l) => (
          <link key={l} rel="alternate" hrefLang={l} href={urlFor(l)} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={urlFor('en')} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Begin" />
        <meta property="og:url" content={url} />
        <meta property="og:locale" content={OG_LOCALE[locale]} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={IMAGE} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@BeginWallet" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={IMAGE} />

        <meta name="apple-itunes-app" content="app-id=1642488837" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Begin',
              legalName: 'Neuralspark Limited',
              url: 'https://begin.is',
              logo: 'https://begin.is/favicon/web-app-manifest-512x512.png',
              sameAs: ['https://x.com/BeginWallet'],
            }),
          }}
        />
      </Head>
      <TransitionLanding />
    </>
  )
}

export default Index
