import Link from 'next/link'
import HeroPost from '../components/hero-post'
import MoreStories from '../components/more-stories'
import { getGuides, getPosts } from '../lib/api'
import Post from '../types/post'
import Container from '../components/container'
import Navigation from '../components/navigation'
import Layout from '../components/layout'
import Head from 'next/head'
import { GA_TRACKING_ID, event } from '../lib/gtag'
import { defineMessages } from 'react-intl'
import f from "../lib/translate";
import { useRef, useState } from 'react'
import { QRCode } from 'react-qrcode-logo';
import BeginQRLogo from '../public/images/begin_qr_logo.png';

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

// Browser
// https://begin-wallet.app.link/browse?dappUrl=https%3A%2F%2Fbegin.is
// Pay
// https://begin-wallet.app.link/send?coinType=cardano&address=$francisluz&amount=10000000&networkId=1&identifier=default

export default function DeepLink() {
  const [values, setValues] = useState<any>({
    dappUrl: '',
    address: '',
    amount: 0
  });
  
  const [beginLink, setBeginLink] = useState('');
  
  const generateDeepLink = (linkType: string) => {
    let link = ''
    if (linkType === 'browse') {
      link = `https://begin-wallet.app.link/browse?dappUrl=${encodeURIComponent(values.dappUrl)}`
    } else {
      link = `https://begin-wallet.app.link/send?coinType=cardano&address=${values.address}&amount=${(Number(values.amount) || 0)*1000000}&networkId=1&identifier=default`
    }
  
    setBeginLink(link);
  }

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
            <div className='pt-16 lg:pt-32 p-6 lg:p-12'>
              <h2 className='lg:w-6/12 lg:text-5xl text-2xl'>Begin Connect</h2>
              <p>Generate deeplink integrations for Begin Mobile app on iOS and Android</p>
            </div>
          </section>
          <section id="generate" className="mx-auto">
            <div className='pt-16 lg:pt-32 p-6 lg:p-12'>
              <h2 className='lg:w-6/12 lg:text-5xl text-2xl'>Generate your QR Code and Link</h2>
            </div>
            <div>
              <h2 className='lg:w-6/12 lg:text-5xl text-2xl'>Pay with Begin</h2>
              <p>Address:</p>
              <input id='address' type='text' 
              className='text-lg p-2 rounded-xl text-blue-dark py-3 px-4'
               value={values.address} onChange={(event) => {
                setValues({
                  ...values,
                  address: event.target.value
                })
              }} />
              <p>Amount:</p>
              <input id='amount' type='number' 
              className='text-lg p-2 rounded-xl text-blue-dark py-3 px-4'
              value={values.amount} onChange={(event) => {
                setValues({
                  ...values,
                  amount: event.target.value
                })
              }}/>
              <button onClick={() => generateDeepLink('pay')}
              role="button"
              className="flex items-center h-16 p-4 w-full text-lg justify-center border-2 border-blue-medium bg-blue-medium hover:border-white hover:shadow-lg hover:bg-white hover:text-blue-light text-sm text-white text-bold text-center rounded-xl"
              >Generate</button>
            </div>
            <div>
              <h2 className='lg:w-6/12 lg:text-5xl text-2xl'>Connect with Begin</h2>
              <p>Website:</p>
              <input id='dappUrl' type='url' 
              className='text-lg p-2 rounded-xl text-blue-dark py-3 px-4'
              value={values.dappUrl} onChange={(event) => {
                setValues({
                  ...values,
                  dappUrl: event.target.value
                })
              }}/>
              <button onClick={() => generateDeepLink('browse')}
              role="button"
              className="flex items-center h-16 p-4 w-full text-lg justify-center border-2 border-blue-medium bg-blue-medium hover:border-white hover:shadow-lg hover:bg-white hover:text-blue-light text-sm text-white text-bold text-center rounded-xl"
              >Generate</button>
            </div>
            <div>
              <h2 className='lg:w-6/12 lg:text-5xl text-2xl'>Link Generated</h2>
              <p>{beginLink}</p>
            </div>
          </section>
          <section id='qrcode' className='text-center w-full flex justify-center'>
            <QRCode
              value={beginLink}
              eyeRadius={5} // 5 pixel radius for all corners of all positional eyes
              logoImage={BeginQRLogo.src}
              logoWidth={20}
              logoHeight={20}
              removeQrCodeBehindLogo={true}
            />
          </section>
          <section><a href='web+cardano://claim/v1?faucet_url=https%3A%2F%2Fonboarding.click%2Fapi%2Fclaim%2Fv1%2F01hb6w00f90rbc0gw72gd8mphy&code=e9501bd6c30c4821'>Test Claim</a></section>
        </Container>
      </Layout>
    </>
  )
}