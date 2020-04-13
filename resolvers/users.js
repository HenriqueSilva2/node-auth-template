import { User } from "~/models";
import { requestGithubUser } from "~/utils/github";
import { requestFacebookUser } from "~/utils/facebook";
import { requestGoogleUser } from "~/utils/google";
import { capitalize } from "lodash";

async function signUp(root, args) {
  const { firstName, lastName, email, password } = args;

  const userExists = await User.findByEmail(email);
  if (userExists) throw new Error("User already exists");

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
  if (!user.checkPasswordValid(password))
    throw new Error("User with that email doesn't exists");
  return { token: user.signToken() };
}

async function authorizeWithGoogle(root, { code }) {
  /**
   https://accounts.google.com/signin/oauth/oauthchooseaccount?redirect_uri=http://localhost:3000/auth/google&prompt=consent&response_type=code&client_id=124779399104-b31l21r083e919pja9322ld0e799tjvt.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.login&access_type=offline&o2v=2&as=aVbolaD0nvvCPwmQ64JP2w&flowName=GeneralOAuthFlow
   */

  const googleUser = await requestGoogleUser(code);
  //TODO: CREATE USER from data and sign
  return { token: code };
}

async function authorizeWithFacebook(root, { code }) {
  const facebookUser = await requestFacebookUser({
    client_id: process.env.FACEBOOK_CLIENT_ID,
    client_secret: process.env.FACEBOOK_CLIENT_SECRET,
    code,
  });
  const { email, name } = facebookUser;
  const [firstName, ...lastName] = name ? name.split(" ") : "";
  // Todo: handle idps
  const user = await User.findOrCreate({
    where: {
      email,
      idp: "facebook",
    },
    defaults: {
      firstName,
      lastName: lastName.join(" "),
      idp: "facebook",
      email,
    },
  });

  return { token: user[0].signToken() };
}

async function authorizeWithGithub(root, { code }) {
  const githubUser = await requestGithubUser({
    client_id: process.env.GIT_HUB_CLIENT_ID,
    client_secret: process.env.GIT_HUB_CLIENT_SECRET,
    code,
  });
  if (!githubUser.access_token || !githubUser.email)
    throw new Error("Ocorreu um erro");

  const { name, email } = githubUser;
  const [firstName, ...lastName] = name ? name.split(" ") : "";

  // Todo: handle idps
  const user = await User.findOrCreate({
    where: {
      email,
      idp: "google",
    },
    defaults: {
      firstName,
      lastName: lastName.join(" "),
      idp: "google",
      email,
    },
  });

  return { token: user[0].signToken() };
}

export default {
  User: {
    firstName: ({ firstName }) => capitalize(firstName),
    lastName: ({ lastName }) => capitalize(lastName),
    fullName: ({ firstName, lastName }) =>
      `${capitalize(firstName)} ${capitalize(lastName)}`,
  },
  Query: {
    getUsers: () => {
      return [
        {
          firstName: "henrique",
          lastName: "silva",
          email: "joaohenriquesilva@ua.pt",
          password: "123",
        },
      ];
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
