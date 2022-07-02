const { City, Region } = require("../../models");

const updateCityLoc2 = async (req, res) => {
  const { id } = req.params;

  const updateCity = await City.findByIdAndUpdate(id, req.body, { new: true });

  if (!updateCity) {
    throw new NotFound("city not found");
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

module.exports = updateCityLoc2;
