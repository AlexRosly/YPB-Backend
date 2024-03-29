const { Hotelier } = require("../../models");

const getAllHotelier = async (req, res) => {
  const result = await Hotelier.find({ status: { $ne: "deleted" } });

  if (!result) {
    return res
      .status(409)
      .json({
        status: "error",
        code: 409,
        message: `Hotelier not found`,
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

module.exports = getAllHotelier;
