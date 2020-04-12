import { Model, Sequelize } from "sequelize";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class User extends Model {
  static async findByEmail(email, idp = null) {
    return await User.findOne({
      where: {
        email: email.toLowerCase(),
        idp,
      },
    });
  }

  static init(sequelize, DataTypes) {
    return super.init(
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
