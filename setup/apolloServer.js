import { ApolloServer } from "apollo-server-express";
import typeDefs from "~/typeDefs";
import resolvers from "~/resolvers";

export default function setupApolloServer(app) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  server.applyMiddleware({ app });
}
