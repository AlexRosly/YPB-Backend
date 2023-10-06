const { authAgents: ctrl } = require("../../controllers");
const {
  authAgent,
  validation,
  ctrlWrapper,
  createRegistrationCode,
} = require("../../middlewares");
const {
  joiSignUpSchema,
  joiSignInSchema,
  joiGetCodeSchema,
} = require("../../models/agents");
const { joiSchema } = require("../../models/candidate");
const express = require("express");
const router = express.Router();

//create code and send to email for sign up
router.post(
  "/check-candidate",
  validation(joiSchema),
  ctrlWrapper(createRegistrationCode)
);

//registration
router.post("/signUp", validation(joiSignUpSchema), ctrlWrapper(ctrl.signUp));

//create code and send to email for sign in
router.patch(
  "/check-agent",
  validation(joiGetCodeSchema),
  ctrlWrapper(ctrl.checkAgent)
);

//sign in
router.post("/signIn", validation(joiSignInSchema), ctrlWrapper(ctrl.signIn));

//logOut
router.get("/signOut", authAgent, ctrlWrapper(ctrl.logOut));

//delete account of agent
router.patch("/delete-account", authAgent, ctrlWrapper(ctrl.deleteAgent));

//change first name user
router.patch(
  "/change-first-name",
  authAgent,
  ctrlWrapper(ctrl.changeFirstName)
); // додадти auth

//change last name hotelier
router.patch("/change-last-name", authAgent, ctrlWrapper(ctrl.changeLastName));

module.exports = router;
