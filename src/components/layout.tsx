import Alert from './alert'
import DownloadCTA from './download-cta'
import Footer from './footer'
import Meta from './meta'

type Props = {
  preview?: boolean
  disableHeader?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, disableHeader=false, children }: Props) => {
  return (
    <>
      <Meta />
      <div className={disableHeader? '': 'min-h-screen'}>
        {/* <Alert preview={preview} /> */}
        <main>{children}</main>
      </div>
      <DownloadCTA />
      <Footer />
      {/* <!-- Start of HubSpot Embed Code --> */}
        {/* <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/146118625.js"></script> */}
      {/* <!-- End of HubSpot Embed Code --> */}
    </>
  )
}

export default Layout
