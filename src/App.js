// App.js or index.js

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./App.css";
import QrPage from "./QrPage";
import LoginPage from "./LoginPage";
import FormComponent from "./components/FormComponent";

function App() {
  const adminAddress = process.env.REACT_APP_ADMIN_ADDRESS;

  const [address, setAddress] = useState();

  const isAdminAddress = (address) => {
    console.log("address", address === adminAddress);
    console.log("address", address, adminAddress);
    if (address === adminAddress) {
      window.location.assign("/");
    } else {
      window.location.assign("/login");
    }
  };

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];

    console.log("account", account);

    setAddress(account);

    if (account) {
      isAdminAddress(account);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ address }}>
          <Routes>
            <Route path="/qrpage/:id" element={<QrPage />} />
            <Route path="/createForm" element={<FormComponent />} />
            <Route
              path="/login"
              element={
                address !== isAdminAddress ? (
                  <LoginPage />
                ) : (
                  <Navigate to={"/"} />
                )
              }
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
