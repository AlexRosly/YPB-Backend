const { Schema, model } = require("mongoose");
const Joi = require("joi");

const hotelsObject = Schema(
  {
    language: {
      type: String,
    },
    status: {
      type: String,
      enum: ["on verification", "active", "not active", "deleted"],
      default: "on verification",
    },
    type: {
      type: Object,
    },
    objectName: {
      type: String,
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
      minlength: 300,
      maxlength: 700,
      require: [true, "description must be exist"],
    },
    photos: [
      {
        id: { type: String },
        url: { type: String },
      },
    ],
    video: [{ type: String }],
    mapLink: { type: String },
    time: {
      checkin: { type: String },
      checkout: { type: String },
    },
    services: [{ type: Object }],
    payments: [{ type: Object }],
    location: {
      districtName: {
        districtName_1: {
          type: String,
        },
        districtName_2: {
          type: String,
        },
        districtName_3: {
          type: String,
        },
      },
      cityName: {
        type: String,
      },
      stateName: {
        type: String,
      },
      country: {
        type: String,
      },
      _id: {
        type: String,
      },
    },
    // documents: {
    //   type: String,
    // },
    // usersSelfi: {
    //   type: String,
    // }
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  language: Joi.string(),
  status: Joi.string(),
  type: Joi.object(),
  objectName: Joi.string(),
  address: {
    country: Joi.string(),
    state: Joi.string(),
    city: Joi.string(),
    district: Joi.string(),
    street: Joi.string(),
    house: Joi.string(),
    apartment: Joi.string(),
    zipCode: Joi.string(),
    phone: Joi.string(),
    email: Joi.string(),
  },
  description: Joi.string().min(300).max(700),
  photos: [Joi.array()],
  video: [Joi.array()],
  mapLink: Joi.string(),
  time: {
    checkin: Joi.string(),
    checkout: Joi.string(),
  },
  services: [Joi.array()],
  payments: [Joi.array()],
  location: {
    districtName: {
      districtName_1: Joi.string(),
      districtName_2: Joi.string(),
      districtName_3: Joi.string(),
    },
    cityName: Joi.string(),
    stateName: Joi.string(),
    country: Joi.string(),
    _id: Joi.string(),
  },
  documents: Joi.string(),
  usersSelfi: Joi.string(),
});

const Hotels = model("hotels", hotelsObject);

module.exports = {
  Hotels,
  joiSchema,
};
