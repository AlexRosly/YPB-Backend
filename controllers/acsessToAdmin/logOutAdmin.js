const { Admin } = require("../../models");

const logOutAdmin = async (req, res) => {
  const { id } = req.admin;
  const isAuth = false;

  await Admin.findByIdAndUpdate(id, { token: null, isAuth });

  res.json({
    status: "success",
    code: 204,
  });
};

module.exports = logOutAdmin;
