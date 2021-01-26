import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// desc Create new Order
// @route POST /api/orders
// @access Private route
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, table, subTotal, orderCreated } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      table,
      subTotal,
      orderCreated,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// desc Get all orders
// @route GET /api/orders
// @access Private route
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate();

  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("Orders not found");
  }
});

// desc Get order by ID
// @route GET /api/orders
// @access Private route
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not Found");
  }
});

// desc Update order to served
// @route GET /api/orders/:id/serve
// @access Private/Admin
const updateOrderToServed = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isServed = true;
    order.servedAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export { addOrderItems, getAllOrders, getOrderById, updateOrderToServed };
