const { Agent } = require("../../models");
const { addToCash } = require("../../middlewares/authCacheService");

const signIn = async (req, res) => {
  const { email, secretCode } = req.body;

  const agent = await Agent.findOne({ email });

  if (!agent) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: `Email ${email} not found`,
    });
  }

  const date = new Date();

  if (secretCode !== agent.secretCode) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Code is wrong",
    });
  }

  if (agent.validCode < date) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Code is invalid",
    });
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
