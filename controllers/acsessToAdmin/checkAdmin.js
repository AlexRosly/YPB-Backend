const { Admin } = require("../../models");
const { AcsessToAdmin } = require("../../models");
const { transporter } = require("../../utils");
const { secretCodeForAdmin } = require("../../utils");

const checkAdmin = async (req, res) => {
  const { email } = req.body;

  const checkAdmin = await Admin.find({ email });
  const checkUser = await AcsessToAdmin.find({ email });

  if (checkAdmin.length === 0 && checkUser.length === 0) {
    return res
      .status(409)
      .json({
        status: "error",
        code: 409,
        message: "This email does not exist in Admin",
      })
      .end();
  }

  const secretCode = secretCodeForAdmin();
  const createdCode = new Date();
  //Код перевірочний нехай діє 30 хв
  const validCode = createdCode.getTime() + 1800000; //after developer FE part by Bozhena change validCode
  // const validCode = createdCode.getTime() + 60000;

  if (checkAdmin.length > 0 && checkAdmin[0].validCode > createdCode) {
    return res
      .status(409)
      .json({
        status: "error",
        code: 409,
        message: "Try to enter later",
      })
      .end();
  }

  if (checkAdmin) {
    const filter = { email };
    const update = { secretCode, createdCode, validCode };

    await Admin.findOneAndUpdate(filter, update, {
      new: true,
    });
  }

  if (checkUser.length > 0 && checkUser[0].validCode > createdCode) {
    return res
      .status(409)
      .json({
        status: "error",
        code: 409,
        message: "Try to enter later",
      })
      .end();
  }

  if (checkUser) {
    const filter = { email };
    const update = { secretCode, createdCode, validCode };

    await AcsessToAdmin.findOneAndUpdate(filter, update, {
      new: true,
    });
  }

  const mail = {
    form: "yourpricebooking@gmail.com",
    to: email,
    subject: "Confirmation code",
    text: "Your Price Booking confirmation code",
    html: `<p>Your confirmation code ${secretCode}.</p><br/><p>Code valid only 30 minutes</p>`,
    amp: `<!doctype html>
      <html ⚡4email data-css-strict>
      <head>
        <meta charset="utf-8">
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <style amp4email-boilerplate>body{visibility:hidden}</style>
      </head>
      <body>
              <p>Your confirmation code ${secretCode}.</p>
              <p>Attention code valid only 3 minutes</p>
      </body>
      </html>`,
  };
  transporter
    .sendMail(mail)
    .then(() =>
      res.json({
        status: "success",
        message: `Confirmation code sent to email: ${email}`,
      })
    )
    .catch((error) => console.log(error.message));
};

module.exports = checkAdmin;
