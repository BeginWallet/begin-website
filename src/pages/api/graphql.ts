import { createYoga, createSchema } from "graphql-yoga";
// import { ApolloServer } from '@apollo/server';
// import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import type { NextApiRequest, NextApiResponse } from "next";
import { GraphQLError } from "graphql";
import prisma from "../../prisma/prisma";
import { Prisma } from '@prisma/client'
import { error } from "console";
import { JSDOM } from 'jsdom';


export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

// last_updated:   String
// last_sync:      Float
const typeDefs = /* GraphQL */ gql`
  type Query {
    apps: [App!]!,
    pools(filterPool: String, skip: Int, take: Int): [Pool],
    collections(filterPolicy: String): Collection, 
  }

  type App {
    name: String
  }

  type Collection {
    id:             String
    policy:         String
    name:           String
    floor_price:    String
  }

  type Pool {
    id: String
    blocks_epoch: String
    blocks_lifetime: String
    delegators:      String
    homepage:        String
    img:             String
    last_block_date: String
    name:            String
    pledge:          String
    pool_id_hash:    String
    roa_lifetime:    String
    roa_short:       String
    saturation:      Float
    stake:           String
    tax_fix:         String
    tax_ratio:       String
    url:             String
  }
`;

const getCollection =async (policy_id:string) => {
  // Fetch
  const baseUrl = 'https://www.jpg.store';
  const collectionUrl = `${baseUrl}/collection/${policy_id}`
  const result = await fetch(collectionUrl);
  const html = await result.text();
  console.log(result)

  if(!result.ok){
    return null
  }

  const dom = new JSDOM(html);
  const document = dom.window.document;
  const collection = () => {
      const meta = JSON.parse(document.getElementById('__NEXT_DATA__')?.textContent || '')
      let policy = ''
      let name = ''
      let floor_price = ''
      if (meta && meta.props && meta.props.pageProps && meta.props.pageProps.collection) {
        policy = meta.props.pageProps.collection.policy_id;
        name = meta.props.pageProps.collection.display_name;
        floor_price = meta.props.pageProps.collection.global_floor_lovelace;

        return {
            id: policy,
            policy,
            name,
            floor_price,
        }
      } else {
        return null
      }
  }
  
  return collection()
}

const resolvers = {
  Query: {
    apps() {
        return [{ name: "Begin" }];
    },
    collections:async (parent, {filterPolicy}, context) => {
      return getCollection(filterPolicy);
      // const ids = filterPolicy.split(',')
        // const where = filterPolicy
        //   ? { 
        //      id: { in: filterPolicy }
        //     }
        //   : {};

        // let collections = await prisma.collections.findFirst({
        //     where,
        // })

        // console.log('prisma db', collections)

        // if (!collections) {
        //   // Search Collection
        //   const urlSearch = `https://api.opencnft.io/2/collection/search?q=${filterPolicy}`
        //   const searchCollectionApi = await fetch(urlSearch, {
        //     headers: {
        //       'X-Api-Key': 'ocnft_657fa5328b878e43adc9f0fb',
        //     },
        //   })
        //     .then((res) => (res.ok ? res : Promise.reject(res)))
        //     .then((res) => res.json());

        //   console.log('searchCollectionApi', searchCollectionApi);

        //   const searchCollectionItem = searchCollectionApi.find( c => 
        //     c.project && c.policies.some( p => p === filterPolicy) 
        //     && c.project !== filterPolicy
        //   )
        //   console.log('searchCollectionItem', searchCollectionItem);

        //   if (searchCollectionItem) {
        //     //Get Floor Price
        //     const url = `https://api.opencnft.io/2/collection/${filterPolicy}/floor_price`;
        //     // const url = `https://api.opencnft.io/2/collection/${filterPolicy}?expand=collection`
        //     const collectionApi = await fetch(url, {
        //       headers: {
        //         'X-Api-Key': 'ocnft_657fa5328b878e43adc9f0fb',
        //       },
        //     })
        //       .then((res) => (res.ok ? res : Promise.reject(res)))
        //       .then((res) => res.json())
        //       .catch((error) => console.log('Floor price error', error));

        //     console.log('collectionApi',collectionApi);
          

        //     const defaultCollection = {
        //       policy: filterPolicy,
        //       name: searchCollectionItem.project,
        //       floor_price: '0',
        //       last_updated: new Date(),
        //       last_sync: new Date().getTime()
        //     }

        //     const createCollection = {
        //       id: filterPolicy,
        //       ...defaultCollection
        //     }

        //     const updateCollection = defaultCollection

        //     if (collectionApi && collectionApi.floor_price) {
        //       createCollection.floor_price = collectionApi.floor_price.toString()
        //       updateCollection.floor_price = collectionApi.floor_price.toString()
        //     }

        //     collections = await prisma.collections.upsert({
        //       where: {id: filterPolicy},
        //       update: updateCollection,
        //       create: createCollection
        //     });
        //   } else {
        //     console.log('Collection not found on api.')
        //   }
        // }

        // console.log('collections from DB', collections);

        // return collections;
    },
    pools:async (parent, {filterPool, skip, take}, context) => {
        const where = filterPool
          ? {
              OR: [
                {
                  id: {
                    contains: filterPool,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
                {
                  name: {
                    contains: filterPool,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
              ],
            }
          : {
            AND: [
                {
                    name : { not: ''},
                },
                {
                   name : { not: '[] '},
                },
                { roa_lifetime: { gt: '0'}}
                ]
            };

        const pools = await prisma.pools.findMany({
          where,
          skip,
          take,
          orderBy: [
            {
                tax_ratio: "asc"
            },
            {
              roa_short: "desc"
            },
            {
                roa_lifetime: "desc"
            },
          ],
        });
        return pools;
    }
  },
};

// APOLO SETUP
// const server = new ApolloServer({
//     resolvers,
//     typeDefs,
//   });
  
// export default startServerAndCreateNextHandler(server);

// YOGA SETUP
const schema = createSchema({
  typeDefs,
  resolvers,
});

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
  cors: {
    origin: '*',
    credentials: true,
    allowedHeaders: ['*'],
    methods: ['POST']
  },
//   cors: (request) => {
//     // const requestOrigin = request.headers.get('origin') || '*'
//     return {
//       origin: ['*'],
//       credentials: true,
//       allowedHeaders: ['X-Custom-Header'],
//       methods: ['POST']
//     }
//   },
  context: async ({request}) => {
    const apiKey = request.headers.get('api-key');

    if (apiKey !== process.env.API_KEY){
        throw new GraphQLError("Not valid API KEY")
    }
  }
});
