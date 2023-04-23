const { catalogForHotelier: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/uaCatalogForHotelier");

const express = require("express");
const router = express.Router();

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.createNewPages));

router.get("/", ctrlWrapper(ctrl.getAllHoteilerPages));

module.exports = router;
