const { Region } = require("../../models");
const { NotFound } = require("http-errors");

const updateRegionLoc3 = async (req, res) => {
  const { id } = req.params;
  const state = await Region.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!state) {
    throw new NotFound("state not found");
  }

  // const state = await Region.find().populate({
  //   path: "cities",
  //   model: "cityLoc2",
  //   populate: { path: "districts", model: "districtLoc1" },
  // });

  res.json({
    status: "success",
    message: "state has been updated",
    code: 200,
    data: {
      state,
    },
  });
};

module.exports = updateRegionLoc3;
