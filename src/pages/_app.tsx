import { AppProps } from 'next/app'
import '../styles/index.css'
import 'highlight.js/styles/hybrid.css'
import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";
import translate, { setLanguage, messages } from "../lib/translate";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { locale, defaultLocale, pathname } = router;
  setLanguage(locale || 'en')

  return (
    <IntlProvider 
      locale={locale || 'en'}
      defaultLocale={defaultLocale}
      messages={messages}
    >
      <Component {...pageProps} />
    </IntlProvider>
    );
}
