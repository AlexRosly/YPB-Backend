const { Schema, model } = require("mongoose");
const Joi = require("joi");

const districtLoc1Schema = Schema({
  districtName: {
    type: String,
    required: [true, "district must be exist"],
  },
  districtInternational: {
    type: String,
    required: [true, "district must be exist"],
  },
  districtCode: {
    type: String,
  },
  districtPhotoURL: {
    type: String,
  },
});

const District = model("districtLoc1", districtLoc1Schema);

module.exports = {
  District,
};
