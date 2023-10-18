const { Schema, model } = require("mongoose");
const Joi = require("joi");

const bookingOptionBed = Schema(
  {
    typeOfObject: {
      type: String,
    },
    uniqueNumber: {
      type: String,
    },
    bedrooms: {
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
    reservedWithoutOurService: [],
    reservedOnOurService: [],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "hotelier",
      requred: true,
    },
    bookingOption: {
      type: Schema.Types.ObjectId,
      ref: "bookingOption",
      requred: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchemaBookingBed = Joi.object({
  typeOfObject: Joi.string(),
  uniqueNumber: Joi.string(),
  bedrooms: Joi.number(),
  price_1: Joi.number(),
  availableDate: [Joi.array()],
  reservedWithoutOurService: [Joi.array()],
  reservedOnOurService: [Joi.array()],
  owner: Joi.string(),
  bookingOption: Joi.string(),
});

const BookingOptionBed = model("bookingOptionBed", bookingOptionBed);

module.exports = {
  BookingOptionBed,
  joiSchemaBookingBed,
};
