import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";


dotenv.config();

const app = express();

// middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://hoteldrisya.vercel.app",
  "https://restaurant-six-sable.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Error ❌", err));

// menu routes
import menuRoutes from "./routes/menuRoutes.js";
app.use("/api/menu", menuRoutes);

//order routes
import orderRoutes from "./routes/orderRoutes.js";
app.use("/api/orders", orderRoutes);

// auth routes
import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);

// qr routes  
import qrRoutes from "./routes/qrRoutes.js";
app.use("/api/qr", qrRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));