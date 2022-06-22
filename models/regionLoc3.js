const { Schema, model } = require("mongoose");
const Joi = require("joi");

const regionLoc3Schema = Schema(
  {
    region: {
      type: String,
      required: [true, "region must be exist"],
    },
    country: {
      type: String,
      required: [true, "country must be exist"],
    },
    location: {
      type: String,
    },
    langCode: {
      type: String,
      required: [true, "code must be exist"],
      match: /^[A-Z]{2}$/,
    },
    dbLangCode: {
      type: String,
    },
    urlAdress: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  region: Joi.string().required(),
  country: Joi.string().required(),
  langCode: Joi.string().required(),
  dbLangCode: Joi.string(),
});

const Region = model("regionLoc3", regionLoc3Schema);

module.exports = {
  Region,
  joiSchema,
};
