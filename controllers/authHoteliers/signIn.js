const { Hotelier } = require("../../models");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const signIn = async (req, res) => {
  const { email, secretCode } = req.body;
  //find hotelier in DB
  const hotelier = await Hotelier.findOne({ email });
  //get date
  const date = new Date();
  // const { id, firstName, lastName, language, role, createdAt } = hotelier;
  const { id, language, role, createdAt } = hotelier;

  //if hotelier don't find return response
  if (!hotelier) {
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
  if (secretCode !== hotelier.secretCode) {
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
  if (hotelier.validCode < date) {
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
  await Hotelier.findByIdAndUpdate(id, { token, status: "active" });
  // if all ok return response
  res
    .json({
      status: "success",
      code: 200,
      data: {
        hotelier: {
          id,
          role,
          // firstName,
          // lastName,
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
