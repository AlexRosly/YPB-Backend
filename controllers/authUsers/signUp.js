const { Candidate, User } = require("../../models");
const { NotAcceptable } = require("http-errors");

const signUp = async (req, res) => {
  const { email, lastName, firstName, secretCode, language } = req.body;

  const candidate = await Candidate.findOne({ email });

  const date = new Date();

  if (secretCode !== candidate.secretCode) {
    throw new NotAcceptable("Confirmation code invalid");
  }

  if (candidate.validCode < date) {
    throw new NotAcceptable("Confirmation code invalid");
  }

  const agent = await User.create({
    lastName,
    firstName,
    email,
    secretCode,
    language,
  });

  const removeCandidate = await Candidate.findOneAndRemove({ email });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      hotelier: {
        email,
        firstName,
      },
    },
  });
};

module.exports = signUp;
