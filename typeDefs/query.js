const query = `
  type Query {
    secret: String
    test: String
    getUsers: [User] @auth(roles: [regular])
  }
`;

export default query;
