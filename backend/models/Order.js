import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true
  },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: Number,
  status: {
    type: String,
    default: "pending" // pending, preparing, served, paid
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);