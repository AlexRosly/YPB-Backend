const { District, Region } = require("../../models");
const { NotFound } = require("http-errors");

const removeDistrictLoc1 = async (req, res) => {
  const { id } = req.params;
  const district = await District.findByIdAndRemove(id);

  if (!district) {
    throw new NotFound("district not found");
  }

  // const state = await Region.find().populate({
  //   path: "cities",
  //   model: "cityLoc2",
  //   populate: { path: "districts", model: "districtLoc1" },
  // });

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
