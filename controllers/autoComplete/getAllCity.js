const { City } = require("../../models");

const getAllCity = async ({ query: { language } }, res) => {
  const cities = await City.find({
    langCode: language.toUpperCase(),
  }).populate({
    path: "state",
    populate: { path: "country" },
  });

  if (!cities) {
    res.status(422).json({
      status: "error",
      message: "doesn't get all cities",
    });
  }

  const result = [];

  for (const city of cities) {
    let tempObj = {};
    tempObj.id = city._id;
    tempObj.city = city.cityName;
    tempObj.state = city.state.stateName;
    tempObj.country = city.state.country?.country;
    result.push(tempObj);
  }

  res.status(200).json({
    status: "success",
    code: 200,
    result,
  });
  res.end();
};

module.exports = getAllCity;
