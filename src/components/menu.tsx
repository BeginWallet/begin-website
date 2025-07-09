import { MouseEventHandler } from "react"
import { defineMessages } from 'react-intl'
import f, { setLanguage } from "../lib/translate";


const messages = defineMessages({
  features: {
    id: 'menu.features',
    defaultMessage: 'Features'
  },
  team: {
    id: 'menu.team',
    defaultMessage: 'Team'
  },
  support: {
    id: 'menu.support',
    defaultMessage: 'Support'
  },
  whitepaper: {
    id: 'menu.whitepaper',
    defaultMessage: 'Whitepaper'
  },
  download: {
    id: 'menu.download',
    defaultMessage: 'Download'
  },
  guides: {
    id: 'menu.guides',
    defaultMessage: 'User Guides'
  },
  blog: {
    id: 'menu.blog',
    defaultMessage: 'Blog'
  },
  learn: {
    id: 'menu.learn',
    defaultMessage: 'Learn'
  }
})

type Props = {
  hover: string
  onClick: MouseEventHandler 
}

const Menu = ( {hover, onClick}: Props ) => {
  return (
    <>
     {/* <a href="/nft" onClick={onClick} className={"pl-2 pr-2 block mt-4 border-2 rounded-lg lg:inline-block lg:mt-0 mr-4 hover:"+hover}>
      NFT <span className="bg-teal-200 hover:bg-white text-teal-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">Live</span>
    </a> */}
    <a href="/#features" onClick={onClick} className={"block mt-4 lg:inline-block lg:mt-0 mr-4 hover:"+hover}>
      {f(messages.features)}
    </a>
    <a href="/guides" className={"block mt-4 lg:inline-block lg:mt-0 mr-4 hover:"+hover}>
      {f(messages.guides)}
    </a>
    <a href="/docs" className={"block mt-4 lg:inline-block lg:mt-0 mr-4 hover:"+hover}>
      {f(messages.learn)}
    </a>
    <a href="/blog" className={"block mt-4 lg:inline-block lg:mt-0 mr-4 hover:"+hover}>
      {f(messages.blog)}
    </a>
    <a href="https://discord.gg/QQVPuYBZHg" target="_blank" onClick={onClick} className={"block mt-4 lg:inline-block lg:mt-0 mr-4 hover:"+hover}>
      {f(messages.support)}
    </a>
    {/* <a href="/#download" className={"block mt-4 lg:inline-block lg:mt-0 mr-4 hover:"+hover}>
      {f(messages.download)}
    </a> */}
    {/* <a href="/assets/docs/whitepaper_v1_062021.pdf" target="_blank" onClick={onClick} className={"block mt-4 lg:inline-block lg:mt-0 dark:text-white mr-4 hover:"+hover}>
      {f(messages.whitepaper)}
    </a> */}
    </>
  )
}

export default Menu