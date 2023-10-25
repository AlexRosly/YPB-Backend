// const sendEmail = require("./sendEmail");
const transporter = require("./nodemailer");
const currency = require("./currency");
const pageCatalog = require("./pageCatalog");
const secretCodeForAdmin = require("./secretCodeForAdmin");

module.exports = { transporter, currency, pageCatalog, secretCodeForAdmin };
