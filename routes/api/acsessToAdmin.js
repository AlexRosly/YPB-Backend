const { acsessToAdmin: ctrl } = require("../../controllers");
const {
  auth,
  validation,
  ctrlWrapper,
  createRegistrationCode,
} = require("../../middlewares");
const {
  joiSignUpSchema,
  joiSignInSchema,
  joiGetCodeSchema,
} = require("../../models/agents");
const { joiSchema } = require("../../models/candidate");
const express = require("express");
const router = express.Router();

//add email to DB to acsess to admin
router.post("/add-email", validation(joiSchema), ctrlWrapper(ctrl.addNewEmail));

//add to ban email

//chenge ban to active

//change acsess to 4 collection

module.exports = router;
