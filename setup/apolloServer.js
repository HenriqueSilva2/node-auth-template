import { ApolloServer } from "apollo-server-express";
import customTypeDefs from "~/typeDefs";
import customResolvers from "~/resolvers";
import { makeExecutableSchema } from "graphql-tools";
import { typeDefs, resolvers } from "graphql-scalars";
import { AuthDirective } from "~/directives";

export default function setupApolloServer(app) {
  const server = new ApolloServer({
    schema: makeExecutableSchema({
      typeDefs: [...typeDefs, ...customTypeDefs],
      resolvers: { ...resolvers, ...customResolvers },
      schemaDirectives: {
        auth: AuthDirective,
      },
    }),
    context: (integrationContext) => ({
      authUser: integrationContext.req.user,
    }),
  });
  server.applyMiddleware({ app });
}
