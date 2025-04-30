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
  group: string
  index: number
}

export default PostType
