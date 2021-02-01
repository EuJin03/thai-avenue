import express from "express";
const router = express.Router();
import { getProductByCategory } from "../controllers/productControllers.js";

router.route("/:category").get(getProductByCategory);

export default router;
