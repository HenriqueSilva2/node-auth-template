import { Model } from "sequelize";

class UsersHasIdps extends Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        tableName: "UsersHasIdps",
        sequelize,
      }
    );
  }
}

export default UsersHasIdps;
