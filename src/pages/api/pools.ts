import type { NextApiRequest, NextApiResponse } from 'next'
// import { NextRequest, NextResponse } from 'next/server';
import { cors, runMiddleware } from './cors'

export default async function handler(
  // req: NextRequest
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=10'
    )

    // Run the middleware
    await runMiddleware(req, res, cors)
  
    // Rest of the API logic
    const response = await fetch('https://js.cexplorer.io/api-static/pool/list.json', {next: {revalidate: 10}})
    // Recommendation: handle errors
    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    res.status(200).json((await response.json()).data);
  }