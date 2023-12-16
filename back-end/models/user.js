const mongoose = require("mongoose");

const User = mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    nonce: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

User.methods.toAccountJSON = function () {
  return {
    address: this.address,
    name: this.name,
  };
};

mongoose.model("User", User);
