import QRCode from "../models/QRCode.js";
import qrcode from "qrcode";
import crypto from "crypto";

export const generateAndSaveQR = async (req, res) => {
    try {
        const { tableNumber } = req.body;
        
        if (!tableNumber || !Number.isFinite(tableNumber) || tableNumber <= 0 || !Number.isInteger(tableNumber)) {
            return res.status(400).json({ message: "valid tableNumber is required" });
        }

        // Check if we already have a QR for this table
        let qrCode = await QRCode.findOne({ tableNumber });
        
        // Generate the URL with the token using CLIENT_URL from env
        const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
        
        // Generate token manually if new
        if (!qrCode) {
            qrCode = new QRCode({ 
                tableNumber, 
                token: crypto.randomBytes(16).toString("hex") 
            });
        }
        
        const url = `${clientUrl}/order?token=${qrCode.token}`;
        
        // Generate the QR code data URL
        const dataUrl = await qrcode.toDataURL(url, { width: 320, margin: 1 });
        
        // Update all fields
        qrCode.dataUrl = dataUrl;
        qrCode.url = url;
        
        // Save it
        await qrCode.save();
        
        // Return with the url for consistency with getAllQRCodes
        res.json({
            ...qrCode.toObject(),
            url: `${clientUrl}/order?token=${qrCode.token}`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

export const getAllQRCodes = async (req, res) => {
    try {
        const qrCodes = await QRCode.find().sort({ createdAt: -1 });
        // Format response to include the url with token using CLIENT_URL
        const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
        const formattedQRs = qrCodes.map(qr => ({
            ...qr.toObject(),
            url: `${clientUrl}/order?token=${qr.token}`
        }));
        res.json(formattedQRs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteQRCode = async (req, res) => {
    try {
        const { tableNumber } = req.params;
        await QRCode.findOneAndDelete({ tableNumber });
        res.json({ message: "QR code deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const verifyQRCode = async (req, res) => {
    try {
        const { token } = req.params;
        console.log("Verifying token:", token);
        
        const qrCode = await QRCode.findOne({ token });
        
        if (!qrCode) {
            console.log("QR code not found for token:", token);
            return res.status(404).json({ message: "Invalid or expired QR code" });
        }
        
        console.log("Found QR code for table:", qrCode.tableNumber);
        res.json({ tableNumber: qrCode.tableNumber });
    } catch (err) {
        console.error("Error verifying QR code:", err);
        res.status(500).json({ message: err.message });
    }
};