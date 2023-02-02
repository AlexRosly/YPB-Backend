const { Hotelier } = require("../../models");
const { addToCash } = require("../../middlewares/authCacheService");
const { Unauthorized } = require("http-errors");

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

  if (hotelier) {
    const sessionID = req.sessionID;
    const { id } = hotelier;

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
