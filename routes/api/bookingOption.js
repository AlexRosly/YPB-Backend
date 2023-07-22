const { bookingOption: ctrl } = require("../../controllers");
const { auth, validation, ctrlWrapper, upload } = require("../../middlewares");
const { joiSchema } = require("../../models/bookingOption");
const express = require("express");
const router = express.Router();

//get all option
router.get("/", ctrlWrapper(ctrl.getBookingOption));

//create option
router.post(
  "/",
  auth,
  upload.array("image"),
  validation(joiSchema),
  ctrlWrapper(ctrl.addBookingOption)
);

//update option
router.patch(
  "/:id",
  validation(joiSchema),
  ctrlWrapper(ctrl.updateBookingOption)
);

//get option by object id

router.get(
  "/get-by-objectId/:id",
  ctrlWrapper(ctrl.getBookingOptionByObjectId)
);

module.exports = router;
