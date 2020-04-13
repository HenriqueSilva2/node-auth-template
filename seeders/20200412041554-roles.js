"use strict";

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert("Roles", [
      {
        id: "regular",
        name: "regular",
        description: "Normal user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "moderator",
        name: "moderator",
        description: "Moderator user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "admin",
        name: "admin",
        description: "Admin user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
