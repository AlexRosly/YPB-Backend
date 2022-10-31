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
    // animals: [
    //   {
    //     type: Object,
    //   },
    // ],
    description: {
      type: String,
      minlength: 300,
      maxlength: 700,
      require: [true, "description must be exist"],
    },
    uniqueNumber: {
      type: String,
    },
    // totalSquiere: {
    //   type: Number,
    // },
    // smoking: {
    //   type: Boolean,
    // },
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
  //   animals: [Joi.array()],
  description: Joi.string().min(300).max(500),
  uniqueNumber: Joi.string(),
  //   totalSquiere: Joi.number(),
  //   smoking: Joi.boolean(),
  photos: [Joi.array()],
});

const BookingOptionHs = model("bookingOptionHs", bookingOptionHs);

module.exports = {
  BookingOptionHs,
  joiSchema,
};
