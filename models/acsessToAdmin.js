const { Schema } = require("mongoose");
const Joi = require("joi");

const acsessToAdmin = Schema(
  {
    email: {
      type: String,
      required: true,
    },
    acsess: [{ type: String }],
    status: {
      type: String,
      default: "active",
    },
  },
  { versionKey: false, timestamps: true }
);
