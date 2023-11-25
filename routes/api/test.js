const { test: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");

const express = require("express");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.test));

module.exports = router;
