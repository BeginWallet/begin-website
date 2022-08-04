import Author from './author'

type PostType = {
  slug: string
  title: string
  date: string
  coverImage: string
  author: Author
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
  hero: boolean
  engine: string
  year: string
  hp: string
  topSpeed: string
  adaPrice: string
  usdPrice: string
}

export default PostType
