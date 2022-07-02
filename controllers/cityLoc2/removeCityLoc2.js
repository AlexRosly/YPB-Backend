const { City, Region } = require("../../models");

const { NotFound } = require("http-errors");

const removeCityLoc2 = async (req, res) => {
  const { id } = req.params;
  const removeCity = await City.findByIdAndRemove(id);

  if (!removeCity) {
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
    message: "city deleted",
    data: {
      state,
    },
  });
};

module.exports = removeCityLoc2;
