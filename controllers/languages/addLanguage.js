const { Language, Country, Region, City, District } = require("../../models");
const { BadRequest } = require("http-errors");

const addLanguage = async (req, res) => {
  const { code } = req.body;

  //add launguage
  const languages = await Language.create({
    lang: req.body.lang,
    code: req.body.code,
  });
  if (!languages) {
    throw new BadRequest("object doesn`t create");
  }

  //find all country in english and add to new languages
  const addCountries = async () => {
    const getAllCountries = await Country.find({ dbLangCode: "EN" });
    const countries = JSON.parse(JSON.stringify(getAllCountries));

    for (const country of countries) {
      delete country._id;
      const newCountry = await Country.create({
        international: country.international,
        country: country.country,
        langCode: country.langCode,
        dbLangCode: code,
      });
    }
    addCountryToLanguage();
  };

  addCountries();

  const addCountryToLanguage = async () => {
    const getAllCountries = await Country.find({ dbLangCode: code });
    const countries = JSON.parse(JSON.stringify(getAllCountries));
    const language = await Language.find({ code });

    for (const country of countries) {
      if (country.dbLangCode === language[0].code) {
        const addToLanguage = await Language.updateOne(
          {
            code: country.dbLangCode,
          },
          { $addToSet: { countries: country._id } }
        );
      }
    }
  };

  // find all states in english and add to new language
  const addStates = async () => {
    const getAllStates = await Region.find({ dbLangCode: "EN" });
    const states = JSON.parse(JSON.stringify(getAllStates));

    for (const state of states) {
      delete state._id;
      const newState = await Region.create({
        ...state,
        dbLangCode: code,
      });
    }
    addStateToCountry();
  };

  const addStateToCountry = async () => {
    const getAllCountries = await Country.find({ dbLangCode: code });
    const countries = JSON.parse(JSON.stringify(getAllCountries));
    const getAllStates = await Region.find({ dbLangCode: code });
    const states = JSON.parse(JSON.stringify(getAllStates));

    for (const country of countries) {
      for (const state of states) {
        if (country.international === state.international) {
          const updateState = await Region.updateMany(
            { international: country.international, dbLangCode: code },
            { $set: { countryId: country._id } }
          );
          const updateCountry = await Country.updateOne(
            { international: country.international, dbLangCode: code },
            { $addToSet: { states: state._id } }
          );
        }
      }
    }
  };

  addStates();

  // find all cities in english and add to new language
  const addCiti = async () => {
    const getAllCities = await City.find({ dbLangCode: "EN" });
    const cities = JSON.parse(JSON.stringify(getAllCities));

    for (const city of cities) {
      delete city._id;
      const addCity = await City.create({
        ...city,
        dbLangCode: code,
      });
    }
    addCitiToState();
  };

  const addCitiToState = async () => {
    const getStatesForCities = await Region.find({ dbLangCode: code });
    const states = JSON.parse(JSON.stringify(getStatesForCities));

    const getAllCities = await City.find({ dbLangCode: code });
    const cities = JSON.parse(JSON.stringify(getAllCities));

    for (const state of states) {
      for (const city of cities) {
        if (state.stateInternational === city.stateInternational) {
          const updateCity = await City.updateMany(
            {
              stateInternational: state.stateInternational,
              dbLangCode: code,
            },
            { $set: { stateId: state._id, state: state._id } }
          );
        }
      }
    }
    updateState();
  };

  const updateState = async () => {
    const getStatesForCities = await Region.find({ dbLangCode: code });
    const states = JSON.parse(JSON.stringify(getStatesForCities));

    const getAllCities = await City.find({ dbLangCode: code });
    const cities = JSON.parse(JSON.stringify(getAllCities));

    for (const state of states) {
      for (const city of cities) {
        if (state._id === city.state) {
          const deleteCities = await Region.updateOne(
            {
              _id: state._id,
              dbLangCode: code,
            },
            { $pullAll: { cities: state.cities } }
          );
          if (deleteCities) {
            const updateState = await Region.updateOne(
              {
                _id: state._id,
                dbLangCode: code,
              },
              { $addToSet: { cities: city._id } }
            );
          }
        }
      }
    }
  };

  addCiti();

  // find all cities in english and add to new language
  const addDistict = async () => {
    const getAllDistricts = await District.find({ dbLangCode: "EN" });
    const districts = JSON.parse(JSON.stringify(getAllDistricts));

    for (const district of districts) {
      delete district._id;
      delete district.cityId;
      delete district.stateId;

      const newDistrict = await District.create({
        ...district,
        dbLangCode: code,
      });
    }
    setTimeout(() => {
      addDistrictToCity();
    }, 1500);
  };

  const addDistrictToCity = async () => {
    const getAllCities = await City.find({ dbLangCode: code });
    const cities = JSON.parse(JSON.stringify(getAllCities));

    const getAllDistrict = await District.find({ dbLangCode: code });
    const districts = JSON.parse(JSON.stringify(getAllDistrict));

    for (const city of cities) {
      for (const district of districts) {
        if (city.cityInternational === district.cityInternational) {
          const updateDistrict = await District.updateMany(
            {
              cityInternational: city.cityInternational,
              dbLangCode: code,
            },
            { $set: { cityId: city._id, stateId: city.stateId } }
          );
        }
      }
    }
    updateCity();
  };

  const updateCity = async () => {
    const getAllCities = await City.find({ dbLangCode: code });
    const cities = JSON.parse(JSON.stringify(getAllCities));

    const getAllDistrict = await District.find({ dbLangCode: code });
    const districts = JSON.parse(JSON.stringify(getAllDistrict));

    for (const city of cities) {
      for (const district of districts) {
        if (city._id === district.cityId) {
          const deleteDistrict = await City.updateMany(
            {
              _id: city._id,
              dbLangCode: code,
            },
            { $pullAll: { districts: city.districts } }
          );
          if (deleteDistrict) {
            const updateCity = await City.updateOne(
              {
                _id: city._id,
                dbLangCode: code,
              },
              { $addToSet: { districts: district._id } }
            );
          }
        }
      }
    }
  };

  addDistict();

  const language = await Language.find({ code: code });

  res.status(201).json({
    status: "success",
    message: "language create",
    code: 201,
    data: {
      language,
    },
  });
};

module.exports = addLanguage;
