// routes/authRoutes.js
import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();
 
console.log("Auth routes loaded:", typeof router);
router.post("/signup", signup);
router.post("/login", login);


export default router;