// const sendEmail = require("./sendEmail");
const transporter = require("./nodemailer");
const currency = require("./currency");
const createPageObject = require("./pageCatalog");
const secretCodeForAdmin = require("./secretCodeForAdmin");
const standardInEnglish = require("./pageCatalog");

module.exports = {
  transporter,
  currency,
  createPageObject,
  secretCodeForAdmin,
  standardInEnglish,
};
