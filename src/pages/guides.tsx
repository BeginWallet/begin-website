import Link from 'next/link'
import HeroPost from '../components/hero-post'
import MoreStories from '../components/more-stories'
import { getGuides, getPosts } from '../lib/api'
import Post from '../types/post'

type Props = {
  allPosts: {
    hero: Post
    stories: Post[]
  }
}

export default function Help({ allPosts }: Props) {
  const heroPost = allPosts.hero
  const morePosts = allPosts.stories
  
  return (
    <div>
      <div>Help</div>
      <div>
        Back to{' '}
        <Link href="/" as={process.env.BACKEND_URL + '/'}>
          <a>Home</a>
        </Link>
        <h2 className="mb-8 text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
            News
          </h2>
          {heroPost.title !== undefined && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
              baseURL='/guides/'
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} baseURL='/guides/' />}
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const allPosts = getGuides([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'hero',
  ])

  return {
    props: { allPosts },
  }
}