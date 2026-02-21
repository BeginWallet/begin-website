import Head from "next/head";
import { GetServerSideProps } from "next";
import { QRCode } from "react-qrcode-logo";
import BeginQRLogo from "../../public/images/begin_coin.svg";
import { useState } from "react";
import Meta from "../../components/meta";
import Link from "next/link";

type PaymentProps = {
  handle: string;
  displayHandle: string;
  amount: string | null;
  token: string;
  note: string | null;
  paymentId: string | null;
  chain: string;
};

function getLovelace(amount: string): string {
  return String(Math.round(parseFloat(amount) * 1_000_000));
}

function buildDeepLink(props: PaymentProps): string {
  if (props.chain === "bitcoin") {
    const params = props.amount ? `?amount=${props.amount}` : "";
    return `bitcoin:${props.handle}${params}`;
  }
  const address = props.handle;
  const lovelace = props.amount ? getLovelace(props.amount) : "0";
  let link = `https://begin-wallet.app.link/send?coinType=cardano&address=${encodeURIComponent(address)}&amount=${lovelace}&networkId=1&identifier=default`;
  return link;
}

function buildQRValue(props: PaymentProps): string {
  if (props.chain === "bitcoin") {
    const params = props.amount ? `?amount=${props.amount}` : "";
    return `bitcoin:${props.handle}${params}`;
  }
  let uri = `web+cardano:${props.handle}`;
  const params: string[] = [];
  if (props.amount) params.push(`amount=${getLovelace(props.amount)}`);
  if (props.token && props.token !== "ADA") params.push(`token=${props.token}`);
  if (props.paymentId) params.push(`paymentId=${props.paymentId}`);
  if (props.note) params.push(`note=${encodeURIComponent(props.note)}`);
  if (params.length > 0) uri += "?" + params.join("&");
  return uri;
}

export default function PayHandle(props: PaymentProps) {
  const { handle, displayHandle, amount, token, note, chain } = props;
  const [copied, setCopied] = useState(false);

  const deepLink = buildDeepLink(props);
  const qrValue = buildQRValue(props);

  const ogTitle = `Pay ${displayHandle} — Begin Pay`;
  const ogDesc = amount
    ? `Send ${amount} ${token} to ${displayHandle}`
    : `Send crypto to ${displayHandle}`;

  const copyAddress = () => {
    navigator.clipboard.writeText(handle).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <Meta />
      <Head>
        <title>{ogTitle}</title>
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDesc} />
        <meta property="og:image" content="https://begin.is/images/begin_cover.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@BeginWallet" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDesc} />
        <meta name="twitter:image" content="https://begin.is/images/begin_cover.png" />
      </Head>

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #0a0a1a 0%, #111128 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 16px",
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          color: "#fff",
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: "32px" }}>
          <Link href="/">
            <img
              src="/images/begin_coin.svg"
              alt="Begin"
              style={{ width: "48px", height: "48px" }}
            />
          </Link>
        </div>

        {/* Card */}
        <div
          style={{
            background: "rgba(255,255,255,0.06)",
            borderRadius: "24px",
            padding: "32px 24px",
            maxWidth: "400px",
            width: "100%",
            textAlign: "center",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* Handle */}
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 700,
              margin: "0 0 8px",
              wordBreak: "break-all",
            }}
          >
            {displayHandle}
          </h1>

          {/* Amount + Token */}
          {amount && (
            <div
              style={{
                fontSize: "36px",
                fontWeight: 700,
                margin: "16px 0",
                color: "#7B61FF",
              }}
            >
              {amount} {token}
            </div>
          )}

          {/* Note */}
          {note && (
            <p
              style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.6)",
                margin: "0 0 24px",
              }}
            >
              {note}
            </p>
          )}

          {/* QR Code */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "24px 0",
              background: "#fff",
              borderRadius: "16px",
              padding: "16px",
              width: "fit-content",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <QRCode
              value={qrValue}
              size={220}
              eyeRadius={5}
              logoImage={BeginQRLogo}
              logoPadding={0}
              logoWidth={32}
              logoHeight={32}
              logoPaddingStyle="circle"
              removeQrCodeBehindLogo={true}
              qrStyle="dots"
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>

          {/* Pay Button */}
          <a
            href={deepLink}
            style={{
              display: "block",
              width: "100%",
              padding: "16px",
              background: "#7B61FF",
              color: "#fff",
              borderRadius: "14px",
              fontSize: "18px",
              fontWeight: 600,
              textDecoration: "none",
              marginTop: "24px",
              boxSizing: "border-box",
              textAlign: "center",
            }}
          >
            Pay with Begin
          </a>

          {/* Copy Address */}
          <button
            onClick={copyAddress}
            style={{
              display: "block",
              width: "100%",
              padding: "14px",
              background: "transparent",
              color: "rgba(255,255,255,0.7)",
              borderRadius: "14px",
              fontSize: "16px",
              fontWeight: 500,
              border: "1px solid rgba(255,255,255,0.2)",
              marginTop: "12px",
              cursor: "pointer",
              boxSizing: "border-box",
            }}
          >
            {copied ? "Copied!" : "Copy Address"}
          </button>
        </div>

        {/* Footer */}
        <div style={{ marginTop: "32px", fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
          Powered by{" "}
          <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "underline" }}>
            Begin Wallet
          </Link>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PaymentProps> = async (context) => {
  const { handle } = context.params as { handle: string };
  const { amount, token, note, paymentId, chain } = context.query;

  // Clean handle — remove leading @ if present for display but keep original for address
  const rawHandle = Array.isArray(handle) ? handle[0] : handle;
  const cleanHandle = rawHandle.startsWith("@") || rawHandle.startsWith("$")
    ? rawHandle
    : rawHandle;

  const displayHandle = rawHandle.startsWith("@") || rawHandle.startsWith("$")
    ? rawHandle
    : `@${rawHandle}`;

  const tokenStr = ((Array.isArray(token) ? token[0] : token) || "ADA").toUpperCase();
  const chainStr = tokenStr === "BTC" ? "bitcoin" : ((Array.isArray(chain) ? chain[0] : chain) || "cardano");

  return {
    props: {
      handle: cleanHandle,
      displayHandle,
      amount: (Array.isArray(amount) ? amount[0] : amount) || null,
      token: tokenStr,
      note: (Array.isArray(note) ? note[0] : note) || null,
      paymentId: (Array.isArray(paymentId) ? paymentId[0] : paymentId) || null,
      chain: chainStr,
    },
  };
};
