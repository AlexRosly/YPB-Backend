const { Hotelier } = require("../../models");
// const { deleteFromCache } = require("../../middlewares/authCacheService");

const logOut = async (req, res) => {
  // const sessionID = req.signedCookies["sessionID"];
  // const hotelierId = req.signedCookies["hotelier"];

  // await deleteFromCache(`${sessionID}`);

  // res.clearCookie("_sid"); //sessionID
  // res.clearCookie("user");
  // res.clearCookie("auth");
  // req.session.destroy();
  const { id } = req.hotelier;
  // const isAuth = false;

  await Hotelier.findByIdAndUpdate(id, { token: null });

  res.json({
    status: "success",
    code: 204,
  });

  // res.status(204).json();
};

module.exports = logOut;
