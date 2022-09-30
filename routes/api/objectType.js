const { objectType: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/objectType");

const express = require("express");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAllObjectType));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addObjectType));

module.exports = router;
