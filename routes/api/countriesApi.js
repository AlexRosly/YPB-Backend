const { contries: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/country");
const express = require("express");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAllContries));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addCoutry));

router.put("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateCoutry));

router.delete("/:id", ctrlWrapper(ctrl.removeCountry));

module.exports = router;
