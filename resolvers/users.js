import { User, Role, UsersHasIdps } from "~/models";
import { requestGithubUser } from "~/utils/github";
import { requestFacebookUser } from "~/utils/facebook";
import { requestGoogleUser } from "~/utils/google";
import { capitalize } from "lodash";

async function createOrAuthWithIdp({ email, firstName, lastName }, idp) {
  const user = await User.findByEmail(email, idp);
  if (user) {
    return user;
  } else {
    const regularRole = await Role.findByPk("regular");
    const user = await User.create({
      firstName,
      lastName,
      email,
    });
    UsersHasIdps.create({ userId: user.id, idpId: idp, email });
    user.setRoles([regularRole]);

    return user;
  }
}

async function signUp(root, args) {
  const { firstName, lastName, email, password } = args;

  const userExists = await User.findByEmail(email);
  if (userExists) throw new Error("User with that email already exists");

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  return { token: user.signToken() };
}

async function signIn(root, args) {
  const { email, password } = args;
  const user = await User.findByEmail(email);
  if (!user) throw new Error("User with that email doesn't exists");
  if (!user.checkPasswordValid(password)) throw new Error("Invalid password");
  return { token: user.signToken() };
}

async function authorizeWithGoogle(root, { code }) {
  const { given_name, family_name, email } = await requestGoogleUser(code);

  const user = await createOrAuthWithIdp(
    { email, firstName: given_name, lastName: family_name },
    "google"
  );

  return { token: user.signToken(), user };
}

async function authorizeWithFacebook(root, { code }) {
  const facebookUser = await requestFacebookUser(code);
  const { email, name } = facebookUser;
  const [firstName, ...lastName] = name ? name.split(" ") : "";

  const user = await createOrAuthWithIdp(
    { email, firstName, lastName: lastName.join(" ") },
    "facebook"
  );

  return { token: user[0].signToken(), user };
}

async function authorizeWithGithub(root, { code }) {
  const githubUser = await requestGithubUser(code);
  if (!githubUser.access_token || !githubUser.email)
    throw new Error("Ocorreu um erro");

  const { name, email } = githubUser;
  const [firstName, ...lastName] = name ? name.split(" ") : "";

  const user = await createOrAuthWithIdp(
    { email, firstName, lastName: lastName.join(" ") },
    "github"
  );

  return { token: user.signToken() };
}

export default {
  User: {
    firstName: ({ firstName }) => capitalize(firstName),
    lastName: ({ lastName }) => capitalize(lastName),
    fullName: ({ firstName, lastName }) =>
      `${capitalize(firstName)} ${capitalize(lastName)}`,
  },
  Query: {
    getUsers: async () => {
      return User.findAll();
    },
    discordTest: (parent, args, { discord }) => {
      discord.pushMessage("Hello world");
      return "Message sent to discord";
    },
  },
  Mutation: {
    authorizeWithGithub,
    authorizeWithFacebook,
    authorizeWithGoogle,
    signUp,
    signIn,
  },
};
