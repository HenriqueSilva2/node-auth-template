import fetch from "node-fetch";
import { Facebook } from "fb";
var fb = new Facebook({
  version: "v6.0",
  appId: process.env.FACEBOOK_CLIENT_ID,
  appSecret: process.env.FACEBOOK_CLIENT_SECRET,
});

export const requestFacebookUser = async (credentials) => {
  const data = await requestFacebookToken(credentials);
  if (data.error) throw new Error("Ocorreu um erro com o codigo");
  const facebookUser = await requestFacebookUserAccount(data.access_token);
  return { ...facebookUser, access_token: data.access_token };
};

/**
https://www.facebook.com/v6.0/dialog/oauth?
  client_id=2035522629852416
  &redirect_uri=http://localhost:3000/auth/facebook
  &state=2
 */
const requestFacebookUserAccount = (token) => {
  fb.setAccessToken(token);
  return new Promise((resolve, rej) => {
    fb.api("/me", { fields: ["id", "name", "email"] }, (res) => {
      if (!res || res.error) {
        rej(res ? res.error : "");
      }
      return resolve(res);
    });
  });
};

const requestFacebookToken = ({ code, client_id, client_secret }) =>
  fetch(
    `https://graph.facebook.com/v6.0/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${process.env.FACEBOOK_CLIENT_REDDIRECT}`
  )
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(JSON.stringify(error));
    });
