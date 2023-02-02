const { Agent, Hotelier, User, Candidate } = require("../../models");
const { Conflict } = require("http-errors");
// const { sendEmail } = require("../../utils");

const checkAgent = async (req, res) => {
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

  const candidate = await Candidate.create({
    email,
    lastName,
    firstName,
    secretCode,
    createdCode,
    validCode,
  });

  //   const mail = {
  //     to: email,
  //     subject: "Confirmation code",
  //     html: `<p>Your confirmation code ${secretCode}.</p><br/><p>Attention code valid only 2 minutes</p>`,
  //   };
  //   await sendEmail(mail);

  res.json({
    message: `Confirmation code sent to ${email}`,
  });
};

module.exports = checkAgent;
