import Order from "../models/Order.js";

// create order
export const createOrder = async (req, res) => {
  try {
    const { tableNumber, items } = req.body;

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      tableNumber,
      items,
      totalAmount
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all orders (admin)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update status
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};