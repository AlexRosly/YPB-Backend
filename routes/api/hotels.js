const { hotelsObject: ctrl } = require("../../controllers");
const { auth, validation, ctrlWrapper, upload } = require("../../middlewares");
const {
  joiSchema,
  addPhoneAndDateSchema,
} = require("../../models/hotelsObject");
const express = require("express");
const router = express.Router();

//get all hotels
router.get("/", ctrlWrapper(ctrl.getAllHotels));

//get hotel by id
router.get("/:id", ctrlWrapper(ctrl.getHotelById));

router.get(
  "/get-hotels-by-id-hotelier/:id",
  ctrlWrapper(ctrl.getHotelsByHotelierId)
);

//add hotel/object
router.post(
  "/",
  auth,
  upload.array("image"),
  validation(joiSchema),
  ctrlWrapper(ctrl.addHotel)
);

//change hotel/object
router.patch(
  "/:id",
  upload.array("image"),
  validation(joiSchema),
  ctrlWrapper(ctrl.updateHotel)
);

//update verification data. Add phone and date of next verification
router.patch(
  "/add-phone-and-date-for-verification/:id",
  validation(addPhoneAndDateSchema),
  ctrlWrapper(ctrl.addPhoneAndDateVerification)
);

module.exports = router;
