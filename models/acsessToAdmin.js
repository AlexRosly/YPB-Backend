const { Schema, model } = require("mongoose");
const Joi = require("joi");

const acsessToAdmin = Schema(
  {
    email: {
      type: String,
      required: true,
    },
    access: [{ type: String }],
    status: {
      type: String,
      default: "active",
    },
    role: {
      type: String,
      default: "admin",
    },
    secretCode: {
      type: String,
    },
    createdCode: {
      type: Number,
      default: 0,
    },
    validCode: {
      type: Number,
      default: 0,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  email: Joi.string().required(),
  access: Joi.array().required(),
});

const joiStatus = Joi.object({
  email: Joi.string().required(),
  status: Joi.string().required(),
});

const joiAccess = Joi.object({
  email: Joi.string().required(),
  access: Joi.array().required(),
});

// const checkAdmin = Joi.object({
//   email: Joi.string().required(),
// });

// const logInAdmin = Joi.object({
//   email: Joi.string().required(),
//   secretCode: Joi.string().min(6).required(),
// });

const AcsessToAdmin = model("acsessToAdmin", acsessToAdmin);

module.exports = {
  AcsessToAdmin,
  joiSchema,
  joiStatus,
  joiAccess,
};
