const { Schema, model } = require("mongoose");
const Joi = require("joi");

const apartmentObject = Schema({
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
    country: String,
    state: String,
    city: String,
    district: String,
    street: String,
    house: String,
    apartment: String,
    mail: String,
    phone: String,
    email: String,
  },
  description: {
    type: String,
    require: [true, "description must be exist"],
  },
  photos: [String],
  time: {
    checkin: String,
    checkout: String,
  },
  services: [String],
  payments: [String],
  locations: {
    type: String,
  },
  activeTabId: {
    type: Number,
  },
});

const joiSchema = Joi.object({
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
  photos: [Joi.string().required()],
  time: {
    checkin: Joi.string().required(),
    checkout: Joi.string().required(),
  },
  services: [Joi.string().required()],
  payments: [Joi.string().required()],
  locations: Joi.string().required(),
  activeTabId: Joi.number().required(),
});

const Apartment = model("apartment", apartmentObject);

module.exports = {
  Apartment,
  joiSchema,
};
