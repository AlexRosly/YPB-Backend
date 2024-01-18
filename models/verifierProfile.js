const { Schema, model } = require("mongoose");
const Joi = require("joi");

const verifierprofile = Schema(
  {
    profileId: {
      // id of user from DB access to admin
      type: Schema.Types.ObjectId,
      ref: "acsessToAdmin",
      required: [true, "profileId must be exist"],
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
