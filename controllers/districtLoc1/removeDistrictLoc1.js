const { District } = require("../../models");
const { NotFound } = require("http-errors");

const removeDistrictLoc1 = async (req, res) => {
  const { id } = req.params;
  const district = await District.findByIdAndRemove(id);

  if (!district) {
    throw new NotFound("district not found");
  }

  res.json({
    status: "success",
    code: 200,
    message: "district deleted",
    data: {
      district,
    },
  });
};

module.exports = removeDistrictLoc1;
