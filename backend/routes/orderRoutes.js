import express from "express";
import { protect, adminOnly, optionalAuth } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getOrders,
  getMyOrders,
  updateOrderStatus,
  deleteOrder,
  getActiveOrderForTable,
  addItemsToOrder,
  getDashboardStats
} from "../controllers/orderController.js";

const router = express.Router();

// user can create order (no auth OR optional auth)
router.post("/", optionalAuth, createOrder);

// authenticated user can view their own orders
router.get("/my-orders", protect, getMyOrders);

// public routes
router.get("/table/:tableNumber/active", getActiveOrderForTable);
router.put("/:id/add-items", addItemsToOrder);

// admin only
router.get("/", protect, adminOnly, getOrders);
router.get("/stats", protect, adminOnly, getDashboardStats);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);
router.delete("/:id", protect, adminOnly, deleteOrder);

export default router;