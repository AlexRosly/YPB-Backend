const { Country } = require("../../models");
const { NotFound } = require("http-errors");

const removeCountry = async (req, res) => {
  const { id } = req.params;
  const result = await Country.findByIdAndRemove(id);
  if (!result) {
    throw new NotFound("Country not found");
  }
  res.json({
    status: "succes",
    code: 200,
    message: "country deleted",
    data: {
      result,
    },
  });
};

module.exports = removeCountry;
