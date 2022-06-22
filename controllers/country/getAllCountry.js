const { Country } = require("../../models");

const getAllCountries = async (req, res) => {
  const result = await Country.find({});
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAllCountries;
