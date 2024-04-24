import type { NextApiRequest, NextApiResponse } from 'next'
// import { NextRequest, NextResponse } from 'next/server';
import { cors, runMiddleware } from './cors'

export default async function handler(
  // req: NextRequest
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    res.setHeader('Content-Type','application/json')
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=10'
      //  'public, max-age=0, must-revalidate',
    )

    // Run the middleware
    await runMiddleware(req, res, cors)
  
    // Rest of the API logic
    const url = 'https://api.transak.com/api/v2/currencies/fiat-currencies?apiKey=24ddd66b-a1f5-4666-bf9f-a9fa848a460a'
    const response = await fetch(url, {next: {revalidate: 10}})

    // Recommendation: handle errors
    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    const json = await response.json();

    console.log({json})

    res.status(200).send(json);
  }