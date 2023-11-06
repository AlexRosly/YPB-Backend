const { City } = require("../../models");

const getCityForMainForHotelier = async ({ query: { language } }, res) => {
  const cities = await City.find({ langCode: language.toUpperCase() }).populate(
    {
      path: "state",
      populate: { path: "country" },
    }
  );

  //if city not found return error
  if (!cities) {
    res
      .status(422)
      .json({
        status: "error",
        message: "doesn't get all cities",
      })
      .end();
  }

  const result = [];

  //create array of city
  for (const city of cities) {
    let tempObj = {};
    tempObj.id = city._id;
    tempObj.city = city.cityName;
    tempObj.cityInternational = city.cityInternational;
    tempObj.state = city.state.stateName;
    tempObj.country = city.state.country?.country;
    tempObj.photoUrl = city.cityPhotoURL;
    result.push(tempObj);
  }

  res
    .json({
      code: 200,
      message: "success",
      result,
    })
    .end();
};

module.exports = getCityForMainForHotelier;
