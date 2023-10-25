const { AcsessToAdmin } = require("../../models");

const addNewEmail = async (req, res) => {
  const { email, access } = req.body;

  //find email in DB
  const findEmail = await AcsessToAdmin.findOne({ email });
  //if email was found in DB return error
  if (findEmail) {
    return res
      .status(409)
      .json({
        status: "error",
        code: 409,
        message: "This email already exist in DB",
      })
      .end();
  }
  //create new email id DB
  const result = await AcsessToAdmin.create({ email, access });
  if (!result) {
    return res
      .status(404)
      .json({
        status: "error",
        code: 404,
        message: "Try to create email later",
      })
      .end();
  }

  res
    .status(201)
    .json({
      status: "success",
      message: `email ${email} added to DB`,
      code: 201,
      data: {
        result,
      },
    })
    .end();
};

module.exports = addNewEmail;
