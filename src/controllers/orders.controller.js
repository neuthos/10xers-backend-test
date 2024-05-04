const orderService = require("../services/order.service");
const {successHandler} = require("../utils/responseHandler");

const listOrders = async (req, res, next) => {
  try {
    const {status, page, limit} = req.query;
    const user = req.user;

    const orders = await orderService.list(status, user, page, limit);
    return successHandler(res, "List of orders", orders);
  } catch (error) {
    next(error);
  }
};

const createOrderController = async (req, res, next) => {
  try {
    const products = req.body;
    const newOrder = await orderService.createOrder(
      res,
      products,
      req.user.uuid
    );
    return successHandler(res, "Order created", newOrder);
  } catch (error) {
    next(error);
  }
};

const updateOrderStatusController = async (req, res, next) => {
  try {
    const {orderId} = req.params;
    const {newStatus} = req.body;
    const updatedOrder = await orderService.updateOrderStatus(
      res,
      orderId,
      newStatus
    );
    return successHandler(res, "Order status updated", updatedOrder);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listOrders,
  createOrderController,
  updateOrderStatusController,
};
