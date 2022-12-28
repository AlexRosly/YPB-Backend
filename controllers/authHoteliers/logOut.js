const { Hotelier } = require("../../models");

const logOut = async (req, res) => {
  const { _id } = req.hotelier;
  await Hotelier.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

module.exports = logOut;
