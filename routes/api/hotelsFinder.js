const { hotelsObject: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../middlewares");
const express = require("express");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.hotelsFinder));

module.exports = router;
