const { Schema, model } = require("mongoose");
const Joi = require("joi");

const bookingOptionHs = Schema(
  {
    typeOfObject: {
      type: String,
      default: "hostel",
    },
    bedInRoom: {
      type: Number,
    },
    bedAddSite: {
      type: Number,
    },
    roomServices: [
      {
        type: Object,
      },
    ],
    description: {
      type: String,
      minlength: 300,
      maxlength: 700,
      require: [true, "description must be exist"],
    },
    uniqueNumber: {
      type: String,
    },
    photos: [
      {
        id: { type: String },
        url: { type: String },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  typeOfObject: Joi.string(),
  bedInRoom: Joi.number(),
  bedAddSite: Joi.number(),
  roomServices: [Joi.array()],
  description: Joi.string().min(300).max(500),
  uniqueNumber: Joi.string(),
  photos: [Joi.array()],
});

const BookingOptionHs = model("bookingOptionHs", bookingOptionHs);

module.exports = {
  BookingOptionHs,
  joiSchema,
};
