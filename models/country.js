const { Schema, model } = require("mongoose");
const Joi = require("joi");

const countrySchema = Schema(
  {
    country: {
      type: String,
      required: [true, "country must be exist"],
      //   match: /^[A-Z][a-z]$/,
    },
    langCode: {
      type: String,
      required: [true, "language code must be exist"],
      match: /^[A-Z]{2}$/,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  country: Joi.string().required(),
  langCode: Joi.string().required(),
});

const Country = model("country", countrySchema);

module.exports = {
  Country,
  joiSchema,
};
