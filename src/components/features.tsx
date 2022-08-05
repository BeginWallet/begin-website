import { defineMessages } from 'react-intl'
import f from "../lib/translate";
import Lottie from 'react-lottie';
import WalletAnimation from '../lottie/Cardano_Wallet_Animation.json';
import StakeAnimation from '../lottie/Stake_Animation.json';
import SwapAnimation from '../lottie/Swap_Animation.json';


const messages = defineMessages({
  featuresTitle: {
    id: 'features.title',
    defaultMessage: 'Never has DeFi been so easy'
  },
  featuresWalletTitle: {
    id: 'features.wallet.title',
    defaultMessage: 'Your new favorite Cardano Wallet'
  },
  featuresStakeTitle: {
    id: 'features.stake.title',
    defaultMessage: 'Stake and earn ADA passively'
  },
  featuresDefiTitle: {
    id: 'features.defi.title',
    defaultMessage: 'Explore the world of DeFi'
  },
  featuresWallet: {
    id: 'features.wallet',
    defaultMessage: 'Begin is the next-generation of Cardano Wallets, that enables you to enter the new era of finance. Enjoy an easy onboarding process that guides you step-by-step. Welcome!'
  },
  featuresStake: {
    id: 'features.stake',
    defaultMessage: 'Earn up to 5% rewards staking your ADA and have full control of it. Helping to secure the Cardano network. Also, you are completely free to withdraw and move it any time.'
  },
  featuresDefi: {
    id: 'features.defi',
    defaultMessage: 'Begin opens the door to the DeFi world to you, from swapping Native Token direct on the wallet, to collecting NFTs. Get more from the vibrant Cardano DeFi with DEXs, NFT Marketplaces and more.'
  },
})

const Features = () => {

  return (
    <section id="features" className="pt-24 lg:pt-20 lg:-mt-20">
      <div className="p-2 lg:p-6 lg:pt-10 mt-22 lg:mt-48 flex flex-col flex-wrap justify-center w-full">
        <div className='p-4 lg:p-12 mb-6 flex flex-col lg:flex-row dark:bg-blue-over light:bg-white rounded-2xl w-full' style={{minHeight: '405px'}}>
          <div className='flex-grow'>
          <h2 className='lg:w-6/12 lg:text-5xl text-2xl'>{f(messages.featuresWalletTitle)}</h2>
          <p className='lg:text-xl lg:w-3/6 font-light'>{f(messages.featuresWallet)}</p>
          </div>
          <div className='mx-auto w-10/12 lg:w-auto text-center order-first lg:order-2'>
            <div className='lg:w-317px w-full'>
            <Lottie
                        className="100%"
                        height="100%"
                        options={{
                            loop: true,
                            autoplay: true,
                            animationData: WalletAnimation,
                            rendererSettings: {
                                preserveAspectRatio: 'xMidYMid slice',
                            },
                        }}
                        // segments={[frame, 60]}
                        // eventListeners={
                        //     [
                        //         {
                        //             eventName: 'complete',
                        //             callback: () => pause(),
                        //         },
                        //     ]
                        // }
                    />
            </div>
          </div>
        </div>

        <div className='p-4 lg:p-12 mb-6 flex flex-col lg:flex-row dark:bg-blue-over light:bg-white rounded-2xl w-full' style={{minHeight: '405px'}}>
          <div className='flex-grow'>
          <h2 className='lg:w-6/12 lg:text-5xl text-2xl'>{f(messages.featuresStakeTitle)}</h2>
          <p className='lg:text-xl lg:w-3/6 font-light'>{f(messages.featuresStake)}</p>
          </div>
          <div className='mx-auto w-10/12 lg:w-auto text-center order-first lg:order-2'>
            <div className='lg:w-317px w-full'>
            <Lottie
                          width="100%"
                          height="100%"
                          options={{
                              loop: true,
                              autoplay: true,
                              animationData: StakeAnimation,
                              rendererSettings: {
                                  preserveAspectRatio: 'xMidYMid slice',
                              },
                          }}
                          // segments={[frame, 60]}
                          // eventListeners={
                          //     [
                          //         {
                          //             eventName: 'complete',
                          //             callback: () => pause(),
                          //         },
                          //     ]
                          // }
                      />
            </div>
          </div>
        </div>

        <div className='p-4 lg:p-12 flex flex-col lg:flex-row dark:bg-blue-over light:bg-white rounded-2xl w-full' style={{minHeight: '405px'}}>
          <div className='flex-grow'>
          <h2 className='lg:w-6/12 lg:text-5xl text-2xl'>{f(messages.featuresDefiTitle)}</h2>
          <p className='lg:text-xl lg:w-3/6 font-light'>{f(messages.featuresDefi)}</p>
          </div>
          <div className='mx-auto w-10/12 lg:w-auto text-center order-first lg:order-2'>
            <div className='lg:w-317px w-full'>
            <Lottie
                          width="100%"
                          height="100%"
                          options={{
                              loop: true,
                              autoplay: true,
                              animationData: SwapAnimation,
                              rendererSettings: {
                                  preserveAspectRatio: 'xMidYMid slice',
                              },
                          }}
                          // segments={[frame, 60]}
                          // eventListeners={
                          //     [
                          //         {
                          //             eventName: 'complete',
                          //             callback: () => pause(),
                          //         },
                          //     ]
                          // }
                      />
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default Features
