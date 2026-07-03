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

// Get menu (public)
export const getMenu = async (req, res) => {
  try {
    const menu = await Menu.find({ available: true });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all menu (admin)
export const getAllMenu = async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update menu
export const updateMenu = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };
    
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const menu = await Menu.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!menu) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update availability
export const updateAvailability = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(
      req.params.id,
      { available: req.body.available },
      { new: true }
    );
    
    if (!menu) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete menu
export const deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    
    if (!menu) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    
    res.json({ message: "Menu item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
