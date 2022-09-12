const { Schema, model } = require("mongoose");
const Joi = require("joi");

const districtLoc1Schema = Schema(
  {
    stateId: {
      type: String,
      require: [true, "state Id must be exist"],
    },
    cityId: {
      type: String,
      require: [true, "city Id must be exist"],
    },
    districtName: {
      type: String,
      required: [true, "district Name must be exist"],
    },
    districtInternational: {
      type: String,
      required: [true, "district International must be exist"],
    },
    districtCode: {
      type: String,
      required: [true, "district code must be exist"],
    },
    districtPhotoURL: {
      type: String,
    },
    districtPhotoAlt: {
      type: String,
    },
    cityInternational: {
      type: String,
    },
    cityCode: {
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
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  stateId: Joi.string().required(),
  cityId: Joi.string().required(),
  districtName: Joi.string().required(),
  districtInternational: Joi.string().required(),
  districtCode: Joi.string().required(),
  districtPhotoURL: Joi.string(),
  districtPhotoAlt: Joi.string(),
  cityInternational: Joi.string().required(),
  langCode: Joi.string().required(),
  dbLangCode: Joi.string(),
});

const District = model("districtLoc1", districtLoc1Schema);

module.exports = {
  District,
  joiSchema,
};
