import Head from 'next/head'
import Meta from '../components/meta'
import TransitionLanding from '../components/transition/transition-landing'

// Homepage: Begin as a dollar account (USDC on Solana) that only the user can open.
// The previous Begin Wallet homepage is in git history (pages/index.tsx).

const TITLE = 'Begin: a dollar account only you can open'
const DESCRIPTION =
  'Hold digital dollars on your phone, send them free to anyone on Begin in about five seconds, and cash out to your bank. Begin can’t move your money. iPhone, Android and Chrome.'
const IMAGE = 'https://begin.is/images/begin_cover.png'

const Index = () => (
  <>
    <Meta />
    <Head>
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <meta httpEquiv="Content-Security-Policy" content="frame-ancestors 'none'" />
      <link rel="canonical" href="https://begin.is/" />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Begin" />
      <meta property="og:url" content="https://begin.is/" />
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

export default Index
