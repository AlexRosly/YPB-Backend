const { services: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/services");

const express = require("express");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAllServices));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addServices));

module.exports = router;
