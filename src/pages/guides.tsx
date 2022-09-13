import Link from 'next/link'
import HeroPost from '../components/hero-post'
import MoreStories from '../components/more-stories'
import { getGuides, getPosts } from '../lib/api'
import Post from '../types/post'
import Container from '../components/container'
import Navigation from '../components/navigation'
import Layout from '../components/layout'
import Head from 'next/head'
import { GA_TRACKING_ID } from '../lib/gtag'
import { defineMessages } from 'react-intl'
import f from "../lib/translate";

type Props = {
  allPosts: {
    hero: Post
    stories: Post[]
  }
}

const messages = defineMessages({
  pageTitle: {
    id: 'page.title',
    defaultMessage: 'Begin Wallet - User Guides | Web3, NFTs and Crypto wallet on Cardano ADA'
  },
  pageDescription: {
    id: 'page.description',
    defaultMessage: 'With Begin you can collect NFTs, earn yeld, send, and participate in our growing digital world. ' +
      'Where everyone is welcome on Begin DeFi Wallet on Cardano, that you are in control of your finances.'
  }
})

export default function Help({ allPosts }: Props) {
  const heroPost = allPosts.hero
  const morePosts = allPosts.stories

  return (
    <>
      <Layout>
        <Head>
          <title>{f(messages.pageTitle)}</title>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@BeginWallet" />
          <meta name="twitter:title" content={f(messages.pageTitle)} />
          <meta name="twitter:description" content={`${f(messages.pageDescription)}`} />
          {/* TODO: Change cover page */}
          <meta name="twitter:image" content="https://begin.is/images/cover.jpeg" />
          <meta
            name="og:description"
            content={`${f(messages.pageDescription)}`}
          />
          <meta property="og:image" content="/images/cover.jpeg" />
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
        </Head>
        <Navigation />
        <Container>
          <section id="features" className="mx-auto">
            <div className='pt-16 lg:pt-32 p-4 lg:p-12'>
              <h2 className='lg:w-6/12 lg:text-5xl text-2xl'>User Guides</h2>
              {heroPost.title !== undefined && (
                <HeroPost
                  title={heroPost.title}
                  coverImage={heroPost.coverImage}
                  date={heroPost.date}
                  author={heroPost.author}
                  slug={heroPost.slug}
                  excerpt={heroPost.excerpt}
                  baseURL='/guides/'
                />
              )}
              {morePosts.length > 0 && <MoreStories posts={morePosts} baseURL='/guides/' />}
            </div>
          </section>
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getGuides([
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