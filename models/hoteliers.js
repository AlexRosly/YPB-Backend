const { Schema, model } = require("mongoose");
const Joi = require("joi");

const hotelierSchema = Schema(
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
      required: true,
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
    status: {
      type: String,
      default: "active",
    },
    currency: {
      bonus: { type: Number, default: 0 },
      money: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },
  },
  { versionKey: false, timeStamps: true }
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

const Hotelier = model("hotelier", hotelierSchema);

module.exports = {
  Hotelier,
  joiSignUpSchema,
  joiSignInSchema,
  joiGetCodeSchema,
};
