const { Region } = require("../../models");
const { NotFound } = require("http-errors");

const updateRegionLoc3 = async (req, res) => {
  const { id } = req.params;
  const updateState = await Region.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updateState) {
    throw new NotFound("state not found");
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

module.exports = updateRegionLoc3;
