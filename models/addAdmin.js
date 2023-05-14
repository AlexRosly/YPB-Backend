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
      // required: true,
    },
    createdCode: {
      type: Number,
      // required: true,
    },
    validCode: {
      type: Number,
      // required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
    isAuth: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiAddAdminSchema = Joi.object({
  email: Joi.string().required(),
});

const Admin = model("admin", admin);

module.exports = {
  Admin,
  joiAddAdminSchema,
};
