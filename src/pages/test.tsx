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
import Script from "next/script";
import { Lucid, Blockfrost } from "lucid-cardano";
import { BlockfrostProvider, BrowserWallet, MeshTxBuilder } from '@meshsdk/core';

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

  let beginWalletAPI:any = null;

  async function initializeLucid() {
    if (!beginWalletAPI) {
        console.warn("Wallet API is not available. Connect wallet first.");
        alert("Please connect your wallet first.");
        return false;
    }

    try {
      const lucid = await Lucid.new(
        new Blockfrost(
          "https://cardano-mainnet.blockfrost.io/api/v0",
          "mainnetukC8Dg4I7QBXm5NBrTbFDThYZX2IdD9V" // your key
        ),
        "Mainnet"
      );
        await lucid.selectWallet(beginWalletAPI);
        console.log("Lucid initialized with the connected wallet provider");
        return true;
    } catch (error) {
        console.error("Error initializing Lucid with wallet provider:", error);
        alert("Failed to initialize Lucid with the wallet provider.");
        return false;
    }
  }

  // Connect to Begin Wallet and set the API
async function connectBeginWallet() {
    if (window.cardano?.begin) {
        try {
            const wallet = await BrowserWallet.enable('begin');
            const utxos = await wallet.getUtxos();
            console.log("Utxos:", utxos);

            // beginWalletAPI = await window.cardano.begin.enable();
            console.log("Begin Wallet connected");
            const addresses = await wallet.getUsedAddresses();
            console.log("Wallet Addresses:", addresses);

            // Initialize Lucid now that we have the wallet API
            // await initializeLucid();
            console.log("Lucid initialized with Begin Wallet");
            alert("Connected to Begin Wallet.");
  
            return true;
        } catch (err) {
            console.error("Begin Wallet connection error:", err);
            alert("Failed to connect to Begin Wallet.");
            return false;
        }
    } else {
        alert("Begin Wallet not found. Please ensure it is installed and enabled.");
        return false;
    }
  }

  // Build and send transaction
async function buildAndSendTransaction() {
    const selectedCrypto = '1 ADA'
        // Remove the " ADA" (or " BTC") part from the string
    const amountOnly = Number(selectedCrypto.replace(/\s*(ADA|BTC)$/i, "").trim());

    console.log(amountOnly);  // Output: "0.00001"
   
    try {
        
        const recipientAddress = 'addr1qyc82mg805qw8duqf44h8futyhfj0zxmu57pm4wsa8jwyyc6e9h5gr8y263u3chg4n6p8zpnn2359xzr55yx6enkr8kqw4pau0';
        console.log(recipientAddress);
        let amountToSend = 0;

        if(selectedCrypto.toUpperCase().includes("ADA")){
            
            // Directly convert ADA to Lovelace
            amountToSend = amountOnly * 1000000;

        }else if (selectedCrypto.toUpperCase().includes("BTC")) {
            const BTCtoADA = null;

            if (BTCtoADA) {
                const equivalentADA = amountOnly * BTCtoADA;
                
                amountToSend = equivalentADA * 1000000;
            } else {
                throw new Error("Invalid exchange rates.");
            }
        } else {
            throw new Error("Unsupported cryptocurrency selected.");
        }

        // const lucid = await Lucid.new(
        //   new Blockfrost(
        //     "https://cardano-mainnet.blockfrost.io/api/v0",
        //     "mainnetukC8Dg4I7QBXm5NBrTbFDThYZX2IdD9V" // your key
        //   ),
        //   "Mainnet"
        // );
          // await lucid.selectWallet(beginWalletAPI);
        //  const tx = await lucid
        //      .newTx()
        //      .payToAddress(recipientAddress, { lovelace: BigInt(amountToSend) })
        //      .complete();

        //  const txComplete = await tx.sign();
        //  console.log("Transaction ready to be signed:", txComplete.toString());
        //  const signedTx = await txComplete.complete();
        // console.log("Transaction signed:", signedTx);
        //  const txHash = await signedTx.submit();

        // Mesh
        //Call enable sidepanel or popup to connect wallet
        const wallet = await BrowserWallet.enable('nami');
        const utxos = await wallet.getUtxos();
        console.log("Utxos:", utxos);

        const provider = new BlockfrostProvider('<API-KEY>');

        const txBuilder = new MeshTxBuilder({
          fetcher: provider,
          verbose: true,
        });

        const changeAddress = await wallet.getChangeAddress();

        const unsignedTx = await txBuilder
          .txOut(recipientAddress, [{ unit: "lovelace", quantity: '1000000' }])
          .changeAddress(changeAddress)
          .selectUtxosFrom(utxos)
          .complete();

        const signedTx = await wallet.signTx(unsignedTx);
        const txHash = await wallet.submitTx(signedTx);
        

        console.log("Transaction submitted. TxHash:", txHash);
        alert(`Transaction submitted! TxHash: ${txHash}`);
        // // Call the process_payment function to handle the order status on the server side
        
        return txHash;
    } catch (error) {
        console.error("Transaction failed:", error);
        throw error;
    }
}

  const paymentData = {
    address: 'addr1qyc82mg805qw8duqf44h8futyhfj0zxmu57pm4wsa8jwyyc6e9h5gr8y263u3chg4n6p8zpnn2359xzr55yx6enkr8kqw4pau0',
    amount: 1,
    paymentId: '123-abc',
    token: 'ADA',
    note: ''
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
              <h2 className="lg:w-6/12 lg:text-5xl text-2xl">
                TEST Begin
              </h2>
            </div>
            <div>
              <button className="p-6" onClick={connectBeginWallet}>Connect</button>
              <button className="p-6" onClick={buildAndSendTransaction}>Build/Send Tx</button>
            </div>
          </section>
          
        </Container>
      </Layout>
    </>
  );
}
