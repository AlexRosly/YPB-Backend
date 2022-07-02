const { Schema, model } = require("mongoose");
const Joi = require("joi");

const cityLoc2Schema = Schema(
  {
    stateId: {
      type: String,
      require: [true, "state Id must be exist"],
    },
    cityName: {
      type: String,
      required: [true, "city Name must be exist"],
    },
    cityInternational: {
      type: String,
      required: [true, "city International Name must be exist"],
    },
    cityCode: {
      type: String,
      required: [true, "city code must be exist"],
    },
    cityPhotoURL: {
      type: String,
    },
    edited: {
      type: Number,
    },
    // langCode: {
    //   type: String,
    //   required: [true, "code must be exist"],
    //   match: /^[A-Z]{2}$/,
    // },
    // dbLangCode: {
    //   type: String,
    // },
    state: {
      type: Schema.Types.ObjectId,
      ref: "regionLoc3",
      required: true,
    },
    districts: [
      {
        type: Schema.Types.ObjectId,
        ref: "districtLoc1",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  stateId: Joi.string().required(),
  cityName: Joi.string().required(),
  cityInternational: Joi.string().required(),
  cityCode: Joi.string().required(),
  cityPhotoURL: Joi.string(),
  edited: Joi.number(),
});

const City = model("cityLoc2", cityLoc2Schema);

module.exports = {
  City,
  joiSchema,
};
