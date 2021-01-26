import express from "express";
const router = express.Router();
import {
  fetchClient,
  getClientProfile,
} from "../controllers/clientControllers.js";
import { protectClient } from "../middleware/authMiddleware.js";

router.route("/").post(fetchClient);
router.route("/profile").get(protectClient, getClientProfile);

export default router;
