import type { NextApiRequest, NextApiResponse } from 'next'
import { getNonce } from '../../mesh';
import { cors, runMiddleware } from './cors'

export default async function handler(
  // req: NextRequest
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  // await runMiddleware(req, res, cors)

  try {
    switch (req.method) {
      case "POST": {
        const { msg } = req.body;
        const nonce = await getNonce(msg);
        res.json(nonce)
      }
      default:
        break;
    }
  } catch (error: any) {
    return res.status(500).json({ ...error, message: error.message });
  }
}