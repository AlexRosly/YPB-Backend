const { Country } = require("../../models");

const getAllCountries = async (req, res) => {
  const contries = await Country.find({});
  res.json({
    status: "success",
    code: 200,
    data: {
      contries,
    },
  });
};

module.exports = getAllCountries;
