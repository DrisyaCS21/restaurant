import express from "express";
import { protect ,adminOnly } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getOrders,
  updateOrderStatus
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", protect , adminOnly , getOrders);
router.put("/:id/status", protect ,adminOnly , updateOrderStatus);

export default router;