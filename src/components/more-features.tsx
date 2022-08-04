import { defineMessages } from 'react-intl'
import f from "../lib/translate";

const messages = defineMessages({
  moreTitle: {
    id: 'more.title',
    defaultMessage: 'All you can do with Decentralized finance'
  },
  moreBody: {
    id: 'more.body',
    defaultMessage: '<b>Personalized QR Card</b> that allows you to express yourself by the selection of themes available.'+
    '{br}'+
    '<b>Savings account</b> ready and easy to use, where you earn rewards and can claim them every 5 days or build your retirement plan with it.'+
    '{br}'+
    '<b>Collectible library</b> where you can view all of your <babbr>NFT</babbr> & Tokens in one place.'+
    '{br}'+
    '<b>Cardano native tokens</b> can be transacted through the Begin Wallet.'
  },
  moreAbbr: {
    id: 'more.abbr',
    defaultMessage: 'Non-Fungible Tokens'
  }
})

const MoreFeatures = () => {

  return (
    <section id="more" className="pt-10 -mt-10 lg:pt-20 lg:-mt-20">
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 md:col-gap-6 row-gap-0 md:row-gap-6 lg:mb-10">
        <div className="item-center text-center hidden md:block -m-10 -mt-16 -mr-24">
          <img src="/images/chrome-extension.png" alt="Begin Wallet Chrome Extension" className="inline-block" />
        </div>
        <div className="lg:ml-6 md:p-6 flex flex-wrap items-center">
          <div className="item-center text-center block md:hidden -mt-16">
            <img src="/images/chrome-extension.png" alt="Begin Wallet Chrome Extension" className="inline-block" />
          </div>
          <p className="text-base text-justify lg:text-left lg:mr-8 mt-10">
            {f(messages.moreBody, {
              b: (chunk) => <strong>{chunk}</strong>,
              babbr: (chunk) => <strong><abbr title={f(messages.moreAbbr)}>{chunk}</abbr></strong>,
              br: <><br/><br/></>  
            })}
            {/* Our <strong><abbr title="Decentralized Finance">DeFi</abbr></strong> (Decentralized Finance) services empower you to engage with others in the community, by providing liquidity to collateralized loans while you earn yields on your crypto assets.
            <br /><br />
            You can also promote an open world where you can use our <strong>Mission Transparency</strong> feature to Donate and register it on the blockchain.
            <br /><br />
            Plus help small business take off their ideas or farmers in remote locations that need a micro-loan to grow their production. All of it using our <strong>Social Lending</strong> based on our Social Proof algorithm. */}
          </p>
        </div>
      </div>
    </section>
  )
}

export default MoreFeatures
