("use strict");

const {v4} = require("uuid");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "users",
      [
        {
          uuid: v4(),
          email: "user@mail.com",
          role: "CUSTOMERS",
          password: await bcrypt.hash("user", 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          uuid: "441a610f-05e9-47ae-807f-2e94ba818ce8",
          email: "employee@mail.com",
          role: "EMPLOYEE",
          password: await bcrypt.hash("employee", 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );

    const categoryId1 = v4();
    const categoryId2 = v4();
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          uuid: categoryId1,
          name: "Asus",
          description: "lorem ipsum sir dolor amet",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          uuid: categoryId2,
          name: "Apple",
          description: "lorem ipsum sir dolor amet",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "products",
      [
        {
          uuid: v4(),
          name: "Asus Rog 64 GB",
          description: "Asus rog 64 GB description",
          seo_slug: "asus-rog-64-gb",
          stock: 100,
          price: 49.99,
          category_id: categoryId1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          uuid: v4(),
          name: "Iphone 16 Pro",
          description: "Iphone 16 Pro description.",
          seo_slug: "iphone-16-pro",
          stock: 50,
          price: 1229.99,
          category_id: categoryId2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("categories", null, {});
    await queryInterface.bulkDelete("products", null, {});
  },
};
