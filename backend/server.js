import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

  // routes
import menuRoutes from "./routes/menuRoutes.js";
app.use("/api/menu", menuRoutes);

import orderRoutes from "./routes/orderRoutes.js";
app.use("/api/orders", orderRoutes);
// PUT /api/orders/:id/complete
app.put("/api/orders/:id/complete", async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.completed = true;
  await order.save();
  res.json({ message: "Order marked as completed" });
});
// server
const PORT = 1000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));