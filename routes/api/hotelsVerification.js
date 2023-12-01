const { hotelVerification: ctrl } = require("../../controllers");
const {
  validation,
  ctrlWrapper,
  uploadVideo,
  authHotelier,
} = require("../../middlewares");
// const { joiSchema } = require("../../models/hotelsObject");
const express = require("express");
const router = express.Router();

//get document for verifier
router.get("/get-document", ctrlWrapper(ctrl.getDocumentForHotel)); //add check for login verifier

//get location for verification
router.get("/get-location", ctrlWrapper(ctrl.getLocation));

//add documents to hotels and save on server
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

//add point on the map by verifier
router.patch("/add-point-on-the-map", ctrlWrapper(ctrl.addPointOnTheMap)); //add check for login verifier

//add a translation
router.patch("/add-a-translation", ctrlWrapper(ctrl.translateDescription)); // add check for login verifier

//finish verification
router.patch("/finish-verification", ctrlWrapper(ctrl.finishVerification)); //add check for login verifier

module.exports = router;
