"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("products", "user_id", {
      type: Sequelize.STRING,
      defaultValue: "441a610f-05e9-47ae-807f-2e94ba818ce8",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("products", "user_id");
  },
};
