"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Order.hasMany(models.OrderDetail, {
        foreignKey: "order_id",
        as: "order_details",
      });
    }
  }
  Order.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.STRING,
        references: {
          model: "users",
          key: "uuid",
        },
      },
      total: DataTypes.DECIMAL(20, 2),
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Order;
};
