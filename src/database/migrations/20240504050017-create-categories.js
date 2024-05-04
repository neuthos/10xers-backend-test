("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("categories", {
      uuid: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("categories");
  },
};

// sequelize model:generate --name OrderDetail --attributes "uuid:string,order_id:string,product_id:string,quantity:integer,price:integer"
