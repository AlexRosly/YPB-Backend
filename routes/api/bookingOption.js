const { bookingOption: ctrl } = require("../../controllers");
const { auth, validation, ctrlWrapper, upload } = require("../../middlewares");
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
  auth,
  upload.array("image"),
  validation(joiSchema),
  ctrlWrapper(ctrl.addBookingOption)
);

//add booking option bed on site
router.post(
  "/add-bed",
  validation(joiSchemaBookingBed),
  ctrlWrapper(ctrl.addBookingOptionBed)
);

//update option
router.patch(
  "/:id",
  validation(joiSchema),
  ctrlWrapper(ctrl.updateBookingOption)
);

router.put("/update-price", ctrlWrapper(ctrl.updateBookingOptionBed));

module.exports = router;
