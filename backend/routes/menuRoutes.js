import express from "express";
import { addMenu, getMenu, getAllMenu, updateMenu, updateAvailability, deleteMenu } from "../controllers/menuController.js";
import upload from "../middleware/upload.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getMenu);

// Admin routes
router.post("/", protect, adminOnly, upload.single("image"), addMenu);
router.get("/admin", protect, adminOnly, getAllMenu);
router.put("/:id", protect, adminOnly, upload.single("image"), updateMenu);
router.patch("/:id/availability", protect, adminOnly, updateAvailability);
router.delete("/:id", protect, adminOnly, deleteMenu);

export default router;
