const { Country } = require("../../models");

const getAllContries = async (req, res) => {
  const result = await Country.find({});
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAllContries;
