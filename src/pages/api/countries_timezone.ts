// import type { NextApiRequest, NextApiResponse } from 'next'
// import { cors, runMiddleware } from './cors'

// const { countries, zones} = require('moment-timezone/data/meta/latest.json')

// export default async function handler(
//     // req: NextRequest
//     req: NextApiRequest,
//     res: NextApiResponse
//   ) {
//     // Run the middleware
    
//     let timeZoneCityToCountry = {};

//     Object.keys(zones).forEach(z => {
//         const cityArr = z.split("/");
//         const city = cityArr[cityArr.length-1];
//         timeZoneCityToCountry[city] = {
//             name: countries[zones[z].countries[0]].name,
//             code: countries[zones[z].countries[0]].abbr
//         };
//     });

//     timeZoneCityToCountry = {
//         ...timeZoneCityToCountry,
//         "Calcutta": { "name": "India", "code": "IN" },
//     }

//     var userRegion;
//     var userCity;
//     var userCountry;
//     var userTimeZone;

//     if (Intl) {
//     userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//     var tzArr = userTimeZone.split("/");
//     userRegion = tzArr[0];
//     userCity = tzArr[tzArr.length - 1];
//     userCountry = timeZoneCityToCountry[userCity];
//     }

//     console.log("Time Zone:", userTimeZone);
//     console.log("Region:", userRegion);
//     console.log("City:", userCity);
//     console.log("Country:", userCountry);

  
//     try {
//       switch (req.method) {
//         case "GET": {
//             res.json(timeZoneCityToCountry)
//           return 
//         }
//         default:
//           break;
//       }
//     } catch (error: any) {
//       return res.status(500).json({ ...error, message: error.message });
//     }
//   }