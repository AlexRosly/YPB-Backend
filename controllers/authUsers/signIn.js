const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { SECRET_KEY_JWT } = process.env;

const signIn = async (req, res) => {
  const { email, secretCode } = req.body;

  const user = await User.findOne({ email, secretCode });
  const date = new Date();

  if (!user) {
    throw new Unauthorized(`Email ${email} not found`);
  }

  if (secretCode !== user.secretCode) {
    throw new Unauthorized("Code is wrong");
  }

  if (user.validCode < date) {
    throw new Unauthorized("Code is invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY_JWT);

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = signIn;
