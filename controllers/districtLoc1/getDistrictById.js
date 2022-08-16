const { District } = require("../../models");
const { NotFound } = require("http-errors");

const getDistrictById = async (req, res) => {
  const { id } = req.params;

  const district = await District.findById(id);

  if (!district) {
    throw new NotFound("District not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      district,
    },
  });
};

module.exports = getDistrictById;
