const { Agent, Candidate } = require("../../models");
const { NotAcceptable } = require("http-errors");
const { addToCash } = require("../../middlewares/authCacheService");

const signUp = async (req, res) => {
  const { email, lastName, firstName, secretCode } = req.body;

  const candidate = await Candidate.findOne({ email });

  const date = new Date();

  if (secretCode !== candidate.secretCode) {
    throw new NotAcceptable("Confirmation code invalid");
  }

  if (candidate.validCode < date) {
    throw new NotAcceptable("Confirmation code invalid");
  }

  const agent = await Agent.create({ lastName, firstName, email, secretCode });

  const removeCandidate = await Candidate.findOneAndRemove({ email });

  const sessionID = req.sessionID;
  // console.log("id", agent._id);
  // console.log({ sessionID });
  await addToCash(`${sessionID}`, `${agent._id}`);

  res.cookie("sessionID", sessionID, { signed: true });
  res.cookie("user", agent._id, { signed: true });

  // req.session.authenticated = true;

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      agent: {
        email,
        firstName,
      },
    },
  });
};

module.exports = signUp;
