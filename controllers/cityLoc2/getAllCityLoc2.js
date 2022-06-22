const { City } = require("../../models");

const getAllCityLoc2 = async (req, res) => {
  const _id = "62afda4a401e4e58d942077d";
  const result = await City.find({ region: _id }).populate("region");
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAllCityLoc2;
