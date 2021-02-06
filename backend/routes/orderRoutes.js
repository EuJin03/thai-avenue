import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getAllOrders,
  getTodayOrders,
  getOrderById,
  updateOrderToServed,
  deleteOrders,
} from "../controllers/orderControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(addOrderItems)
  .get(protect, admin, getAllOrders)
  .delete(protect, admin, deleteOrders);
router.route("/today").get(protect, admin, getTodayOrders);
router.route("/:id").get(getOrderById).put(updateOrderToServed);
router.route("/:id/served").put(protect, admin, updateOrderToServed);

export default router;
