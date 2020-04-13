"use strict";

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert("UsersHasRoles", [
      {
        userId: 1,
        roleId: "regular",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        roleId: "moderator",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        roleId: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("UsersHasRoles", null, {});
  },
};
