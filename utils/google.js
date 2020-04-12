import { OAuth2Client } from "google-auth-library";

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CLIENT_REDDIRECT
);

export const requestGoogleUser = async (code) => {
  const scopes = ["https://www.googleapis.com/auth/calendar"];

  oAuth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "offline",

    // If you only need one scope ou can pass it as a string
    scope: scopes,
    redirect_uri: process.env.GOOGLE_CLIENT_REDDIRECT,
  });

  const data = await oAuth2Client.getToken(code);
  if (data.error) throw new Error("Ocorreu um erro com o codigo");
  const googleUser = await oAuth2Client.getTokenInfo(data.tokens.access_token);
  return { ...googleUser, access_token: data.access_token };
};
/**
https://accounts.google.com/signin/oauth/oauthchooseaccount?redirect_uri=http://localhost:3000/auth/google&prompt=consent&response_type=code&client_id=124779399104-b31l21r083e919pja9322ld0e799tjvt.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.login&access_type=offline&o2v=2&as=aVbolaD0nvvCPwmQ64JP2w&flowName=GeneralOAuthFlow
 */
