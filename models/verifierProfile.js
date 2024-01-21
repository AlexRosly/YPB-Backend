const { Schema, model } = require("mongoose");
const Joi = require("joi");

const verifierprofile = Schema(
  {
    verifierId: {
      // id of user from DB access to admin
      type: String,
    },
    email: {
      type: String,
    },
    photos: [{ type: String }],
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  //   profileId: Joi.string().required(),
  email: Joi.string().required(),
  photo: [Joi.array()],
});

const VerifierProfile = model("verifierprofile", verifierprofile);

module.exports = {
  VerifierProfile,
  joiSchema,
};
