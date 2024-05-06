"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("products", "image_url", {
      type: Sequelize.STRING,
      defaultValue:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0ZTr28G88kQjAdGJUA5f7RSmcH4ZTzLE7kLYh5YTdZA&s",
    });

    await queryInterface.addColumn("categories", "image_url", {
      type: Sequelize.STRING,
      defaultValue:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWsq5PofudqjzkZnydnAeDrfpT9n_yCVva6syoSgbt1w&s",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("products", "image_url");
    await queryInterface.removeColumn("categories", "image_url");
  },
};
