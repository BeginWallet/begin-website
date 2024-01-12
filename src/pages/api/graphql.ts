import { createYoga, createSchema } from "graphql-yoga";
// import { ApolloServer } from '@apollo/server';
// import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import type { NextApiRequest, NextApiResponse } from "next";
import { GraphQLError } from "graphql";
import prisma from "../../prisma/prisma";
import { Prisma } from '@prisma/client'


export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

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

const resolvers = {
  Query: {
    apps() {
        return [{ name: "Begin" }];
    },
    collections:async (parent, {filterPolicy}, context) => {
      // const ids = filterPolicy.split(',')
        const where = filterPolicy
          ? { 
             id: { in: filterPolicy }
            }
          : {};

        let collections = await prisma.collections.findFirst({
            where,
        })

        if (!collections) {
          // Search Collection
          const urlSearch = `https://api.opencnft.io/2/collection/search?q=${filterPolicy}`
          const searchCollectionApi = await fetch(urlSearch, {
            headers: {
              'X-Api-Key': 'ocnft_657fa5328b878e43adc9f0fb',
            },
          })
            .then((res) => (res.ok ? res : Promise.reject(res)))
            .then((res) => res.json());

          console.log('searchCollectionApi', searchCollectionApi);

          //Get Floor Price
          const url = `https://api.opencnft.io/2/collection/${filterPolicy}/floor_price`;
          // const url = `https://api.opencnft.io/2/collection/${filterPolicy}?expand=collection`
          const collectionApi = await fetch(url, {
            headers: {
              'X-Api-Key': 'ocnft_657fa5328b878e43adc9f0fb',
            },
          })
            .then((res) => (res.ok ? res : Promise.reject(res)))
            .then((res) => res.json());

          // https://api.opencnft.io/2/collection/search
          console.log('collectionApi',collectionApi);

          const createCollection = {
            id: collectionApi.policy,
            policy: collectionApi.policy,
            name: searchCollectionApi.project,
            floor_price: collectionApi.floor_price
          }

          const updateCollection = {
            policy: collectionApi.policy,
            name: searchCollectionApi.project,
            floor_price: collectionApi.floor_price
          }

          // if (collectionApi) {
          //   collections = await prisma.collections.upsert({
          //     where: {id: collectionApi.policy},
          //     update: updateCollection,
          //     create: createCollection
          //   });
          // } else {
          //   console.log('Collection not found on api.')
          // }
        }

        console.log('collections from DB', collections);

        return collections;
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
