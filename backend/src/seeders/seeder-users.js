("use strict");

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let passwordHash = bcrypt.hashSync("1234", bcrypt.genSaltSync(10));
    return queryInterface.bulkInsert("Users", [
      {
        email: "adminCS14@gmail.com",
        password: passwordHash,
        roleId: "admin",
        firstName: "Group",
        lastName: "CS1.14",
        hospitalName: "",
        gender: "Other",
        birthday: "",
        district: "",
        city: "",
        address: "",
        phoneNumber: "0348597672",
        image: "",
        groupBlood: "",
        numberOfDonation: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
