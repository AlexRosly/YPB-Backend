const { District, Region } = require("../../models");
const { NotFound } = require("http-errors");

const updateDistrictLoc1 = async (req, res) => {
  const { id } = req.params;
  const updateDistrict = await District.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updateDistrict) {
    throw new NotFound("district not found");
  }

  const state = await Region.find().populate({
    path: "cities",
    model: "cityLoc2",
    populate: { path: "districts", model: "districtLoc1" },
  });

  res.json({
    status: "success",
    code: 200,
    data: {
      state,
    },
  });
};

module.exports = updateDistrictLoc1;
