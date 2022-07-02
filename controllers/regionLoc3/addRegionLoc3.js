const { Region } = require("../../models");
const { NotImplemented } = require("http-errors");

const addRegionLoc3 = async (req, res) => {
  const addState = await Region.create(req.body);
  if (!addState) {
    throw new NotImplemented("state doesn`t created");
  }

  const state = await Region.find().populate({
    path: "cities",
    model: "cityLoc2",
    populate: { path: "districts", model: "districtLoc1" },
  });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      state,
    },
  });
};

module.exports = addRegionLoc3;
