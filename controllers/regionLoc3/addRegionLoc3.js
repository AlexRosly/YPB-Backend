const { Region } = require("../../models");

const addRegionLoc3 = async (req, res) => {
  const addRegion = await Region.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      addRegion,
    },
  });
};

module.exports = addRegionLoc3;
