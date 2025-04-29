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
    </>
  )
}

export default Layout
