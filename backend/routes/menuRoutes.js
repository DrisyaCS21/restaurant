import express from "express";
import { addMenu, getMenu } from "../controllers/menuController.js";
import upload from "../middleware/upload.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", upload.single("image"), addMenu);
router.get("/", getMenu);

console.log("DEBUG:", {
  protect: typeof protect,
  adminOnly: typeof adminOnly
});
export default router;