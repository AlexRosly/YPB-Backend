const { User } = require("../../models");
const jwt = require("jsonwebtoken");
// const { addToCash } = require("../../middlewares/authCacheService");

const { SECRET_KEY } = process.env;

const signIn = async (req, res) => {
  const { email, secretCode } = req.body;

  const user = await User.findOne({ email });

  const date = new Date();
  const { id, firstName, lastName, language } = user;

  if (!user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: `Email ${email} not found`,
    });
  }

  if (secretCode !== user.secretCode) {
    return res.status(435).json({
      status: "error",
      code: 435,
      message: "Code is wrong",
    });
  }

  if (user.validCode < date) {
    return res.status(436).json({
      status: "error",
      code: 436,
      message: "Code is invalid",
    });
  }

  // if (user) {
  // const sessionID = req.sessionID;

  // await addToCash(`${sessionID}`, `${id}`);

  // res.cookie("_sid", sessionID, { signed: true }); //sessionID
  // res.cookie("user", id, { signed: true });
  // res.cookie("auth", true, { signed: true });
  // req.session.authenticated = true;
  // }

  const payload = {
    id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "365d" });
  await User.findByIdAndUpdate(id, { token });

  res.json({
    status: "success",
    code: 200,
    user: {
      id,
      firstName,
      lastName,
      language,
      email,
      token,
    },
  });
};

module.exports = signIn;
