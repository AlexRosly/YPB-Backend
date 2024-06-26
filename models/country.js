const { Schema, model } = require("mongoose");
const Joi = require("joi");

const countrySchema = Schema(
  {
    international: {
      type: String,
      required: [true, "country must be exist"],
    },
    country: {
      type: String,
      required: [true, "country must be exist"],
    },
    langCode: {
      type: String,
      required: [true, "language code must be exist"],
      match: /^[A-Z]{2}$/,
    },
    dbLangCode: {
      type: String,
    },
    states: [
      {
        type: Schema.Types.ObjectId,
        ref: "regionLoc3",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  international: Joi.string().required(),
  country: Joi.string().required(),
  langCode: Joi.string().required(),
  dbLangCode: Joi.string(),
});

const Country = model("country", countrySchema);

module.exports = {
  Country,
  joiSchema,
};
