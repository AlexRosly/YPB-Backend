const { Schema, model } = require("mongoose");
const Joi = require("joi");

const hotelsVerification = Schema(
  {
    video: {
      type: String,
      requred: true,
    },
    documents: [{ type: Sting }],
    selfi: { type: String, requred: true },
    link: [{ type: Sting }],
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
