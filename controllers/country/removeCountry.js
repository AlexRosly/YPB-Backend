const { Country } = require("../../models");
const { NotFound } = require("http-errors");

const removeCountry = async (req, res) => {
  const { id } = req.params;
  const country = await Country.findByIdAndRemove(id);
  if (!country) {
    throw new NotFound("Country not found");
  }
  res.json({
    status: "succes",
    code: 200,
    message: "country deleted",
    data: {
      country,
    },
  });
};

module.exports = removeCountry;
