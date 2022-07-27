const { Region } = require("../../models");
const { NotFound } = require("http-errors");

const removeRegionLoc3 = async (req, res) => {
  const { id } = req.params;
  const state = await Region.findByIdAndRemove(id);

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
    code: 200,
    message: "state deleted",
    data: {
      state,
    },
  });
};

module.exports = removeRegionLoc3;
