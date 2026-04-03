import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
  available: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model("Menu", menuSchema);