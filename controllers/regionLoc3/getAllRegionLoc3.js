const { Region } = require("../../models");

const getAllRegionLoc3 = async (req, res) => {
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

module.exports = getAllRegionLoc3;
