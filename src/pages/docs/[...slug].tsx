import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
import Layout from "../../components/layout";
import {
  getPostBySlug,
  getAllPosts,
  getAllDocs,
  getDocBySlug,
  getDocs,
} from "../../lib/api";
import Post from "../../types/post";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";
import PostType from "../../types/post";
import Navigation from "../../components/navigation";
import { defineMessages } from "react-intl";
import { GA_TRACKING_ID } from "../../lib/gtag";
import f from "../../lib/translate";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import DateFormater from "../../components/date-formater";
import DocPostBody from "../../components/doc-post-body";

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
  allPosts: any;
};

const messages = defineMessages({
  pageTitle: {
    id: "page.title",
    defaultMessage:
      "Begin Wallet - Buy Bitcoin BTC, Cardano ADA, Crypto Wallet",
  },
  pageDescription: {
    id: "page.description",
    defaultMessage:
      "With Begin you can Buy Bitcoin, BTC, Cardano, ADA, collect NFTs, earn yeld, send, and participate in our growing digital world. " +
      "Where everyone is welcome on Begin DeFi Wallet on Cardano, that you are in control of your finances.",
  },
});

const DocPost = ({ post, morePosts, preview, allPosts }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggleGroup = (key: string) => {
    setExpanded(prev => (prev === key ? null : key))
  }

  useEffect(() => {
    const groupKey = post.slug.split('/')[0] || 'general'
    // toggleGroup(groupKey);
    setExpanded(groupKey);
  }, [])

  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <Navigation />
      <Container>
        <section id="features" className="mx-auto">
          <div className="pt-16 lg:pt-32 p-6 lg:p-12">
            <div className="flex flex-col md:flex-row">
              {/* Mobile Header */}
              <header className="flex items-center justify-between p-2 md:hidden">
              <div className="text-xl font-semibold">Learn Content</div>
                <button
                  onClick={() => setIsOpen(true)}
                  className="p-2 rounded focus:outline-none focus:ring"
                >
                  <Menu className="w-6 h-6 text-gray-700" />
                </button>
              </header>

              {/* Sidebar Drawer */}
              {/* Overlay */}
              {isOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                  onClick={() => setIsOpen(false)}
                />
              )}

              <aside
                className={clsx(
                  "fixed inset-y-0 left-0 w-72 z-40 bg-white dark:bg-[#141414] shadow-md transform transition-transform duration-300 md:static md:translate-x-0",
                  {
                    "-translate-x-full": !isOpen,
                    "translate-x-0": isOpen,
                  }
                )}
              >
                {/* Mobile Drawer Header */}
                <div className="pt-16 lg:pt-32 p-6 lg:p-12 flex justify-between items-center p-4 border-b md:hidden">
                <div className="text-xl font-semibold">Learn Content</div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 focus:outline-none"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <nav className="p-4 space-y-2">
                  {allPosts.menu.map((section) => {
                    return (
                      <div key={section.key}>
                        <button
                          onClick={() => toggleGroup(section.key)}
                          className="flex items-center justify-between w-full px-2 py-2 text-left font-medium text-gray-600 hover:bg-gray-100  dark:hover:bg-[#18181b] rounded"
                        >
                          <span>{section.group}</span>
                          {expanded === section.key ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                        {expanded === section.key && (
                          <div className="ml-4 mt-1 space-y-1">
                            {section.children.sort((a,b) => a.index - b.index).map((item) => (
                              <a
                                href={`/docs/${item.slug}`}
                                className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-[#18181b]"
                              >
                                {item.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </aside>

              {/* Main Content */}
              <main className="flex-1 p-2 md:p-6">
                {router.isFallback ? (
                  <PostTitle>Loading…</PostTitle>
                ) : (
                  <>
                    <article>
                      <Head>
                        <title>
                          {f(messages.pageTitle) + " | " + post.title}
                        </title>
                        <meta
                          name="twitter:card"
                          content="summary_large_image"
                        />
                        <meta name="twitter:site" content="@BeginWallet" />
                        <meta
                          name="twitter:title"
                          content={f(messages.pageTitle) + " | " + post.title}
                        />
                        <meta
                          name="twitter:description"
                          content={post.excerpt}
                        />
                        <meta
                          name="twitter:image"
                          content={"https://begin.is" + post.ogImage.url}
                        />
                        <meta property="og:image" content={post.ogImage.url} />
                        <meta
                          property="og:title"
                          content={f(messages.pageTitle) + " | " + post.title}
                        />
                        <meta
                          property="og:description"
                          content={post.excerpt}
                        />
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
                      {/* <PostHeader
                        title={post.title}
                        coverImage={post.coverImage}
                        date={post.date}
                        author={post.author}
                        baseURL="/docs/"
                      /> */}
                      <h1 className="lg:text-3xl text-2xl">
                        {post.title}
                      </h1>
                      <p className="text-gray-500 mb-4">
                        <DateFormater dateString={post.date} />
                      </p>
                      <DocPostBody content={post.content} />
                    </article>
                  </>
                )}
              </main>
            </div>
          </div>
        </section>
      </Container>
    </Layout>
  );
};

export default DocPost;

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

  const allPosts = getDocs([
    "title",
    "slug",
    "group",
    "index"
  ]);

  
  const menuMap = {};
  
  [allPosts.hero, ...(allPosts.stories as any[])].forEach((post:Post) => {
    console.log({post})
    const groupKey = post?.slug?.split('/')[0] || 'general'
    const groupLabel = post?.group || 'General information'

    if (!menuMap[groupKey]) {
      menuMap[groupKey] = {
        group: groupLabel,
        key: groupKey,
        children: [],
      }
    }

    menuMap[groupKey].children.push(post)
  });


  const menu = Object.values(menuMap);
  allPosts.menu = menu;

  return {
    props: {
      post: {
        ...post,
        content,
      },
      allPosts
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
