const { Schema, model } = require("mongoose");
const Joi = require("joi");

const admin = Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    secretCode: {
      type: String,
    },
    createdCode: {
      type: Number,
    },
    validCode: {
      type: Number,
    },
    role: {
      type: String,
      default: "admin",
    },
    isAuth: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const checkAdmin = Joi.object({
  email: Joi.string().required(),
});

const logInAdmin = Joi.object({
  email: Joi.string().required(),
  secretCode: Joi.string().min(6).required(),
});

const Admin = model("admin", admin);

module.exports = {
  Admin,
  checkAdmin,
  logInAdmin,
};
