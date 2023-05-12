const { Admin } = require("../../models");
const { transporter } = require("../../utils");

const checkAdmin = async (req, res) => {
  const { email } = req.body;

  const checkAdmin = await Admin.find({ email });

  if (!checkAdmin) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "This email does not exist in Admin",
    });
  }

  const firstNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const secondNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const thirdNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const fouthNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const fivethNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const sixthNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const seventhNumber = Math.floor(Math.random() * (10 - 1) + 1);

  const secretCode = `${firstNumber}${secondNumber}${thirdNumber}${fouthNumber}${fivethNumber}${sixthNumber}${seventhNumber}`;
  const createdCode = new Date();
  const validCode = createdCode.getTime() + 1800000;

  if (checkAdmin) {
    const filter = { email };
    const update = { secretCode, createdCode, validCode };
    const admin = await Admin.findOneAndUpdate(filter, update, {
      new: true,
    });
  }

  const mail = {
    form: "yourpricebooking@gmail.com",
    to: email,
    subject: "Confirmation code",
    html: `<p>Your confirmation code ${secretCode}.</p><br/><p>Attention code valid 30 minutes</p>`,
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
