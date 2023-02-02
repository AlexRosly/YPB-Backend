const { Candidate, User } = require("../../models");
const { NotAcceptable } = require("http-errors");
const { addToCash } = require("../../middlewares/authCacheService");

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

  const user = await User.create({
    lastName,
    firstName,
    email,
    secretCode,
    language: language.toLowerCase(),
  });

  if (user) {
    const removeCandidate = await Candidate.findOneAndRemove({ email });

    const sessionID = req.sessionID;
    await addToCash(`${sessionID}`, `${user._id}`);

    res.cookie("_sid", sessionID, { signed: true }); //sessionID
    res.cookie("user", user._id, { signed: true });
    res.cookie("auth", true, { signed: true });
    req.session.authenticated = true;
  }

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        firstName,
      },
    },
  });
};

module.exports = signUp;
