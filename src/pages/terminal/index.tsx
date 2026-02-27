import { useState } from 'react'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TerminalShell from '../../components/terminal/Layout/TerminalShell'

const TerminalPage = () => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 30000, refetchOnWindowFocus: false } }
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Begin Terminal</title>
        <meta name="description" content="Begin Terminal - Bloomberg-style crypto trading terminal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <TerminalShell />
    </QueryClientProvider>
  )
}

export default TerminalPage
