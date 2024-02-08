// import type { NextApiRequest, NextApiResponse } from 'next'
// import { cors, runMiddleware } from './cors'
// // import puppeteer from 'puppeteer'
// import puppeteer from 'puppeteer-extra';
// import { Page } from 'puppeteer';
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// const fs = require('fs')
// import { JSDOM } from 'jsdom';

// const infiniteScrollItems =async (url:string, page:Page, limit: number) => {

//     let items: any[] = []
//     while(limit > items.length) {
//         const previoisLen = items.length;
//         items = await page.evaluate((url)=> {
//             const list = Array.from(document.querySelectorAll("#marketplace > div > div > div > div > div > a"))
//             return list.map((item) => {
//                 return {
//                     name: item.querySelector('div > span')?.textContent, 
//                     path: url + item.getAttribute('href')
//                 }
//             })
//         }, url)
//         const previousHeight = await page.evaluate('document.body.scrollHeight');
//         await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
//         const isLoading = await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
//         await new Promise( r => setTimeout(r, 1000));
//         console.log(items.length)
//         if (!isLoading){
//             break;
//         }
//     }

//     console.log(items)
//     console.log(items.length)

//     return items;
// }

// export default async function handler(
//     // req: NextRequest
//     req: NextApiRequest,
//     res: NextApiResponse
//   ) {
//     // Run the middleware
//     // await runMiddleware(req, res, cors)
//     puppeteer.use(StealthPlugin())
  
//     try {
//       switch (req.method) {
//         case "GET": {
//             const baseUrl = 'https://www.jpg.store';
//             // const url = `${baseUrl}/marketplace?view=allCollections&sortBy=score`;
//             // const browser = await puppeteer.launch({ headless: true, timeout: 0});
//             // const page = await browser.newPage();

//             // //Get Collections data
//             // // 9026afe86a4db5284395bec3d87d0b71f8b71495209af751b3763e4b
//             // // 12a7faac878f22f0f5b32bd8e116ba6c5f23ba9cba37fe27179dec59
//             // // dac355946b4317530d9ec0cb142c63a4b624610786c2a32137d78e25
//             // const collectionUrl = `${baseUrl}/collection/dac355946b4317530d9ec0cb142c63a4b624610786c2a32137d78e25`
//             // await page.goto(collectionUrl, {timeout: 0, waitUntil: 'load'})
//             // await page.waitForSelector('script[id=__NEXT_DATA__]');
//             // const collection = await page.evaluate(()=> {
//             //     const name = document.querySelector('#app > main > div > section > div > div > div > div > h1')?.textContent?.trim();
//             //     const floorRaw = document.querySelector('#app > main > div > section > div > div > div > div > div:nth-child(1) > span')?.textContent?.trim()
//             //     const floor = (Number((floorRaw?.toLowerCase()
//             //         .replace('-', '0')
//             //         .replace('₳', '')
//             //         .replace('k', '')
//             //         .replace('m', '')
//             //         .trim()) || 0 ) * 1000000).toString()
//             //     const meta = JSON.parse(document.getElementById('__NEXT_DATA__')?.textContent || '')
//             //     let policy_id = ''
//             //     if (meta && meta.props) {
//             //         policy_id = meta.props.pageProps.collection.policy_id
//             //     }

//             //     return {
//             //         name,
//             //         floor,
//             //         policy_id,
//             //     }
//             // })

//             // Fetch
//             const collectionUrl = `${baseUrl}/collection/12a7faac878f22f0f5b32bd8e116ba6c5f23ba9cba37fe27179dec59`
//             const result = await fetch(collectionUrl);
//             const html = await result.text();

//             const dom = new JSDOM(html);
//             const document = dom.window.document;
//             const collection = () => {
//                 const meta = JSON.parse(document.getElementById('__NEXT_DATA__')?.textContent || '')
//                 let policy_id = ''
//                 let name = ''
//                 let floor = ''
//                 if (meta && meta.props) {
//                     policy_id = meta.props.pageProps.collection.policy_id;
//                     name = meta.props.pageProps.collection.display_name;
//                     floor = meta.props.pageProps.collection.global_floor_lovelace;
//                 }

//                 return {
//                     policy_id,
//                     name,
//                     floor,
//                 }
//             }

//             console.log(collection())

//             // await page.goto(url, { timeout: 0, waitUntil: 'load'});
//             // // await new Promise(r => setTimeout(r, 5000));
//             // const items = await infiniteScrollItems(baseUrl, page, 5000);
//             // fs.writeFileSync("collections.json", JSON.stringify(items))
            
//             // await page.screenshot({ path: 'jpg.jpg', fullPage: true});

//             // await browser.close();

//             res.json({
//                 load: 'done',
//                 collection: collection()
//                 // len: items.length
//               })
//           return 
//         }
//         default:
//           break;
//       }
//     } catch (error: any) {
//       return res.status(500).json({ ...error, message: error.message });
//     }
//   }