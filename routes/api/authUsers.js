const { authUsers: ctrl } = require("../../controllers");
const {
  auth,
  validation,
  ctrlWrapper,
  createRegistrationCode,
} = require("../../middlewares");
const {
  joiSignInSchema,
  joiSignUpSchema,
  joiGetCodeSchema,
} = require("../../models/users");
const { joiSchema } = require("../../models/candidate");
const express = require("express");
const router = express.Router();

//create code and send to email
router.post(
  "/check-candidate",
  validation(joiSchema),
  ctrlWrapper(createRegistrationCode)
);

//registration
router.post("/signUp", validation(joiSignUpSchema), ctrlWrapper(ctrl.signUp));

//create code and send to email for sign in
router.patch(
  "/check-user",
  validation(joiGetCodeSchema),
  ctrlWrapper(ctrl.checkUser)
);

//sign in
router.post("/signIn", validation(joiSignInSchema), ctrlWrapper(ctrl.signIn));

//logOut
router.get("/signOut", auth, ctrlWrapper(ctrl.logOut));

//delete account of agent
router.patch("/delete-account", ctrlWrapper(ctrl.deleteUser));

module.exports = router;
