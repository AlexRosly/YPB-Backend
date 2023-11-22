const { User } = require("../../models");
const jwt = require("jsonwebtoken");
// const { addToCash } = require("../../middlewares/authCacheService");

const { SECRET_KEY } = process.env;

const signIn = async (req, res) => {
  const { email, secretCode } = req.body;
  //find hotelier in DB
  const user = await User.findOne({ email });
  //get date
  const date = new Date();
  const { id, firstName, lastName, language, bookingKarma, role, createdAt } =
    user;
  //if hotelier don't find return response
  if (!user) {
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
  if (secretCode !== user.secretCode) {
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
  if (user.validCode < date) {
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
  await User.findByIdAndUpdate(id, { token, status: "active" });
  // if all ok return response
  res
    .json({
      status: "success",
      code: 200,
      user: {
        id,
        role,
        firstName,
        lastName,
        language,
        bookingKarma,
        email,
        token,
        createdAt,
      },
    })
    .end();
};

module.exports = signIn;
