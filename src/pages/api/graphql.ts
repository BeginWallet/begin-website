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
    pools(filterPool: String, skip: Int, take: Int): [Pool!]!,
    collections(filterPolicy: String): Collection, 
  }

  type App {
    name: String
  }

  type Collection {
    id: Int
    name: String
    policies: String
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
        const where = filterPolicy
          ? { 
                policies: { contains: filterPolicy, mode: Prisma.QueryMode.insensitive }
            }
          : {};

        const collection = await prisma.collections.findFirst({
            where,
        })
        return collection;
    },
    pools:async (parent, {filterPool, skip, take}, context) => {
        const where = filterPool
          ? {
              OR: [
                { id: { contains: filterPool, mode: Prisma.QueryMode.insensitive } },
                { name: { contains: filterPool, mode:  Prisma.QueryMode.insensitive } },
              ],
            }
          : {};

        const pools = await prisma.pools.findMany({
            where,
            skip,
            take,
        })
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
  cors: (request) => {
    const requestOrigin = request.headers.get('origin') || '*'
    return {
      origin: requestOrigin,
      credentials: true,
      allowedHeaders: ['X-Custom-Header'],
      methods: ['POST']
    }
  },
  context: async ({request}) => {
    const apiKey = request.headers.get('api-key');

    if (apiKey !== process.env.API_KEY){
        throw new GraphQLError("Not valid API KEY")
    }
  }
});
