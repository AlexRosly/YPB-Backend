const { Country } = require("../../models");
const { NotFound } = require("http-errors");

const getCountryById = async (req, res) => {
  const { id } = req.params;

  const country = await Country.findById(id);

  if (!country) {
    throw new NotFound("Country not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      country,
    },
  });
};

module.exports = getCountryById;
