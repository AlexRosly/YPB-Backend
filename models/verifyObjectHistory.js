const { Schema, model } = require("mongoose");
const Joi = require("joi");

const verifyobjecthistory = Schema(
  {
    hotels: {
      type: Schema.Types.ObjectId,
      ref: "hotels",
    },
    objectName: {
      type: String,
    },
    dateOfDecision: {
      type: Date,
    },
    getToVerify: {
      type: Date,
    },
    decision: { type: String, default: "in working" },
    verifierId: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  langCode: Joi.string().required(),
  services: [Joi.array()],
});

const VerifyObjectHistory = model("verifyobjecthistory", verifyobjecthistory);

module.exports = {
  VerifyObjectHistory,
  joiSchema,
};
