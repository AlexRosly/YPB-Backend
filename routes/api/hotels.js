const { hotelsObject: ctrl } = require("../../controllers");
const { validation, ctrlWrapper, upload } = require("../../middlewares");
const { joiSchema } = require("../../models/hotelsObject");
const express = require("express");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAllHotels));

router.get("/:id", ctrlWrapper(ctrl.getHotelById));

router.post(
  "/",
  upload.array("image"),
  validation(joiSchema),
  ctrlWrapper(ctrl.addHotel)
);

router.patch("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateHotel));

// router.delete("/:id", ctrlWrapper(ctrl.removeDistrictLoc1));

module.exports = router;
