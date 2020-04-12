import { gql } from "apollo-server-express";

const mutation = gql`
  type Auth {
    token: String!
  }
  type Mutation {
    signUp(email: String!, password: String!): Auth
    signIn(email: String!, password: String!): Auth
    authorizeWithGithub(code: String!): Auth
    authorizeWithFacebook(code: String!): Auth
    authorizeWithGoogle(code: String!): Auth
  }
`;

export default mutation;
