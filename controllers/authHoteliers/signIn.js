const { Hotelier } = require("../../models");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { SECRET_KEY_JWT } = process.env;

const signIn = async (req, res) => {
  const { email, secretCode } = req.body;

  const hotelier = await Hotelier.findOne({ email, secretCode });
  const date = new Date();

  if (!hotelier) {
    throw new Unauthorized(`Email ${email} not found`);
  }

  if (secretCode !== hotelier.secretCode) {
    throw new Unauthorized("Code is wrong");
  }

  if (hotelier.validCode < date) {
    throw new Unauthorized("Code is invalid");
  }

  const payload = {
    id: hotelier._id,
  };

  const token = jwt.sign(payload, SECRET_KEY_JWT);

  await Hotelier.findByIdAndUpdate(hotelier._id, { token });

  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = signIn;
