const { Hotelier, Candidate } = require("../../models");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const signUp = async (req, res) => {
  // const { email, lastName, firstName, secretCode, language } = req.body;
  const { email, secretCode, language } = req.body;

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

  const hotelier = await Hotelier.create({
    // lastName,
    // firstName,
    email,
    secretCode,
    language: language.toLowerCase(),
  });

  if (!hotelier) {
    return res
      .status(409)
      .json({
        status: "error",
        code: 409,
        message: `account not created`,
      })
      .end();
  }

  await Candidate.findOneAndRemove({ email });

  const { id, role, createdAt } = hotelier;

  const payload = {
    id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "365d" });
  await Hotelier.findByIdAndUpdate(id, { token });

  res
    .status(201)
    .json({
      status: "success",
      code: 201,
      data: {
        hotelier: {
          id,
          role,
          // firstName,
          // lastName,
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
