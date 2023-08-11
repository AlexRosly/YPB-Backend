const { Hotelier } = require("../../models");

const getAllHotelier = async (req, res) => {
  const result = await Hotelier.find();

  if (!result) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: `Hotelier not found`,
    });
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAllHotelier;
