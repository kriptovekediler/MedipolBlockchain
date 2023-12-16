// App.js or index.js

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { getUser } from "./apis/api";
import QrPage from "./QrPage";
import LoginPage from "./LoginPage";
import ConnectWalletPage from "./components/ConnectWallet/ConnectWallet";

function App() {
  const adminAddress = process.env.REACT_APP_ADMIN_ADDRESS;

  const [address, setAddress] = useState();
  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];

    setAddress(account);

    if (address) {
      isAdminAddress(address);
    }
  };

  const isAdminAddress = (address) => {
    console.log("address", address, adminAddress);
    if (address && address !== adminAddress) {
      window.location.assign("/");
    } else {
      window.location.assign("/login");
    }
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {address && (
            <>
              <Route path="/qrpage" element={<QrPage address={address} />} />
              <Route path="/login" element={<LoginPage address={address} />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
      <div className="connect-wallet-page">
        <div className="connect-wallet-container">
          <button className="connect-wallet-button" onClick={connectWallet}>
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
