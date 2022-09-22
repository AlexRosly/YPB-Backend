const { Schema, model } = require("mongoose");
const Joi = require("joi");

const apartmentObject = Schema(
  {
    status: {
      type: Boolean,
      require: [true, "status must be exist"],
    },
    activeLocationId: {
      type: String,
      require: [true, "activeLocationId must be exist"],
    },
    typeId: {
      type: String,
      require: [true, "typeId must be exist"],
    },
    name: {
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
      mail: { type: String },
      phone: { type: String },
      email: { type: String },
    },
    description: {
      type: String,
      require: [true, "description must be exist"],
    },
    photos: [{ type: String }],
    time: {
      checkin: { type: String },
      checkout: { type: String },
    },
    services: [{ type: String }],
    payments: [{ type: String }],
    locations: {
      type: String,
    },
    activeTabId: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string(),
  status: Joi.string().required(),
  activeLocationId: Joi.string().required(),
  typeId: Joi.string().required(),
  name: Joi.string().required(),
  address: {
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    district: Joi.string().required(),
    street: Joi.string().required(),
    house: Joi.string().required(),
    apartment: Joi.string().required(),
    mail: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
  },
  description: Joi.string().required(),
  photos: [Joi.array().required()],
  time: {
    checkin: Joi.string().required(),
    checkout: Joi.string().required(),
  },
  services: [Joi.array().required()],
  payments: [Joi.array().required()],
  locations: Joi.string().required(),
  activeTabId: Joi.number().required(),
});

const Apartment = model("apartment", apartmentObject);

module.exports = {
  Apartment,
  joiSchema,
};
