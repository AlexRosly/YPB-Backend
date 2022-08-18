const { District } = require("../../models");

const getAllDistrictLoc1 = async (req, res) => {
  const districts = await District.find({});

  res.json({
    status: "success",
    code: 200,
    data: {
      districts,
    },
  });
};

module.exports = getAllDistrictLoc1;
