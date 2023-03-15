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
import CoverImage from '../components/cover-image'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCards, Pagination, Navigation as NavSwiper } from "swiper";
import { useState } from 'react'

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

export default function Nft({ allPosts }: Props) {
  const heroPost = allPosts.hero
  const morePosts = allPosts.stories
  const [ activeIndex, setActiveIndex] = useState(0);
  const [ collection, setCollection] = useState(0)

  return (
    <>
      <Layout>
        <Head>
          <title>{f(messages.pageTitle)}</title>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@BeginWallet" />
          <meta name="twitter:title" content={f(messages.pageTitle)} />
          <meta
            name="twitter:description"
            content={`${f(messages.pageDescription)}`}
          />
          {/* TODO: Change cover page */}
          <meta
            name="twitter:image"
            content="https://begin.is/images/cover.jpeg"
          />
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
        <header className="video-header">
          <video
            src="/nft/new_york_top.mp4"
            autoPlay={true}
            loop={true}
            playsInline={true}
            muted={true}
            controls={false}
            data-autoplay=''
          ></video>
          <div className="viewport-header">
            <h1>
              Digital <br /> Collectibles
              <span>Begin NYC</span>
            </h1>
          </div>
          <div
            className="flex items-center justify-center"
            style={{ marginTop: "72vh" }}
          >
            <div className="flex-0 lg:w-4/12 w-10/12 ">
              <Swiper
                effect={"cards"}
                grabCursor={true}
                pagination={false}
                navigation={true}
                modules={[EffectCards, Pagination, NavSwiper]}
                className="mySwiper"
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              >
                {collection === 0 ? (
                  <>
                    <SwiperSlide>
                      <img src="/nft/collections/og_sol_bg.png" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="/nft/collections/og_sol_comics.png" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="/nft/collections/og_sol_mona.png" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="/nft/collections/og_sol_noun.png" />
                    </SwiperSlide>
                  </>
                ) : (
                  <>
                    <SwiperSlide>
                      <img src="/nft/collections/sol_bg.png" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="/nft/collections/sol_comics.png" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="/nft/collections/sol_mona.png" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="/nft/collections/sol_noun.png" />
                    </SwiperSlide>
                  </>
                )}
              </Swiper>

              <div>
                <div className="flex pt-6">
                  <div className="flex-1">
                    <a
                      onClick={() => setCollection(0)}
                      role="button"
                      className="og-style p-4 border-2 border-blue-medium bg-blue-medium hover:border-white hover:shadow-lg hover:bg-white hover:text-blue-light text-sm text-white text-center rounded-xl"
                    >
                      OG Collection
                    </a>
                  </div>
                  <div className="flex-1">
                    <a
                      onClick={() => setCollection(1)}
                      role="button"
                      className="p-4 border-2 border-blue-medium bg-blue-medium hover:border-white hover:shadow-lg hover:bg-white hover:text-blue-light text-sm text-white text-center rounded-xl"
                    >
                      Standard Collection
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* <main>
  [[[https://codepen.io/chriscoyier/pen/VbqzER]]]
</main> */}
        <Container>
          <section
            id="nfts"
            className="mx-auto"
            style={{ marginTop: "100vh", paddingTop: "40vh" }}
          >
            {activeIndex === 0 && (
              <div>
                <h3>Begin NYC SOL 3D BW</h3>
                <p>Statue of Liberty in 3D with black & white paint</p>
              </div>
            )}
            {activeIndex === 1 && (
              <div>
                <h3>Begin NYC SOL Comics</h3>
                <p>Statue of Liberty in comics style</p>
              </div>
            )}
            {activeIndex === 2 && (
              <div>
                <h3>Begin NYC SOL Mona</h3>
                <p>Statue of Liberty paiting with Mona Lisa's face</p>
              </div>
            )}
            {activeIndex === 3 && (
              <div>
                <h3>Begin NYC SOL Noun</h3>
                <p>Statue of Liberty with Noun Glass</p>
              </div>
            )}
            <div className="pt-16 lg:pt-32 p-6 lg:p-12 flex lg:flex-row flex-col-reverse">
              <div className="flex-1 px-4">
                <h1 className="lg:w-6/12 lg:text-5xl text-2xl text-bold">
                  #BEGINNFT #NFTNYC2023
                </h1>
                <p>
                  Welcome to our first #NFT drop and we're celebrating the
                  Cardano community together with NFT.NYC.
                </p>
                <br />
                <p>
                  Begin NYC NFTs are minted on Cardano Blockchain, with a 2k max
                  supply and utility already built in.
                </p>
                <br />
                <p>
                  Buy, Sell, Collect and Unlock Begin Wallet #BADGES from our
                  exclusive dashboard.
                </p>
                <br />
                <p>Register with your Begin Wallet to become an OG member.</p>
                <div className="flex pt-6">
                  <a
                    href="#download"
                    role="button"
                    className="p-4 border-2 border-blue-medium bg-blue-medium hover:border-white hover:shadow-lg hover:bg-white hover:text-blue-light text-sm text-white text-center rounded-xl"
                  >
                    Connect with Begin
                  </a>
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-4 md:mb-8 -mx-5 sm:mx-0">
                  <img className="" src={"/nft/collections/nyc_banner.png"} />
                </div>
              </div>

              {/* <img className='' src='/nft/collections/OG_sol_bg.png'/> */}
              {/* {heroPost.title !== undefined && (
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
              {morePosts.length > 0 && <MoreStories posts={morePosts} baseURL='/guides/' />} */}
            </div>
            <div className="pt-16 lg:pt-32 p-6 lg:p-12 flex lg:flex-row flex-col">
              <div className="flex-1">
                <div className="mb-4 md:mb-8 -mx-5 sm:mx-0">
                  <img
                    className=""
                    src={"/nft/collections/badges_banner.png"}
                  />
                </div>
              </div>
              <div className="flex-1 p-4 lg:pl-12">
                <h1 className="lg:w-6/12 lg:text-5xl text-2xl text-bold">
                  #BEGINBADGES
                </h1>
                <p>
                  Begin Badges are free to claim, which will be a way for to get
                  recognized in our community.
                </p>
                <br />
                <p>They're unclocked according to you levels achiveched:</p>
                <br />
                <ul>
                  <li>OG Begin - Holder of any Begin OG NFT collection</li>
                  <li>BEGIN START - Staking with BEGIN Stake Pool</li>
                  <li>BEGINNER - Holder of any Begin NFT collection</li>
                  <li>THE BEGIN - Any one connected with Begin Wallet</li>
                </ul>
                <br />
                <p>
                  You will be able to claim it from our exclusive dashboard for
                  #FREE.
                </p>
                <br />
              </div>
            </div>
          </section>
        </Container>
      </Layout>
    </>
  );
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