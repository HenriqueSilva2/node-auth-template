import { Model } from "sequelize";

class UsersHasIdps extends Model {
  static init(sequelize, Sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING,
        },
      },
      {
        tableName: "UsersHasIdps",
        sequelize,
      }
    );
  }
}

export default UsersHasIdps;
