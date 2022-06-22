const { regionLoc3: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/regionLoc3");
const express = require("express");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAllRegionLoc3));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addRegionLoc3));

router.put("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateRegionLoc3));

module.exports = router;
