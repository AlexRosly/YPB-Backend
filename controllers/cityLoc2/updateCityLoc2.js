const { City } = require("../../models");

const updateCityLoc2 = async (req, res) => {
  const { id } = req.params;

  const city = await City.findByIdAndUpdate(id, req.body, { new: true });

  if (!city) {
    throw new NotFound("city not found");
  }

  res.json({
    status: "success",
    message: "city update",
    code: 200,
    data: {
      city,
    },
  });
};

module.exports = updateCityLoc2;
