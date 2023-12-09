const { Hotelier } = require("../../models");

const logOut = async (req, res) => {
  const { id } = req.hotelier;

  await Hotelier.findByIdAndUpdate(id, { token: null });

  res
    .json({
      status: "success",
      code: 204,
    })
    .end();
};

module.exports = logOut;
