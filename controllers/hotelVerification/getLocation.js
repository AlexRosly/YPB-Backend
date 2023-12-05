const { Country } = require("../../models");

const getLocation = async (req, res) => {
  const { dbLangCode = "en", country } = req.query;
  const result = await Country.find({ dbLangCode, country }).populate({
    path: "states",
    populate: { path: "cities", populate: { path: "districts" } },
  });

  if (!result) {
    return res.json({
      status: "error",
    });
  }

  let state = [];
  let city = [];
  let district = [];
  let tepmDistrict = [];
  let tempCity = [];
  //get all states from response
  result.forEach((element) => {
    state.push(...element.states);
  });
  //get all cities from response
  state.forEach((element) => {
    tempCity.push(...element.cities);
  });
  //get all districts from response
  tempCity.forEach((element) => {
    tepmDistrict.push(...element.districts);
  });
  //get city name from tempCity array
  tempCity.forEach((elem) => {
    city.push(elem.cityName);
  });
  //get city name from tepmDistrict array
  tepmDistrict.forEach((elem) => {
    district.push(elem.districtName);
  });

  res
    .json({
      code: 200,
      status: "success",
      city,
      district,
    })
    .end();
};

module.exports = getLocation;
