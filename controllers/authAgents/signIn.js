const { Agent } = require("../../models");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { SECRET_KEY_JWT } = process.env;

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

  const payload = {
    id: agent._id,
  };

  const token = jwt.sign(payload, SECRET_KEY_JWT);

  await Agent.findByIdAndUpdate(agent._id, { token });

  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = signIn;
