import mongoose from "mongoose";

const qrCodeSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
    unique: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  url: {
    type: String,
    required: true
  },
  dataUrl: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("QRCode", qrCodeSchema);