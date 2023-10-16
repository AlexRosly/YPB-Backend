const { Country, Region, City, District } = require("../../models");

const autoComplete = async ({ query: { search, limit = 8, lang } }, res) => {
  const searchFromUrl = decodeURI(search).trim();

  const countries = await Country.find({
    // langCode: lang,
    country: { $regex: searchFromUrl, $options: "i" },
  }).limit(limit);

  const states = await Region.find({
    // langCode: lang,
    stateName: { $regex: searchFromUrl, $options: "i" },
  }).limit(limit);

  const cities = await City.find({
    // langCode: lang,
    cityName: { $regex: searchFromUrl, $options: "i" },
  }).limit(limit);

  const districts = await District.find({
    // langCode: lang,
    districtName: { $regex: searchFromUrl, $options: "i" },
  }).limit(limit);

  const statment =
    (countries.length === 0) &
    (states.length === 0) &
    (cities.length === 0) &
    (districts.length === 0);

  if (statment) {
    // const error = new Error(`${search} not found`);
    // error.status = 404;
    // throw error;
    return res.json({
      status: "error",
      code: 404,
      message: `${search} not found in DB`,
    });
  }

  let district = [];

  if (districts.length > 0) {
    for (let i = 0; i < districts.length; i++) {
      const { _id, cityId, districtName } = districts[i];
      const getCitybyId = await City.findById(cityId);
      const cityParse = JSON.parse(JSON.stringify(getCitybyId));
      const getStateId = cityParse.stateId;
      const getCityName = cityParse.cityName;
      const getStateById = await Region.findById(getStateId);
      const stateParse = JSON.parse(JSON.stringify(getStateById));
      const getCountryId = stateParse.countryId;
      const getStateName = stateParse.stateName;
      const getCountryById = await Country.findById(getCountryId);
      const countryParse = JSON.parse(JSON.stringify(getCountryById));
      const getCountryName = countryParse.country;
      const createObject = {
        _id,
        districtName,
        cityName: getCityName,
        stateName: getStateName,
        country: getCountryName,
      };
      district.push(createObject);
    }
  }

  let city = [];

  if (cities.length > 0) {
    for (let i = 0; i < cities.length; i++) {
      const { _id, stateId, cityName } = cities[i];
      const getStateById = await Region.findById(stateId);
      const stateParse = JSON.parse(JSON.stringify(getStateById));
      const getCountryId = stateParse.countryId;
      const getStateName = stateParse.stateName;
      const getCountryById = await Country.findById(getCountryId);
      const countryParse = JSON.parse(JSON.stringify(getCountryById));
      const getCountryName = countryParse.country;
      const createObject = {
        _id,
        cityName,
        stateName: getStateName,
        country: getCountryName,
      };
      city.push(createObject);
    }
  }

  let state = [];

  if (states.length > 0) {
    for (let i = 0; i < states.length; i++) {
      const { _id, countryId, stateName } = states[i];
      const getCountryById = await Country.findById(countryId);
      const countryParse = JSON.parse(JSON.stringify(getCountryById));
      const getCountryName = countryParse.country;
      const createObject = {
        _id,
        stateName,
        country: getCountryName,
      };
      state.push(createObject);
    }
  }

  let countri = [];

  if (countries.length > 0) {
    for (let i = 0; i < countries.length; i++) {
      const { _id, country } = countries[i];
      const createObject = {
        _id,
        country,
      };
      countri.push(createObject);
    }
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      district,
      city,
      state,
      country: countri,
    },
  });
  res.end();
};

module.exports = autoComplete;
