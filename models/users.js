const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
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
    },
    validCode: {
      type: Number,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSignUpSchema = Joi.object({
  lastName: Joi.string().required(),
  firstName: Joi.string().required(),
  email: Joi.string().required(),
  language: Joi.string().required(),
  secretCode: Joi.string().required(),
});

const joiSignInSchema = Joi.object({
  email: Joi.string().required(),
  secretCode: Joi.string().required(),
});

const joiGetCodeSchema = Joi.object({
  email: Joi.string().required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiSignUpSchema,
  joiSignInSchema,
  joiGetCodeSchema,
};
