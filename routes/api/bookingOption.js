const { bookingOption: ctrl } = require("../../controllers");
const { validation, ctrlWrapper, upload } = require("../../middlewares");
const { joiSchema } = require("../../models/bookingOption");
const express = require("express");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getBookingOption));

router.post(
  "/",
  upload.array("image"),
  validation(joiSchema),
  ctrlWrapper(ctrl.addBookingOption)
);

router.patch(
  "/:id",
  validation(joiSchema),
  ctrlWrapper(ctrl.updateBookingOption)
);

module.exports = router;
