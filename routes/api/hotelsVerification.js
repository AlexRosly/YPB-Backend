const { hotelVerification: ctrl } = require("../../controllers");
const {
  validation,
  ctrlWrapper,
  uploadVideo,
  authHotelier,
  authAdmin,
} = require("../../middlewares");
// const { joiSchema } = require("../../models/hotelsObject");
const express = require("express");
const router = express.Router();

//get document for verifier
router.get("/get-document", ctrlWrapper(ctrl.getDocumentForHotel)); //add check for login verifier

//get location for verification
router.get("/get-location", ctrlWrapper(ctrl.getLocation)); //add check for login verifier

//add documents to hotels and save on server
router.post(
  "/start-verification",
  authHotelier,
  uploadVideo.fields([
    { name: "video", maxCount: 8 },
    { name: "documents", maxCount: 8 },
    { name: "selfie", maxCount: 8 },
  ]),
  ctrlWrapper(ctrl.startVerification)
);

//update documents - add additional documents
router.patch(
  "/add-additional-documents",
  authHotelier,
  uploadVideo.fields([
    { name: "video", maxCount: 8 },
    { name: "documents", maxCount: 8 },
    { name: "selfi", maxCount: 8 },
  ]),
  ctrlWrapper(ctrl.updateDocument)
);

//add point on the map by verifier
router.patch(
  "/add-point-on-the-map",
  authAdmin,
  ctrlWrapper(ctrl.addPointOnTheMap)
); //add check for login verifier

//add link on youTube
router.patch("/add-you-tube-link", authAdmin, ctrlWrapper(ctrl.addYouTubeLink)); // add check for login verifier

//add a translation
router.patch(
  "/add-a-translation",
  authAdmin,
  ctrlWrapper(ctrl.translateDescription)
); // add check for login verifier

//finish verification
router.patch(
  "/finish-verification",
  authAdmin,
  ctrlWrapper(ctrl.finishVerification)
); //add check for login verifier

//delete hotels, documents and virify object
router.delete(
  "/delete-verification",
  authAdmin,
  ctrlWrapper(ctrl.deleteObjectAndDocuments)
); //add check for login verifier

//delete hotels
router.delete("/delete-object", authAdmin, ctrlWrapper(ctrl.deleteAddedObject)); //add check for login verifier

module.exports = router;
