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

module.exports = router;
