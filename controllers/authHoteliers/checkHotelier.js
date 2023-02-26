const { Hotelier } = require("../../models");
const { transporter } = require("../../utils");

const checkHotelier = async (req, res) => {
  const { email } = req.body;

  const hotelierCandidat = await Hotelier.findOne({ email });

  if (!hotelierCandidat) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "This email does not exist in Hoteliers collection",
    });
  }

  const firstNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const secondNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const thirdNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const fouthNumber = Math.floor(Math.random() * (10 - 1) + 1);

  const secretCode = `${firstNumber}${secondNumber}${thirdNumber}${fouthNumber}`;
  const createdCode = new Date();
  const validCode = createdCode.getTime() + 180000;

  if (hotelierCandidat) {
    const filter = { email };
    const update = { secretCode, createdCode, validCode };
    const hotelier = await Hotelier.findOneAndUpdate(filter, update, {
      new: true,
    });
  }

  const mail = {
    form: "yourpricebooking@gmail.com",
    to: email,
    subject: "Confirmation code",
    html: `<p>Your confirmation code ${secretCode}.</p><br/><p>Attention code valid only 2 minutes</p>`,
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

  res.json({
    status: "success",
    message: `Confirmation code sent to ${email}`,
  });
};

module.exports = checkHotelier;
