const { District, Region } = require("../../models");

const getAllDistrictLoc1 = async (req, res) => {
  const district = await District.find({});

  res.json({
    status: "success",
    code: 200,
    data: {
      district,
    },
  });
};

module.exports = getAllDistrictLoc1;
