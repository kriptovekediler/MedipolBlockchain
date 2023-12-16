import React from "react";
import "./ConnectWalletPage.css"; // Import the CSS file for styling
import { useGlobalStore } from "../../store/store";

const ConnectWalletPage = () => {
  const setAddress = useGlobalStore((state) => state.setAddress);
  const address = useGlobalStore((state) => state.address);

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];

    setAddress(account);
  };
  return (
    <div className="connect-wallet-page">
      <div className="connect-wallet-container">
        <button className="connect-wallet-button" onClick={connectWallet}>
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default ConnectWalletPage;
