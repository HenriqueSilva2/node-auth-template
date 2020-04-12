import { Model, Sequelize } from "sequelize";

class UsersHasRoles extends Model {
  static init(sequelize) {
    return super.init(
      {
        email: { type: Sequelize.STRING },
      },
      {
        tableName: "UsersHasRoles",
        sequelize,
      }
    );
  }
}

export default UsersHasRoles;
