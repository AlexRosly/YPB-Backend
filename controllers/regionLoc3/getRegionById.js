const { Region } = require("../../models");
const { NotFound } = require("http-errors");

const getRegionById = async (req, res) => {
  const { id } = req.params;

  const state = await Region.findById(id);
  if (!state) {
    throw new NotFound("State not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      state,
    },
  });
};

module.exports = getRegionById;
