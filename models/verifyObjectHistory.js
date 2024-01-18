const { Schema, model } = require("mongoose");
const Joi = require("joi");

const verifyobjecthistory = Schema(
  {
    objectId: {
      type: Schema.Types.ObjectId,
      ref: "hotels",
    },
    objectName: {
      type: String,
    },
    dateOfDecision: {
      type: String,
    },
    decision: { type: String, default: "in working" },
    verifierID: {
      type: Schema.Types.ObjectId,
      ref: "verifierprofile",
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
