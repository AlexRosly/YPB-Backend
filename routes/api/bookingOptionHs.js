const { bookingOption: ctrl } = require("../../controllers");
const { auth, validation, ctrlWrapper, upload } = require("../../middlewares");
// const cloudinary = require("../../utils/cloudinary");
const { joiSchema } = require("../../models/bookingOptionHs");
const express = require("express");
const router = express.Router();

//get all option
router.get("/", ctrlWrapper(ctrl.getBookingOptionHs));

//create option
router.post(
  "/",
  auth,
  upload.array("image"),
  validation(joiSchema),
  ctrlWrapper(ctrl.addBookingOptionHs)
);

//update option
router.patch(
  "/:id",
  validation(joiSchema),
  ctrlWrapper(ctrl.updateBookingOptionHs)
);

//get option by object id
router.get(
  "/get-by-objectId/:id",
  ctrlWrapper(ctrl.getBookingOptionHsByObjectId)
);

module.exports = router;
