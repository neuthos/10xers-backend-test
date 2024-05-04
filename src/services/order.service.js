const {Order, OrderDetail, Product} = require("../models");
const {errorHandler} = require("../utils/responseHandler");

const list = async (status, user, page = 1, limit = 10) => {
  const where = {};
  if (status) where.status = status;
  if (user.role === "CUSTOMERS") where.user_id = user.uuid;

  const offset = (page - 1) * limit;
  const orders = await Order.findAll({
    where,
    offset,
    limit,
    include: [{model: OrderDetail, as: "order_details"}],
  });

  return orders;
};

const createOrder = async (res, products, userId) => {
  let newOrder;
  let newOrderDetails = [];

  try {
    const orderData = {
      user_id: userId,
      total: 0,
      status: 0,
    };

    const orderDetails = [];

    await Promise.all(
      products.map(async ({productId, quantity}) => {
        const product = await Product.findOne({where: {uuid: productId}});
        if (!product) return errorHandler(res, "Product not found", 404);

        if (quantity > product.stock) {
          return errorHandler(res, "Product out of stock", 400);
        }

        const subtotal = +product.price * quantity;
        orderData.total += subtotal;

        orderDetails.push({
          product_id: productId,
          quantity,
          price: +product.price,
        });
      })
    );

    newOrder = await Order.create({...orderData});

    for (const detail of orderDetails) {
      const {productId, quantity, price} = detail;
      const newDetail = await OrderDetail.create({
        order_id: newOrder.uuid,
        product_id: productId,
        quantity,
        price,
      });

      newOrderDetails.push(newDetail);
    }

    await Promise.all(
      products.map(async ({productId, quantity}) => {
        const product = await Product.findOne({where: {uuid: productId}});
        await product.update({stock: product.stock - quantity});
      })
    );

    return {order: newOrder, orderDetails: newOrderDetails};
  } catch (error) {
    if (newOrder) await newOrder.destroy();
    for (const detail of newOrderDetails) {
      await detail.destroy();
    }

    throw error;
  }
};

const updateOrderStatus = async (res, orderId, newStatus) => {
  const order = await Order.findOne({where: {uuid: orderId}});
  if (!order) return errorHandler(res, "Order not found", 404);

  if (order.status !== 0) {
    return errorHandler(res, "Order already completed", 400);
  }

  await order.update({status: newStatus});
  return order;
};

module.exports = {
  list,
  createOrder,
  updateOrderStatus,
};
