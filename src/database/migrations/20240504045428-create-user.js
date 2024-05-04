"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      uuid: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.TEXT,
      },
      role: {
        type: Sequelize.ENUM("EMPLOYEE", "CUSTOMERS"),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
