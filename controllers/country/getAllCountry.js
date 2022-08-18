const { Country } = require("../../models");

const getAllCountries = async (req, res) => {
  const countries = await Country.find({});
  res.json({
    status: "success",
    code: 200,
    data: {
      countries,
    },
  });
};

module.exports = getAllCountries;
