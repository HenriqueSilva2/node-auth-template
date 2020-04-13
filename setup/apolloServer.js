import { ApolloServer } from "apollo-server-express";
import customTypeDefs from "~/typeDefs";
import customResolvers from "~/resolvers";
import { makeExecutableSchema } from "graphql-tools";
import { typeDefs, resolvers } from "graphql-scalars";

export default function setupApolloServer(app) {
  const server = new ApolloServer({
    schema: makeExecutableSchema({
      typeDefs: [...typeDefs, ...customTypeDefs],
      resolvers: { ...resolvers, ...customResolvers },
    }),
  });
  server.applyMiddleware({ app });
}
