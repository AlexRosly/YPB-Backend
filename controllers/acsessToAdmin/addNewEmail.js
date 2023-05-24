const { AcsessToAdmin } = require("../../models");

const addNewEmail = async (req, res) => {
  const { email, access } = req.body;
  const findEmail = await AcsessToAdmin.findOne({ email });

  if (findEmail) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "This email already exist in DB",
    });
  }

  const result = await AcsessToAdmin.create({ email, access });

  res.status(201).json({
    status: "success",
    message: `email ${email} added to DB`,
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addNewEmail;
