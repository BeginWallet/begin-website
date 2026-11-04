import Head from 'next/head'
import Meta from '../components/meta'
import TransitionLanding from '../components/transition/transition-landing'

// Temporary homepage for the move from Begin Wallet to the new Begin.
// The previous Begin Wallet homepage is in git history (pages/index.tsx).

const TITLE = 'Begin is changing — the new Begin is coming, Begin Wallet keeps working'
const DESCRIPTION =
  'The new Begin is a dollar account for people who earn across borders and send money home, coming to iPhone first. Begin Wallet keeps working on iPhone, Android and in your browser.'
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
