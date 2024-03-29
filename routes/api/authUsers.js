const { authUsers: ctrl } = require("../../controllers");
const {
  authUser,
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
router.get("/signOut", authUser, ctrlWrapper(ctrl.logOut));

//delete account of user
router.patch("/delete-account", authUser, ctrlWrapper(ctrl.deleteUser));

//change first name user
router.patch("/change-first-name", authUser, ctrlWrapper(ctrl.changeFirstName)); // додадти auth

//change last name hotelier
router.patch("/change-last-name", authUser, ctrlWrapper(ctrl.changeLastName)); // додадти auth,

module.exports = router;
