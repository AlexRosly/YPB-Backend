const { Agent, Hotelier, User, Candidate } = require("../models");
const { Conflict } = require("http-errors");
const { transporter } = require("../utils");

const createRegistrationCode = async (req, res) => {
  const { email, lastName, firstName } = req.body;

  const agentCandidat = await Agent.findOne({ email });
  const hotelierCandidat = await Hotelier.findOne({ email });
  const userCandidat = await User.findOne({ email });

  if (agentCandidat) {
    throw new Conflict("This email is already existed in Agents collection");
  }

  if (hotelierCandidat) {
    throw new Conflict("This email is already existed in Hoteliers collection");
  }

  if (userCandidat) {
    throw new Conflict("This email is already existed in Users collection");
  }

  const firstNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const secondNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const thirdNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const fouthNumber = Math.floor(Math.random() * (10 - 1) + 1);

  const secretCode = `${firstNumber}${secondNumber}${thirdNumber}${fouthNumber}`;
  const createdCode = new Date();
  const validCode = createdCode.getTime() + 120000;

  /*change logic if user already exist
  1. go to db and check candidate
  2.if !candidate create candidate
  3.else candidate update
*/
  console.log({ secretCode });
  const mail = {
    to: email,
    subject: "Confirmation code",
    html: `<p>Your confirmation code ${secretCode}.</p><br/><p>Attention code valid only 2 minutes</p>`,
  };

  const findCandidate = await Candidate.findOne({ email });

  if (findCandidate) {
    const filter = { email };
    const update = { secretCode, createdCode, validCode };
    const candidate = await Candidate.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log({ candidate });
    transporter
      .sendMail(mail)
      .then(() =>
        res.json({
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
          message: `Confirmation code sent to ${email}`,
        })
      )
      .catch((error) => console.log(error.message));
  }

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
