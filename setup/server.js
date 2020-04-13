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

async function setup() {
  const app = setupExpressServer();
  app.use(authMiddleWare);

  setupPassport(app);
  setupApolloServer(app);
  //Example many to many

  // const user = await User.create({
  //   firstName: "Chair",
  //   lastName: "sa",
  //   email: "userRegular",
  // });
  // const regularRole = await Role.findByPk("regular");
  // console.log(user.setRoles([regularRole]));

  app.listen(app.get("port"), () => {
    console.log(`Listening on port: ${app.get("port")}`);
  });
}

export default setup;
