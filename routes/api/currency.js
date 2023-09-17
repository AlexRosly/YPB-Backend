const { currency: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../middlewares");

const express = require("express");
const router = express.Router();

//get Exchange Rate

router.get("/get-exchange-rate", ctrlWrapper(ctrl.getCurrency));

module.exports = router;
