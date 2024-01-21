const { verifier: ctrl } = require("../../controllers");
const {
  validation,
  ctrlWrapper,
  authAdmin,
  uploadVerifierPhoto,
} = require("../../middlewares");
const { joiSchema } = require("../../models/verifierProfile");

const express = require("express");
const router = express.Router();

router.get("/", authAdmin, ctrlWrapper(ctrl.getVerifierProfile));
// create profile of verificator
router.post(
  "/",
  authAdmin,
  uploadVerifierPhoto.array("image"),
  validation(joiSchema),
  ctrlWrapper(ctrl.createVerifierProfile)
);

router.post("/get-to-verify", authAdmin, ctrlWrapper(ctrl.objectOnWork));

module.exports = router;
