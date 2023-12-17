// QrPage.jsx

import React, { useEffect, useState } from "react";

import { useApi } from "./apis/api";
import QRCode from "qrcode.react";
import { useParams } from "react-router-dom";

const QrPage = () => {
  const [address, setAddress] = useState();

  const { id } = useParams();

  const { getDenouncement } = useApi();

  useEffect(() => {
    const getAccount = async () => {
      const currentAccount = await window.ethereum.request({
        method: "eth_accounts",
      });
      setAddress(currentAccount[0]);
    };

    getAccount();
  }, [address]);

  return (
    <div className="qr-container">
      <h2>QR Code Page</h2>
      <QRCode value={`/generatedqr/${"657e5484d52ce3fa925cdf5a"}`} />
    </div>
  );
};

export default QrPage;
