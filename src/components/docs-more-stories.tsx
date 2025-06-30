import PostPreview from './post-preview'
import Post from '../types/post'
import PostPreviewLink from './post-preview-link'

type Props = {
  posts: Post[]
  baseURL: string
}

const DocsMoreStories = ({ posts, baseURL }: Props) => {
  return (
    <section>
      {/* <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2> */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-left">
        {posts.map((post) => (
          <PostPreviewLink
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            baseURL={baseURL}
          />
        ))}
      </div>
    </section>
  )
}

export default DocsMoreStories
