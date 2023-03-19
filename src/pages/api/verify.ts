import type { NextApiRequest, NextApiResponse } from 'next'
import { verifySignature } from '../../mesh';
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
        const { userAddress, nonce, signature } = req.body;
        const result = await verifySignature(userAddress, nonce, signature);
        res.json(result)
      }
      default:
        break;
    }
  } catch (error: any) {
    return res.status(500).json({ ...error, message: error.message });
  }
}