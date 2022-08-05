import Container from './container'
import NavigationFooter from './navigation-footer'
import { EXAMPLE_PATH } from '../lib/constants'
import { defineMessages } from 'react-intl'
import f from "../lib/translate";

const messages = defineMessages({
  footerSocial: {
    id: 'footer.social',
    defaultMessage: 'Social Medias'
  },
  footerBtnDownload: {
    id: 'footer.btn.download',
    defaultMessage: 'Begin Wallet - Available Soon'
  },
  footerContact: {
    id: 'footer.contact',
    defaultMessage: 'Get in touch'
  },
  footerDiscord: {
    id: 'footer.discord',
    defaultMessage: 'Join the community'
  },
  footerTwitter: {
    id: 'footer.twitter',
    defaultMessage: 'Follow for updates'
  },
})

const Footer = () => {
  return (
    // className="bg-blue-over text-white border-t border-accent-2 dark:border-accent-2-dark"
    <footer>
      <Container>
        <div className="p-2 pt-0 lg:p-6 lg:pt-4 lg:-mt-16 flex flex-col flex-wrap justify-center w-full">
          <div className='p-4 lg:p-12 mb-6 flex flex-col items-center lg:items-left lg:flex-row bg-blue-over text-white rounded-2xl w-full'>
            <div className='flex-grow'>
              <a href="https://discord.gg/QQVPuYBZHg" target="_blank" className="text-xl lg:text-5xl hover:text-blue-light sm:p-6 lg:p-0">
                <svg role="img" className="fill-current inline-block h-12 w-12" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                  <title>Begin Wallet Discord</title>
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                </svg>
                {f(messages.footerDiscord)}
              </a>
            </div>
            <div className='w-full lg:w-1/3 lg:text-right'>
              <a href="https://discord.gg/QQVPuYBZHg" target="_blank" role="button" className="bg-blue-discord hover:border-white hover:shadow-lg hover:bg-white hover:text-blue-light text-sm text-white w-full lg:w-40 h-12 rounded-xl inline-flex items-center justify-center">
                Discord
              </a>
            </div>
          </div>

          <div className='p-4 lg:p-12 mb-6 flex flex-col items-center lg:items-left lg:flex-row bg-blue-over text-white rounded-2xl w-full'>
            <div className='flex-grow'>
              <a href="https://twitter.com/BeginWallet" target="_blank" className="text-xl lg:text-5xl hover:text-blue-light sm:p-6 lg:p-0">
                <svg role="img" className="fill-current inline-block h-12 w-12" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                  <title>Begin Wallet Twitter</title>
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                {f(messages.footerTwitter)}
              </a>
            </div>
            <div className='w-full lg:w-1/3 lg:text-right'>
              <a href="https://twitter.com/BeginWallet" target="_blank" role="button" className="bg-blue-twitter hover:border-white hover:shadow-lg hover:bg-white hover:text-blue-light text-sm text-white w-full lg:w-40 h-12 rounded-xl inline-flex items-center justify-center">
                Twitter
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="">
            <NavigationFooter />
          </div>
          <div className="flex flex-col mb-6 lg:mb-0 lg:ml-10 items-start">
            {/* <p className="text-md mb-4 text-center lg:text-left w-full lg:w-auto">{f(messages.footerSocial)}</p> */}
            {/* <div className="flex flex-row lg:flex-col text-center lg:text-left">
              <a href="https://twitter.com/B58Wallet" target="_blank" className="hover:text-blue-light sm:p-6 lg:p-0">
                <svg role="img" className="fill-current inline-block h-12 w-12" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                  <title>Begin Wallet Twitter</title>
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Twitter
              </a>
              <a href="https://discord.gg/QQVPuYBZHg" target="_blank" className="hover:text-blue-light sm:p-6 lg:p-0">
                <svg role="img" className="fill-current inline-block h-12 w-12" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                  <title>Begin Wallet Discord</title>
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                </svg>
                Discord
              </a>
              <a href="https://github.com/B58-Finance" target="_blank" className="hover:text-blue-light sm:p-6 lg:p-0">
                <svg role="img" className="fill-current inline-block h-12 w-12" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                  <title>B58 Finance GitHub</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg> 
                GitHub
              </a>
              <a href="https://b58finance.medium.com/" target="_blank" className="hover:text-blue-light sm:p-6 lg:p-0">
                <svg role="img" className="fill-current inline-block h-12 w-12" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                  <title>B58 Finance Medium</title>
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                </svg>
                Medium
              </a>
              <a href="https://www.reddit.com/r/B58Finance/" target="_blank" className="hover:text-blue-light sm:p-6 lg:p-0">
              <svg role="img" className="fill-current inline-block h-12 w-12" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                  <title>B58 Finance Reddit</title>
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                </svg>
                Reddit
              </a>
            </div> */}
          </div>
          <div className="flex-grow justify-center items-center p-2 w-full lg:w-1/3">
            <div className="flex flex-col justify-center">
              <a href="#" role="button" className="border-2 border-blue-medium bg-blue-medium hover:border-white hover:shadow-lg hover:bg-white hover:text-blue-light text-sm text-white text-center py-4 px-6 rounded-xl">
                {f(messages.footerBtnDownload)}
              </a>
              <p className="text-lg mt-10 text-center">
                <a href="mailto:contact@b58.finance" className="underline hover:text-blue-light">{f(messages.footerContact)}</a>
              </p>
            </div>
          </div>
        </div>
        <div className="text-center p-6">
          <small>© 2022, Developed by <a href="https://b58.finance" target="_blank" className='underline font-bold'>B58 Finance</a></small>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
