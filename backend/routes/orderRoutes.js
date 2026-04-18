import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getOrders,
  updateOrderStatus
} from "../controllers/orderController.js";

const router = express.Router();

// user can create order (no auth OR optional auth)
router.post("/", createOrder);

// admin only
router.get("/", protect, adminOnly, getOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

export default router;