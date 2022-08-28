const { City } = require("../../models");

const { NotFound } = require("http-errors");

const removeCityLoc2 = async (req, res) => {
  const { id } = req.params;
  const city = await City.findByIdAndRemove(id);

  if (!city) {
    throw new NotFound("city not found");
  }

  res.json({
    status: "success",
    code: 200,
    message: "city deleted",
    data: {
      city,
    },
  });
};

module.exports = removeCityLoc2;
