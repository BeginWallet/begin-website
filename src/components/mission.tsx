import { defineMessages } from 'react-intl'
import f from "../lib/translate";

const messages = defineMessages({
  walletTitle: {
    id: 'mission.title',
    defaultMessage: 'The B58 Mission'
  },
  walletBody: {
    id: 'wallet.body',
    defaultMessage: 'Our mission is to deliver the next generation of multi-chain wallets to you, supporting <b>Cardano</b>, <b>Bitcoin</b>, and <b>Solana</b>.'+
    '{br}'+
    'With an easy and secure on-boarding process, that guides you to every important part of B58.' +
    '{br}'+
    'We\'re also committed to build features that our growing community needs.'
  },
  walletAbbr: {
    id: 'wallet.abbr',
    defaultMessage: 'Non-Fungible Tokens'
  }
})

const Mission = () => {

  return (
    <section id="mission" className="pt-10 -mt-10 lg:pt-20 lg:-mt-20">
      <div className="lg:mt-6 grid grid-cols-1 md:grid-cols-2 md:col-gap-12 row-gap-0 md:row-gap-6 lg:mb-10">
        <div className="flex flex-wrap content-center lg:mr-6 p-6">
          <h1 className="mb-8 text-3xl lg:text-6xl font-medium leading-tight">
            {f(messages.walletTitle)}
          </h1>
          <p className="text-base text-justify lg:text-left lg:mr-8">
            {f(messages.walletBody, {
              b: (chunk) => <strong>{chunk}</strong>,
              babbr: (chunk) => <strong><abbr title={f(messages.walletAbbr)}>{chunk}</abbr></strong>,
              br: <><br/><br/></>  
            })}
          </p>
        </div>
        <div className='p-10'>
          <img src="/images/b58_app_send.png"
            alt="Begin Wallet App Home"
          />
        </div>
      </div>
    </section>
  )
}

export default Mission
