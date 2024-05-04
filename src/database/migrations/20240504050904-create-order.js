"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      uuid: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.STRING,
      },
      total: {
        type: Sequelize.DECIMAL(20, 2),
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
  },
};
