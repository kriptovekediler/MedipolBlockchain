import React, { useState } from "react";
import "./FormComponent.css";

import { ethers } from "ethers";

const FormComponent = () => {
  const [user, setUser] = useState();
  const [formData, setFormData] = useState({
    name: "",
    date: new Date(),
    drugSubstance: "",
    clinicalTrialResults: "",
    qualityControl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nonce = 0;
    const msg = await getMessageHash(nonce);
    console.log("msg", msg);
    const sign = await getSignature(msg);
    console.log("sign", sign);

    console.log("Form Data:", formData);
  };

  const getMessageHash = async (nonce) => {
    const msg = ethers.solidityPacked(
      ["address", "string", "uint", "string", "string", "string", "uint"],
      [
        user,
        formData.name,
        new Date(formData.date).getTime() / 1000,
        formData.drugSubstance,
        formData.clinicalTrialResults,
        formData.qualityControl,
        nonce,
      ]
    );
    const msgHash = ethers.keccak256(msg);
    console.log("msg", msg);
    return msgHash;
  };

  const getSignature = async (msg) => {
    const provider = new ethers.JsonRpcProvider(
      "https://rpc-mumbai.maticvigil.com/"
    );
    console.log("signer1", provider);
    const sign = await window.ethereum.request({
      method: "personal_sign",
      params: [msg, user],
    });
    console.log("provider", sign);
    return sign;
  };

  return (
    <div className="form-container">
      <div className="connect-wallet">
        {!user && <button onClick={connectWallet}>Connect Wallet</button>}
      </div>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="name">Drug Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="date">Production Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="drugSubstance">Drug Substance:</label>
          <input
            type="text"
            id="drugSubstance"
            name="drugSubstance"
            value={formData.drugSubstance}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="clinicalTrialResults">Clinical Trial Result:</label>
          <input
            type="text"
            id="clinicalTrialResults"
            name="clinicalTrialResults"
            value={formData.clinicalTrialResults}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="qualityControl">Quality Control:</label>
          <input
            type="text"
            id="qualityControl"
            name="qualityControl"
            value={formData.qualityControl}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
