import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

//////////////////////////////////////////////////////
// 🔹 ADMIN / CUSTOMER SIGNUP
//////////////////////////////////////////////////////

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userRole = req.body.role || "user";

    // Only allow "user" or "admin"
    const allowedRoles = ["admin", "user"];
    if (!allowedRoles.includes(userRole)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: userRole,
    });

    res.status(201).json({
      message: "User registered successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//////////////////////////////////////////////////////
// 🔹 LOGIN (ADMIN + USER)
//////////////////////////////////////////////////////

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};