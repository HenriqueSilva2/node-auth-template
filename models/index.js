import Sequelize from "sequelize";
import setupDb from "~/setup/database";
import User from "~/models/user";

const sequelize = setupDb();
const models = {
  User: User.init(sequelize, Sequelize),
};

Object.values(models)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(models));

const db = {
  ...models,
  sequelize,
};

module.exports = db;
