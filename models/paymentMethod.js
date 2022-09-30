const { Schema, model } = require("mongoose");
const Joi = require("joi");

const paymentMethod = Schema(
  {
    langCode: {
      type: String,
      require: [true, "status must be exist"],
    },
    payments: [
      {
        id: { type: String },
        type: { type: String },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  langCode: Joi.string().required(),
  payments: [Joi.array()],
});

const Payments = model("paymentMethod", paymentMethod);

module.exports = {
  Payments,
  joiSchema,
};
