const { Schema, model } = require("mongoose");
const Joi = require("joi");

const objectType = Schema(
  {
    langCode: {
      type: String,
      require: [true, "status must be exist"],
    },
    objects: [
      {
        id: { type: String },
        type: { type: String },
        stars: { type: String },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  langCode: Joi.string().required(),
  objects: [Joi.array()],
});

const ObjectType = model("objectType", objectType);

module.exports = {
  ObjectType,
  joiSchema,
};
