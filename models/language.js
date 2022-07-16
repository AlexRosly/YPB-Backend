const { Schema, model } = require("mongoose");
const Joi = require("joi");

const languageSchema = Schema(
  {
    lang: {
      type: String,
      required: [true, "language must be exist"],
    },
    code: {
      type: String,
      required: [true, "language code must be exist"],
      match: /^[A-Z]{2}$/,
    },
    // countries: {
    //   type: Array,
    //   required: [true, "countries must be exsist"],
    // },
    countries: [
      {
        type: Schema.Types.ObjectId,
        ref: "country",
      },
    ],
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
  lang: Joi.string().required(),
  code: Joi.string().required(),
  // countries: Joi.array().required(),
});

const Language = model("language", languageSchema);

module.exports = {
  Language,
  joiSchema,
};
