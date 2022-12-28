const { modelNames } = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const { NODEMAILER_PASS } = process.env;

const nodemailerConfig = {
  //   host: "smtp.meta,ua",
  //   port: 435, //25, 465, 2255
  //   secure: true,
  service: "gmail",
  auth: {
    user: "yourpricebooking@gmail.com", // from send email
    pass: NODEMAILER_PASS,
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
