const { Schema, model } = require("mongoose");
const Joi = require("joi");

const bookingOption = Schema(
  {
    typeOfObject: {
      type: String,
    },
    bedrooms: {
      fistBedroom: {
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
    animals: [
      {
        type: String,
        default: "With out anaimals",
      },
    ],
    description: {
      type: String,
      minlength: 3,
      maxlength: 700,
      require: [true, "description must be exist"],
    },
    uniqueNumber: {
      type: String,
    },
    totalSquiere: {
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
  typeOfObject: Joi.string(),
  bedrooms: {
    fistBedroom: {
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
  animals: [Joi.array()],
  description: Joi.string().min(3).max(500),
  uniqueNumber: Joi.string(),
  totalSquiere: Joi.number(),
  smoking: Joi.boolean(),
  photos: [Joi.array()],
});

const BookingOption = model("bookingOption", bookingOption);

module.exports = {
  BookingOption,
  joiSchema,
};
