import { Model, Sequelize } from "sequelize";
import User from "./user";
import UsersHasRoles from "./UsersHasRoles";

class Role extends Model {
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
        tableName: "Roles",
        sequelize,
      }
    );
  }
  static async associate() {
    Role.belongsToMany(User, {
      as: "Users",
      through: UsersHasRoles,
      foreignKey: "roleId",
    });
  }
}

export default Role;
