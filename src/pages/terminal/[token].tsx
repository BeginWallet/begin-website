import { useRouter } from 'next/router';
import Head from 'next/head';
import TokenOverview from '../../components/terminal/Token/TokenOverview';

const TokenPage = () => {
  const router = useRouter();
  const { token } = router.query;

  // Next.js may render before the query is ready
  if (!router.isReady || typeof token !== 'string') {
    return (
      <div className="h-screen bg-[#141414] flex items-center justify-center">
        <span className="font-mono text-xs text-[#666]">Loading...</span>
      </div>
    );
  }

  const symbol = token.toUpperCase();

  return (
    <>
      <Head>
        <title>{symbol} - Begin Terminal</title>
        <meta
          name="description"
          content={`${symbol} price, chart, and market data on Begin Terminal`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={`${symbol} - Begin Terminal`} />
        <meta
          property="og:description"
          content={`Live ${symbol} price chart, market cap, volume, and key metrics`}
        />
      </Head>
      <TokenOverview tokenId={token} />
    </>
  );
};

export default TokenPage;
