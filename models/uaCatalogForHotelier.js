const { Schema, model } = require("mongoose");
const Joi = require("joi");

const uaCatalogForHotelier = Schema(
  {
    language: {
      type: String,
    },
    idLocation: {
      type: String,
    },
    district: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    linkOnPhoto: {
      type: String,
    },
    nameOfpage: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  language: Joi.string().required(),
  idLocation: Joi.string().required(),
  district: Joi.string(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  linkOnPhoto: Joi.string().required(),
});

const UaCatalogForHotelier = model(
  "UaCatalogForHotelier",
  uaCatalogForHotelier
);

module.exports = {
  UaCatalogForHotelier,
  joiSchema,
};
