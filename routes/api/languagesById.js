const { languages: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/language");
const express = require("express");
const router = express.Router();

router.get("/:id", ctrlWrapper(ctrl.getLanguagesById));

module.exports = router;
