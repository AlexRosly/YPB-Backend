const { Schema, model } = require("mongoose");
const Joi = require("joi");

const hotelsVerification = Schema(
  {
    video: [{ type: String }],
    documents: [{ type: String }],
    selfie: [{ type: String }],
    link: [{ type: String }],
    chatHistory: { hotelier: [], verifier: [] },
    pointOnTheMap: { type: String },
    youTubeLink: { type: String },
    phone1: { type: String, default: "without" },
    phone2: { type: String, default: "without" },
    nextVerificationDate: {
      type: String,
      default: "not required",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "hotelier",
      requred: true,
    },
    hotels: {
      type: Schema.Types.ObjectId,
      ref: "hotels",
      requred: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const verificationSchema = Joi.object({});

const Verification = model("verifications", hotelsVerification);

module.exports = {
  Verification,
  verificationSchema,
};
