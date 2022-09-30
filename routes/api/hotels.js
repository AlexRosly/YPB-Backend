const { hotelsObject: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/hotelsObject");
const express = require("express");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAllHotels));

router.get("/:id", ctrlWrapper(ctrl.getHotelById));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addHotel));

router.patch("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateHotel));

// router.delete("/:id", ctrlWrapper(ctrl.removeDistrictLoc1));

module.exports = router;
