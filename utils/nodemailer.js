const { modelNames } = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const { NODEMAILER_PASS, NODEMAILER_PASS1 } = process.env;

const nodemailerConfig = {
  // host: "smtp.meta,ua",
  // port: 435, //25, 465, 2255
  // secure: true,
  // service: "gmail",
  // auth: {
  //   user: "yourpricebooking@gmail.com", // from send email
  //   pass: NODEMAILER_PASS,
  // },
  host: "ypbooking.chost.com.ua",
  // port: 465,
  // secure: true,
  // host: "mail.yourpricebooking.com",
  port: 465,
  secure: true,
  // dkim: {
  //   domainName: "yourpricebooking.com",
  //   keySelector: "mail",
  //   privateKey:
  //     "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDIgbNo1oiGx6ccC53Xm+9gIgrIoQ8sFoAdCX5OLYLk5eTmBgipmM+2selYbOFX5YwTsvm5Zl6quzmG7Hu0g56AU3+l7S2LVp1MU/PbBFHIYbacaLUMvjpXe8jUfo5hJZgtX7PuQCMsZ9ua7O5yrZ7uvWoTvaB0zyNP+8n2FZH7UwIDAQAB",
  // },

  auth: {
    user: "noreply@yourpricebooking.com", // from send email
    pass: NODEMAILER_PASS1,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

//export transporter to controller. For send email need call transporter.sendEmail();

//   const mail = {
//     to: email,
//     subject: "Confirmation code",
//     html: `<p>Your confirmation code ${secretCode}.</p><br/><p>Attention code valid only 2 minutes</p>`,
//   };
//transporter.sendEmail(mail)
//.then(()=>console.log("Email send"))
//.catch(error => console.log(error.message));

module.exports = transporter;
