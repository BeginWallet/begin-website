import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
import Layout from "../../components/layout";
import { getPostBySlug, getAllPosts, getAllDocs, getDocBySlug } from "../../lib/api";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";
import PostType from "../../types/post";
import Navigation from "../../components/navigation";
import { defineMessages } from "react-intl";
import { GA_TRACKING_ID } from "../../lib/gtag";
import f from "../../lib/translate";

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

const messages = defineMessages({
  pageTitle: {
    id: 'page.title',
    defaultMessage: 'Begin Wallet - Buy Bitcoin BTC, Cardano ADA, Crypto Wallet'
  },
  pageDescription: {
    id: 'page.description',
    defaultMessage: 'With Begin you can Buy Bitcoin, BTC, Cardano, ADA, collect NFTs, earn yeld, send, and participate in our growing digital world. '+
    'Where everyone is welcome on Begin DeFi Wallet on Cardano, that you are in control of your finances.'
  }
})

const Post = ({ post, morePosts, preview }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <Navigation />
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="pt-16 lg:pt-32 p-4 lg:p-12">
              <Head>
                <title>{f(messages.pageTitle) + " | " + post.title}</title>
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@BeginWallet" />
                <meta
                  name="twitter:title"
                  content={f(messages.pageTitle) + " | " + post.title}
                />
                <meta name="twitter:description" content={post.excerpt} />
                <meta
                  name="twitter:image"
                  content={"https://begin.is" + post.ogImage.url}
                />
                <meta property="og:image" content={post.ogImage.url} />
                <meta
                  property="og:title"
                  content={f(messages.pageTitle) + " | " + post.title}
                />
                <meta property="og:description" content={post.excerpt} />
                <script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                />
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });
                  `,
                  }}
                />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
                baseURL="/docs/"
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Post;

type Params = {
  params: {
    slug: any[];
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getDocBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "excerpt",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllDocs(["slug"]);

  return {
    paths: posts.map((posts) => {
      return {
        params: {
          slug: [...posts.slug.split("/")],
        },
      };
    }),
    fallback: false,
  };
}
