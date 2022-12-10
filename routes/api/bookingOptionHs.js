const { bookingOption: ctrl } = require("../../controllers");
const { validation, ctrlWrapper, upload } = require("../../middlewares");
// const cloudinary = require("../../utils/cloudinary");
const { joiSchema } = require("../../models/bookingOptionHs");
const express = require("express");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getBookingOptionHs));

router.post(
  "/",
  upload.array("image"),
  validation(joiSchema),
  ctrlWrapper(ctrl.addBookingOptionHs)
);

router.patch(
  "/:id",
  validation(joiSchema),
  ctrlWrapper(ctrl.updateBookingOptionHs)
);

module.exports = router;
