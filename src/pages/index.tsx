import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Navigation from '../components/navigation'
import Stake from '../components/stake'
import Cardano from '../components/cardano'
import Extra from '../components/extra'
import Layout from '../components/layout'
import { getPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../types/post'
import { useState } from 'react'
import { GA_TRACKING_ID } from '../lib/gtag'
import { defineMessages } from 'react-intl'
import f from "../lib/translate";
import Home from '../components/home'
import Features from '../components/features'
import MoreFeatures from '../components/more-features'
import Mission from '../components/mission'
import Script from 'next/script'

import Team from '../components/team'
import FeaturesGrid from '../components/features-grid'
import Testimonials from '../components/testimonials'
import FAQSection from '../components/faq'
import DownloadCTA from '../components/download-cta'
import FeaturesExtra from '../components/features-extra'
import { Ban } from 'lucide-react'
import BankVsWalletSection from '../components/bank-wallet'

const messages = defineMessages({
  pageTitle: {
    id: 'page.title',
    defaultMessage: 'Begin Wallet — Your Crypto Journey Begins Here'
  },
  pageDescription: {
    id: 'page.description',
    defaultMessage: 'Secure, open-source wallet for Bitcoin and Cardano. Stake, lend, and participate in governance. Available on iOS, Android, and Chrome.'
  },
  pageDescriptionExtra: {
    id: 'page.description.extra',
    defaultMessage: 'Begin Wallet is an open-source crypto wallet supporting Bitcoin and Cardano. Stake ADA, delegate governance votes, lend with Liqwid, and explore dApps.'
  }
})


type Props = {
  allPosts: {
    hero: Post
    stories: Post[]
  }
}

const Index = ({ allPosts }: Props) => {
  const heroPost = allPosts.hero
  const morePosts = allPosts.stories

  return (
    <>
      <Layout>
        <Head>
          <title>{f(messages.pageTitle)}</title>
          <meta name="description" content={`${f(messages.pageDescription)}`} />
          <meta httpEquiv="Content-Security-Policy" content="default-src https:; frame-ancestors 'none'" />
          <meta name="twitter:card" content="app" />
          {/* <meta name="twitter:card" content="summary_large_image" /> */}
          <meta name="twitter:site" content="@BeginWallet" />
          <meta name="twitter:title" content={f(messages.pageTitle)} />
          <meta name="twitter:description" content={`${f(messages.pageDescription)}`} />
          <meta name="twitter:app:name:iphone" content="Begin Wallet"/>
          <meta name="twitter:app:id:iphone" content="1642488837"/>
          <meta name="twitter:app:url:iphone" content="beginwallet://browse?dappUrl=https://begin.is"/>
          <meta name="twitter:app:name:ipad" content="Begin Wallet" />
          <meta name="twitter:app:id:ipad" content="1642488837" />
          <meta name="twitter:app:url:ipad" content="beginwallet://browse?dappUrl=https://begin.is" />
          <meta name="twitter:app:name:googleplay" content="Begin Wallet" />
          <meta name="twitter:app:id:googleplay" content="is.begin.app" />
          <meta name="twitter:app:url:googleplay" content="beginwallet://browse?dappUrl=https://begin.is" />
          {/* TODO: Change cover page */}
          <meta name="twitter:image" content="https://begin.is/images/begin_cover.png" />
          <meta
            name="og:description"
            content={`${f(messages.pageDescription)}`}
          />
          <meta property="og:image" content="/images/begin_cover.png" />
          
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
            }}
          />
        
          <link rel="canonical" href="https://begin.is/" />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Begin Wallet",
            "description": f(messages.pageDescriptionExtra),
            "operatingSystem": "iOS, Android, Chrome",
            "applicationCategory": "FinanceApplication",
            "url": "https://begin.is",
            "image": "https://begin.is/images/begin_cover.png",
            "inLanguage": ["en", "pt-BR"],
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "2100"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Begin",
              "url": "https://begin.is",
              "logo": {
                "@type": "ImageObject",
                "url": "https://begin.is/logo.png" // Replace with your actual logo
              }
            },
            "downloadUrl": [
              "https://apps.apple.com/app/id123456789", // Replace with real links
              "https://play.google.com/store/apps/details?id=com.beginwallet",
              "https://chrome.google.com/webstore/detail/begin-wallet/abcdefg"
            ]
          }) }} />
        </Head>
        <Navigation />
        <Home />
        <FeaturesGrid />
        <Testimonials />
        <FeaturesExtra />
        <BankVsWalletSection />
        <FAQSection />
        {/* <Container> */}
          {/* <Features /> */}
          {/* <MoreFeatures /> */}
          {/* <Mission /> */}
          {/* <Team /> */}
        {/* </Container> */}
      </Layout>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  const allPosts = getPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'hero',
  ])

  return {
    props: { allPosts },
  }
}