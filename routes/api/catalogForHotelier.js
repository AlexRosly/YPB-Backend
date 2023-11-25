const { catalogForHotelier: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/uaCatalogForHotelier");

const express = require("express");
const router = express.Router();

//create page
router.post("/", validation(joiSchema), ctrlWrapper(ctrl.createNewPages));

//get all by language
router.get("/", ctrlWrapper(ctrl.getAllHoteilerPages));

//get all by language and url
router.get("/get-by-query", ctrlWrapper(ctrl.getAllByLanguageAndQueryString));

//get pages by languages, decription and districtInternational
router.get(
  "/get-pages-by-three-params",
  ctrlWrapper(ctrl.getPagesByThreeParams)
);

router.get("/get-page-by-six-params", ctrlWrapper(ctrl.getPageBySixParams));

module.exports = router;
