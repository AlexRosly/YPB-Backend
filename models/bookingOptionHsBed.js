const { Schema, model } = require("mongoose");
const Joi = require("joi");

const bookingOptionHsBed = Schema(
  {
    typeOfObject: {
      type: String,
      default: "hostel",
    },
    uniqueNumber: {
      type: String,
    },
    bedNumber: {
      type: Number,
    },
    price_1: {
      type: Number,
    },
    price_2: {
      type: Number,
      default: 0,
    },
    availableDate: [],
    notAvailableDate: [],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "hotelier",
      requred: true,
    },
    bookingOptionHs: {
      type: Schema.Types.ObjectId,
      ref: "bookingOptionHs",
      requred: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchemaBookingBed = Joi.object({
  typeOfObject: Joi.string(),
  uniqueNumber: Joi.string(),
  bedNumber: Joi.number(),
  price_1: Joi.number(),
  availableDate: [Joi.array()],
  notAvailableDate: [Joi.array()],
  owner: Joi.string(),
  bookingOptionHs: Joi.string(),
});

const BookingOptionHsBed = model("bookingOptionHsBed", bookingOptionHsBed);

module.exports = {
  BookingOptionHsBed,
  joiSchemaBookingBed,
};
