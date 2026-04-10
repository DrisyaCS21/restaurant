import Menu from "../models/Menu.js";

// Add menu
export const addMenu = async (req, res) => {
  try {
    const menuData = {
      ...req.body,
      image: req.file ? req.file.filename : null,
    };

    const menu = await Menu.create(menuData);
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get menu
export const getMenu = async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};