const { City } = require("../../models");

const getCityForMainForHotelier = async ({ query: { language } }, res) => {
  const cities = await City.find({ langCode: language.toUpperCase() }).populate(
    {
      path: "state",
      populate: { path: "country" },
    }
  );

  console.log({ cities });

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

  // "id": "630f97a69e670fb64efb3e13", +
  // "city": "Київ", +
  // "cityInternational": "Kyiv", +
  // "state": "Київська область", +
  // "stateInternational: "Kyiv Region",(чи як правильно буде латиницею) +
  // "countryInternational": "Ukraine",
  // "country": "Україна",
  // "photoUrl": "https://res.cloudinary.com/your-price-booking/image/upload/v1679073205/Photos%20of%20locations/Kyiv/Kyiv_swxofr.png"

  //create array of city
  for (const city of cities) {
    let tempObj = {};
    tempObj.id = city._id;
    tempObj.city = city.cityName;
    tempObj.cityInternational = city.cityInternational;
    tempObj.state = city.state.stateName;
    tempObj.stateInternational = city.stateInternational;
    tempObj.country = city.state.country?.country;
    tempObj.countryInternational = city.state.international;
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
