import Container from "../../components/container";
import Navigation from "../../components/navigation";
import Layout from "../../components/layout";
import Head from "next/head";
import { defineMessages } from "react-intl";
import f from "../../lib/translate";
import { COMPANY, companyRegistration } from "../../lib/company";
import { openCookieSettings } from "../../components/cookie-consent";
import { CompanyDetails, Item, LegalSection, List, P } from "../../components/legal";

const EFFECTIVE_DATE = "November 4, 2026";

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
                <h1 className="text-3xl font-bold mb-6">Privacy Policy for Begin Wallet</h1>
                <p className="text-sm text-gray-600 mb-8">Effective date: {EFFECTIVE_DATE}</p>

                <LegalSection n={1} title="Who we are">
                  <P>
                    This policy explains how {companyRegistration()} (&quot;Neuralspark&quot;, &quot;we&quot;,
                    &quot;us&quot;), handles personal data when you use the Begin Wallet apps, browser extension and
                    website at begin.is (the &quot;Service&quot;). We are the data controller for that data under the
                    EU General Data Protection Regulation (GDPR) and the Irish Data Protection Act 2018.
                  </P>
                </LegalSection>

                <LegalSection n={2} title="What we don't collect">
                  <P>Begin Wallet is self-custodial software. We do not collect, store or have access to:</P>
                  <List>
                    <Item>Your recovery phrase, private keys or passcode, which stay on your device</Item>
                    <Item>The crypto-assets in your wallet, which we cannot see or move</Item>
                  </List>
                  <P>
                    Your wallet addresses and transactions are recorded on public blockchains. That information is
                    public by design and is not controlled by us.
                  </P>
                </LegalSection>

                <LegalSection n={3} title="What we collect">
                  <List>
                    <Item label="Device and technical data">
                      Device type, operating system, app version, IP address and similar identifiers, used to keep
                      the Service secure and working.
                    </Item>
                    <Item label="Usage data">
                      How the Service is used, such as which features are opened, how often, and error and crash
                      logs.
                    </Item>
                    <Item label="Contact and account data">
                      Your email address and other details you give us, for example when you join a waitlist,
                      contact support, or use features that need an account or order, such as in-app purchases.
                    </Item>
                    <Item label="Wallet addresses you share with us">
                      Public addresses or usernames you choose to link to features such as Begin ID or payment
                      links.
                    </Item>
                    <Item label="Cookies and similar technologies">
                      See section 7.
                    </Item>
                  </List>
                  <P>
                    When you use a third-party service through Begin Wallet, such as buying crypto or swaps, that
                    provider may collect data from you directly, including identity documents for
                    know-your-customer checks. The provider handles that data as a separate controller under its
                    own privacy policy.
                  </P>
                </LegalSection>

                <LegalSection n={4} title="Why we use it and our legal basis">
                  <List>
                    <Item label="To provide the Service">
                      Running the features you ask for, fulfilling orders and answering support requests (to
                      perform our contract with you).
                    </Item>
                    <Item label="To keep it secure and improve it">
                      Preventing fraud and abuse, fixing errors and understanding how features are used (our
                      legitimate interests in a secure, working product, balanced against your rights).
                    </Item>
                    <Item label="To keep you informed">
                      Sending you updates you asked for, such as the waitlist email for the new Begin (your
                      consent, which you can withdraw at any time).
                    </Item>
                    <Item label="Analytics cookies">
                      Measuring how our website is used (your consent).
                    </Item>
                    <Item label="To meet legal obligations">
                      Complying with laws that apply to us and responding to lawful requests from authorities.
                    </Item>
                  </List>
                  <P>We do not sell your personal data, and we do not make decisions about you based solely on automated processing that have legal or similarly significant effects.</P>
                </LegalSection>

                <LegalSection n={5} title="Who we share it with">
                  <List>
                    <Item label="Service providers">
                      Companies that host, analyse, support or send email for the Service on our behalf, such as
                      our hosting and analytics providers (including Google Analytics). They act on our
                      instructions under data processing agreements.
                    </Item>
                    <Item label="Third-party services you choose">
                      When you start an order or use an integrated service, we pass it the details needed to
                      complete your request.
                    </Item>
                    <Item label="Authorities and advisers">
                      Where required by law, or to establish, exercise or defend legal claims.
                    </Item>
                    <Item label="A buyer of our business">
                      If Begin Wallet is sold or transferred, under the same protections described here.
                    </Item>
                  </List>
                </LegalSection>

                <LegalSection n={6} title="International transfers">
                  <P>
                    Some of our providers process data outside the European Economic Area. When that happens, we
                    rely on a European Commission adequacy decision, such as the EU-US Data Privacy Framework, or
                    on the European Commission&apos;s Standard Contractual Clauses with additional safeguards where
                    needed. You can ask us for a copy of the safeguards we use.
                  </P>
                </LegalSection>

                <LegalSection n={7} title="Cookies">
                  <P>
                    We use cookies and similar technologies that are strictly necessary for the website to work,
                    such as remembering your language. We only use analytics or other non-essential cookies with
                    your consent, in line with the Irish ePrivacy Regulations (S.I. No. 336 of 2011). Google Analytics
                    only loads if you choose &quot;Accept analytics&quot; in our cookie banner. We remember your choice
                    on your device for six months. You can change it at any time with{' '}
                    <button type="button" onClick={openCookieSettings} className="underline font-medium">
                      Cookie settings
                    </button>
                    , and control cookies through your browser settings.
                  </P>
                </LegalSection>

                <LegalSection n={8} title="How long we keep it">
                  <P>
                    We keep personal data only as long as we need it for the purposes above. Waitlist emails are
                    kept until the new Begin launches or you unsubscribe. Support and order records are kept for as
                    long as needed to deal with your request and to meet legal, tax and accounting obligations.
                    Technical logs are kept for a limited period for security. When data is no longer needed we
                    delete or anonymise it.
                  </P>
                </LegalSection>

                <LegalSection n={9} title="Security">
                  <P>
                    We use appropriate technical and organisational measures to protect personal data, including
                    encryption in transit and access controls. No system is completely secure, so we can&apos;t
                    guarantee absolute security. Keeping your recovery phrase safe is up to you, and we will never
                    ask for it.
                  </P>
                </LegalSection>

                <LegalSection n={10} title="Your rights">
                  <P>Under the GDPR you have the right to:</P>
                  <List>
                    <Item>Access the personal data we hold about you</Item>
                    <Item>Have inaccurate data corrected</Item>
                    <Item>Have your data erased</Item>
                    <Item>Restrict how we use your data</Item>
                    <Item>Receive your data in a portable format</Item>
                    <Item>Object to processing based on our legitimate interests</Item>
                    <Item>Withdraw consent at any time, without affecting processing before you withdrew it</Item>
                  </List>
                  <P>
                    To use these rights, email us at{' '}
                    <a href={`mailto:${COMPANY.email}`} className="underline">{COMPANY.email}</a>. We will reply
                    within one month. Because we don&apos;t hold your keys or wallet contents, some requests, such
                    as deleting blockchain records, are outside our control.
                  </P>
                  <P>
                    You can also complain to the Irish Data Protection Commission at{' '}
                    <a href="https://www.dataprotection.ie" className="underline" target="_blank" rel="noopener noreferrer">dataprotection.ie</a>,
                    or to the data protection authority in the EU country where you live or work.
                  </P>
                </LegalSection>

                <LegalSection n={11} title="Children">
                  <P>
                    The Service is not intended for anyone under 18, and we do not knowingly collect data from
                    children. If you think a child has given us personal data, please contact us and we will
                    delete it.
                  </P>
                </LegalSection>

                <LegalSection n={12} title="Changes to this policy">
                  <P>
                    We may update this policy from time to time. We will post changes on this page and update the
                    effective date. If a change is significant, we will also tell you through the Service or by
                    email.
                  </P>
                </LegalSection>

                <LegalSection n={13} title="Contact us">
                  <P>For questions about this policy or your personal data, contact us at:</P>
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

export default Privacy;
