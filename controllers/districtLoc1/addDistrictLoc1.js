const { District, City, Region } = require("../../models");
const { NotImplemented } = require("http-errors");

const addDistrictLoc1 = async (req, res) => {
  const { cityId } = req.body;
  const distric = await District.create({ ...req.body, city: cityId });

  if (!distric) {
    throw new NotImplemented("district doesn`t create");
  }
  const city = await City.updateOne(
    { _id: cityId },
    { $push: { districts: distric._id } }
  );

  // const state = await Region.find().populate({
  //   path: "cities",
  //   model: "cityLoc2",
  //   populate: { path: "districts", model: "districtLoc1" },
  // });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      distric,
    },
  });
};

module.exports = addDistrictLoc1;
