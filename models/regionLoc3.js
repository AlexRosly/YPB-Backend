const { Schema, model } = require("mongoose");
const Joi = require("joi");

const regionLoc3Schema = Schema(
  {
    stateName: {
      type: String,
      required: [true, "region must be exist"],
    },
    stateInternational: {
      type: String,
      required: [true, "region must be exist"],
    },
    stateCode: {
      type: String,
      required: [true, "state code must be exist"],
    },
    edited: {
      type: Number,
    },

    // country: {
    //   type: String,
    //   required: [true, "country must be exist"],
    // },
    // location: {
    //   type: String,
    // },
    langCode: {
      type: String,
      required: [true, "code must be exist"],
      match: /^[A-Z]{2}$/,
    },
    // dbLangCode: {
    //   type: String,
    // },
    statePhotoURL: {
      type: String,
    },
    // country: {
    //   type: Schema.Types.ObjectId,
    //   ref: "country",
    //   required: true,
    // },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  stateName: Joi.string().required(),
  stateInternational: Joi.string().required(),
  stateCode: Joi.string().required(),
  edited: Joi.number(),
  statePhotoURL: Joi.string(),
});

const Region = model("regionLoc3", regionLoc3Schema);

module.exports = {
  Region,
  joiSchema,
};
