const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const { addToCash } = require("../../middlewares/authCacheService");

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

  if (user) {
    const sessionID = req.sessionID;
    const { id } = user;

    await addToCash(`${sessionID}`, `${id}`);

    res.cookie("_sid", sessionID, { signed: true }); //sessionID
    res.cookie("user", id, { signed: true });
    res.cookie("auth", true, { signed: true });
    req.session.authenticated = true;
  }

  res.json({
    status: "success",
    code: 200,
  });
};

module.exports = signIn;
