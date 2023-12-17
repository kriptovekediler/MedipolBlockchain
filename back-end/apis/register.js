const router = require("express").Router();

const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const faker = require("faker");

const User = mongoose.model("User");
const Denouncement = mongoose.model("Denouncement");

const jwt_secret = process.env.JWT_SECRET;

const Logger = require("../services/logger");

router.post("/login", async (req, res) => {
  try {
    const { address, email } = req.body;
    console.log("ssss", address);

    const name = faker.name.findName();

    const user = await User.findOne({
      address: address,
    });

    if (!user) {
      const newAccount = new User({
        address,
        email,
        name,
      });
      await newAccount.save();
    }
    let token = jwt.sign(
      {
        data: address,
      },
      jwt_secret,
      { expiresIn: "48h" }
    );
    return res.json({
      status: "success",
      data: {
        token,
      },
    });
  } catch (error) {
    Logger.error(error);
  }
});

router.post("/getUser", async (req, res) => {
  try {
    const address = req.body.address;

    const account = await User.findOne({
      address: address,
    });

    if (account) {
      return res.json({
        status: "success",
        data: account,
      });
    } else {
      return res.status(400).json({
        status: "failed",
      });
    }
  } catch (error) {
    Logger.error(error);
  }
});

router.post("/registerDenounce", async (req, res) => {
  const {
    denouncer,
    name,
    date,
    drugSubstance,
    clinicalTrialResults,
    qualityControl,
    signature,
  } = req.body;

  const denouncement = await Denouncement.findOne({
    signature: signature,
  });

  if (denouncement) {
    return res.status(400).json({
      status: "failed",
      data: "already denounced",
    });
  }

  const newDenouncement = new Denouncement({
    name: name,
    productionDate: date,
    drugSubstance: drugSubstance,
    clinicalTrialResults: clinicalTrialResults,
    qualityControl: qualityControl,
    signature: signature,
  });
  newDenouncement.denounceInfo = {
    denouncedBy: denouncer,
    denounced: false,
  };

  const user = await User.findOne({
    address: denouncer,
  });

  user.nonce += 1;

  await newDenouncement.save();
  await user.save();

  return res.status(200).json({
    status: "success",
    data: newDenouncement,
  });
});

module.exports = router;
