// QrPage.jsx

import React from "react";
import QRCode from "qrcode.react";

const QrPage = () => {
  const qrCodeValue = "balblablablalbal"; // Replace with your actual data

  return (
    <div className="qr-container">
      <h2>QR Code Page</h2>
      <QRCode value={qrCodeValue} />
    </div>
  );
};

export default QrPage;
