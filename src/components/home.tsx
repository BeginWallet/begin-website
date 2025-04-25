import { defineMessages } from 'react-intl'
import f from "../lib/translate";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import screens from '../public/images/hero-begin-wallet-screens.png';
import { FaChrome as Chrome } from "react-icons/fa";
import { FaGooglePlay as Android } from "react-icons/fa";
import { FaApple as Apple } from "react-icons/fa";



const messages = defineMessages({
  homeTitle: {
    id: 'home.title',
    defaultMessage: 'The Web3, DeFi crypto wallet built for you'
  },
  homeText: {
    id: 'home.text',
    defaultMessage: 'It\'s time to <b>begin</b> your <pixel>web3</pixel> journey'
  },
  homeBody: {
    id: 'home.body',
    defaultMessage: 'With B58 you can collect, earn, send, and participate in our growing digital world.' +
    '{br}'+
    'Where you can be part of a decentralized financial world. In place where you\'re welcome on Begin Wallet, and have control of your finances.'+
    '{br}'+
    'Get access to global payments where transactions are borderless and low fees using it with friends and family or your business.'
  },
  homeBtnDownload: {
    id: 'home.btn.download',
    defaultMessage: 'Available Soon'
  },
  homeBtnWhitePaper: {
    id: 'home.btn.whitepaper',
    defaultMessage: 'Whitepaper'
  },
})

const Home = () => {

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Parallax effect for the hero image
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      id="home"
      ref={ref}
      className="text-center px-6 py-16 md:py-16 relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 pt-10"
      >
        <h1 className="text-4xl md:text-7xl font-bold leading-tight mt-12 mb-6">
          Your Crypto Journey <br/><span className="font-extrabold">Begins</span> Here
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
          The all-in-one crypto wallet for Cardano and Bitcoin — self-custodial, open-source, and packed with staking, lending, governance, and real dApp discovery.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-10 text-sm text-gray-600">
          <span className="bg-gray-100 px-3 py-1 rounded-full">iOS · Android · Chrome Extension</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">Open-source & Transparent</span>
        </div>
      </motion.div>

      <motion.div
        style={{ y }}
        className="relative mx-auto mt-12 w-[90%] max-w-[1000px] z-0 pointer-events-none aspect-[1000/537]"
      >
        <Image
          src={screens}
          alt="Begin Wallet Screens"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 90vw"
          className="object-contain"
        />
      </motion.div>

      <motion.div
        id='download'
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 pt-10"
      >
        <div className="relative flex justify-center flex-wrap gap-4 py-20">
          <a
            href="https://apps.apple.com/app/begin-wallet"
            className="flex w-full lg:w-auto text-center items-center gap-2 bg-cyan text-black font-semibold px-5 py-3 rounded-lg shadow hover:shadow-lg transition"
          >
            <Apple className="w-5 h-5" />
            Download on iOS
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=wallet.begin"
            className="flex items-center gap-2 bg-cyan text-black font-semibold px-5 py-3 rounded-lg shadow hover:shadow-lg transition"
          >
            <Android className="w-5 h-5" />
            Download on Android
          </a>
          <a
            href="https://chrome.google.com/webstore/detail/begin-wallet/..."
            className="flex items-center gap-2 bg-cyan text-black font-semibold px-5 py-3 rounded-lg shadow hover:shadow-lg transition"
          >
            <Chrome className="w-5 h-5" />
            Add to Chrome
          </a>
        </div>
      </motion.div>

    </section>
    // <div id="home">
    //   <section className="mx-auto">
    //     <div className="home-container w-full flex flex-col items-center pt-16 lg:pt-32">
    //       <div id="download" className="p-6 pb-0 lg:w-5/12 text-center">
    //         <p className='lead-text text-white text-3xl lg:text-7xl'>
    //           {f(messages.homeText, {
    //             b: (chunk) => <strong>{chunk}</strong>,
    //             pixel: (chunk) => <span className='pixel text-4xl lg:text-8xl'>{chunk}</span>,
    //           })}
    //         </p>
    //       </div>
    //       <div className='flex flex-col lg:flex-row w-11/12 justify-center p-6'>
    //         <a href="https://chrome.google.com/webstore/detail/begin-wallet/nhbicdelgedinnbcidconlnfeionhbml" target="_blank" role="button" className="bg-white hover:border-gray-200 hover:shadow-lg hover:bg-white hover:text-blue-light text-sm text-black py-3 px-1 rounded-xl mb-2 lg:mb-0 lg:w-34 justify-center inline-flex items-center">
    //             Install for Chrome
    //         </a>
    //         <a href="https://play.google.com/store/apps/details?id=is.begin.app" target="_blank"  role="button" className="bg-white hover:border-gray-200 hover:shadow-lg hover:bg-white hover:text-blue-light text-sm text-black py-3 px-1 rounded-xl mb-2 lg:mb-0 lg:ml-4 lg:mr-4 lg:w-34 justify-center inline-flex items-center">
    //         <img src='/images/google_store.svg' className='inline-flex' />
    //         </a>
    //         <a href="https://apps.apple.com/app/begin-wallet-by-b58-labs/id1642488837" target="_blank" role="button" className="bg-white hover:border-gray-200 hover:shadow-lg hover:bg-white hover:text-blue-light text-sm text-black py-3 px-1 rounded-xl mb-2 lg:mb-0 lg:w-34 justify-center inline-flex items-center">
    //           <img src='/images/apple_store.svg' className='inline-flex' />
    //         </a>
    //       </div>
    //       <div className='p-6 pt-0 text-center'>
    //         <img src="/images/wallet_light.png"
    //           className='img-light dark:hidden light:show lg:w-3/6 w-auto mx-auto'
    //           alt="Begin Wallet App Home"
    //         />
    //         <img src="/images/wallet_light.png"
    //           className='img-light dark:show light:hidden lg:w-3/6 w-auto mx-auto'
    //           alt="Begin Wallet App Home"
    //         />
    //       </div>
    //     </div>
    //   </section>
    // </div>
  )
}

export default Home
