import Container from "../../components/container";
import Navigation from "../../components/navigation";
import Layout from "../../components/layout";
import Head from "next/head";
import { GA_TRACKING_ID } from "../../lib/gtag";
import { defineMessages } from "react-intl";
import f from "../../lib/translate";

const messages = defineMessages({
  pageTitle: {
    id: "page.title",
    defaultMessage:
      "Begin Wallet - Web3, NFTs and Crypto wallet on Cardano ADA",
  },
  pageDescription: {
    id: "page.description",
    defaultMessage:
      "With Begin you can collect NFTs, earn yeld, send, and participate in our growing digital world. " +
      "Where everyone is welcome on Begin DeFi Wallet on Cardano, that you are in control of your finances.",
  },
});

const Privacy = () => {
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
            <div className="pt-16 lg:pt-32 p-4 lg:p-12 ">
              <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold mb-6">
                  Privacy Policy for Begin Wallet
                </h1>
                <p className="text-sm text-gray-600 mb-8">
                  Effective Date: February 08, 2025
                </p>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold  mb-4">
                    1. Introduction
                  </h2>
                  <p className=" mb-4">
                    Begin Wallet, operated by Begin W UG, respects your privacy
                    and is committed to protecting your personal data. This
                    Privacy Policy explains how we collect, use, disclose, and
                    safeguard your information when you use our non-custodial
                    wallet service.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold  mb-4">
                    2. Information We Do Not Collect
                  </h2>
                  <p className=" mb-4">
                    Since Begin Wallet is a non-custodial service, we do not
                    collect, store, or have access to:
                  </p>
                  <ul className="list-disc pl-6 mb-4  space-y-2">
                    <li>Your private keys</li>
                    <li>Your wallet's transaction history</li>
                    <li>
                      Your personal identification details like name, address,
                      or email unless you provide them voluntarily for customer
                      support or for third-party services like Fiat on/off ramp
                      and swap or any service that requires KYC
                    </li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold  mb-4">
                    3. Information We Might Collect
                  </h2>
                  <ul className="list-disc pl-6 mb-4  space-y-2">
                    <li>
                      <span className="font-medium">Device Information:</span>{" "}
                      We might collect information about the device you use to
                      access our service, including the type of device,
                      operating system, and certain identifiers (like IP
                      address) for security and performance improvement.
                    </li>
                    <li>
                      <span className="font-medium">Usage Data:</span> We
                      collect data on how you interact with our app to enhance
                      functionality and user experience. This includes which
                      features are used, how often, and any error logs.
                    </li>
                    <li>
                      <span className="font-medium">Cookies:</span> We use
                      cookies to recognize you when you return to our service.
                      You can control cookies through your browser settings.
                    </li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold  mb-4">
                    4. Use of Information
                  </h2>
                  <ul className="list-disc pl-6 mb-4  space-y-2">
                    <li>
                      <span className="font-medium">Service Operation:</span> To
                      operate, maintain, and improve our service.
                    </li>
                    <li>
                      <span className="font-medium">Security:</span> To detect,
                      prevent, and respond to potential or actual security
                      incidents or fraudulent activities.
                    </li>
                    <li>
                      <span className="font-medium">Legal Compliance:</span> To
                      comply with legal obligations, respond to lawful requests,
                      or protect rights and property.
                    </li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold  mb-4">
                    5. Data Sharing
                  </h2>
                  <ul className="list-disc pl-6 mb-4  space-y-2">
                    <li>
                      <span className="font-medium">Third-Party Services:</span>{" "}
                      We might share anonymized, aggregated data with third
                      parties for analytics, but we do not share personal data.
                    </li>
                    <li>
                      <span className="font-medium">Legal Requirements:</span>{" "}
                      We may disclose information if required by law or to
                      protect our rights, property, or safety.
                    </li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold  mb-4">
                    6. Data Security
                  </h2>
                  <p className=" mb-4">
                    We implement appropriate technical and organizational
                    measures to protect your data against unauthorized access,
                    alteration, disclosure, or destruction. However, no method
                    of transmission over the internet or electronic storage is
                    100% secure, so we cannot guarantee absolute security.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold  mb-4">
                    7. Your Rights
                  </h2>
                  <ul className="list-disc pl-6 mb-4  space-y-2">
                    <li>
                      <span className="font-medium">Access:</span> You can
                      request access to the data we hold about you.
                    </li>
                    <li>
                      <span className="font-medium">Correction:</span> You can
                      ask for inaccurate data to be corrected.
                    </li>
                    <li>
                      <span className="font-medium">Deletion:</span> You can ask
                      us to delete your data, though this might limit your use
                      of our service.
                    </li>
                    <li>
                      <span className="font-medium">Portability:</span> You have
                      the right to data portability in certain circumstances.
                    </li>
                  </ul>
                  <p className=" mb-4 italic">
                    Please note, these rights might be limited due to the
                    non-custodial nature of Begin Wallet where we do not hold
                    personal data.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold  mb-4">
                    8. Data Retention
                  </h2>
                  <p className=" mb-4">
                    We retain your data for as long as necessary to provide our
                    service and as required or permitted by law. We will delete
                    or anonymize your data when it's no longer needed for the
                    purposes outlined in this policy.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold  mb-4">
                    9. International Data Transfers
                  </h2>
                  <p className=" mb-4">
                    Your data may be processed in countries outside of where you
                    live. We ensure that any transfer of data is done with
                    appropriate safeguards in place.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold  mb-4">
                    10. Changes to This Privacy Policy
                  </h2>
                  <p className=" mb-4">
                    We may update this Privacy Policy from time to time. Changes
                    will be posted on this page, and if significant, we'll
                    notify you through the service or by other means.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold  mb-4">
                    11. Contact Us
                  </h2>
                  <p className=" mb-4">
                    If you have any questions about this Privacy Policy, please
                    contact us at:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                    <p className="">
                      Address: Luegallee 12, 49545 Düsseldorf, Germany
                    </p>
                    <p className="">Email: web3@begin.is</p>
                  </div>
                </section>

                <div className="mt-10 pt-6 border-t border-gray-200">
                  <p className=" italic">
                    By using Begin Wallet, you consent to our practices as
                    described in this Privacy Policy. Remember, the security of
                    your assets is solely your responsibility; always practice
                    safe computing habits.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </Layout>
    </>
  );
};

export default Privacy;
