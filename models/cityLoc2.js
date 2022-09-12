const { Schema, model } = require("mongoose");
const Joi = require("joi");

const cityLoc2Schema = Schema(
  {
    stateId: {
      type: String,
      require: [true, "state Id must be exist"],
    },
    cityName: {
      type: String,
      required: [true, "city Name must be exist"],
    },
    cityInternational: {
      type: String,
      required: [true, "city International Name must be exist"],
    },
    cityCode: {
      type: String,
      required: [true, "city code must be exist"],
    },
    cityPhotoURL: {
      type: String,
    },
    cityPhotoAlt: {
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
    stateCode: {
      type: String,
    },
    stateInternational: {
      type: String,
      required: [true, "state International must be exist"],
    },
    state: {
      type: Schema.Types.ObjectId,
      ref: "regionLoc3",
      required: true,
    },
    districts: [
      {
        type: Schema.Types.ObjectId,
        ref: "districtLoc1",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  stateId: Joi.string().required(),
  cityName: Joi.string().required(),
  cityInternational: Joi.string().required(),
  cityCode: Joi.string().required(),
  cityPhotoURL: Joi.string(),
  cityPhotoAlt: Joi.string(),
  stateInternational: Joi.string().required(),
  langCode: Joi.string().required(),
  dbLangCode: Joi.string(),
});

const City = model("cityLoc2", cityLoc2Schema);

module.exports = {
  City,
  joiSchema,
};
