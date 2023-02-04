const { Agent, Hotelier, User } = require("../models");
const { Conflict } = require("http-errors");
const { transporter } = require("../utils");

const createSignInCode = async (req, res) => {
  const { email } = req.body;

  const agentCandidat = await Agent.findOne({ email });
  const hotelierCandidat = await Hotelier.findOne({ email });
  const userCandidat = await User.findOne({ email });

  if (!agentCandidat && !hotelierCandidat && !userCandidat) {
    throw new Conflict(
      "Code 409. This email does not have in the relevant collection"
    );
  }

  const firstNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const secondNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const thirdNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const fouthNumber = Math.floor(Math.random() * (10 - 1) + 1);

  const secretCode = `${firstNumber}${secondNumber}${thirdNumber}${fouthNumber}`;
  const createdCode = new Date();
  const validCode = createdCode.getTime() + 120000;

  if (agentCandidat) {
    const filter = { email };
    const update = { secretCode, createdCode, validCode };
    const agent = await Agent.findOneAndUpdate(filter, update, {
      new: true,
    });
  }

  if (hotelierCandidat) {
    const filter = { email };
    const update = { secretCode, createdCode, validCode };
    const hotelier = await Hotelier.findOneAndUpdate(filter, update, {
      new: true,
    });
  }

  if (userCandidat) {
    const filter = { email };
    const update = { secretCode, createdCode, validCode };
    const user = await User.findOneAndUpdate(filter, update, {
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
        message: `Confirmation code sent to email: ${email}`,
      })
    )
    .catch((error) => console.log(error.message));

  res.json({
    message: `Confirmation code sent to ${email}`,
  });
};

module.exports = createSignInCode;
