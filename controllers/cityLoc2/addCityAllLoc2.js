const { City } = require("../../models");
const { Region } = require("../../models");

const addCityAllloc2 = async (req, res) => {
  // const { dbLangCode } = req.body;
  // const findId = await Region.find({ dbLangCode });

  const result = await City.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addCityAllloc2;
