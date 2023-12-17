import React, { useState, useEffect } from "react";
import "./FormComponent.css";

import { ethers } from "ethers";
import { useApi } from "../apis/api";

const FormComponent = () => {
  const [address, setAddress] = useState();

  const { registerDenouncement } = useApi();

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

  useEffect(() => {
    const getAccount = async () => {
      const currentAccount = await window.ethereum.request({
        method: "eth_accounts",
      });
      setAddress(currentAccount[0]);
    };
    getAccount();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nonce = 0;
    const msg = await getMessageHash(nonce);
    console.log("msg", msg);
    const sign = await getSignature(msg);
    console.log("signmign", sign);

    const response = await registerDenouncement(
      address,
      formData.name,
      new Date(formData.date).getTime() / 1000,
      formData.drugSubstance,
      formData.clinicalTrialResults,
      formData.qualityControl,
      sign
    );
    console.log("response", response);
  };

  const getMessageHash = async (nonce) => {
    const msg = ethers.utils.solidityPack(
      ["address", "string", "uint", "string", "string", "string", "uint"],
      [
        address,
        formData.name,
        new Date(formData.date).getTime() / 1000,
        formData.drugSubstance,
        formData.clinicalTrialResults,
        formData.qualityControl,
        nonce,
      ]
    );
    const msgHash = ethers.utils.keccak256(msg);
    console.log("msg", msg);
    return msgHash;
  };

  const getSignature = async (msg) => {
    const sign = await window.ethereum.request({
      method: "personal_sign",
      params: [msg, address],
    });
    console.log("provider", sign);
    return sign;
  };

  return (
    <div className="form-container">
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
