const { Admin } = require("../../models");
const { AcsessToAdmin } = require("../../models");

const logOutAdmin = async (req, res) => {
  const id = req.superAdmin;
  const _id = req.admin;

  if (id) {
    await Admin.findByIdAndUpdate(id, { token: null });
    res
      .json({
        status: "success",
        code: 204,
      })
      .end();
  }

  if (_id) {
    await AcsessToAdmin.findByIdAndUpdate(_id, {
      token: null,
    });

    res
      .json({
        status: "success",
        code: 204,
      })
      .end();
  }

  // console.log({ superAdmin });
  // console.log({ admin });

  // if (superAdmin || admin) {
  //   console.log("work");
  // }

  // res.json({
  //   status: "success",
  //   code: 204,
  // });
};

module.exports = logOutAdmin;
