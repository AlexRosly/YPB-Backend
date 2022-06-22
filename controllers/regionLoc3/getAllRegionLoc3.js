const { Region } = require("../../models");

const getAllRegionLoc3 = async (req, res) => {
  const result = await Region.find({});
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAllRegionLoc3;
