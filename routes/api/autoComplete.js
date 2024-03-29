const { autoComplete: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const express = require("express");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.autoComplete));

router.get("/get-all-city", ctrlWrapper(ctrl.getAllCity));

router.get(
  "/get-city-for-main-hotelier",
  ctrlWrapper(ctrl.getCityForMainForHotelier)
);

router.get(
  "/get-city-for-create-object",
  ctrlWrapper(ctrl.getCityForCreateObject)
);

router.get(
  "/get-city-for-catalog-hotelier",
  ctrlWrapper(ctrl.autoCompleteForCatalogHotelier)
);

router.get(
  "/get-district-for-catalog-hotelier",
  ctrlWrapper(ctrl.getDistrictForCatalogHotelier)
);

module.exports = router;
