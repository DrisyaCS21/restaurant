import express from "express";
import { generateAndSaveQR, getAllQRCodes, deleteQRCode } from "../controllers/qrController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, generateAndSaveQR);
router.get("/", protect, adminOnly, getAllQRCodes);
router.delete("/:tableNumber", protect, adminOnly, deleteQRCode);

export default router;
