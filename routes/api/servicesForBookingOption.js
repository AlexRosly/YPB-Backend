const { bookingServices: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/servicesForBookingOption");

const express = require("express");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getServicesForBookingOption));

router.post(
  "/",
  validation(joiSchema),
  ctrlWrapper(ctrl.addServicesForBookingOption)
);

module.exports = router;
