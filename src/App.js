// App.js or index.js

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
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

    if (account) {
      isAdminAddress(account);
    }
  };

  const isAdminAddress = (address) => {
    console.log("address", address, adminAddress);
    if (address && address !== adminAddress) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ address }}>
          <Routes>
            <Route path="/qrpage" element={<QrPage />} />
            <Route
              path="/login"
              element={isAdminAddress ? <LoginPage /> : <Navigate to={"/"} />}
            />
          </Routes>
        </UserContext.Provider>
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
