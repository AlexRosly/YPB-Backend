const { Schema, model } = require("mongoose");
const Joi = require("joi");

const services = Schema(
  {
    langCode: {
      type: String,
      require: [true, "status must be exist"],
    },
    services: [
      {
        id: { type: String },
        type: { type: String },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  langCode: Joi.string().required(),
  services: [Joi.array()],
});

const Services = model("services", services);

module.exports = {
  Services,
  joiSchema,
};
