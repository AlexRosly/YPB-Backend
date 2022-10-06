const { Schema, model } = require("mongoose");
const Joi = require("joi");

const hotelsObject = Schema(
  {
    language: {
      type: String,
      require: [true, "status must be exist"],
    },
    status: {
      type: String,
      enum: ["on verification", "active", "not active", "deleted"],
      default: "on verification",
    },
    // activeLocationId: {
    //   type: String,
    //   require: [true, "activeLocationId must be exist"],
    // },
    type: {
      type: {
        type: String,
        require: [true, "type must be exist"],
      },
      stars: {
        type: String,
      },
    },
    objectName: {
      type: String,
      require: [true, "name must be exist"],
    },
    address: {
      country: { type: String },
      state: { type: String },
      city: { type: String },
      district: { type: String },
      street: { type: String },
      house: { type: String },
      apartment: { type: String },
      zipCode: { type: String },
      phone: { type: String },
      email: { type: String },
    },
    description: {
      type: String,
      // minlength: 300,
      require: [true, "description must be exist"],
    },
    photos: [{ type: String }],
    time: {
      checkin: { type: String },
      checkout: { type: String },
    },
    services: [{ type: Object }],
    payments: [{ type: Object }],
    district: {
      type: String,
      require: [true, "district must be exist"],
    },
    city: {
      type: String,
      require: [true, "city must be exist"],
    },
    state: {
      type: String,
      require: [true, "state must be exist"],
    },
    country: {
      type: String,
      require: [true, "country must be exist"],
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  language: Joi.string().required(),
  status: Joi.string(),
  // activeLocationId: Joi.string().required(),
  type: {
    type: Joi.string().required(),
    stars: Joi.string(),
  },
  objectName: Joi.string().required(),
  address: {
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    district: Joi.string(),
    street: Joi.string().required(),
    house: Joi.string().required(),
    apartment: Joi.string(),
    zipCode: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
  },
  description: Joi.string().max(300).required(),
  photos: [Joi.array().required()],
  time: {
    checkin: Joi.string().required(),
    checkout: Joi.string().required(),
  },
  services: [Joi.array().required()],
  payments: [Joi.array().required()],
  district: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
});

const Hotels = model("hotels", hotelsObject);

module.exports = {
  Hotels,
  joiSchema,
};
