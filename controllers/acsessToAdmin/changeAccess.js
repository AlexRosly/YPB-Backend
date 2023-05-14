const { AcsessToAdmin } = require("../../models");

const changeAccess = async (req, res) => {
  const { email, access } = req.body;

  const findEmail = await AcsessToAdmin.findOne({ email });

  if (!findEmail) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: `The email ${email} doesn't exist in DB`,
    });
  }

  const result = await AcsessToAdmin.updateOne({ email }, { $set: { access } });

  if (!result) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: `The access doesn't change`,
    });
  }

  res.json({
    status: "success",
    code: 200,
    message: `The status for email ${email} was change`,
  });
};

module.exports = changeAccess;
