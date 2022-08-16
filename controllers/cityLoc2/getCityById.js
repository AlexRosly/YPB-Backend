const { City } = require("../../models");
const { NotFound } = require("http-errors");

const getCityById = async (req, res) => {
  const { id } = req.params;

  const city = await City.findById(id);

  if (!city) {
    throw new NotFound("City not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      city,
    },
  });
};

module.exports = getCityById;
