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

// router.get("/", ctrlWrapper(ctrl.getAllHotels));

// router.get("/:id", ctrlWrapper(ctrl.getHotelById));

// router.post(
//   "/",
//   upload.array("image"),
//   validation(joiSchema),
//   ctrlWrapper(ctrl.addHotel)
// );
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
// router.post("/", uploadVideo.single("video"), async (req, res) => {
//   console.log(req.file);
// });

//add a translation
router.patch("/add-a-translation", ctrlWrapper(ctrl.translateDescription));

//
// router.patch(
//   "/:id",
//   uploadVideo.single("video"),
//   ctrlWrapper(ctrl.hotelsVerificationVideo)
// );

module.exports = router;
