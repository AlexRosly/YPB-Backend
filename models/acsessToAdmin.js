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
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  email: Joi.string().required(),
  access: Joi.array().required(),
});

const AcsessToAdmin = model("acsessToAdmin", acsessToAdmin);

module.exports = {
  AcsessToAdmin,
  joiSchema,
};
