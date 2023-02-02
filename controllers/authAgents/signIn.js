const { Agent } = require("../../models");
const { addToCash } = require("../../middlewares/authCacheService");

const { Unauthorized } = require("http-errors");

const signIn = async (req, res) => {
  const { email, secretCode } = req.body;

  const agent = await Agent.findOne({ email, secretCode });
  const date = new Date();

  if (!agent) {
    throw new Unauthorized(`Email ${email} not found`);
  }

  if (secretCode !== agent.secretCode) {
    throw new Unauthorized("Code is wrong");
  }

  if (agent.validCode < date) {
    throw new Unauthorized("Code is invalid");
  }

  if (agent) {
    const sessionID = req.sessionID;
    const { id } = agent;

    await addToCash(`${sessionID}`, `${id}`);

    res.cookie("_sid", sessionID, { signed: true }); //sessionID
    res.cookie("user", id, { signed: true });
    res.cookie("auth", true, { signed: true });

    req.session.authenticated = true;
  }

  res.json({
    status: "success",
    code: 200,
  });
};

module.exports = signIn;
