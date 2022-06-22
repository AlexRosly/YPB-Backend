const { City } = require("../../models");

const updateCityLoc2 = async (req, res) => {
  const { id } = req.params;
  const result = await City.findByIdAndUpdate(id, req.body, { new: true });

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateCityLoc2;
