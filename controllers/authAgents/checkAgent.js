const { Agent } = require("../../models");
const { transporter } = require("../../utils");

const checkAgent = async (req, res) => {
  const { email } = req.body;

  const agentCandidat = await Agent.findOne({ email });

  if (!agentCandidat) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "This email does not exist in Agents collection",
    });
  }

  if (agentCandidat.status === "deleted") {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: `User with email ${email} don't registered yet`,
    });
  }

  const firstNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const secondNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const thirdNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const fouthNumber = Math.floor(Math.random() * (10 - 1) + 1);

  const secretCode = `${firstNumber}${secondNumber}${thirdNumber}${fouthNumber}`;
  const createdCode = new Date();
  const validCode = createdCode.getTime() + 180000;

  if (agentCandidat) {
    const filter = { email };
    const update = { secretCode, createdCode, validCode };
    await Agent.findOneAndUpdate(filter, update, {
      new: true,
    });
  }

  const mail = {
    form: "noreply@yourpricebooking.com",
    to: email,
    subject: "Confirmation code",
    text: "Your Price Booking confirmation code",
    html: `<p>Your confirmation code ${secretCode}.</p><br/><p>Attention code valid only 3 minutes</p>`,
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

  // res.json({
  //   status: "success",
  //   message: `Confirmation code sent to ${email}`,
  // });
};

module.exports = checkAgent;
