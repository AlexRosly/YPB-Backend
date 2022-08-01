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
      //   match: /^[A-Z][a-z]$/,
    },
    langCode: {
      type: String,
      required: [true, "language code must be exist"],
      match: /^[A-Z]{2}$/,
    },
    dbLangCode: {
      type: String,
    },
    stateId: {
      type: String,
    },
    states: [
      {
        type: Schema.Types.ObjectId,
        ref: "regionLoc3",
        required: true,
      },
    ],
  }
  // { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  international: Joi.string().required(),
  country: Joi.string().required(),
  langCode: Joi.string().required(),
  dbLangCode: Joi.string(),
  stateId: Joi.string().required(),
});

const Country = model("country", countrySchema);

module.exports = {
  Country,
  joiSchema,
};
