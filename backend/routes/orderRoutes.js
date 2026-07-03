import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder,
  getActiveOrderForTable,
  addItemsToOrder
} from "../controllers/orderController.js";

const router = express.Router();

// user can create order (no auth OR optional auth)
router.post("/", createOrder);

// public routes
router.get("/table/:tableNumber/active", getActiveOrderForTable);
router.put("/:id/add-items", addItemsToOrder);

// admin only
router.get("/", protect, adminOnly, getOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);
router.delete("/:id", protect, adminOnly, deleteOrder);

export default router;