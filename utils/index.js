// const sendEmail = require("./sendEmail");
const transporter = require("./nodemailer");
const currency = require("./currency");
const pageCatalog = require("./pageCatalog");

module.exports = { transporter, currency, pageCatalog };
