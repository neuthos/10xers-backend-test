"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetail.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "order",
      });
    }
  }
  OrderDetail.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      order_id: {
        type: DataTypes.STRING,
        references: {
          model: "orders",
          key: "uuid",
        },
      },
      product_id: {
        type: DataTypes.STRING,
        references: {
          model: "products",
          key: "uuid",
        },
      },
      quantity: DataTypes.INTEGER,
      price: DataTypes.DOUBLE(20, 3),
    },
    {
      sequelize,
      modelName: "OrderDetail",
      tableName: "order_details",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return OrderDetail;
};
