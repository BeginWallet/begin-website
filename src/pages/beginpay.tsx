import Link from "next/link";
import HeroPost from "../components/hero-post";
import MoreStories from "../components/more-stories";
import { getGuides, getPosts } from "../lib/api";
import Post from "../types/post";
import Container from "../components/container";
import Navigation from "../components/navigation";
import Layout from "../components/layout";
import Head from "next/head";
import { GA_TRACKING_ID, event } from "../lib/gtag";
import { defineMessages } from "react-intl";
import f from "../lib/translate";
import { useRef, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import BeginQRLogo from "../public/images/begin_coin.svg";

type Props = {
  allPosts: {
    hero: Post;
    stories: Post[];
  };
};

const messages = defineMessages({
  pageTitle: {
    id: "page.title",
    defaultMessage:
      "Begin Wallet - User Guides | Web3, NFTs and Crypto wallet on Cardano ADA",
  },
  pageDescription: {
    id: "page.description",
    defaultMessage:
      "With Begin you can collect NFTs, earn yeld, send, and participate in our growing digital world. " +
      "Where everyone is welcome on Begin DeFi Wallet on Cardano, that you are in control of your finances.",
  },
});

// Browser
// https://begin-wallet.app.link/browse?dappUrl=https%3A%2F%2Fbegin.is
// Pay
// https://begin-wallet.app.link/send?coinType=cardano&address=$francisluz&amount=10000000&networkId=1&identifier=default

export default function DeepLink() {
  const [values, setValues] = useState<any>({
    dappUrl: "",
    address: "",
    amount: 0,
  });

  const [beginLink, setBeginLink] = useState("");

  const generateDeepLink = (linkType: string) => {
    let link = "";
    if (linkType === "browse") {
      link = `https://begin-wallet.app.link/browse?dappUrl=${encodeURIComponent(
        values.dappUrl
      )}`;
    } else {
      link = `https://begin-wallet.app.link/send?coinType=cardano&address=${
        values.address
      }&amount=${
        (Number(values.amount) || 0) * 1000000
      }&networkId=1&identifier=default`;
    }

    setBeginLink(link);
  };

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
            content="https://begin.is/images/cover.jpeg"
          />
          <meta
            name="og:description"
            content={`${f(messages.pageDescription)}`}
          />
          <meta property="og:image" content="/images/cover.jpeg" />
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
              <h2 className="lg:w-6/12 lg:text-5xl text-2xl">
                Begin Pay - Demo
              </h2>
              <p>Micropayment protocol.</p>
            </div>
          </section>
          <section id="generate" className="mx-auto flex flex-col justify-center items-center">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "300px",
              }}
            >
              <div
                key={"receipt"}
                style={{
                  display: "flex",
                  WebkitMask: "var(--mask)",
                  mask: "var(--mask)",
                  minHeight: "300px",
                  backgroundColor: "#fff",
                  color: "#000",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  paddingTop: "24px",
                  paddingBottom: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "center",
                    // '& #react-qrcode-logo': { borderRadius: '8px !important' }, // border: '2px solid #3414FC'
                    paddingTop: "32px",
                    paddingBottom: "32px",
                  }}
                >
                  <QRCode
                    value={"beginpay:test123"}
                    eyeRadius={5} // 5 pixel radius for all corners of all positional eyes
                    logoImage={BeginQRLogo}
                    logoPadding={0}
                    logoWidth={32}
                    logoHeight={32}
                    logoPaddingStyle="circle"
                    removeQrCodeBehindLogo={true}
                    qrStyle="dots"
                    bgColor="#ffffffe6"
                    fgColor="#3414FC"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "80%",
                    height: "10px",
                    borderTop: "1px dashed #000",
                  }}
                ></div>
                <div
                  style={{
                    display: "flex",
                    width: "80%",
                    borderTop: "1px dashed #000",
                    padding: "24px",
                    justifyContent: "center",
                  }}
                >
                  <p>123.90 of Bgn</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col lg:flex-row justify-center p-6">
                <a
                  href="https://chrome.google.com/webstore/detail/begin-wallet/nhbicdelgedinnbcidconlnfeionhbml"
                  target="_blank"
                  role="button"
                  className="bg-white hover:border-gray-200 hover:shadow-lg hover:bg-white hover:text-blue-light text-sm text-black py-3 px-1 rounded-xl mb-2 lg:mb-0 lg:w-34 justify-center inline-flex items-center"
                >
                  Pay with Begin
                </a>
              </div>
            </div>
          </section>
        </Container>
      </Layout>
    </>
  );
}
