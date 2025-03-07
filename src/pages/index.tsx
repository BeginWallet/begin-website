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


const messages = defineMessages({
  pageTitle: {
    id: 'page.title',
    defaultMessage: 'Begin Wallet - Buy Bitcoin BTC, Cardano ADA, Crypto Wallet'
  },
  pageDescription: {
    id: 'page.description',
    defaultMessage: 'With Begin you can Buy Bitcoin, BTC, Cardano, ADA, collect NFTs, earn yeld, send, and participate in our growing digital world. '+
    'Where everyone is welcome on Begin DeFi Wallet on Cardano, that you are in control of your finances.'
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
          <meta name="twitter:image" content="https://begin.is/images/cover.jpeg" />
          <meta
            name="og:description"
            content={`${f(messages.pageDescription)}`}
          />
          <meta property="og:image" content="/images/cover.jpeg" />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {/* <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          /> */}
          {/* <script
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
          /> */}
        </Head>
        <Navigation />
        <Home />
        <Container>
          <Features />
          {/* <MoreFeatures /> */}
          {/* <Mission /> */}
          {/* <Team /> */}
        </Container>
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