const { paymentMethod: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/paymentMethod");

const express = require("express");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAllPaymentMethod));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addPaymentMethod));

module.exports = router;
