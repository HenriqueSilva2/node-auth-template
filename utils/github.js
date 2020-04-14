import fetch from "node-fetch";

export const getGithubAuthUrl = () => {
  return `https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.GIT_HUB_CLIENT_ID}`;
};

export const requestGithubUser = async (code) => {
  const { access_token } = await requestGithubToken(code);
  const githubUser = await requestGithubUserAccount(access_token);
  return { ...githubUser, access_token };
};

const requestGithubUserAccount = (token) =>
  fetch(`https://api.github.com/user?access_token=${token}`).then((res) =>
    res.json()
  );

const requestGithubToken = (code) =>
  fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.GIT_HUB_CLIENT_ID,
      client_secret: process.env.GIT_HUB_CLIENT_SECRET,
      code,
    }),
  })
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(JSON.stringify(error));
    });
