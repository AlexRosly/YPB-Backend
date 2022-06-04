const { languages: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/language");
const express = require("express");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAllLanguages));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addLanguage));

router.put("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateLanguage));

router.delete("/:id", ctrlWrapper(ctrl.removeLanguage));

module.exports = router;
