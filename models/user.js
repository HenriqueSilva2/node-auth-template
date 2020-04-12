import { Model, Sequelize } from "sequelize";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Idp from "./idp";
import Role from "./role";
import UsersHasRoles from "./UsersHasRoles";
import UsersHasIdps from "./UsersHasIdps";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        firstName: {
          type: Sequelize.STRING,
        },
        lastName: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
          set: (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        },
        idp: {
          type: Sequelize.STRING,
        },
      },
      {
        tableName: "Users",
        sequelize,
      }
    );
  }
  static async findByEmail(email, idp = null) {
    return await User.findOne({
      where: {
        email: email.toLowerCase(),
        idp,
      },
    });
  }
  static async associate() {
    User.belongsToMany(Role, {
      as: "Roles",
      through: UsersHasRoles,
      foreignKey: "userId",
    });
    User.belongsToMany(Idp, {
      as: "Idps",
      through: UsersHasIdps,
      foreignKey: "userId",
    });
  }

  signToken() {
    return jwt.sign(
      {
        iss: process.env.APP_NAME || "ytrank",
        sub: this.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1),
      },
      process.env.JWT_SECRET
    );
  }

  checkPasswordValid(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

export default User;
