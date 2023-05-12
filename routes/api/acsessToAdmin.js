const { acsessToAdmin: ctrl } = require("../../controllers");
const {
  //   auth,
  validation,
  ctrlWrapper,
  //   createRegistrationCode,
} = require("../../middlewares");
const { joiAddAdminSchema } = require("../../models/addAdmin");
// const { joiSchema } = require("../../models/candidate");
const express = require("express");
const router = express.Router();

//add new admin
router.post(
  "/add-new-admin",
  //   validation(joiAddAdminSchema),
  ctrlWrapper(ctrl.addAdmin)
);

//check admin and send code
router.post("/check-admin", ctrlWrapper(ctrl.checkAdmin));

//log In admin
router.post("/log-in-admin");

//add email to DB to acsess to admin
// router.post("/add-email", validation(joiSchema), ctrlWrapper(ctrl.addNewEmail));

//add to ban email

//chenge ban to active

//change acsess to 4 collection

module.exports = router;
