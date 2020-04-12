"use strict";

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert("Idps", [
      {
        id: "facebook",
        name: "facebook",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "google",
        name: "google",
        description: "Admin user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "github",
        name: "github",
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
