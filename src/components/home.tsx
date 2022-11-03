import { defineMessages } from 'react-intl'
import f from "../lib/translate";

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

  return (
    <div id="home">
      <section className="mx-auto">
        <div className="home-container w-full flex flex-col items-center pt-16 lg:pt-32">
          <div id="download" className="p-6 pb-0 lg:w-5/12 text-center">
            <p className='lead-text text-white text-3xl lg:text-7xl'>
              {f(messages.homeText, {
                b: (chunk) => <strong>{chunk}</strong>,
                pixel: (chunk) => <span className='pixel text-4xl lg:text-8xl'>{chunk}</span>,
              })}
            </p>
          </div>
          <div className='flex flex-col lg:flex-row w-11/12 justify-center p-6'>
            <a href="https://chrome.google.com/webstore/detail/begin-wallet/nhbicdelgedinnbcidconlnfeionhbml" target="_blank" role="button" className="bg-white hover:border-gray-200 hover:shadow-lg hover:bg-white hover:text-blue-light text-sm text-black py-3 px-1 rounded-xl mb-2 lg:mb-0 lg:w-34 justify-center inline-flex items-center">
                Install for Chrome
            </a>
            <a href="https://play.google.com/store/apps/details?id=is.begin.app" target="_blank"  role="button" className="bg-white hover:border-gray-200 hover:shadow-lg hover:bg-white hover:text-blue-light text-sm text-black py-3 px-1 rounded-xl mb-2 lg:mb-0 lg:ml-4 lg:mr-4 lg:w-34 justify-center inline-flex items-center">
            <img src='/images/google_store.svg' className='inline-flex' />
            </a>
            <a href="https://apps.apple.com/app/begin-wallet-by-b58-labs/id1642488837" target="_blank" role="button" className="bg-white hover:border-gray-200 hover:shadow-lg hover:bg-white hover:text-blue-light text-sm text-black py-3 px-1 rounded-xl mb-2 lg:mb-0 lg:w-34 justify-center inline-flex items-center">
              <img src='/images/apple_store.svg' className='inline-flex' />
            </a>
          </div>
          <div className='text-white'>
            <p>Mobile iOS and Android coming soon.</p>
          </div>
          <div className='p-6 pt-0 text-center'>
            <img src="/images/wallet_light.png"
              className='img-light dark:hidden light:show lg:w-3/6 w-auto mx-auto'
              alt="Begin Wallet App Home"
            />
            <img src="/images/wallet_light.png"
              className='img-light dark:show light:hidden lg:w-3/6 w-auto mx-auto'
              alt="Begin Wallet App Home"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
