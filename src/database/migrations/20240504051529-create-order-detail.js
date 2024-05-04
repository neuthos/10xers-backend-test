"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("order_details", {
      uuid: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      order_id: {
        type: Sequelize.STRING,
      },
      product_id: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.DOUBLE(20, 3),
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
    await queryInterface.dropTable("order_details");
  },
};
