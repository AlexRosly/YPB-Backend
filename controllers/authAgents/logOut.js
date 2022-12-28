const { Agent } = require("../../models");

const logOut = async (req, res) => {
  const { _id } = req.agent;
  await Agent.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

module.exports = logOut;
