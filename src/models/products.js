"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      seo_slug: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      price: DataTypes.DECIMAL(20, 2),
      category_id: {
        type: DataTypes.STRING,
        references: {
          model: "categories",
          key: "uuid",
        },
      },
    },
    {
      sequelize,
      tableName: "products",
      modelName: "Product",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Product;
};
