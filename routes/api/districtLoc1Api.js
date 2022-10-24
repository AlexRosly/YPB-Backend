const { districtLoc1: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/districtLoc1");
const express = require("express");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAllDistrictLoc1));

router.get("/:id", ctrlWrapper(ctrl.getDistrictById));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addDistrictLoc1));

router.patch(
  "/:id",
  validation(joiSchema),
  ctrlWrapper(ctrl.updateDistrictLoc1)
);

router.delete("/:id", ctrlWrapper(ctrl.removeDistrictLoc1));

// router.post("/insert", validation(joiSchema), ctrlWrapper(ctrl.insertMany));

module.exports = router;
