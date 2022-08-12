const { Schema, model } = require("mongoose");
const Joi = require("joi");

const regionLoc3Schema = Schema(
  {
    stateName: {
      type: String,
      required: [true, "state Name must be exist"],
    },
    stateInternational: {
      type: String,
      required: [true, "state International must be exist"],
    },
    stateCode: {
      type: String,
      required: [true, "state code must be exist"],
    },
    international: {
      type: String,
      required: [true, "country International must be exist"],
    },
    // edited: {
    //   type: Number,
    // },
    langCode: {
      type: String,
      required: [true, "code must be exist"],
      match: /^[A-Z]{2}$/,
    },
    dbLangCode: {
      type: String,
    },
    statePhotoURL: {
      type: String,
    },
    countryId: {
      type: String,
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: "country",
    },
    cities: [
      {
        type: Schema.Types.ObjectId,
        ref: "cityLoc2",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  stateName: Joi.string().required(),
  stateInternational: Joi.string().required(),
  stateCode: Joi.string().required(),
  international: Joi.string().required(),
  // edited: Joi.number(),
  statePhotoURL: Joi.string(),
  langCode: Joi.string().required(),
  countryId: Joi.string().required(),
  dbLangCode: Joi.string(),
});

const Region = model("regionLoc3", regionLoc3Schema);

module.exports = {
  Region,
  joiSchema,
};
