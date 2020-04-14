import { OAuth2Client } from "google-auth-library";
import fetch from "node-fetch";

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CLIENT_REDDIRECT
);

export const getGoogleAuthUrl = () => {
  return oAuth2Client.generateAuthUrl({
    // If you only need one scope ou can pass it as a string
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    redirect_uri: process.env.GOOGLE_CLIENT_REDDIRECT,
  });
};

export const requestGoogleUser = async (code) => {
  const data = await oAuth2Client.getToken(code);
  if (data.error) throw new Error("Ocorreu um erro com o codigo");
  const googleUser = await fetchUserInfo(data.tokens.access_token);

  return googleUser;
};

const fetchUserInfo = (token) =>
  fetch(`https://www.googleapis.com/oauth2/v2/userinfo`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  })
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(JSON.stringify(error));
    });
