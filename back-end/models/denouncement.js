const mongoose = require("mongoose");

const Denouncement = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    productionDate: {
      type: Number,
    },
    drugSubstance: {
      type: String,
      required: true,
    },
    clinicalTrialResults: {
      type: String,
      required: true,
    },
    qualityControl: {
      type: String,
      required: true,
    },
    denounceInfo: {
      denounced: {
        type: Boolean,
        default: false,
      },
      denouncedBy: {
        type: String,
      },
    },
    signature: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

Denouncement.methods.toAccountJSON = function () {
  return {
    address: this.address,
    productionDate: this.productionDate,
    drugSubstance: this.drugSubstance,
    clinicalTrialResults: this.clinicalTrialResults,
    qualityControl: this.qualityControl,
    denounceInfo: this.denounceInfo,
  };
};

mongoose.model("Denouncement", Denouncement);
