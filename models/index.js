import Sequelize from "sequelize";
import setupDb from "~/setup/database";
import * as fs from "fs";
import * as path from "path";

const sequelize = setupDb();

let models = {};

// Well, basically i did this script on my own to work with new Sequilize syntax
// So don't trust
async function loadModules(currPath) {
  let stat = fs.lstatSync(currPath);
  if (stat.isDirectory()) {
    const files = fs.readdirSync(currPath).sort();
    let f,
      l = files.length;
    for (var i = 0; i < l; i++) {
      f = path.join(currPath, files[i]);
      if (files[i] != "index.js") {
        const name = files[i].replace(".js", "");
        console.log("requiring", name);
        if (require(path.join(currPath, files[i])).default)
          models[
            name.charAt(0).toUpperCase() + name.slice(1)
          ] = require(path.join(currPath, files[i])).default;
      }
    }
  }
}

loadModules(__dirname);

Object.values(models)
  .map((model) => {
    model.init(sequelize, Sequelize);
    return model;
  })
  .forEach((model) => {
    if (model.associate) model.associate();
  });

const db = {
  ...models,
  sequelize,
};

module.exports = db;
