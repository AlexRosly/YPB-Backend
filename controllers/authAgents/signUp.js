const { Agent, Candidate } = require("../../models");
const { addToCash } = require("../../middlewares/authCacheService");

const signUp = async (req, res) => {
  const { email, lastName, firstName, secretCode } = req.body;

  const candidate = await Candidate.findOne({ email });

  const date = new Date();

  if (secretCode !== candidate.secretCode) {
    return res.status(435).json({
      status: "error",
      code: 435,
      message: "Code is wrong",
    });
  }

  if (candidate.validCode < date) {
    return res.status(436).json({
      status: "error",
      code: 436,
      message: "Code is invalid",
    });
  }

  const agent = await Agent.create({ lastName, firstName, email, secretCode });

  if (!agent) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: `account not created`,
    });
  }

  await Candidate.findOneAndRemove({ email });

  const sessionID = req.sessionID;
  await addToCash(`${sessionID}`, `${agent._id}`);

  res.cookie("_sid", sessionID, { signed: true }); //sessionID
  res.cookie("user", agent._id, { signed: true });
  res.cookie("auth", true, { signed: true });
  req.session.authenticated = true;

  const { id } = agent;

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      agent: {
        id,
        firstName,
        lastName,
        email,
      },
    },
  });
};

module.exports = signUp;
