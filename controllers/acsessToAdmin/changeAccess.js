const { AcsessToAdmin } = require("../../models");

const changeAccess = async (req, res) => {
  const { email, access } = req.body;

  //find email in DB
  const findEmail = await AcsessToAdmin.findOne({ email });
  //if email not found in DB return error
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
  //get user id
  const { id } = findEmail;
  //find user by id and update
  const result1 = await AcsessToAdmin.findByIdAndUpdate(id, {
    $set: { access },
  });
  // const result = await AcsessToAdmin.updateOne({ email }, { $set: { access } });
  //if happend error or user not found for update return error
  if (!result1) {
    return res
      .status(409)
      .json({
        status: "error",
        code: 409,
        message: `The access doesn't change`,
      })
      .end();
  }
  //find user for response
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
};

module.exports = changeAccess;
