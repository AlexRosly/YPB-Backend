const { Schema, model } = require("mongoose");
const Joi = require("joi");

const hotelsVerification = Schema(
  {
    video: [{ type: String }],
    documents: [{ type: String }],
    selfi: [{ type: String }],
    link: [{ type: String }],
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
