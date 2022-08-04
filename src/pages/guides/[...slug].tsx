import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts, getAllGuides, getGuideBySlug } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import PostType from '../../types/post'

type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

const Post = ({ post, morePosts, preview }: Props) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>B58 Finance - Multi Feature DeFi Wallet on Cardano</title>
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@B58Finance" />
                <meta name="twitter:title" content={"B58 Finance - Multi Feature DeFi Wallet on Cardano | " + post.title} />
                <meta name="twitter:description" content={post.excerpt} />
                <meta name="twitter:image" content={"https://b58.finance" + post.ogImage.url} />
                <meta property="og:image" content={post.ogImage.url} />
                <meta property="og:title" content={"B58 Finance - Multi Feature DeFi Wallet on Cardano | " + post.title} />
                <meta property="og:description" content={post.excerpt} />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
                baseURL='/guides/'
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export default Post

type Params = {
  params: {
    slug: any[]
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getGuideBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'excerpt',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllGuides(['slug'])

  return {
    paths: posts.map((posts) => {
      return {
        params: {
          slug: [...posts.slug.split('/')],
        },
      }
    }),
    fallback: false,
  }
}
