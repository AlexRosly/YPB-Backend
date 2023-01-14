const { Agent } = require("../../models");
const { deleteFromCache } = require("../../middlewares/authCacheService");

const logOut = async (req, res) => {
  const { _id } = req.agent;
  await Agent.findByIdAndUpdate(_id, { token: null });

  const sessionID = req.signedCookies["sessionID"];
  const userId = req.signedCookies["user"];
  console.log({ sessionID });
  console.log({ userId });
  await deleteFromCache(`${sessionID}`);

  res.clearCookie("sessionID");
  res.clearCookie("user");

  res.status(204).json();
};

module.exports = logOut;
