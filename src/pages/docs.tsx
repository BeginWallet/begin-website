import Link from "next/link";
import HeroPost from "../components/hero-post";
import MoreStories from "../components/more-stories";
import { getDocs, getGuides, getPosts } from "../lib/api";
import Post from "../types/post";
import Container from "../components/container";
import Navigation from "../components/navigation";
import Layout from "../components/layout";
import Head from "next/head";
import { GA_TRACKING_ID } from "../lib/gtag";
import { defineMessages } from "react-intl";
import f from "../lib/translate";
import { Children, useState } from "react";
import clsx from "clsx";
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'

type Props = {
  allPosts: {
    hero: Post;
    stories: Post[];
    menu: any[];
  };
};

const messages = defineMessages({
  pageTitle: {
    id: "page.title",
    defaultMessage:
      "Begin Wallet - User Guide | Buy Bitcoin BTC, Cardano ADA, Crypto Wallet",
  },
  pageDescription: {
    id: "page.description",
    defaultMessage:
      "With Begin you can Buy Bitcoin, BTC, Cardano, ADA, collect NFTs, earn yeld, send, and participate in our growing digital world. " +
      "Where everyone is welcome on Begin DeFi Wallet on Cardano, that you are in control of your finances.",
  },
});

export default function Docs({ allPosts }: Props) {
  const heroPost = allPosts.hero;
  const morePosts = allPosts.stories;

  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggleGroup = (key: string) => {
    setExpanded(prev => (prev === key ? null : key))
  }

  return (
    <>
      <Layout>
        <Head>
          <title>{f(messages.pageTitle)}</title>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@BeginWallet" />
          <meta name="twitter:title" content={f(messages.pageTitle)} />
          <meta
            name="twitter:description"
            content={`${f(messages.pageDescription)}`}
          />
          {/* TODO: Change cover page */}
          <meta
            name="twitter:image"
            content="https://begin.is/images/begin_cover.png"
          />
          <meta
            name="og:description"
            content={`${f(messages.pageDescription)}`}
          />
          <meta property="og:image" content="/images/begin_cover.png" />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
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
        <Navigation />
        <Container>
          <section id="features" className="mx-auto">
            <div className="pt-16 lg:pt-32 p-6 lg:p-12">
              <div className="flex">
                {/* Mobile Header */}
                <header className="flex items-center justify-between p-4 shadow-md md:hidden">
                  <div className="text-xl font-semibold">My App</div>
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
                    "fixed inset-y-0 left-0 w-72 z-40 bg-black shadow-md transform transition-transform duration-300 md:static md:translate-x-0",
                    {
                      "-translate-x-full": !isOpen,
                      "translate-x-0": isOpen,
                    }
                  )}
                >
                  {/* Mobile Drawer Header */}
                  <div className="flex justify-between items-center p-4 border-b md:hidden">
                    <div className="text-xl font-semibold">Menu</div>
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
                              {section.children.sort((a,b) => a.index - b.index).map(item => (
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
                <main className="flex-1 p-6">
                  <h1 className="lg:text-3xl text-2xl">
                    Learn about Begin: Help & Support
                  </h1>
                  {heroPost.title !== undefined && (
                    <HeroPost
                      title={heroPost.title}
                      coverImage={heroPost.coverImage}
                      date={heroPost.date}
                      author={heroPost.author}
                      slug={heroPost.slug}
                      excerpt={heroPost.excerpt}
                      baseURL="/docs/"
                    />
                  )}
                  {morePosts.length > 0 && (
                    <MoreStories posts={morePosts} baseURL="/docs/" />
                  )}
                </main>
              </div>
            </div>
          </section>
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getDocs([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
    "hero",
    "group",
    "index"
  ]);

  
  const menuMap = {};
  
  [allPosts.hero, ...(allPosts.stories as any[])].forEach((post:Post) => {
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
    props: { allPosts },
  };
};
