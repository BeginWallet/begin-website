import Head from "next/head";
import Meta from "../../components/meta";
import Link from "next/link";

export default function PayIndex() {
  return (
    <>
      <Meta />
      <Head>
        <title>Begin Pay — Send & Receive Crypto Payments</title>
        <meta property="og:title" content="Begin Pay — Send & Receive Crypto Payments" />
        <meta
          property="og:description"
          content="Create shareable payment links for Cardano ADA, Bitcoin, and stablecoins with Begin Wallet."
        />
        <meta property="og:image" content="https://begin.is/images/begin_cover.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@BeginWallet" />
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
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: "32px" }}>
          <Link href="/">
            <img
              src="/images/begin_coin.svg"
              alt="Begin"
              style={{ width: "56px", height: "56px" }}
            />
          </Link>
        </div>

        <h1 style={{ fontSize: "40px", fontWeight: 700, margin: "0 0 16px", maxWidth: "600px" }}>
          Begin Pay
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.6)",
            margin: "0 0 40px",
            maxWidth: "500px",
            lineHeight: 1.6,
          }}
        >
          Create shareable payment links for Cardano ADA, Bitcoin, and stablecoins.
          Anyone can pay you with a single tap.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "320px" }}>
          {/* Example link */}
          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              borderRadius: "16px",
              padding: "20px",
              border: "1px solid rgba(255,255,255,0.1)",
              textAlign: "left",
            }}
          >
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: "0 0 8px" }}>
              Example payment link
            </p>
            <code style={{ fontSize: "14px", color: "#7B61FF", wordBreak: "break-all" }}>
              begin.is/pay/@yourhandle?amount=10&token=ADA
            </code>
          </div>

          <a
            href="https://begin.is/#download"
            style={{
              display: "block",
              padding: "16px",
              background: "#7B61FF",
              color: "#fff",
              borderRadius: "14px",
              fontSize: "18px",
              fontWeight: 600,
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Get Begin Wallet
          </a>
        </div>

        <div style={{ marginTop: "48px", fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
          Powered by{" "}
          <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "underline" }}>
            Begin Wallet
          </Link>
        </div>
      </div>
    </>
  );
}
