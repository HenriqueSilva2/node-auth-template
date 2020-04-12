import { gql } from "apollo-server-express";

const query = gql`
  type Query {
    secret: String
    test: String
  }
`;

export default query;
