import type { NextApiRequest, NextApiResponse } from 'next'
import { createRegistration, deleteRegistration, getAllRegistrations, getRegistration, updateRegistration } from '../../prisma/registration'
// import { NextRequest, NextResponse } from 'next/server';
import { cors, runMiddleware } from './cors'

export default async function handler(
  // req: NextRequest
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=10"
  );

  // Run the middleware
  // await runMiddleware(req, res, cors)

  try {
    switch (req.method) {
      case "GET": {
        if (req.query.userAddress) {
          // Get a single user if id is provided is the query
          // api/registrations?userAddress=addr
          const registration = await getRegistration(req.query.userAddress);
          return res.status(200).json(registration ? {userAddress: registration.userAddress} : null);
        } else {
          // Otherwise, fetch all users
          // const registration = await getAllRegistrations();
          // return res.json(registration);
          return res.json([]);
        }
      }
      case "POST": {
        // Create a new user
        const { userAddress, walletAddress, nonce } = req.body;
        const registration = await getRegistration(userAddress);
        if (!registration) {
          const newRegistration = await createRegistration(userAddress, walletAddress, nonce);
          return res.json({userAddress: newRegistration.userAddress});
        } else {
          return res.status(302).json(registration);
        }
      }
      case "PUT": {
        // Update an existing user
        const { id, ...updateData } = req.body;
        const registration = await updateRegistration(id, updateData);
        return res.json({userAddress: registration.userAddress});
      }
      // case 'DELETE': {
      //   // Delete an existing user
      //   const { id } = req.body
      //   const registration = await deleteRegistration(id)
      //   return res.json(registration)
      // }
      default:
        break;
    }
  } catch (error: any) {
    return res.status(500).json({ ...error, message: error.message });
  }
}