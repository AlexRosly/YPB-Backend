const { Region } = require("../../models");

const updateRegionLoc3 = async (req, res) => {
  const { id } = req.params;
  const result = await Region.findByIdAndUpdate(id, req.body, { new: true });

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateRegionLoc3;
