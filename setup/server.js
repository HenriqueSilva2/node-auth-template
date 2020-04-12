import express from "express";
import cors from "cors";
import morgan from "morgan";
import setupApolloServer from "~/setup/apolloServer";
import setupPassport from "~/setup/passport";
import authMiddleWare from "~/setup/middlewares/authMiddleWare";

function setupExpressServer() {
  const app = express();
  app.set("port", process.env.PORT || 3000).use(cors());
  app.use(morgan(process.env.APP_ENV || "dev"));
  return app;
}

function setup() {
  const app = setupExpressServer();

  setupPassport();
  setupApolloServer(app);

  app.use(
    `/${process.env.GRAPHQL_INTERFACE_URL}` || "/graphql",
    authMiddleWare()
  );

  app.listen(app.get("port"), () => {
    console.log(`Listening on port: ${app.get("port")}`);
  });
}

export default setup;
