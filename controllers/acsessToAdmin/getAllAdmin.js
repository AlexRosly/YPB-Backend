const { AcsessToAdmin } = require("../../models");

const getAllAdmin = async (req, res) => {
  const result = await AcsessToAdmin.find();

  if (!result) {
    return res
      .status(404)
      .json({
        status: "error",
        code: 404,
      })
      .end();
  }

  res
    .json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    })
    .end();
};

module.exports = getAllAdmin;
