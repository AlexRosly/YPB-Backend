const { Schema, model } = require("mongoose");
const Joi = require("joi");

const regionLoc3Schema = Schema({
  region: {
    type: String,
    required: [true, "region must be exist"],
  },
  count: {
    type: String,
    required: [true, "country must be exist"],
  },
  code: {
    type: String,
    required: [true, "code must be exist"],
    match: /^[A-Z]{2}$/,
  },
  dbLangCode: {
    type: String,
  },
});

const Region = model("regionLoc3", regionLoc3Schema);

module.exports = {
  Region,
};
