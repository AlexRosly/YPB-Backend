const { User } = require("../../models");

const getAllUsers = async (_, res) => {
  const users = await User.find(
    {},
    { _id: 1, lastName: 1, firstName: 1, email: 1, status: 1 }
  );

  if (!users) {
    return res.json({ status: "error", code: 404 }).end();
  }

  res
    .json({
      code: 200,
      message: "success",
      users,
    })
    .end();
};

module.exports = getAllUsers;
