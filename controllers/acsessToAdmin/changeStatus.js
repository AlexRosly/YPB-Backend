const { AcsessToAdmin } = require("../../models");

const changeStatus = async (req, res) => {
  const { email, status } = req.body;

  switch (status) {
    case "ban":
      const findEmail = await AcsessToAdmin.findOne({ email });

      if (!findEmail) {
        return res
          .status(409)
          .json({
            status: "error",
            code: 409,
            message: `The email ${email} doesn't exist in DB`,
          })
          .end();
      }

      const { id } = findEmail;

      const changeStatusToBan = await AcsessToAdmin.findByIdAndUpdate(id, {
        status,
        access: [],
      });

      if (!changeStatusToBan) {
        return res
          .status(409)
          .json({
            status: "error",
            code: 409,
            message: `The status for email ${email} wasn't change`,
          })
          .end();
      }

      const result = await AcsessToAdmin.findOne({ email });

      res
        .json({
          status: "success",
          code: 200,
          message: `The status for email ${email} was change`,
          data: {
            result,
          },
        })
        .end();

      break;

    case "active":
      const checkEmail = await AcsessToAdmin.findOne({ email });

      if (!checkEmail) {
        return res
          .status(409)
          .json({
            status: "error",
            code: 409,
            message: `The email ${email} doesn't exist in DB`,
          })
          .end();
      }

      const { _id } = checkEmail;

      const changeStatusToActive = await AcsessToAdmin.findByIdAndUpdate(_id, {
        status,
      });

      if (!changeStatusToActive) {
        return res
          .status(409)
          .json({
            status: "error",
            code: 409,
            message: `The status for email ${email} wasn't change`,
          })
          .end();
      }

      const active = await AcsessToAdmin.findOne({ email });

      res
        .json({
          status: "success",
          code: 200,
          message: `The status for email ${email} was change`,
          data: {
            active,
          },
        })
        .end();
      break;

    case "not active":
      const checkEmails = await AcsessToAdmin.findOne({ email });

      if (!checkEmails) {
        return res
          .status(409)
          .json({
            status: "error",
            code: 409,
            message: `The email ${email} doesn't exist in DB`,
          })
          .end();
      }

      const changeStatusToNotActive = await AcsessToAdmin.findByIdAndUpdate(
        checkEmails.id,
        {
          status: "not active",
          access: [],
        }
      );

      if (!changeStatusToNotActive) {
        return res
          .status(409)
          .json({
            status: "error",
            code: 409,
            message: `The status for email ${email} wasn't change`,
          })
          .end();
      }

      const notActive = await AcsessToAdmin.findOne({ email });

      res
        .json({
          status: "success",
          code: 200,
          message: `The status for email ${email} was change`,
          data: {
            notActive,
          },
        })
        .end();
      break;

    default:
      res
        .json({
          status: "error",
          code: 406,
          message: `The status for email ${email} wasn't change`,
        })
        .end();

      break;
  }
};

module.exports = changeStatus;
