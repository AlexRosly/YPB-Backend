const { Agent } = require("../../models");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const signIn = async (req, res) => {
  const { email, secretCode } = req.body;
  //find hotelier in DB
  const agent = await Agent.findOne({ email });
  //get date
  const date = new Date();
  const { id, firstName, lastName, language, role, createdAt } = agent;
  //if hotelier don't find return response
  if (!agent) {
    return res
      .status(409)
      .json({
        status: "error",
        code: 409,
        message: `Email ${email} not found`,
      })
      .end();
  }
  //if fornt send wrong secret code
  if (secretCode !== agent.secretCode) {
    return res
      .status(435)
      .json({
        status: "error",
        code: 435,
        message: "Code is wrong",
      })
      .end();
  }
  //if time is up for secret code return response
  if (agent.validCode < date) {
    return res
      .status(436)
      .json({
        status: "error",
        code: 436,
        message: "Code is invalid",
      })
      .end();
  }
  //create token and write in DB
  const payload = {
    id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "365d" });
  await Agent.findByIdAndUpdate(id, { token, status: "active" });
  // if all ok return response
  res
    .json({
      status: "success",
      code: 200,
      data: {
        agent: {
          id,
          role,
          firstName,
          lastName,
          language,
          email,
          token,
          createdAt,
        },
      },
    })
    .end();
};

module.exports = signIn;
