const { AcsessToAdmin } = require("../../models");

const changeStatus = async (req, res) => {
  const { email, status } = req.body;

  console.log({ status });

  switch (status) {
    case "ban":
      const findEmail = await AcsessToAdmin.findOne({ email });

      if (!findEmail) {
        return res.status(409).json({
          status: "error",
          code: 409,
          message: `The email ${email} doesn't exist in DB`,
        });
      }

      const { id } = findEmail;

      const changeStatusToBan = await AcsessToAdmin.findByIdAndUpdate(id, {
        status,
      });

      if (!changeStatus) {
        return res.status(409).json({
          status: "error",
          code: 409,
          message: `The status for email ${email} wasn't change`,
        });
      }

      res.json({
        status: "success",
        code: 200,
        message: `The status for email ${email} was change`,

        data: {
          changeStatusToBan,
        },
      });

      break;

    case "active":
      const checkEmail = await AcsessToAdmin.findOne({ email });

      if (!checkEmail) {
        return res.status(409).json({
          status: "error",
          code: 409,
          message: `The email ${email} doesn't exist in DB`,
        });
      }

      const { _id } = checkEmail;

      const changeStatusToActive = await AcsessToAdmin.findByIdAndUpdate(_id, {
        status,
      });

      if (!changeStatusToActive) {
        return res.status(409).json({
          status: "error",
          code: 409,
          message: `The status for email ${email} wasn't change`,
        });
      }

      res.json({
        status: "success",
        code: 200,
        message: `The status for email ${email} was change`,

        data: {
          changeStatusToActive,
        },
      });

    default:
      break;
  }
};

module.exports = changeStatus;
