import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getAllOrders,
  getOrderById,
  updateOrderToServed,
} from "../controllers/orderControllers.js";

router.route("/").post(addOrderItems).get(getAllOrders);
router.route("/:id").get(getOrderById).put(updateOrderToServed);
router.route("/:id/served").put(updateOrderToServed);

export default router;
