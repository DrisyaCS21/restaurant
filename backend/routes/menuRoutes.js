import express from "express";
import { addMenu, getMenu } from "../controllers/menuController.js";

const router = express.Router();

router.post("/", addMenu);
router.get("/", getMenu);

export default router;