import { Model, Sequelize } from "sequelize";
import User from "./user";
import UsersHasIdps from "./UsersHasIdps";

class Idp extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.STRING,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.STRING,
        },
      },
      {
        tableName: "idpId",
        sequelize,
      }
    );
  }
  static async associate() {
    Idp.belongsToMany(User, {
      as: "Users",
      through: UsersHasIdps,
      foreignKey: "idpId",
    });
  }
}

export default Idp;