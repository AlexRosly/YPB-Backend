const { Agent, Candidate } = require("../../models");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const signUp = async (req, res) => {
  const { email, lastName, firstName, secretCode, language } = req.body;

  const candidate = await Candidate.findOne({ email });

  const date = new Date();

  if (secretCode !== candidate.secretCode) {
    return res
      .status(435)
      .json({
        status: "error",
        code: 435,
        message: "Code is wrong",
      })
      .end();
  }

  if (candidate.validCode < date) {
    return res
      .status(436)
      .json({
        status: "error",
        code: 436,
        message: "Code is invalid",
      })
      .end();
  }

  const agent = await Agent.create({
    lastName,
    firstName,
    email,
    secretCode,
    language: language.toLowerCase(),
  });

  if (!agent) {
    return res
      .status(409)
      .json({
        status: "error",
        code: 409,
        message: `account not created`,
      })
      .end();
  }

  const { id, role, createdAt } = agent;
  console.log({ createdAt });
  const payload = {
    id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "365d" });
  await Agent.findByIdAndUpdate(id, { token });

  res
    .status(201)
    .json({
      status: "success",
      code: 201,
      data: {
        agent: {
          id,
          role,
          firstName,
          lastName,
          email,
          language,
          token,
          createdAt,
        },
      },
    })
    .end();
};

module.exports = signUp;
