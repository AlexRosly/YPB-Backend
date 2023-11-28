const { hotelsObject: ctrl } = require("../../controllers");
const {
  validation,
  ctrlWrapper,
  uploadVideo,
  authHotelier,
} = require("../../middlewares");
// const { joiSchema } = require("../../models/hotelsObject");
const express = require("express");
const router = express.Router();

router.post(
  "/start-verification",
  authHotelier,
  uploadVideo.fields([
    { name: "video", maxCount: 8 },
    { name: "documents", maxCount: 8 },
    { name: "selfi", maxCount: 8 },
  ]),
  ctrlWrapper(ctrl.startVerification)
);

//add a translation
router.patch("/add-a-translation", ctrlWrapper(ctrl.translateDescription));

module.exports = router;
