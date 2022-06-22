const { Schema, model } = require("mongoose");
const Joi = require("joi");

const cityLoc2Schema = Schema(
  {
    city: {
      type: String,
      required: [true, "city must be exist"],
    },
    location: {
      type: String,
      required: [true, "location must be exist"],
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
    region: {
      type: Schema.Types.ObjectId,
      ref: "regionLoc3",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  city: Joi.string().required(),
  location: Joi.string().required(),
  langCode: Joi.string().required(),
  dbLangCode: Joi.string().required(),
  urlAdress: Joi.string(),
});

const City = model("cityLoc2", cityLoc2Schema);

module.exports = {
  City,
  joiSchema,
};
