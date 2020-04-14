const query = `
  type Query {
    getUsers: [User] @auth(roles: [regular])
    authUser: User @auth
  }
`;

export default query;
