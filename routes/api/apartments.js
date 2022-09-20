const { apartmentObject: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/apartmentObject");
const express = require("express");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAllApartment));

// router.get("/:id", ctrlWrapper(ctrl.getDistrictById));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addApartment));

router.patch("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateApartment));

// router.delete("/:id", ctrlWrapper(ctrl.removeDistrictLoc1));

module.exports = router;
