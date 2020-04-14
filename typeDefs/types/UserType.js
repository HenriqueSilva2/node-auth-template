const userType = `
  type User {
    id: String
    fullName: String 
    firstName: String 
    lastName: String 
    email: EmailAddress 
    password: String @auth(roles: [admin])
    roles: [Role]
  }
`;

export default userType;
