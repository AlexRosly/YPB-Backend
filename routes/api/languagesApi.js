const { languages: ctrl } = require("../../controllers");
const { authAdmin, validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/language");
const express = require("express");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAllLanguages));

router.get("/:id", ctrlWrapper(ctrl.getLanguageById));

router.post(
  "/",
  authAdmin,
  validation(joiSchema),
  ctrlWrapper(ctrl.addLanguage)
);

router.patch(
  "/:id",
  authAdmin,
  validation(joiSchema),
  ctrlWrapper(ctrl.updateLanguage)
);

router.delete("/:id", authAdmin, ctrlWrapper(ctrl.removeLanguage));

module.exports = router;
