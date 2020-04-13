"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "Regular",
        lastName: "User",
        email: "regular",
        password: "123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Moderator",
        lastName: "User",
        email: "moderator",
        password: "123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Admin",
        lastName: "User",
        email: "admin",
        password: "123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
