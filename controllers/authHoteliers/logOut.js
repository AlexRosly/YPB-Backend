const { Hotelier } = require("../../models");
const { deleteFromCache } = require("../../middlewares/authCacheService");

const logOut = async (req, res) => {
  const sessionID = req.signedCookies["sessionID"];
  const hotelierId = req.signedCookies["hotelier"];

  await deleteFromCache(`${sessionID}`);

  res.clearCookie("_sid"); //sessionID
  res.clearCookie("user");
  res.clearCookie("auth");
  req.session.destroy();

  res.status(204).json();
};

module.exports = logOut;
