const { Hotelier } = require("../../models");
const { addToCash } = require("../../middlewares/authCacheService");

const signIn = async (req, res) => {
  const { email, secretCode } = req.body;

  const hotelier = await Hotelier.findOne({ email });

  if (!hotelier) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: `Email ${email} not found`,
    });
  }

  const date = new Date();
  const { id, firstName, lastName, language } = hotelier;

  if (secretCode !== hotelier.secretCode) {
    return res.status(435).json({
      status: "error",
      code: 435,
      message: "Code is wrong",
    });
  }

  if (hotelier.validCode < date) {
    return res.status(436).json({
      status: "error",
      code: 436,
      message: "Code is invalid",
    });
  }

  if (hotelier) {
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
    data: {
      hotelier: {
        id,
        firstName,
        lastName,
        language,
        email,
      },
    },
  });
};

module.exports = signIn;
