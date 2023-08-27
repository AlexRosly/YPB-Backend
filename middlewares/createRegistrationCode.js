const { Agent, Hotelier, User, Candidate } = require("../models");
const { Conflict } = require("http-errors");
const { transporter } = require("../utils");

const createRegistrationCode = async (req, res) => {
  const { email, lastName, firstName } = req.body;

  const agentCandidat = await Agent.findOne({ email });
  const hotelierCandidat = await Hotelier.findOne({ email });
  const userCandidat = await User.findOne({ email });

  if (agentCandidat) {
    return res.status(432).json({
      status: "error",
      code: 432,
      message: "This email is already existed in Agents collection",
    });
  }

  if (hotelierCandidat) {
    return res.status(433).json({
      status: "error",
      code: 433,
      message: "This email is already existed in Hoteliers collection",
    });
  }

  if (userCandidat) {
    return res.status(434).json({
      status: "error",
      code: 434,
      message: "This email is already existed in Users collection",
    });
  }

  const firstNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const secondNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const thirdNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const fouthNumber = Math.floor(Math.random() * (10 - 1) + 1);

  const secretCode = `${firstNumber}${secondNumber}${thirdNumber}${fouthNumber}`;
  const createdCode = new Date();
  const validCode = createdCode.getTime() + 180000;

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

  const findCandidate = await Candidate.findOne({ email });

  if (findCandidate) {
    const filter = { email };
    const update = { secretCode, createdCode, validCode };
    const candidate = await Candidate.findOneAndUpdate(filter, update, {
      new: true,
    });
    transporter
      .sendMail(mail)
      .then(() =>
        res.json({
          status: "success",
          message: `Confirmation code sent to ${email}`,
        })
      )
      .catch((error) => console.log(error.message));
  } else {
    const candidate = await Candidate.create({
      email,
      lastName,
      firstName,
      secretCode,
      createdCode,
      validCode,
    });

    transporter
      .sendMail(mail)
      .then(() =>
        res.json({
          status: "success",
          message: `Confirmation code sent to ${email}`,
        })
      )
      .catch((error) => console.log(error.message));
  }
  ////////////////////////////////////////
  // const candidate = await Candidate.create({
  //   email,
  //   lastName,
  //   firstName,
  //   secretCode,
  //   createdCode,
  //   validCode,
  // });

  // const mail = {
  //   to: email,
  //   subject: "Confirmation code",
  //   html: `<p>Your confirmation code ${secretCode}.</p><br/><p>Attention code valid only 2 minutes</p>`,
  // };

  // transporter
  //   .sendMail(mail)
  //   .then(() =>
  //     // console.log("Email send")
  //     res.json({
  //       message: `Confirmation code sent to ${email}`,
  //     })
  //   )
  //   .catch((error) => console.log(error.message));

  //   const mail = {
  //     to: email,
  //     subject: "Confirmation code",
  //     html: `<p>Your confirmation code ${secretCode}.</p><br/><p>Attention code valid only 2 minutes</p>`,
  //   };
  //   await sendEmail(mail);

  // res.json({
  //   message: `Confirmation code sent to ${email}`,
  // });
};

module.exports = createRegistrationCode;
