const { bookingOption: ctrl } = require("../../controllers");
const {
  authHotelier,
  validation,
  ctrlWrapper,
  upload,
} = require("../../middlewares");
const { joiSchema } = require("../../models/bookingOption");
const { joiSchemaBookingBed } = require("../../models/bookingOptionBed");
const express = require("express");
const router = express.Router();

//get all option
router.get("/", ctrlWrapper(ctrl.getBookingOption));

//get option by object id
router.get(
  "/get-by-objectId/:id",
  ctrlWrapper(ctrl.getBookingOptionByObjectId)
);

//create option
router.post(
  "/",
  authHotelier,
  upload.array("image"),
  validation(joiSchema),
  ctrlWrapper(ctrl.addBookingOption)
);

//add booking option bed on site
router.post(
  "/add-bed",
  authHotelier,
  validation(joiSchemaBookingBed),
  ctrlWrapper(ctrl.addBookingOptionBed)
);

//update booking option bed on site
router.patch(
  "/update-price",
  authHotelier,
  ctrlWrapper(ctrl.updateBookingOptionBed)
);

//update option
router.patch(
  "/:id",
  authHotelier,
  validation(joiSchema),
  ctrlWrapper(ctrl.updateBookingOption)
);

module.exports = router;
