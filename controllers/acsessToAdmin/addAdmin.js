const { Admin } = require("../../models");

const { ACCESS_TO_ADMIN } = process.env;

const addAdmin = async (req, res) => {
  const { email, secretCode } = req.body;

  const findUser = await Admin.find({ email });

  if (findUser.length > 0) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: `Admin with email ${email} already exists`,
    });
  }

  const checkPassword = secretCode === ACCESS_TO_ADMIN ? true : false;

  if (!checkPassword) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: `incorect password or email. Try later`,
    });
  }

  const addAdmin = await Admin.create({ email });

  if (!addAdmin) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: `incorect password or email. Try later`,
    });
  }

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      email,
    },
  });
};

module.exports = addAdmin;
