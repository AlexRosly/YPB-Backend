const { City, Region } = require("../../models");
const { NotImplemented } = require("http-errors");

const addCityAllloc2 = async (req, res) => {
  const { stateId } = req.body;
  const city = await City.create({ ...req.body, state: stateId });
  if (!city) {
    throw new NotImplemented("city doesn`t create");
  }
  const updateState = await Region.updateOne(
    { _id: stateId },
    { $push: { cities: city._id } }
  );

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

module.exports = addCityAllloc2;
