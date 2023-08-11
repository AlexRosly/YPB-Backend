const { acsessToAdmin: ctrl } = require("../../controllers");
const { authHoteliers: ctrls } = require("../../controllers");
const { authAdmin, validation, ctrlWrapper } = require("../../middlewares");
const { checkAdmin, logInAdmin } = require("../../models/addAdmin");
const {
  joiSchema,
  joiStatus,
  joiAccess,
} = require("../../models/acsessToAdmin");
const express = require("express");
const router = express.Router();

//add new admin
router.post("/add-new-admin", ctrlWrapper(ctrl.addAdmin));

//check admin and send code
router.post(
  "/check-admin",
  validation(checkAdmin),
  ctrlWrapper(ctrl.checkAdmin)
);

//log In admin
router.post(
  "/log-in-admin",
  validation(logInAdmin),
  ctrlWrapper(ctrl.logInAdmin)
);

//log out admin
router.get("/log-out-admin", authAdmin, ctrlWrapper(ctrl.logOutAdmin));

//add email to DB to acsess to admin
router.post(
  "/add-email",
  authAdmin,
  validation(joiSchema),
  ctrlWrapper(ctrl.addNewEmail)
);

//add to ban email and chenge ban to active
router.patch(
  "/change-status",
  authAdmin,
  validation(joiStatus),
  ctrlWrapper(ctrl.changeStatus)
);

//change acsess to 4 collection
router.patch(
  "/change-access",
  authAdmin,
  validation(joiAccess),
  ctrlWrapper(ctrl.changeAccess)
);

//add bonus
router.patch("/add-bonus", authAdmin, ctrlWrapper(ctrl.addBonus));

//get all hotelier
router.get("/get-all-hotelier", authAdmin, ctrlWrapper(ctrls.getAllHotelier));

//get statistic
router.get("/get-statistic", ctrlWrapper(ctrl.getStatistic));

module.exports = router;
