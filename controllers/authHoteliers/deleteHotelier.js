const { Hotelier } = require("../../models");
const { getFromCache } = require("../../middlewares/authCacheService");

const deleteHotelier = async (req, res) => {
  const { email } = req.body;

  const findAccount = await Hotelier.find({ email });

  const sessionID = req.sessionID;
  const userId = req.signedCookies["user"];

  if (!findAccount) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: `Account with email ${email} not found`,
    });
  }

  const getId = findAccount[0]._id.toString();
  const checkRedis = await getFromCache(`${sessionID}`);

  if (checkRedis === getId || getId === userId) {
    const deleteAccount = await Hotelier.updateOne(
      { email },
      {
        $set: { status: "deleted" },
      }
    );

    return res.status(201).json({
      status: "success",
      code: 201,
      message: `account with email ${email} has been deleted`,
    });
  }

  res.status(401).json({
    status: "error",
    code: 401,
    message: `account with email ${email} not autorized`,
  });
};

module.exports = deleteHotelier;
