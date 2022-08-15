const { cityLoc2: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/cityLoc2");
const express = require("express");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAllCityLoc2));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addCityAllLoc2));

router.patch("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateCityLoc2));

router.delete("/:id", ctrlWrapper(ctrl.removeCityLoc2));

module.exports = router;
