const { City } = require("../../models");

const getCityForCreateObject = async ({ query: { language } }, res) => {
  console.log("work");
  const cities = await City.find({ langCode: language.toUpperCase() }).populate(
    {
      path: "state",
      populate: { path: "country" },
    }
  );

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
    tempObj.state = city.state.stateName;
    tempObj.country = city.state.country?.country;
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

module.exports = getCityForCreateObject;
