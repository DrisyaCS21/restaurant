import Order from "../models/Order.js";

// create order
export const createOrder = async (req, res) => {
  try {
    // Check if user is admin - admins can't place orders
    if (req.user && req.user.role === "admin") {
      return res.status(403).json({ message: "Admins cannot place orders" });
    }

    const { tableNumber, items, paymentMethod, specialInstructions } = req.body;

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Format items for storage (save name, price, quantity)
    const formattedItems = items.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const order = await Order.create({
      tableNumber,
      items: formattedItems,
      totalAmount,
      paymentMethod,
      specialInstructions,
      status: "processing",
      user: req.user?._id || null,
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all orders (admin only)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get user's own orders (authenticated user)
export const getMyOrders = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get active order for a table (public)
export const getActiveOrderForTable = async (req, res) => {
  try {
    const { tableNumber } = req.params;
    // Find the latest order that's not paid
    const activeOrder = await Order.findOne({
      tableNumber,
      status: { $ne: "paid" }
    }).sort({ createdAt: -1 });

    res.json(activeOrder || null);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// add items to an existing order
export const addItemsToOrder = async (req, res) => {
  try {
    const { id: orderId } = req.params;
    const { items } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Calculate additional amount
    const additionalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Format new items
    const formattedItems = items.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    // Add items to existing order
    order.items.push(...formattedItems);
    order.totalAmount += additionalAmount;

    // Save the updated order
    await order.save();
    
    // Fetch the updated order to return
    const updatedOrder = await Order.findById(orderId);
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update status
// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["processing", "preparing", "served", "paid"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};