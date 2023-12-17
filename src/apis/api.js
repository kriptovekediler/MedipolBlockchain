import axios from "axios";

const apiUrl = "http://localhost:8000";

export const useApi = () => {
  const loginUser = async (address, email) => {
    const data = {
      address,
      email,
    };
    const response = await axios({
      method: "post",
      url: `${apiUrl}/register/login`,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.status === "success") {
      localStorage.setItem("accountToken", response.data.data.token);
    }
    return response;
  };

  const registerDenouncement = async (
    denouncer,
    name,
    date,
    drugSubstance,
    clinicalTrialResults,
    qualityControl,
    signature
  ) => {
    const data = {
      denouncer,
      name,
      date,
      drugSubstance,
      clinicalTrialResults,
      qualityControl,
      signature,
    };
    const response = await axios({
      method: "post",
      url: `${apiUrl}/register/registerDenounce`,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  };

  const getUser = async (address) => {
    const data = {
      address,
    };
    const response = await axios({
      method: "post",
      url: `${apiUrl}/register/login`,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  };

  return {
    loginUser,
    getUser,
    registerDenouncement,
  };
};
