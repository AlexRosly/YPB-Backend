const { Agent } = require("../../models");
const { getFromCache } = require("../../middlewares/authCacheService");

const deleteAgent = async (req, res) => {
  const { email } = req.body;

  const sessionID = req.sessionID;
  const userId = req.signedCookies["user"];

  //   console.log({ sessionID });
  //   console.log({ userId });

  const findAccount = await Agent.find({ email });

  if (!findAccount) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: `Account with email ${email} not found`,
    });
  }

  const getId = findAccount[0]._id.toString();
  //   console.log("mmm", _id.toString());

  const checkRedis = await getFromCache(`${sessionID}`);
  //   console.log({ findAccount });
  //   console.log("id", findAccount[0]._id.toString());
  //   console.log({ checkRedis });
  //   console.log("bool", getId === userId);

  if (checkRedis === getId || getId === userId) {
    // console.log("working");
    const deleteAccount = await Agent.updateOne(
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

  //   const deleteAccount = await Agent.updateOne(
  //     { email },
  //     {
  //       $set: { status: "deleted" },
  //     }
  //   );

  res.status(401).json({
    status: "error",
    code: 401,
    message: `account with email ${email} not autorized`,
  });
};

module.exports = deleteAgent;
