import { AppProps } from 'next/app'
import '../styles/index.css'
import 'highlight.js/styles/hybrid.css'
import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";
import translate, { setLanguage, messages } from "../lib/translate";
import { CookiesProvider } from 'react-cookie';
import CookieConsent from '../components/cookie-consent';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { locale, defaultLocale, pathname } = router;
  setLanguage(locale || 'en')

  return (
    <CookiesProvider>
      <IntlProvider 
        locale={locale || 'en'}
        defaultLocale={defaultLocale}
        messages={messages}
      >
        <Component {...pageProps} />
        <CookieConsent />
      </IntlProvider>
    </CookiesProvider>
    );
}
