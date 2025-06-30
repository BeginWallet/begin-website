import Container from "../../components/container";
import Navigation from "../../components/navigation";
import Layout from "../../components/layout";
import Head from "next/head";
import { GA_TRACKING_ID } from "../../lib/gtag";
import { defineMessages } from "react-intl";
import f from "../../lib/translate";

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
});

const Service = () => {
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
            <div className="pt-16 lg:pt-32 p-4 lg:p-12 ">
              <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold  mb-6">
                  Terms of Service for Begin Wallet
                </h1>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold  mb-4">
                    1. Introduction
                  </h2>
                  <p className=" mb-4">
                    Welcome to Begin Wallet, a non-custodial wallet service
                    provided by Begin W UG, registered under HRB 107581 in
                    Germany, with its address at Luegallee 12, 49545 Düsseldorf.
                    By accessing or using our service, you agree to be bound by
                    these Terms of Service.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold  mb-4">
                    2. Definitions
                  </h2>
                  <ul className="list-disc pl-6 mb-4  space-y-2">
                    <li>
                      <span className="font-medium">User:</span> Any individual
                      or entity using Begin Wallet.
                    </li>
                    <li>
                      <span className="font-medium">Non-Custodial:</span> This
                      service does not hold, manage, or have access to your
                      private keys or funds. You are solely responsible for the
                      security of your assets.
                    </li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold  mb-4">
                    3. Eligibility
                  </h2>
                  <ul className="list-disc pl-6 mb-4  space-y-2">
                    <li>
                      You must be at least 18 years old to use this service or
                      have the legal authority to enter into this agreement.
                    </li>
                    <li>
                      By using Begin Wallet, you represent and warrant that you
                      are not barred from using the service under any applicable
                      law.
                    </li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold  mb-4">
                    4. User Responsibilities
                  </h2>
                  <ul className="list-disc pl-6 mb-4  space-y-2">
                    <li>
                      <span className="font-medium">Security:</span> You are
                      responsible for safeguarding your private keys, passwords,
                      and any other login information. Loss of private keys will
                      result in loss of access to your assets.
                    </li>
                    <li>
                      <span className="font-medium">Compliance:</span> You agree
                      to comply with all applicable laws, rules, and regulations
                      when using Begin Wallet.
                    </li>
                    <li>
                      <span className="font-medium">Backups:</span> Regularly
                      back up your wallet to prevent data loss.
                    </li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold  mb-4">
                    5. Intellectual Property
                  </h2>
                  <p className=" mb-4">
                    All rights to the software, content, and other materials on
                    or used in Begin Wallet are owned by Begin W UG. You are
                    granted a limited, non-exclusive, non-transferable license
                    to access and use the service for personal or internal
                    business use only.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold  mb-4">
                    6. Liability
                  </h2>
                  <ul className="list-disc pl-6 mb-4  space-y-2">
                    <li>
                      <span className="font-medium">No Warranty:</span> Begin
                      Wallet is provided "as is," without warranty of any kind,
                      express or implied, including but not limited to the
                      warranties of merchantability, fitness for a particular
                      purpose, or non-infringement.
                    </li>
                    <li>
                      <span className="font-medium">
                        Limitation of Liability:
                      </span>{" "}
                      Begin W UG shall not be liable for any indirect,
                      incidental, special, consequential, or punitive damages,
                      including loss of profits, data, use, goodwill, or other
                      intangible losses, resulting from (i) your access to or
                      use of or inability to access or use Begin Wallet; (ii)
                      any conduct or content of any third party on the service;
                      or (iii) unauthorized access, use, or alteration of your
                      transmissions or content.
                    </li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold  mb-4">
                    7. Termination
                  </h2>
                  <ul className="list-disc pl-6 mb-4  space-y-2">
                    <li>
                      We may terminate or suspend your access to Begin Wallet
                      immediately, without prior notice or liability, for any
                      reason whatsoever, including without limitation if you
                      breach the Terms.
                    </li>
                    <li>
                      Upon termination, your right to use Begin Wallet will
                      immediately cease.
                    </li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold  mb-4">
                    8. Changes to Terms
                  </h2>
                  <p className=" mb-4">
                    Begin W UG reserves the right, at our sole discretion, to
                    modify or replace these Terms at any time. If a revision is
                    material we will provide at least 30 days' notice prior to
                    any new terms taking effect. What constitutes a material
                    change will be determined at our sole discretion.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold  mb-4">
                    9. Governing Law
                  </h2>
                  <p className=" mb-4">
                    These Terms shall be governed and construed in accordance
                    with the laws of Germany, without regard to its conflict of
                    law provisions.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold  mb-4">
                    10. Contact Information
                  </h2>
                  <p className=" mb-4">
                    For any questions about these Terms, please contact us at:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                    <p className="">
                      Address: Luegallee 12, 49545 Düsseldorf, Germany
                    </p>
                    <p className="">Email: web3@begin.is</p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold  mb-4">
                    11. Acceptance of Terms
                  </h2>
                  <p className=" mb-4">
                    By using Begin Wallet, you acknowledge that you have read
                    these Terms of Service, understand them, and agree to be
                    bound by them. If you do not agree to these Terms, please do
                    not use our service.
                  </p>
                </section>

                <div className="mt-10 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Last Updated</strong>: February 08, 2025
                  </p>
                  <p className=" italic">
                    By continuing to use Begin Wallet, you agree to these Terms
                    of Service. Remember, the security of your assets is solely
                    your responsibility. Use this service wisely.
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

export default Service;
