import Container from "../../components/container";
import Navigation from "../../components/navigation";
import Layout from "../../components/layout";
import Head from "next/head";
import { defineMessages } from "react-intl";
import f from "../../lib/translate";
import { COMPANY, companyRegistration } from "../../lib/company";
import { CompanyDetails, Item, LegalSection, List, P } from "../../components/legal";

const LAST_UPDATED = "November 4, 2026";

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
        </Head>
        <Navigation />
        <Container>
          <section id="features" className="mx-auto">
            <div className="pt-16 lg:pt-32 p-4 lg:p-12 ">
              <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold mb-6">Terms of Service for Begin Wallet</h1>
                <p className="text-sm text-gray-600 mb-8">Last updated: {LAST_UPDATED}</p>

                <LegalSection n={1} title="Who we are">
                  <P>
                    Begin Wallet is provided by {companyRegistration()} (&quot;Neuralspark&quot;, &quot;we&quot;,
                    &quot;us&quot;). These Terms of Service (&quot;Terms&quot;) are a contract between you and us
                    and apply when you use the Begin Wallet mobile apps, browser extension and website (together,
                    the &quot;Service&quot;). By using the Service you agree to these Terms. If you don&apos;t agree,
                    please don&apos;t use it.
                  </P>
                </LegalSection>

                <LegalSection n={2} title="What Begin Wallet is">
                  <List>
                    <Item label="Self-custodial software">
                      Begin Wallet is software that lets you create and manage your own crypto wallets. Your
                      private keys and recovery phrase are created and stored on your device. We never hold,
                      see or have access to them, and we cannot move, freeze, recover or reverse anything in
                      your wallet.
                    </Item>
                    <Item label="Not a financial service">
                      We do not hold your crypto-assets or money, carry out transactions on your behalf, or
                      provide investment, tax or legal advice. Begin Wallet is not a bank, payment institution,
                      e-money institution or crypto-asset service provider in respect of your wallet.
                    </Item>
                    <Item label="Blockchain transactions">
                      Transactions you sign are broadcast to public blockchain networks we do not control. Once
                      confirmed they are generally permanent and public, and network fees are set by those
                      networks.
                    </Item>
                  </List>
                </LegalSection>

                <LegalSection n={3} title="Eligibility">
                  <List>
                    <Item>You must be at least 18 years old and able to enter into a binding contract.</Item>
                    <Item>
                      You must not use the Service if doing so is prohibited by the laws that apply to you, or if
                      you are subject to EU, UN or other applicable sanctions.
                    </Item>
                  </List>
                </LegalSection>

                <LegalSection n={4} title="Your responsibilities">
                  <List>
                    <Item label="Your recovery phrase">
                      Keep your recovery phrase, private keys and passcode secret and backed up. If you lose them,
                      we cannot restore access to your wallet. We will never ask you for your recovery phrase.
                    </Item>
                    <Item label="Your device">
                      Keep your device and the app up to date and protected with a passcode or biometrics.
                    </Item>
                    <Item label="Lawful use">
                      Use the Service only for lawful purposes and in line with the laws that apply to you,
                      including anti-money-laundering and sanctions laws.
                    </Item>
                    <Item label="Checking transactions">
                      Check addresses, amounts and networks before you sign. You are responsible for
                      transactions you authorise.
                    </Item>
                  </List>
                </LegalSection>

                <LegalSection n={5} title="Third-party services">
                  <P>
                    Begin Wallet can connect you to services provided by others, such as buying or selling
                    crypto, swaps, staking, decentralised apps and eSIMs. Those services are provided by the third
                    party under its own terms and privacy policy, which you should read before using them. The
                    third party, not us, is responsible for its service, including any identity checks it
                    carries out. Prices, fees and availability are set by the provider and the networks involved.
                  </P>
                </LegalSection>

                <LegalSection n={6} title="Fees">
                  <P>
                    Begin Wallet is free to download. Where we charge for a feature, or a third party charges a
                    fee through the Service, the amount is shown to you before you confirm. Network fees go to
                    the blockchain network, not to us.
                  </P>
                </LegalSection>

                <LegalSection n={7} title="Intellectual property">
                  <P>
                    The Service, including its software, design, brand and content, belongs to {COMPANY.name} or
                    its licensors. We grant you a personal, non-exclusive, non-transferable, revocable licence to
                    use the Service in line with these Terms. Open-source components are licensed under their own
                    licences, which take priority for those components.
                  </P>
                </LegalSection>

                <LegalSection n={8} title="Availability and changes to the Service">
                  <P>
                    We work to keep the Service available and secure, but we don&apos;t guarantee it will be
                    uninterrupted or error-free. We may change, update or stop features, for example to fix
                    security issues or meet legal requirements. Because your keys are stored on your device, you
                    can always restore your wallet with your recovery phrase in other compatible software,
                    even if the Service is unavailable.
                  </P>
                </LegalSection>

                <LegalSection n={9} title="Our liability to you">
                  <List>
                    <Item label="Service provided as is">
                      To the extent permitted by law, the Service is provided &quot;as is&quot; and &quot;as
                      available&quot;, without warranties beyond those that apply by law.
                    </Item>
                    <Item label="Limits">
                      To the extent permitted by law, we are not liable for: losses caused by the loss,
                      disclosure or theft of your recovery phrase, keys or device; transactions you authorise;
                      the behaviour of blockchain networks, smart contracts or third-party services; changes in
                      the value of crypto-assets; or losses that were not reasonably foreseeable. Where the
                      Service is provided free of charge, our total liability to you is limited to €100.
                    </Item>
                    <Item label="What we don't exclude">
                      Nothing in these Terms excludes or limits our liability for death or personal injury caused
                      by our negligence, for fraud or fraudulent misrepresentation, or any other liability that
                      cannot be excluded or limited under Irish law. If you are a consumer, nothing in these Terms
                      affects your statutory rights, including under the Consumer Rights Act 2022.
                    </Item>
                  </List>
                </LegalSection>

                <LegalSection n={10} title="Suspension and ending these Terms">
                  <List>
                    <Item>You can stop using the Service at any time by uninstalling the app or extension.</Item>
                    <Item>
                      We may suspend or end your access to the Service if you seriously or repeatedly breach these
                      Terms, if we have to for legal or regulatory reasons, or to protect the Service or other
                      users. Where reasonable, we will tell you first and explain why.
                    </Item>
                    <Item>
                      Ending your access never gives us control of your wallet. You keep your recovery phrase and
                      can access your crypto-assets with other compatible software.
                    </Item>
                  </List>
                </LegalSection>

                <LegalSection n={11} title="Changes to these Terms">
                  <P>
                    We may update these Terms, for example to reflect changes to the Service or the law. If a
                    change is material, we will tell you through the Service or by email at least 30 days before
                    it takes effect. If you don&apos;t agree with the change, you can stop using the Service
                    before it takes effect.
                  </P>
                </LegalSection>

                <LegalSection n={12} title="Governing law and disputes">
                  <P>
                    These Terms are governed by the laws of Ireland. The courts of Ireland have jurisdiction over
                    any dispute arising from them. If you are a consumer living in another EU country, you also
                    keep the protection of the mandatory laws of that country and may bring proceedings in its
                    courts.
                  </P>
                  <P>
                    If you have a complaint, please contact us first at{' '}
                    <a href={`mailto:${COMPANY.email}`} className="underline">{COMPANY.email}</a> and we will try to
                    resolve it. Consumers in Ireland can also get help from the Competition and Consumer Protection
                    Commission (<a href="https://www.ccpc.ie" className="underline" target="_blank" rel="noopener noreferrer">ccpc.ie</a>).
                  </P>
                </LegalSection>

                <LegalSection n={13} title="General">
                  <P>
                    If any part of these Terms is found unenforceable, the rest stays in effect. If we don&apos;t
                    enforce a right straight away, we can still enforce it later. You may not transfer your rights
                    under these Terms without our consent. We may transfer ours to another company if Begin Wallet
                    is transferred to it, without reducing your rights.
                  </P>
                </LegalSection>

                <LegalSection n={14} title="Contact us">
                  <P>For any questions about these Terms, contact us at:</P>
                  <CompanyDetails />
                </LegalSection>
              </div>
            </div>
          </section>
        </Container>
      </Layout>
    </>
  );
};

export default Service;
