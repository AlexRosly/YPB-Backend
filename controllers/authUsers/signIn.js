const { User } = require("../../models");
const { addToCash } = require("../../middlewares/authCacheService");

const signIn = async (req, res) => {
  const { email, secretCode } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: `Email ${email} not found`,
    });
  }

  const date = new Date();
  const { id, firstName, lastName, language } = user;

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

  if (user) {
    const sessionID = req.sessionID;

    await addToCash(`${sessionID}`, `${id}`);

    res.cookie("_sid", sessionID, { signed: true }); //sessionID
    res.cookie("user", id, { signed: true });
    res.cookie("auth", true, { signed: true });
    req.session.authenticated = true;
  }

  res.json({
    status: "success",
    code: 200,
    user: {
      id,
      firstName,
      lastName,
      language,
      email,
    },
  });
};

module.exports = signIn;
