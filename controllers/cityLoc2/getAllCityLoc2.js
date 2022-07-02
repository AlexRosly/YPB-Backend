const { City } = require("../../models");

const getAllCityLoc2 = async (req, res) => {
  const cities = await City.find({}).populate("districts");

  res.json({
    status: "success",
    code: 200,
    data: {
      cities,
    },
  });
};

module.exports = getAllCityLoc2;
