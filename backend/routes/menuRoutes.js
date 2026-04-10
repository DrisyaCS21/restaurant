import express from "express";
import { addMenu, getMenu } from "../controllers/menuController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("image"), addMenu);
router.get("/", getMenu);

export default router;