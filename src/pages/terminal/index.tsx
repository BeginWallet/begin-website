import Head from 'next/head'
import TerminalShell from '../../components/terminal/Layout/TerminalShell'

const TerminalPage = () => {
  return (
    <>
      <Head>
        <title>Begin Terminal</title>
        <meta name="description" content="Begin Terminal - Bloomberg-style crypto trading terminal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <TerminalShell />
    </>
  )
}

export default TerminalPage
