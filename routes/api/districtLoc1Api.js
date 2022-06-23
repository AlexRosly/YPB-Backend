const { districtLoc1: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/regionLoc3");
const express = require("express");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAllDistrictLoc1));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addDistrictLoc1));

router.put("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateDistrictLoc1));

router.delete("/:id", ctrlWrapper(ctrl.removeDistrictLoc1));

module.exports = router;
