const { Schema, model } = require("mongoose");
const Joi = require("joi");

const bookingOption = Schema(
  {
    type: {
      type: String,
    },
    bedrooms: {
      type: Number,
    },
    detailedBedrooms: {
      firstBedroom: {
        doubleBed: {
          type: Number,
        },
        singleBed: {
          type: Number,
        },
      },
      secondBedroom: {
        doubleBed: {
          type: Number,
        },
        singleBed: {
          type: Number,
        },
      },
      thirdBedroom: {
        doubleBed: {
          type: Number,
        },
        singleBed: {
          type: Number,
        },
      },
      fourthBedroom: {
        doubleBed: {
          type: Number,
        },
        singleBed: {
          type: Number,
        },
      },
    },
    roomServices: [
      {
        type: Object,
      },
    ],
    animals: {
      type: Object,
    },
    description: {
      type: String,
      minlength: 300,
      maxlength: 700,
      require: [true, "description must be exist"],
    },
    uniqueNumber: {
      type: String,
    },
    totalSquare: {
      type: Number,
    },
    smoking: {
      type: Boolean,
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
  type: Joi.string(),
  bedrooms: Joi.number(),
  detailedBedrooms: {
    firstBedroom: {
      doubleBed: Joi.number(),
      singleBed: Joi.number(),
    },
    secondBedroom: {
      doubleBed: Joi.number(),
      singleBed: Joi.number(),
    },
    thirdBedroom: {
      doubleBed: Joi.number(),
      singleBed: Joi.number(),
    },
    fourthBedroom: {
      doubleBed: Joi.number(),
      singleBed: Joi.number(),
    },
  },
  roomServices: [Joi.array()],
  animals: Joi.object(),
  description: Joi.string().min(300).max(500),
  uniqueNumber: Joi.string(),
  totalSquare: Joi.number(),
  smoking: Joi.boolean(),
  photos: [Joi.array()],
});

const BookingOption = model("bookingOption", bookingOption);

module.exports = {
  BookingOption,
  joiSchema,
};
