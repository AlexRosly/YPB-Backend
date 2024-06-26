const { Candidate, User } = require("../../models");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
// const { addToCash } = require("../../middlewares/authCacheService");

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

  const user = await User.create({
    lastName,
    firstName,
    email,
    secretCode,
    bookingKarma: 0,
    language: language.toLowerCase(),
  });

  if (!user) {
    return res
      .status(409)
      .json({
        status: "error",
        code: 409,
        message: `account not created`,
      })
      .end();
  }

  const { id, bookingKarma, role, createdAt } = user;

  const payload = {
    id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "365d" });
  await User.findByIdAndUpdate(id, { token });

  res
    .status(201)
    .json({
      status: "success",
      code: 201,
      data: {
        user: {
          id,
          role,
          firstName,
          lastName,
          email,
          language,
          bookingKarma,
          token,
          createdAt,
        },
      },
    })
    .end();
};

module.exports = signUp;
