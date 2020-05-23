const query = `
  type Query {
    getUsers: [User] @auth(roles: [regular])
    discordTest: String
  }
`;

export default query;
