import { Model, Sequelize } from "sequelize";

class UsersHasRoles extends Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        tableName: "UsersHasRoles",
        sequelize,
      }
    );
  }
}

export default UsersHasRoles;
