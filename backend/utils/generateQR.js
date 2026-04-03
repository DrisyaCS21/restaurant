import QRCode from "qrcode";

const generateQR = async () => {
  for (let i = 1; i <= 10; i++) {
    const url = `http://localhost:3000/menu?table=${i}`;

    await QRCode.toFile(`./qrcodes/table-${i}.png`, url);
  }

  console.log("QR Codes Generated!");
};

generateQR();