const { bookingOption: ctrl } = require("../../controllers");
const {
  authHotelier,
  validation,
  ctrlWrapper,
  upload,
} = require("../../middlewares");
// const cloudinary = require("../../utils/cloudinary");
const { joiSchema } = require("../../models/bookingOptionHs");
const { joiSchemaBookingBed } = require("../../models/bookingOptionHsBed");
const express = require("express");
const router = express.Router();

//get all option
router.get("/", ctrlWrapper(ctrl.getBookingOptionHs));

//create option
router.post(
  "/",
  authHotelier,
  upload.array("image"),
  validation(joiSchema),
  ctrlWrapper(ctrl.addBookingOptionHs)
);

//get option by object id
router.get(
  "/get-by-objectId/:id",
  ctrlWrapper(ctrl.getBookingOptionHsByObjectId)
);

//add booking option bed on site
router.post(
  "/add-bed",
  validation(joiSchemaBookingBed),
  ctrlWrapper(ctrl.addBookingOptionHsBed)
);

//update booking option bed on site
router.patch("/update-price", ctrlWrapper(ctrl.updateBookingOptionHsBed));

//update option
router.patch(
  "/:id",
  authHotelier,
  validation(joiSchema),
  ctrlWrapper(ctrl.updateBookingOptionHs)
);

module.exports = router;
