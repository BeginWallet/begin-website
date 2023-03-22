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
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { addressToBech32, formatShortAddress, parseAddress } from '../lib/helpers'
// import { BrowserWallet } from '@meshsdk/core'


type Props = {
  allPosts: {
    hero: Post
    stories: Post[]
  }
}

const messages = defineMessages({
  pageTitle: {
    id: 'page.title',
    defaultMessage: 'Begin Wallet - Begin NFT NYC Cardano Collection Crypto'
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
  const [ collection, setCollection] = useState(0);
  const [hasBegin, setHasBegin] = useState(false);
  const [connected, setConnected] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [walletAddress, setWalletAddresss] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async (event: any) => {
    event.persist()
    setIsLoading(true);
    try {
      if (window['cardano'] && (window["cardano"]["begin"] || window["cardano"]["begin-nightly"])) {
        const wallet =
          window["cardano"]["begin"] || 
          window["cardano"]["begin-nightly"];
        const api =  await wallet.enable();
        const addr = (await api.getRewardAddresses())[0]
  
        const registration = await (await fetch(`/api/registrations?userAddress=${addr}`)).json();
        if (!registration) {
          const bodyNonce = {msg : "Sign & Confirm Registration on Begin NYC Mint: "}
          const nonce = await (await fetch('api/nonce', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyNonce),
            cache: 'no-cache'
          })).json()
  
          console.log('nonce', nonce)
  
          const signature = await api.signData(addr, nonce);
  
          console.log('signature', signature)
  
          const bodyVerify = { userAddress: addr, nonce, signature }
          const resVerify = await fetch("api/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(bodyVerify),
              cache: 'no-cache'
            });
  
          console.log('resVerify', resVerify);
  
          if(!resVerify.ok){
            setIsLoading(false);
            setConnected(false);
            setRegistered(false);
            return 
          }
  
          const verify = await resVerify.json();
  
          if (verify) {
            const paymentAddress = addressToBech32(await api.getChangeAddress());
            const body = { userAddress: addr, walletAddress: paymentAddress, nonce };
            const res = await fetch("api/registrations", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });
  
            if (res.ok) {
              setConnected(true);
              setRegistered(true);
              setWalletAddresss(formatShortAddress(paymentAddress));
            } else {
              alert("Ops! Something went wrong.");
            }
          } else {
            alert("Ops! Not verified.");
          }
        } else if( registration && registration.userAddress) {
          setConnected(true);
          setRegistered(true);
          const paymentAddress = await api.getChangeAddress();
          setWalletAddresss(parseAddress(paymentAddress));
        }
      } else {
        alert('Download Begin Wallet.')
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
    
    
  }

  //CREATE A SMALL LOOP
  // typeof window !== "undefined" &&
  //       window["cardano"]
  const [verifyWindow, setVerifyWindow] = useState(true);
  const [runInit, setRunInit] = useState(false);
  // const maxCount = 10;
  // const count = useRef(0);

  // if (verifyWindow) {
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== "undefined" && window["cardano"]) {
        setRunInit(true);
        console.log('found...');
        clearInterval(interval);
        // setVerifyWindow(false);
      }
      //   else {
      //     setVerifyWindow(true);
      //   }
      // }
    }, 500);
  }, [])


  // useEffect(() => {
  //   if (verifyWindow) {
  //     if (typeof window !== "undefined" && window["cardano"]) {
  //       setRunInit(true);
  //       setVerifyWindow(false);
  //     } else if (count.current <= maxCount) {
  //       console.log(count.current)
  //       setVerifyWindow(true);
  //       count.current = count.current + 1;
  //     }
  //   }
  // }, [verifyWindow]);

  const openPaymentWindow = () => {
    const paymentUrl = "https://pay.nmkr.io/?p=bdf2105f819c408e94f609ce6136c880&c=1";

    // Specify the popup width and height
    const popupWidth = 500;
    const popupHeight = 700;

    // Calculate the center of the screen
    const left = (window?.top?.outerWidth || 0) / 2 + (window?.top?.screenX || 0) - ( popupWidth / 2);
    const top = (window?.top?.outerHeight || 0) / 2 + (window?.top?.screenY || 0) - ( popupHeight / 2);

    const popup =  window.open(paymentUrl, "NFT-MAKER PRO Payment Gateway",  `popup=1, location=1, width=${popupWidth}, height=${popupHeight}, left=${left}, top=${top}`);

    // Show dim background
    // document.body.style.background = "rgba(0, 0, 0, 0.5)";

    // Continuously check whether the popup has been closed
    const backgroundCheck = setInterval(function () {
        if(popup && popup.closed) {
            clearInterval(backgroundCheck);

            console.log("Popup closed");

            // Remove dim background
            // document.body.style.background = "";
        }
    }, 1000);
}


  useEffect(() => {
    const init = async () => {
      if (
        typeof window !== "undefined" &&
        window["cardano"] &&
        (window["cardano"]["begin"] || window["cardano"]["begin-nightly"])
      ) {
        setHasBegin(true);
        const wallet: any =
          window["cardano"]["begin"] || window["cardano"]["begin-nightly"];
        const isEnabled = await wallet.isEnabled();
        setConnected(isEnabled);
        if (isEnabled) {
          const api = await wallet.enable();
          const addr = (await api.getRewardAddresses())[0];

          const registration = await (
            await fetch(`/api/registrations?userAddress=${addr}`)
          ).json();
          if (registration && registration.userAddress) {
            setRegistered(true);
            const paymentAddress = await api.getChangeAddress();
            setWalletAddresss(parseAddress(paymentAddress));
          }
        }
      }
    };

    runInit && init();
  }, [runInit])

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
            content="https://begin.is/nft/cover_nft.jpg"
          />
          <meta
            name="og:description"
            content={`${f(messages.pageDescription)}`}
          />
          <meta property="og:image" content="/nft/cover_nft.jpg" />
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
          <img
            // className="block lg:hidden"
            src="/nft/new_york_top_mobile.jpg"
          />
          {/* <video
            className="hidden lg:block"
            src="/nft/new_york_top.mp4"
            autoPlay={true}
            loop={true}
            playsInline={true}
            webkit-playsinline="true"
            muted={true}
            controls={false}
            data-autoplay=""
          ></video> */}
          <div className="lg:viewport-header viewport-header-mobile">
            <h1>
              Digital <br /> Collectibles
              <span>Begin NYC</span>
            </h1>
          </div>
        </header>

        {/* <main>
  [[[https://codepen.io/chriscoyier/pen/VbqzER]]]
</main> */}
        <Container>
          <section id="nfts" className="mx-auto" style={{ marginTop: "100vh" }}>
            <div
              className="flex items-center justify-center"
              style={{ marginTop: "-30vh" }}
            >
              <div className="flex-0 lg:w-4/12 w-full text-center">
                <div className="block lg:hidden">
                  <Swiper
                    slidesPerView={"auto"}
                    centeredSlides={true}
                    spaceBetween={30}
                    grabCursor={true}
                    pagination={false}
                    navigation={true}
                    modules={[Pagination, NavSwiper]}
                    className="mobile-slides"
                    onSlideChange={(swiper) =>
                      setActiveIndex(swiper.activeIndex)
                    }
                  >
                    {collection === 0 ? (
                      <>
                        <SwiperSlide>
                          <img src="/nft/collections/og_sol_bg_512.png" />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img src="/nft/collections/og_sol_comics_512.png" />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img src="/nft/collections/og_sol_mona_512.png" />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img src="/nft/collections/og_sol_noun_512.png" />
                        </SwiperSlide>
                      </>
                    ) : (
                      <>
                        <SwiperSlide>
                          <img src="/nft/collections/sol_bg_512.png" />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img src="/nft/collections/sol_comics_512.png" />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img src="/nft/collections/sol_mona_512.png" />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img src="/nft/collections/sol_noun_512.png" />
                        </SwiperSlide>
                      </>
                    )}
                  </Swiper>
                </div>
                <div className="hidden lg:block">
                  <Swiper
                    effect={"cards"}
                    grabCursor={true}
                    pagination={false}
                    navigation={true}
                    modules={[EffectCards, Pagination, NavSwiper]}
                    className="mySwiper"
                    onSlideChange={(swiper) =>
                      setActiveIndex(swiper.activeIndex)
                    }
                  >
                    {collection === 0 ? (
                      <>
                        <SwiperSlide>
                          <img src="/nft/collections/og_sol_bg_512.png" />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img src="/nft/collections/og_sol_comics_512.png" />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img src="/nft/collections/og_sol_mona_512.png" />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img src="/nft/collections/og_sol_noun_512.png" />
                        </SwiperSlide>
                      </>
                    ) : (
                      <>
                        <SwiperSlide>
                          <img src="/nft/collections/sol_bg_512.png" />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img src="/nft/collections/sol_comics_512.png" />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img src="/nft/collections/sol_mona_512.png" />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img src="/nft/collections/sol_noun_512.png" />
                        </SwiperSlide>
                      </>
                    )}
                  </Swiper>
                </div>
                <div className="p-4">
                  {activeIndex === 0 && (
                    <div>
                      <h3 className="text-2xl">Begin NYC SOL Graphite</h3>
                      <p>Statue of Liberty in graphite paint</p>
                    </div>
                  )}
                  {activeIndex === 1 && (
                    <div>
                      <h3 className="text-2xl">Begin NYC SOL Comics</h3>
                      <p>Statue of Liberty in comics style</p>
                    </div>
                  )}
                  {activeIndex === 2 && (
                    <div>
                      <h3 className="text-2xl">Begin NYC SOL Mona</h3>
                      <p>Statue of Liberty paiting with Mona Lisa's face</p>
                    </div>
                  )}
                  {activeIndex === 3 && (
                    <div>
                      <h3 className="text-2xl">Begin NYC SOL Noun</h3>
                      <p>Statue of Liberty with Noun Glass</p>
                    </div>
                  )}
                </div>
                {/* <div>
                <div className="flex pt-6">
                  <div className="flex-1 p-2">
                    <a
                      onClick={() => setCollection(0)}
                      role="button"
                      className="og-style flex justify-center p-4 border-2 border-blue-medium bg-blue-medium hover:border-white hover:shadow-lg hover:bg-white hover:text-blue-light text-sm text-white text-center rounded-xl"
                    >
                      OG Collection
                    </a>
                  </div>
                  <div className="flex-1 p-2">
                    <a
                      onClick={() => setCollection(1)}
                      role="button"
                      className="flex justify-center p-4 border-2 border-blue-medium bg-blue-medium hover:border-white hover:shadow-lg hover:bg-white hover:text-blue-light text-sm text-white text-center rounded-xl"
                    >
                      Standard Collection
                    </a>
                  </div>
                </div>
              </div> */}
              </div>
            </div>
            <div className="pt-16 lg:pt-32 p-6 lg:p-12 flex lg:flex-row flex-col">
              <div className="flex-1 nft-title text-left">
                <h1 className="lg:text-9xl text-6xl lg:pb-0 pb-6 text-center lg:text-left">
                  Begin OG Collection
                </h1>
              </div>
              <div className="flex flex-1 items-center">
                <div className="flex flex-col">
                  <h2 className="lg:text-4xl text-2xl pb-6">
                    Register NOW with <strong>Begin Wallet</strong> to became OG
                    member!
                  </h2>
                  {connected && registered && (
                    <div className="p-4 w-full og-style lg:text-2xl text-2xl border-2 border-gray-700 bg-blue-medium text-sm text-blue-dark text-center rounded-lg">
                      <p>You're in! Happy Mint!</p>
                      <span className="text-sm">{walletAddress}</span>
                    </div>
                  )}
                  {!registered && hasBegin && (
                    <a
                      onClick={handleConnect}
                      role="button"
                      className="p-4 w-full og-style lg:text-2xl text-2xl border-2 border-gray-700 bg-blue-medium hover:border-white hover:shadow-lg hover:bg-white hover:text-blue-light text-sm text-blue-dark text-center rounded-xl"
                    >
                      {isLoading ? "Connecting..." : "Connect with Begin"}
                    </a>
                  )}
                  {runInit && !connected && !registered && !hasBegin && (
                    <>
                      <p className="text-xl text-center">Download Begin</p>

                      <div className="flex flex-col lg:flex-row justify-center p-6">
                        <a
                          href="https://chrome.google.com/webstore/detail/begin-wallet/nhbicdelgedinnbcidconlnfeionhbml"
                          target="_blank"
                          role="button"
                          className="bg-white hover:border-gray-200 hover:shadow-lg hover:bg-white hover:text-blue-light text-sm text-black py-3 px-1 rounded-xl mb-2 lg:mb-0 lg:w-34 justify-center inline-flex items-center"
                        >
                          Install for Chrome
                        </a>
                        <a
                          href="https://play.google.com/store/apps/details?id=is.begin.app"
                          target="_blank"
                          role="button"
                          className="bg-white hover:border-gray-200 hover:shadow-lg hover:bg-white hover:text-blue-light text-sm text-black py-3 px-1 rounded-xl mb-2 lg:mb-0 lg:ml-4 lg:mr-4 lg:w-34 justify-center inline-flex items-center"
                        >
                          <img
                            src="/images/google_store.svg"
                            className="inline-flex"
                          />
                        </a>
                        <a
                          href="https://apps.apple.com/app/begin-wallet-by-b58-labs/id1642488837"
                          target="_blank"
                          role="button"
                          className="bg-white hover:border-gray-200 hover:shadow-lg hover:bg-white hover:text-blue-light text-sm text-black py-3 px-1 rounded-xl mb-2 lg:mb-0 lg:w-34 justify-center inline-flex items-center"
                        >
                          <img
                            src="/images/apple_store.svg"
                            className="inline-flex"
                          />
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="pt-16 lg:pt-32 p-6 lg:p-12 flex lg:flex-row flex-col">
              <div className="flex-1 nft-title text-left flex items-center">
                <h1 className="lg:text-9xl text-6xl lg:pb-0 pb-6 text-center lg:text-left">
                  About the NYC Drop
                </h1>
              </div>
              <div className="flex flex-wrap content-center flex-1 px-4 text-lg">
                <p>
                  Welcome to our first Digital Collectibles drop to show the
                  power of the Cardano NFT Community at the{" "}
                  <a href="https://nft.nyc" target="_blank">
                    NFT.NYC
                  </a>{" "}
                  event!
                </p>
                <br />
                <p>
                  Begin NYC NFTs are minted on Cardano Blockchain, based on 4
                  unique Artworks with a 2 000 MAX supply and utility already
                  built-in.
                </p>
                <br />
                <p>
                  Buy, Sell, Collect and Unlock Begin Wallet BADGES from our
                  exclusive dashboard.
                </p>
                <br />
                <p className="break-all">
                  The policy IDs of Begin NYC are:
                  <br />*
                  349153f99c85a44f87139c58edbaa979af5bf380818517d87a072530{" "}
                  <br />*
                  12a7faac878f22f0f5b32bd8e116ba6c5f23ba9cba37fe27179dec59{" "}
                  <br />
                </p>
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
            <div className="pt-16 lg:pt-32 p-6 lg:p-12 text-white">
              <div className="flex lg:flex-row flex-col">
                <div className="flex-1 lg:p-6 p-4 m-4 bg-blue-over rounded-2xl">
                  <h1 className="lg:text-5xl text-2xl text-bold text-center">
                    OG
                  </h1>
                  <div className="lg:p-6 p-4 lg:text-xl">
                    <p>Here's what you get as an OG member</p>
                    <br />
                    <p className="flex items-center pb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        width="32px"
                        height="32px"
                        className="mr-4"
                      >
                        <path
                          fill="currentColor"
                          d="M 16 3 C 8.800781 3 3 8.800781 3 16 C 3 23.199219 8.800781 29 16 29 C 23.199219 29 29 23.199219 29 16 C 29 14.601563 28.8125 13.207031 28.3125 11.90625 L 26.6875 13.5 C 26.886719 14.300781 27 15.101563 27 16 C 27 22.101563 22.101563 27 16 27 C 9.898438 27 5 22.101563 5 16 C 5 9.898438 9.898438 5 16 5 C 19 5 21.695313 6.195313 23.59375 8.09375 L 25 6.6875 C 22.699219 4.386719 19.5 3 16 3 Z M 27.28125 7.28125 L 16 18.5625 L 11.71875 14.28125 L 10.28125 15.71875 L 15.28125 20.71875 L 16 21.40625 L 16.71875 20.71875 L 28.71875 8.71875 Z"
                        />
                      </svg>
                      Exclusive OG Begin Bagde FREE*
                    </p>
                    <p className="flex items-center pb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        width="32px"
                        height="32px"
                        className="mr-4"
                      >
                        <path
                          fill="currentColor"
                          d="M 16 3 C 8.800781 3 3 8.800781 3 16 C 3 23.199219 8.800781 29 16 29 C 23.199219 29 29 23.199219 29 16 C 29 14.601563 28.8125 13.207031 28.3125 11.90625 L 26.6875 13.5 C 26.886719 14.300781 27 15.101563 27 16 C 27 22.101563 22.101563 27 16 27 C 9.898438 27 5 22.101563 5 16 C 5 9.898438 9.898438 5 16 5 C 19 5 21.695313 6.195313 23.59375 8.09375 L 25 6.6875 C 22.699219 4.386719 19.5 3 16 3 Z M 27.28125 7.28125 L 16 18.5625 L 11.71875 14.28125 L 10.28125 15.71875 L 15.28125 20.71875 L 16 21.40625 L 16.71875 20.71875 L 28.71875 8.71875 Z"
                        />
                      </svg>
                      2x Giveaway Entry Next Drop
                    </p>
                    <p className="flex items-center pb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        width="32px"
                        height="32px"
                        className="mr-4"
                      >
                        <path
                          fill="currentColor"
                          d="M 16 3 C 8.800781 3 3 8.800781 3 16 C 3 23.199219 8.800781 29 16 29 C 23.199219 29 29 23.199219 29 16 C 29 14.601563 28.8125 13.207031 28.3125 11.90625 L 26.6875 13.5 C 26.886719 14.300781 27 15.101563 27 16 C 27 22.101563 22.101563 27 16 27 C 9.898438 27 5 22.101563 5 16 C 5 9.898438 9.898438 5 16 5 C 19 5 21.695313 6.195313 23.59375 8.09375 L 25 6.6875 C 22.699219 4.386719 19.5 3 16 3 Z M 27.28125 7.28125 L 16 18.5625 L 11.71875 14.28125 L 10.28125 15.71875 L 15.28125 20.71875 L 16 21.40625 L 16.71875 20.71875 L 28.71875 8.71875 Z"
                        />
                      </svg>
                      10% Discount On In-app Swap Fee <br />
                      *Not Accumulative
                    </p>
                    <p className="flex items-center pb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        width="32px"
                        height="32px"
                        className="mr-4"
                      >
                        <path
                          fill="currentColor"
                          d="M 16 3 C 8.800781 3 3 8.800781 3 16 C 3 23.199219 8.800781 29 16 29 C 23.199219 29 29 23.199219 29 16 C 29 14.601563 28.8125 13.207031 28.3125 11.90625 L 26.6875 13.5 C 26.886719 14.300781 27 15.101563 27 16 C 27 22.101563 22.101563 27 16 27 C 9.898438 27 5 22.101563 5 16 C 5 9.898438 9.898438 5 16 5 C 19 5 21.695313 6.195313 23.59375 8.09375 L 25 6.6875 C 22.699219 4.386719 19.5 3 16 3 Z M 27.28125 7.28125 L 16 18.5625 L 11.71875 14.28125 L 10.28125 15.71875 L 15.28125 20.71875 L 16 21.40625 L 16.71875 20.71875 L 28.71875 8.71875 Z"
                        />
                      </svg>
                      NYC NFT AirDrop Giveaway Entry
                    </p>
                    <p className="flex items-center pb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        width="32px"
                        height="32px"
                        className="mr-4"
                      >
                        <path
                          fill="currentColor"
                          d="M 16 3 C 8.800781 3 3 8.800781 3 16 C 3 23.199219 8.800781 29 16 29 C 23.199219 29 29 23.199219 29 16 C 29 14.601563 28.8125 13.207031 28.3125 11.90625 L 26.6875 13.5 C 26.886719 14.300781 27 15.101563 27 16 C 27 22.101563 22.101563 27 16 27 C 9.898438 27 5 22.101563 5 16 C 5 9.898438 9.898438 5 16 5 C 19 5 21.695313 6.195313 23.59375 8.09375 L 25 6.6875 C 22.699219 4.386719 19.5 3 16 3 Z M 27.28125 7.28125 L 16 18.5625 L 11.71875 14.28125 L 10.28125 15.71875 L 15.28125 20.71875 L 16 21.40625 L 16.71875 20.71875 L 28.71875 8.71875 Z"
                        />
                      </svg>
                      Jpg.store Topia Ticket Giveaway Entry
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl p-4">50₳ per NFT</p>
                    {registered && hasBegin && (
                      // <img
                      //   role="button"
                      //   className="pointer"
                      //   src="https://studio.nmkr.io/images/buttons/paybutton_2_2.svg"
                      //   onClick={openPaymentWindow}
                      // />
                      <a
                        onClick={openPaymentWindow}
                        role="button"
                        className="flex items-center h-20 p-4 w-full og-style text-xl justify-center border-2 border-gray-700 bg-blue-medium hover:border-white hover:shadow-lg hover:bg-white hover:text-blue-light text-sm text-bold text-blue-dark text-center rounded-xl"
                      >
                        Buy with
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="180"
                          className="-ml-4"
                          viewBox="0 0 285 120"
                          fill="none"
                        >
                          <path
                            d="M80.176 72.012V54.612L92.704 72.012H97.1932V48.012H93.052V65.4L80.4196 48.012H76V72.012H80.176Z"
                            fill="currentColor"
                          />
                          <path
                            d="M125.576 53.742H125.681V72.012H129.857V48.012H123.697L116.702 67.2792L109.603 48.012H103.374V72.012H107.55V53.742L114.336 72.0468H118.895L125.576 53.742Z"
                            fill="currentColor"
                          />
                          <path
                            d="M136.049 48.012V72.012H140.26V64.7388L143.844 60.876L150.909 72.012H155.92L146.767 57.5352L154.98 48.012H149.656L143.496 55.4472L140.26 59.5188V48.012H136.049Z"
                            fill="currentColor"
                          />
                          <path
                            d="M177.794 55.2384C177.794 49.8096 174.28 48 169.373 48L159.107 48.012V72.012H163.318V62.5464H168.746L173.41 72.012H178.038V71.7684L172.992 62.0244C175.741 61.224 177.794 59.0664 177.794 55.2384ZM163.318 51.5496H169.373C171.983 51.5496 173.514 52.8372 173.514 55.2732C173.514 57.7092 171.913 58.9968 169.373 58.9968H163.318V51.5496Z"
                            fill="currentColor"
                          />
                          <path
                            d="M193.265 72V63.7105H200.231C204.41 63.7105 208.067 60.5758 208.067 55.7344C208.067 50.9975 205.211 47.9673 200.231 47.9673H191.279V72H193.265ZM200.196 49.7785C204.131 49.7785 206.012 51.9728 206.012 55.7344C205.943 59.4264 203.47 61.8645 200.231 61.8645H193.265V49.7785H200.196Z"
                            fill="currentColor"
                          />
                          <path
                            d="M209.615 66.8452C209.615 70.4675 212.367 72.3135 215.641 72.3135C218.392 72.3135 220.9 71.2337 222.189 68.726H222.293V72H224.035V59.6005C224.035 55.003 220.831 53.4704 217.348 53.4704C214.84 53.4704 210.974 53.7839 210.277 58.4163L211.844 58.7994H211.949C212.541 55.4558 214.735 55.0726 217.208 55.0726C220.413 55.0726 222.189 56.3613 222.189 59.705V61.2724H217.034C213.238 61.2724 209.615 62.3521 209.615 66.8452ZM222.189 64.4767C222.189 68.6215 218.845 70.7113 216.024 70.7113C213.307 70.7113 211.566 69.2833 211.566 66.8103C211.566 63.5015 213.969 62.8049 217.208 62.8049H222.189V64.4767Z"
                            fill="currentColor"
                          />
                          <path
                            d="M233.243 69.5967L227.705 53.8884H225.754L232.268 71.7562L231.223 74.4033C230.805 75.483 230.038 77.1897 227.775 77.1897H225.824V78.9312H227.809C231.188 78.9312 232.581 76.1796 234.044 72.209L240.836 53.8884H238.92L233.243 69.5967Z"
                            fill="currentColor"
                          />
                          <path
                            d="M44 58L44 48H66V58H62V61L56 58V61L50 58V61L44 58Z"
                            fill="currentColor"
                          />
                          <path d="M44 68V72H66V68H44Z" fill="currentColor" />
                        </svg>
                      </a>
                    )}
                    {!registered && hasBegin && (
                      <a
                        onClick={handleConnect}
                        role="button"
                        className="flex p-4 w-full og-style text-xl justify-center border-2 border-gray-700 bg-blue-medium hover:border-white hover:shadow-lg hover:bg-white hover:text-blue-light text-sm text-bold text-blue-dark text-center rounded-xl"
                      >
                        {isLoading ? "Connecting..." : "Connect with Begin"}
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex-1 lg:p-6 p-4 m-4 bg-blue-over rounded-2xl">
                  <h1 className="lg:text-5xl text-2xl text-bold text-center">
                    STANDARD
                  </h1>
                  <div className="lg:p-6 p-4 lg:text-xl">
                    <p>Here's what you get as a Standard member</p>
                    <br />
                    <p className="flex items-center pb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        width="32px"
                        height="32px"
                        className="mr-4"
                      >
                        <path
                          fill="currentColor"
                          d="M 16 3 C 8.800781 3 3 8.800781 3 16 C 3 23.199219 8.800781 29 16 29 C 23.199219 29 29 23.199219 29 16 C 29 14.601563 28.8125 13.207031 28.3125 11.90625 L 26.6875 13.5 C 26.886719 14.300781 27 15.101563 27 16 C 27 22.101563 22.101563 27 16 27 C 9.898438 27 5 22.101563 5 16 C 5 9.898438 9.898438 5 16 5 C 19 5 21.695313 6.195313 23.59375 8.09375 L 25 6.6875 C 22.699219 4.386719 19.5 3 16 3 Z M 27.28125 7.28125 L 16 18.5625 L 11.71875 14.28125 L 10.28125 15.71875 L 15.28125 20.71875 L 16 21.40625 L 16.71875 20.71875 L 28.71875 8.71875 Z"
                        />
                      </svg>
                      Exclusive Beginner Bagde FREE*
                    </p>
                    <p className="flex items-center pb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        width="32px"
                        height="32px"
                        className="mr-4"
                      >
                        <path
                          fill="currentColor"
                          d="M 16 3 C 8.800781 3 3 8.800781 3 16 C 3 23.199219 8.800781 29 16 29 C 23.199219 29 29 23.199219 29 16 C 29 14.601563 28.8125 13.207031 28.3125 11.90625 L 26.6875 13.5 C 26.886719 14.300781 27 15.101563 27 16 C 27 22.101563 22.101563 27 16 27 C 9.898438 27 5 22.101563 5 16 C 5 9.898438 9.898438 5 16 5 C 19 5 21.695313 6.195313 23.59375 8.09375 L 25 6.6875 C 22.699219 4.386719 19.5 3 16 3 Z M 27.28125 7.28125 L 16 18.5625 L 11.71875 14.28125 L 10.28125 15.71875 L 15.28125 20.71875 L 16 21.40625 L 16.71875 20.71875 L 28.71875 8.71875 Z"
                        />
                      </svg>
                      2x Giveaway Entry Next Drop
                    </p>
                    <p className="flex items-center pb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32px"
                        height="32px"
                        className="mr-4"
                      >
                        <path
                          fill="currentColor"
                          d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 8.7070312 7.2929688 L 7.2929688 8.7070312 L 10.585938 12 L 7.2929688 15.292969 L 8.7070312 16.707031 L 12 13.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13.414062 12 L 16.707031 8.7070312 L 15.292969 7.2929688 L 12 10.585938 L 8.7070312 7.2929688 z"
                        />
                      </svg>
                      10% Discount On In-app Swap Fee <br />
                      *Not Accumulative
                    </p>
                    <p className="flex items-center pb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32px"
                        height="32px"
                        className="mr-4"
                      >
                        <path
                          fill="currentColor"
                          d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 8.7070312 7.2929688 L 7.2929688 8.7070312 L 10.585938 12 L 7.2929688 15.292969 L 8.7070312 16.707031 L 12 13.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13.414062 12 L 16.707031 8.7070312 L 15.292969 7.2929688 L 12 10.585938 L 8.7070312 7.2929688 z"
                        />
                      </svg>
                      NYC NFT AirDrop Giveaway Entry
                    </p>
                    <p className="flex items-center pb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32px"
                        height="32px"
                        className="mr-4"
                      >
                        <path
                          fill="currentColor"
                          d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 8.7070312 7.2929688 L 7.2929688 8.7070312 L 10.585938 12 L 7.2929688 15.292969 L 8.7070312 16.707031 L 12 13.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13.414062 12 L 16.707031 8.7070312 L 15.292969 7.2929688 L 12 10.585938 L 8.7070312 7.2929688 z"
                        />
                      </svg>
                      Jpg.store Topia Ticket Giveaway Entry
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl p-4">60₳ per NFT</p>
                    <a
                      onClick={() => {}}
                      role="button"
                      className="opacity-50 cursor-not-allowed flex items-center h-20 p-4 w-full text-xl justify-center border-2 border-blue-medium bg-blue-medium hover:border-white hover:shadow-lg hover:bg-white hover:text-blue-light text-sm text-white text-bold text-center rounded-xl"
                    >
                      Mint Soon
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-16 lg:pt-32 p-6 lg:p-12 lg:pt-0">
              <div className="flex lg:flex-row flex-col">
                <h1 className="lg:text-5xl text-2xl text-bold">RARITY</h1>
              </div>
              <div className="flex lg:flex-row flex-col items-center p-6">
                <div className="flex flex-col lg:flex-row items-center rounded-2xl w-full">
                  <div className="flex-1 p-4 text-center">
                    <img
                      className="rounded-2xl"
                      src="/nft/collections/og_sol_bg_512.png"
                    />
                    <h3 className="text-lg pt-4">Begin NYC SOL Graphite</h3>
                    <p className="p-4">40% chance</p>
                  </div>
                  <div className="flex-1 p-4 text-center">
                    <img
                      className="rounded-2xl"
                      src="/nft/collections/og_sol_comics_512.png"
                    />
                    <h3 className="text-lg pt-4">Begin NYC SOL Comics</h3>
                    <p className="p-4">30% chance</p>
                  </div>
                  <div className="flex-1 p-4 text-center">
                    <img
                      className="rounded-2xl"
                      src="/nft/collections/og_sol_mona_512.png"
                    />
                    <h3 className="text-lg pt-4">Begin NYC SOL Mona</h3>
                    <p className="p-4">20% chance</p>
                  </div>
                  <div className="flex-1 p-4 text-center">
                    <img
                      className="rounded-2xl"
                      src="/nft/collections/og_sol_noun_512.png"
                    />
                    <h3 className="text-lg pt-4">Begin NYC SOL Noun</h3>
                    <p className="p-4">10% chance</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-16 lg:pt-32 p-6 lg:p-12 flex flex-col">
              <div
                className="flex flex-1 pb-4"
                style={{ justifyContent: "center" }}
              >
                <img
                  className="lg:w-10/12"
                  src={"/nft/collections/badges_banner.png"}
                />
              </div>
              <div className="flex-1 p-4">
                <h1 className="lg:text-5xl text-2xl text-bold pb-4">
                  BEGIN BADGES
                </h1>
                <p className="text-xl">
                  Begin Badges are FREE* to claim, which will be a way for to
                  get recognized in our community.
                </p>
                <div className="lg:p-6 pl-0 lg:text-xl">
                  <p>Unclock your BADGES</p>
                  <br />
                  <p className="flex items-center pb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      width="32px"
                      height="32px"
                      className="mr-4"
                    >
                      <path
                        fill="currentColor"
                        d="M 16 3 C 8.800781 3 3 8.800781 3 16 C 3 23.199219 8.800781 29 16 29 C 23.199219 29 29 23.199219 29 16 C 29 14.601563 28.8125 13.207031 28.3125 11.90625 L 26.6875 13.5 C 26.886719 14.300781 27 15.101563 27 16 C 27 22.101563 22.101563 27 16 27 C 9.898438 27 5 22.101563 5 16 C 5 9.898438 9.898438 5 16 5 C 19 5 21.695313 6.195313 23.59375 8.09375 L 25 6.6875 C 22.699219 4.386719 19.5 3 16 3 Z M 27.28125 7.28125 L 16 18.5625 L 11.71875 14.28125 L 10.28125 15.71875 L 15.28125 20.71875 L 16 21.40625 L 16.71875 20.71875 L 28.71875 8.71875 Z"
                      />
                    </svg>
                    OG Begin <br />
                    Holder of any Begin OG NFT collection
                  </p>
                  <p className="flex items-center pb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      width="32px"
                      height="32px"
                      className="mr-4"
                    >
                      <path
                        fill="currentColor"
                        d="M 16 3 C 8.800781 3 3 8.800781 3 16 C 3 23.199219 8.800781 29 16 29 C 23.199219 29 29 23.199219 29 16 C 29 14.601563 28.8125 13.207031 28.3125 11.90625 L 26.6875 13.5 C 26.886719 14.300781 27 15.101563 27 16 C 27 22.101563 22.101563 27 16 27 C 9.898438 27 5 22.101563 5 16 C 5 9.898438 9.898438 5 16 5 C 19 5 21.695313 6.195313 23.59375 8.09375 L 25 6.6875 C 22.699219 4.386719 19.5 3 16 3 Z M 27.28125 7.28125 L 16 18.5625 L 11.71875 14.28125 L 10.28125 15.71875 L 15.28125 20.71875 L 16 21.40625 L 16.71875 20.71875 L 28.71875 8.71875 Z"
                      />
                    </svg>
                    Begin Star <br />
                    Staking with BEGIN Stake Pool
                  </p>
                  <p className="flex items-center pb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      width="32px"
                      height="32px"
                      className="mr-4"
                    >
                      <path
                        fill="currentColor"
                        d="M 16 3 C 8.800781 3 3 8.800781 3 16 C 3 23.199219 8.800781 29 16 29 C 23.199219 29 29 23.199219 29 16 C 29 14.601563 28.8125 13.207031 28.3125 11.90625 L 26.6875 13.5 C 26.886719 14.300781 27 15.101563 27 16 C 27 22.101563 22.101563 27 16 27 C 9.898438 27 5 22.101563 5 16 C 5 9.898438 9.898438 5 16 5 C 19 5 21.695313 6.195313 23.59375 8.09375 L 25 6.6875 C 22.699219 4.386719 19.5 3 16 3 Z M 27.28125 7.28125 L 16 18.5625 L 11.71875 14.28125 L 10.28125 15.71875 L 15.28125 20.71875 L 16 21.40625 L 16.71875 20.71875 L 28.71875 8.71875 Z"
                      />
                    </svg>
                    Beginner <br />
                    Holder of any Begin NFT collection
                  </p>
                  <p className="flex items-center pb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      width="32px"
                      height="32px"
                      className="mr-4"
                    >
                      <path
                        fill="currentColor"
                        d="M 16 3 C 8.800781 3 3 8.800781 3 16 C 3 23.199219 8.800781 29 16 29 C 23.199219 29 29 23.199219 29 16 C 29 14.601563 28.8125 13.207031 28.3125 11.90625 L 26.6875 13.5 C 26.886719 14.300781 27 15.101563 27 16 C 27 22.101563 22.101563 27 16 27 C 9.898438 27 5 22.101563 5 16 C 5 9.898438 9.898438 5 16 5 C 19 5 21.695313 6.195313 23.59375 8.09375 L 25 6.6875 C 22.699219 4.386719 19.5 3 16 3 Z M 27.28125 7.28125 L 16 18.5625 L 11.71875 14.28125 L 10.28125 15.71875 L 15.28125 20.71875 L 16 21.40625 L 16.71875 20.71875 L 28.71875 8.71875 Z"
                      />
                    </svg>
                    The Begin <br />
                    Any one connected with Begin Wallet
                  </p>
                </div>
                <p className="text-xl">
                  You will be able to claim it from our exclusive dashboard for
                  FREE*.
                </p>
              </div>
            </div>
            <div className="p-6 lg:p-12 lg:pt-0">
              <div className="flex">
                <h1 className="lg:w-6/12 lg:text-5xl text-2xl text-bold">
                  FAQ
                </h1>
              </div>
              <div className="flex flex-col items-start p-6">
                <div className="flex flex-1 text-xl text-left pb-4">
                  <p>Verified NFTs</p>
                </div>
                <div className="flex flex-col flex-1 pb-4">
                  <p>
                    Begin NYC Collections use vNFT which attachs a DID
                    (Descentralized Identity) to it, making it even more
                    verifiable.
                  </p>
                  <p>Provided by IAMX.</p>
                </div>
                <div className="flex flex-1 text-xl text-left pb-4">
                  <p>What FREE means?</p>
                </div>
                <div className="flex flex-1 pb-4">
                  <p>
                    FREE* in the context of NFTs, means that mints will only
                    have the Cardano Transaction fee.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 lg:p-12 lg:pt-0">
              <div className="flex lg:flex-row flex-col">
                <h1 className="lg:w-6/12 lg:text-5xl text-2xl text-bold">
                  PARTNERS
                </h1>
              </div>
              <div className="flex lg:flex-row flex-col items-center p-6">
                <div className="flex flex-1 justify-center">
                  <a
                    href="https://www.nmkr.io/"
                    target="_blank"
                    className="flex items-center h-20"
                  >
                    <svg
                      width="250"
                      viewBox="0 0 338 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M196.176 72.012V54.612L208.704 72.012H213.193V48.012H209.052V65.4L196.419 48.012H192V72.012H196.176Z"
                        fill="currentColor"
                      />
                      <path
                        d="M241.576 53.742H241.68V72.012H245.856V48.012H239.697L232.702 67.2792L225.603 48.012H219.374V72.012H223.55V53.742L230.336 72.0468H234.894L241.576 53.742Z"
                        fill="currentColor"
                      />
                      <path
                        d="M252.049 48.012V72.012H256.26V64.7388L259.844 60.876L266.909 72.012H271.92L262.767 57.5352L270.98 48.012H265.656L259.496 55.4472L256.26 59.5188V48.012H252.049Z"
                        fill="currentColor"
                      />
                      <path
                        d="M293.794 55.2384C293.794 49.8096 290.279 48 285.373 48L275.107 48.012V72.012H279.317V62.5464H284.746L289.409 72.012H294.038V71.7684L288.992 62.0244C291.741 61.224 293.794 59.0664 293.794 55.2384ZM279.317 51.5496H285.373C287.983 51.5496 289.514 52.8372 289.514 55.2732C289.514 57.7092 287.913 58.9968 285.373 58.9968H279.317V51.5496Z"
                        fill="currentColor"
                      />
                      <path
                        d="M160 58V48H182V58H178V61L172 58V61L166 58V61L160 58Z"
                        fill="currentColor"
                      />
                      <path d="M160 68V72H182V68H160Z" fill="currentColor" />
                      <path
                        d="M43.7515 47.9673V72H45.5278V68.1687C46.921 71.3731 49.7074 72.418 52.1107 72.418C56.8127 72.418 59.8081 69.2833 59.8081 62.979C59.8081 56.64 56.8127 53.4704 52.1107 53.4704C49.7771 53.4704 47.0255 54.6547 45.5975 57.5804V47.9673H43.7515ZM51.832 70.8506C48.0704 70.8506 45.5278 68.2035 45.5278 62.979C45.5278 57.7894 48.0704 55.0378 51.832 55.0378C56.0465 55.0378 57.8576 58.4163 57.8576 63.0139C57.8576 67.6114 56.0116 70.8506 51.832 70.8506Z"
                        fill="currentColor"
                      />
                      <path
                        d="M70.2176 72.418C74.5366 72.418 77.4623 70.0147 77.4623 65.8003V53.8884H75.6163V65.7654C75.6163 68.517 73.7355 70.8158 70.2176 70.8158C66.6998 70.8158 64.819 68.517 64.819 65.7654V53.8884H62.973V65.8003C62.973 70.0147 65.9335 72.418 70.2176 72.418Z"
                        fill="currentColor"
                      />
                      <path
                        d="M83.5077 53.8884H81.6617V72H83.5077V53.8884ZM83.6122 47.9673H81.5573V50.5447H83.6122V47.9673Z"
                        fill="currentColor"
                      />
                      <path
                        d="M89.9839 72V47.9673H88.1379V72H89.9839Z"
                        fill="currentColor"
                      />
                      <path
                        d="M92.2375 53.8884V55.4558H95.9992V68.3777C95.9992 71.582 97.6014 72.418 99.935 72.418C100.841 72.418 102.617 72.209 103.522 71.8955L103.244 70.2585C102.269 70.6068 101.119 70.8506 100.353 70.8506C98.7159 70.8506 97.8452 70.2237 97.8452 68.1339V55.4558H104.045V53.8884H97.8452V49.3953H95.9992V53.8884H92.2375Z"
                        fill="currentColor"
                      />
                      <path
                        d="M130.38 62.9442C130.38 56.849 126.897 53.4704 121.707 53.4704C116.517 53.4704 113.034 56.849 113.034 62.9442C113.034 69.0395 116.517 72.418 121.707 72.418C126.897 72.418 130.38 69.0395 130.38 62.9442ZM114.985 62.9442C114.985 58.1725 117.493 55.0726 121.707 55.0726C125.921 55.0726 128.429 58.1725 128.429 62.9442C128.429 67.6811 125.921 70.8158 121.707 70.8158C117.493 70.8158 114.985 67.6811 114.985 62.9442Z"
                        fill="currentColor"
                      />
                      <path
                        d="M133.716 53.8884V72H135.562V61.4813C135.562 58.5208 137.269 55.0726 141.727 55.0726C145.175 55.0726 146.603 57.0928 146.603 60.0185V72H148.449V59.914C148.449 55.7692 146.011 53.4704 142.075 53.4704C139.394 53.4704 136.677 54.5153 135.597 57.1624H135.458V53.8884H133.716Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                </div>
                <div className="flex flex-1 justify-center">
                  <a
                    href="https://jpg.store"
                    target="_blank"
                    className="flex items-center h-20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="35"
                      viewBox="0 0 32 35"
                      fill="none"
                    >
                      <mask
                        id="path-1-outside-1_997_66187"
                        maskUnits="userSpaceOnUse"
                        x="2.23975"
                        y="-0.169922"
                        width="29"
                        height="36"
                        fill="black"
                      >
                        <rect
                          fill="white"
                          x="2.23975"
                          y="-0.169922"
                          width="29"
                          height="36"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.99541 1.83008C5.4735 1.83008 4.23975 3.06383 4.23975 4.58574V30.386C4.23975 31.908 5.4735 33.1417 6.99541 33.1417H25.9318C27.4537 33.1417 28.6875 31.908 28.6875 30.386V12.8191C28.6875 12.0679 28.3808 11.3493 27.8384 10.8295L19.2471 2.59618C18.7341 2.10455 18.051 1.83008 17.3405 1.83008H6.99541ZM6.07686 4.58574C6.07686 4.07844 6.48811 3.66719 6.99541 3.66719H16.7968L16.7968 12.1175C16.7968 12.5635 17.1584 12.925 17.6044 12.925L26.8284 12.925C26.8358 12.925 26.8431 12.9249 26.8503 12.9248V30.386C26.8503 30.8933 26.4391 31.3046 25.9318 31.3046H6.99541C6.48811 31.3046 6.07686 30.8933 6.07686 30.386V4.58574Z"
                        />
                      </mask>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.99541 1.83008C5.4735 1.83008 4.23975 3.06383 4.23975 4.58574V30.386C4.23975 31.908 5.4735 33.1417 6.99541 33.1417H25.9318C27.4537 33.1417 28.6875 31.908 28.6875 30.386V12.8191C28.6875 12.0679 28.3808 11.3493 27.8384 10.8295L19.2471 2.59618C18.7341 2.10455 18.051 1.83008 17.3405 1.83008H6.99541ZM6.07686 4.58574C6.07686 4.07844 6.48811 3.66719 6.99541 3.66719H16.7968L16.7968 12.1175C16.7968 12.5635 17.1584 12.925 17.6044 12.925L26.8284 12.925C26.8358 12.925 26.8431 12.9249 26.8503 12.9248V30.386C26.8503 30.8933 26.4391 31.3046 25.9318 31.3046H6.99541C6.48811 31.3046 6.07686 30.8933 6.07686 30.386V4.58574Z"
                        fill="black"
                      />
                      <path
                        d="M27.8384 10.8295L29.0606 9.55421V9.55421L27.8384 10.8295ZM19.2471 2.59618L18.025 3.87149L19.2471 2.59618ZM16.7968 3.66719L18.5632 3.66719V1.90081H16.7968V3.66719ZM16.7968 12.1175H18.5632H18.5632H16.7968ZM17.6044 12.925V14.6914V14.6914V12.925ZM26.8284 12.925V11.1587V11.1587V12.925ZM26.8503 12.9248H28.6167V11.1145L26.807 11.1589L26.8503 12.9248ZM6.00613 4.58574C6.00613 4.03937 6.44904 3.59646 6.99541 3.59646V0.0636983C4.49795 0.0636983 2.47337 2.08829 2.47337 4.58574H6.00613ZM6.00613 30.386V4.58574H2.47337V30.386H6.00613ZM6.99541 31.3753C6.44904 31.3753 6.00613 30.9324 6.00613 30.386H2.47337C2.47337 32.8835 4.49796 34.9081 6.99541 34.9081V31.3753ZM25.9318 31.3753H6.99541V34.9081H25.9318V31.3753ZM26.9211 30.386C26.9211 30.9324 26.4782 31.3753 25.9318 31.3753V34.9081C28.4292 34.9081 30.4538 32.8835 30.4538 30.386H26.9211ZM26.9211 12.8191V30.386H30.4538V12.8191H26.9211ZM26.6163 12.1048C26.811 12.2914 26.9211 12.5494 26.9211 12.8191H30.4538C30.4538 11.5864 29.9506 10.4071 29.0606 9.55421L26.6163 12.1048ZM18.025 3.87149L26.6163 12.1048L29.0606 9.55421L20.4693 1.32088L18.025 3.87149ZM17.3405 3.59646C17.5956 3.59646 17.8408 3.69499 18.025 3.87149L20.4693 1.32088C19.6274 0.514101 18.5065 0.0636983 17.3405 0.0636983V3.59646ZM6.99541 3.59646H17.3405V0.0636983H6.99541V3.59646ZM6.99541 1.90081C5.51256 1.90081 4.31048 3.1029 4.31048 4.58574H7.84324C7.84324 5.05398 7.46365 5.43357 6.99541 5.43357V1.90081ZM16.7968 1.90081H6.99541V5.43357H16.7968V1.90081ZM18.5632 12.1175L18.5632 3.66719L15.0305 3.66719L15.0305 12.1175H18.5632ZM17.6044 11.1587C18.1339 11.1587 18.5632 11.5879 18.5632 12.1175H15.0305C15.0305 13.539 16.1828 14.6914 17.6044 14.6914V11.1587ZM26.8284 11.1587L17.6044 11.1587V14.6914L26.8284 14.6914V11.1587ZM26.807 11.1589C26.8142 11.1587 26.8214 11.1587 26.8284 11.1587V14.6914C26.8502 14.6914 26.8719 14.6911 26.8937 14.6906L26.807 11.1589ZM28.6167 30.386V12.9248H25.084V30.386H28.6167ZM25.9318 33.071C27.4146 33.071 28.6167 31.8689 28.6167 30.386H25.084C25.084 29.9178 25.4635 29.5382 25.9318 29.5382V33.071ZM6.99541 33.071H25.9318V29.5382H6.99541V33.071ZM4.31048 30.386C4.31048 31.8689 5.51256 33.071 6.99541 33.071V29.5382C7.46365 29.5382 7.84324 29.9178 7.84324 30.386H4.31048ZM4.31048 4.58574V30.386H7.84324V4.58574H4.31048Z"
                        fill="white"
                        mask="url(#path-1-outside-1_997_66187)"
                      />
                      <rect
                        x="5.59473"
                        y="12.3691"
                        width="21.7352"
                        height="14.6907"
                        fill="white"
                      />
                      <rect
                        x="5.59473"
                        y="3.07031"
                        width="11.7974"
                        height="22.8389"
                        fill="white"
                      />
                      <rect
                        x="4.26318"
                        y="25.9102"
                        width="24.3222"
                        height="6.3141"
                        rx="3.15705"
                        fill="#FFC900"
                      />
                      <path
                        d="M6.99482 2.74805H17.3399C17.8136 2.74805 18.269 2.93103 18.611 3.25878L27.2023 11.4921C27.5639 11.8386 27.7683 12.3177 27.7683 12.8185V30.3855C27.7683 31.4001 26.9458 32.2226 25.9312 32.2226H6.99483C5.98022 32.2226 5.15771 31.4001 5.15771 30.3855V4.58516C5.15771 3.57055 5.98022 2.74805 6.99482 2.74805Z"
                        stroke="black"
                        strokeWidth="1.83711"
                      />
                      <path
                        d="M21.9489 7.82803L21.9543 7.8331L21.9597 7.83809L26.542 12.0077L17.7143 12.0077L17.7143 3.84791L21.9489 7.82803Z"
                        fill="black"
                        stroke="black"
                        strokeWidth="1.83619"
                      />
                    </svg>
                    <p className="pl-4 text-2xl">
                      <strong>jpg.store</strong>
                    </p>
                  </a>
                </div>
                <div className="flex flex-1 justify-center">
                  <a
                    href="https://www.cnftjungle.io/"
                    target="_blank"
                    className="flex items-center h-20"
                  >
                    <svg
                      width="120"
                      viewBox="0 0 2082 588"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <clipPath id="jungle_svg__a">
                          <path d="M233 0v244c0 36-11.333 63.75-34 83.25s-51.5 29.25-86.5 29.25c-54.333 0-91.833-21.333-112.5-64l49.5-29c11.333 24.667 32.5 37 63.5 37 20 0 35.417-4.917 46.25-14.75C170.083 275.917 175.5 262 175.5 244V0H233Z"></path>
                        </clipPath>
                        <clipPath id="jungle_svg__b">
                          <path d="M54 0v148c0 18.667 5 33 15 43s23.667 15 41 15c19 0 34.333-5.917 46-17.75 11.667-11.833 17.5-29.917 17.5-54.25V0h54v250h-54v-32c-16.333 25.667-42.167 38.5-77.5 38.5-28.667 0-51.833-9.167-69.5-27.5S0 185.5 0 153.5V0h54Z"></path>
                        </clipPath>
                        <clipPath id="jungle_svg__c">
                          <path d="M131.5 0c28.667 0 51.833 9.167 69.5 27.5S227.5 71 227.5 103v153.5h-54v-148c0-18.667-5-33-15-43s-23.667-15-41-15c-19 0-34.333 5.917-46 17.75C59.833 80.083 54 98.167 54 122.5v134H0V6.5h54v32C70.333 12.833 96.167 0 131.5 0Z"></path>
                        </clipPath>
                        <clipPath id="jungle_svg__d">
                          <path d="M126 0c37.667 0 66.667 14.5 87 43.5v-37h53V245c0 38-12.5 67.167-37.5 87.5s-55.333 30.5-91 30.5c-57.667 0-97.167-20.167-118.5-60.5l46.5-27c13 25.667 37.333 38.5 73 38.5 23.333 0 41.583-6.083 54.75-18.25C206.417 283.583 213 266.667 213 245v-30.5c-20.333 29-49.333 43.5-87 43.5-35.333 0-65.167-12.583-89.5-37.75S0 164.667 0 129s12.167-66.083 36.5-91.25S90.667 0 126 0Zm7.5 50.5c-22.667 0-41.583 7.5-56.75 22.5C61.583 88 54 106.667 54 129s7.5 41 22.5 56c15.333 15 34.333 22.5 57 22.5s41.583-7.5 56.75-22.5c15.167-15 22.75-33.667 22.75-56s-7.583-41-22.75-56-34.083-22.5-56.75-22.5Z"></path>
                        </clipPath>
                        <clipPath id="jungle_svg__e">
                          <path d="M54 0v365H0V0h54Z"></path>
                        </clipPath>
                        <clipPath id="jungle_svg__f">
                          <path d="M132 0c36.667 0 66.75 12.833 90.25 38.5S257.5 95.333 257.5 132c0 5.667-.667 13.167-2 22.5h-199c4 19 13.167 33.583 27.5 43.75 14.333 10.167 31.833 15.25 52.5 15.25 28.667 0 50.167-10.333 64.5-31l44.5 26C220.833 244.833 184.333 263 136 263c-40.667 0-73.5-12.417-98.5-37.25S0 169.5 0 131.5c0-37.333 12.333-68.583 37-93.75S93.333 0 132 0Zm-.5 49c-20 0-36.667 5.5-50 16.5-13.333 11-21.833 26-25.5 45h147c-3.667-20.333-12.083-35.667-25.25-46C164.583 54.167 149.167 49 131.5 49Z"></path>
                        </clipPath>
                      </defs>
                      <g
                        clipPath="url(#jungle_svg__a)"
                        transform="translate(570.5 101)"
                      >
                        <path
                          fill="currentColor"
                          d="M0 0h233v356.5H0V0z"
                        ></path>
                      </g>
                      <g
                        clipPath="url(#jungle_svg__b)"
                        transform="translate(855.25 201)"
                      >
                        <path
                          fill="currentColor"
                          d="M0 0h227.5v256.5H0V0z"
                        ></path>
                      </g>
                      <g
                        clipPath="url(#jungle_svg__c)"
                        transform="translate(1139.5 194.5)"
                      >
                        <path
                          fill="currentColor"
                          d="M0 0h227.5v256.5H0V0z"
                        ></path>
                      </g>
                      <g
                        clipPath="url(#jungle_svg__d)"
                        transform="translate(1404.75 194.5)"
                      >
                        <path fill="currentColor" d="M0 0h266v363H0V0z"></path>
                      </g>
                      <g
                        clipPath="url(#jungle_svg__e)"
                        transform="translate(1727.5 86)"
                      >
                        <path fill="currentColor" d="M0 0h54v365H0V0z"></path>
                      </g>
                      <g
                        clipPath="url(#jungle_svg__f)"
                        transform="translate(1823.75 194.5)"
                      >
                        <path
                          fill="currentColor"
                          d="M0 0h257.5v263H0V0z"
                        ></path>
                      </g>
                      <path
                        stroke="#D5317B"
                        strokeWidth="34.673"
                        fill="none"
                        strokeMiterlimit="10"
                        d="M280.188 435.098 251.66 540.317l98.124-31.088L409 361.985l-128.812 73.113zM165.306 449.661 183.996 559 78.63 514.304 31 358.629l134.306 91.032zM140.69 268.662l78.03 140.75 75.814-140.75L218.719 52 140.69 268.662z"
                      ></path>
                    </svg>
                  </a>
                </div>
                <div className="flex flex-1 justify-center">
                  <a
                    href="https://iamx.id"
                    target="_blank"
                    className="flex items-center h-20"
                  >
                    <img
                      width={32}
                      className="rounded-full"
                      src="/images/logo_iamx.jpeg"
                    />
                    <p className="pl-4 text-2xl">
                      <strong>IAMX</strong>
                    </p>
                  </a>
                </div>
                <div className="flex flex-1 justify-center">
                  <a
                    href="https://meshjs.dev"
                    target="_blank"
                    className="flex items-center h-20"
                  >
                    <svg
                      viewBox="0 0 300 200"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-3 h-6 sm:h-9"
                      fill="currentColor"
                    >
                      <path d="m289 127-45-60-45-60c-.9-1.3-2.4-2-4-2s-3.1.7-4 2l-37 49.3c-2 2.7-6 2.7-8 0l-37-49.3c-.9-1.3-2.4-2-4-2s-3.1.7-4 2l-45 60-45 60c-1.3 1.8-1.3 4.2 0 6l45 60c.9 1.3 2.4 2 4 2s3.1-.7 4-2l37-49.3c2-2.7 6-2.7 8 0l37 49.3c.9 1.3 2.4 2 4 2s3.1-.7 4-2l37-49.3c2-2.7 6-2.7 8 0l37 49.3c.9 1.3 2.4 2 4 2s3.1-.7 4-2l45-60c1.3-1.8 1.3-4.2 0-6zm-90-103.3 32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0l-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0zm-90 0 32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0l-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0zm-53 152.6-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0l32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0zm90 0-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0l32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0zm90 0-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0l32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0z"></path>
                    </svg>
                    <p className="text-2xl">
                      <strong>Mesh</strong>
                    </p>
                  </a>
                </div>
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