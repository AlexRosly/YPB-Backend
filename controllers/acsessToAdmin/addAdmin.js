const { Admin } = require("../../models");

require("dotenv").config();

const { ACCESS_TO_ADMIN } = process.env;

const addAdmin = async (req, res) => {
  //   console.log("i", req.body);
  const { email, secretCode } = req.body;
  //   console.log({ secretCode });

  const findUser = await Admin.find({ email });

  //   console.log({ findUser });

  if (findUser.length > 0) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: `Admin with email ${email} already exists`,
    });
  }

  const checkPassword = secretCode === ACCESS_TO_ADMIN ? true : false;

  if (!checkPassword) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: `incorect password or email. Try later`,
    });
  }

  const addAdmin = await Admin.create({ email });

  if (!addAdmin) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: `incorect password or email. Try later`,
    });
  }

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      addAdmin,
    },
  });
};

module.exports = addAdmin;
