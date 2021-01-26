import express from "express";
const router = express.Router();
import {
  createProduct,
  deleteProduct,
  getProductByCategory,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productControllers.js";

router.route("/:category").get(getProductByCategory);
router.route("/").get(getProducts).post(createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
