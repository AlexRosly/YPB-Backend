const { Schema, model } = require("mongoose");
const Joi = require("joi");

const candidatesSchema = Schema(
  {
    lastName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    language: {
      type: String,
    },
    secretCode: {
      type: String,
      required: true,
    },
    createdCode: {
      type: Number,
      required: true,
    },
    validCode: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  lastName: Joi.string().required(),
  firstName: Joi.string().required(),
  email: Joi.string().required(),
  language: Joi.string(),
});

const Candidate = model("candidate", candidatesSchema);

module.exports = {
  Candidate,
  joiSchema,
};
