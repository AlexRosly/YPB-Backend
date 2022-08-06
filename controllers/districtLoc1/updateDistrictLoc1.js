const { District, Region } = require("../../models");
const { NotFound } = require("http-errors");

const updateDistrictLoc1 = async (req, res) => {
  const { id } = req.params;
  const district = await District.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!district) {
    throw new NotFound("district not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      district,
    },
  });
};

module.exports = updateDistrictLoc1;
