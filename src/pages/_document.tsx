import Document, { Html, Head, Main, NextScript } from 'next/document'

// Defines a queue-only gtag stub with every consent type denied, so pages can
// call gtag() safely. Google Analytics itself is loaded only after the visitor
// accepts analytics cookies (components/cookie-consent.tsx).
const GTAG_STUB = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied'
});
`

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script dangerouslySetInnerHTML={{ __html: GTAG_STUB }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
