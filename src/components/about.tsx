import { defineMessages } from 'react-intl'
import f from "../lib/translate";

const messages = defineMessages({
  aboutTitle: {
    id: 'about.title',
    defaultMessage: 'About B58 Finance be powered by Cardano'
  },
  aboutBody: {
    id: 'about.body',
    defaultMessage: '<b>B58 Finance</b> is a decentralized finance multi-feature wallet built on top of Cardano Blockchain. That provides the operational financial system infrastructure to our services.' +
    '{br}' +
    'This allows us to build features that empower you to be your own bank, using Peer-to-Peer communication with no need for middle agents.' +
    '{br}' +
    'We aim to bring the next generation of wallets to you and provide the same experience available today. By using traditional mobile banks and remove the complexity of the blockchain world.'
  }
})

const About = () => {

  return (
    <section id="about" className="pt-10 -mt-10 lg:pt-20 lg:-mt-20">
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 md:col-gap-6 row-gap-0 md:row-gap-6 lg:mb-10">
        <div className="flex flex-wrap content-center">
          <img src="/images/cardano_img.png" alt="B58 Finance Powered by Cardano" className="img-light dark:hidden" />
          <img src="/images/cardano_img_dark.png" alt="B58 Finance Powered by Cardano" className="img-dark dark:block" />
        </div>
        <div className="lg:ml-6 p-6">
          <h1 className="mb-8 text-3xl lg:text-6xl font-medium leading-tight">
            {f(messages.aboutTitle)}
          </h1>
          <p className="text-base text-justify lg:text-left lg:mr-8">
            {f(messages.aboutBody,{
              b: (chunk) => <strong>{chunk}</strong>,
              br: <><br/><br/></>              
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
