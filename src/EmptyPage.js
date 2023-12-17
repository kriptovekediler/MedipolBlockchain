import React, { useEffect, useState } from "react";

import { ethers } from "ethers";
import abi from "./utils/abi.json";
import { useParams } from "react-router-dom";
import { useApi } from "./apis/api";

const EmptyPage = () => {
  const [contract, setContract] = useState();
  const [denounce, setDenounce] = useState();

  const { routingAddress } = useParams();

  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  const { getDenouncement } = useApi();

  useEffect(() => {
    const initialize = async () => {
      const denounceToSet = await getDenouncement(routingAddress);

      setDenounce(denounceToSet.data);
      console.log("denounsssce", denounce);

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();
      console.log("signesr", signer);

      const contract = new ethers.Contract(contractAddress, abi, signer);

      setContract(contract);
      if (denounce) {
        await contract.verifyAndPayDenouncement(
          denounce.denounceInfo.denouncedBy,
          denounce.name,
          denounce.productionDate,
          denounce.drugSubstance,
          denounce.clinicalTrialResults,
          denounce.qualityControl,
          5,
          denounce.signature,
          0
        );
      }
    };
    initialize();
  }, []);

  return <div></div>;
};

export default EmptyPage;
