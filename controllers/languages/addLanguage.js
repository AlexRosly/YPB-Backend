const { Language, Country, Region, City, District } = require("../../models");
const { BadRequest } = require("http-errors");

const addLanguage = async (req, res) => {
  const { code } = req.body;
  //add launguage
  const languages = await Language.create({
    lang: req.body.lang,
    code: req.body.code,
    // countries: [...countries],
    // states: [...getCopyStates],
    // distric: [...copyAllDistritcs],
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
  // addCountryToLanguage();
  // const countrys = await Country.find({ dbLangCode: "EN" });
  // const countriesArray = JSON.parse(JSON.stringify(countrys));

  // const deleteIdCountry = (arr) => {
  //   for (const count of arr) {
  //     delete count._id;
  //     delete count.__v;
  //     count.dbLangCode = code;
  //   }
  //   return arr;
  // };

  // const countries = await Country.insertMany(deleteIdCountry(countriesArray));

  // find all states in english and add to new language

  const addStates = async () => {
    const getAllStates = await Region.find({ dbLangCode: "EN" });
    const states = JSON.parse(JSON.stringify(getAllStates));

    for (const state of states) {
      delete state._id;
      // state.dbLangCode = code;
      const newState = await Region.create({
        stateName: state.stateName,
        stateInternational: state.stateInternational,
        stateCode: state.stateCode,
        international: state.international,
        langCode: state.langCode,
        dbLangCode: code,
        statePhotoURL: state.statePhotoURL,
        countryId: state.countryId,
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
          console.log("countryID", state.countryId);
          // delete state.countryId;
          const updateState = await Region.updateOne(
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
  // const getAllstates = await Region.find({ dbLangCode: "EN" });
  // const statesArray = JSON.parse(JSON.stringify(getAllstates));

  // const deleteStatesId = (array) => {
  //   for (const count of array) {
  //     delete count._id;
  //     count.dbLangCode = code;
  //   }
  //   return array;
  // };

  // const getCopyStates = await Region.insertMany(deleteStatesId(statesArray));
  // const getCities = await Region.find({ dbLangCode: code });
  // console.log("getCities", getCities);

  const addCiti = async () => {
    // console.log("code", code);
    // const getAllCountries = await Country.find({ dbLangCode: code });
    // console.log("getAllCountries", getAllCountries);
    // const getStatesForCities = await Region.find({ dbLangCode: code });
    // console.log("getStatesForCities", getStatesForCities);

    // const states = JSON.parse(JSON.stringify(getStatesForCities));
    const getAllCities = await City.find({ dbLangCode: "EN" });
    const cities = JSON.parse(JSON.stringify(getAllCities));
    // console.log("cities", cities);
    // const getStatesForCities = await Region.find({ dbLangCode: code });
    // console.log("getStatesForCities", getStatesForCities);

    // const states = JSON.parse(JSON.stringify(getStatesForCities));

    // console.log("states", states);

    // for (const state of states) {
    for (const city of cities) {
      // if (state.stateInternational === city.stateInternational) {
      //   console.log(state.stateInternational === city.stateInternational);
      delete city._id;
      // city.dbLangCode:
      const addCity = await City.create({
        // stateId: city._id,
        // cityName: city.cityName,
        // cityInternational: city.cityInternational,
        // cityCode: city.cityCode,
        // cityPhotoURL: city.cityPhotoURL,
        // langCode: city.langCode,
        // stateInternational: city.stateInternational,
        // state: city._id,
        ...city,
        dbLangCode: code,
      });
      // console.log("addCity", addCity);
      // }
    }
    addCitiToState();
    // }
  };

  const addCitiToState = async () => {
    const getStatesForCities = await Region.find({ dbLangCode: code });
    // console.log("getStatesForCities", getStatesForCities);
    const states = JSON.parse(JSON.stringify(getStatesForCities));
    // console.log("states", states);

    const getAllCities = await City.find({ dbLangCode: code });
    const cities = JSON.parse(JSON.stringify(getAllCities));
    // console.log("city", cities);
    for (const state of states) {
      for (const city of cities) {
        if (state.stateInternational === city.stateInternational) {
          // console.log(state.stateInternational === city.stateInternational);
          const updateCity = await City.updateOne(
            {
              stateInternational: state.stateInternational,
              dbLangCode: code,
            },
            { $set: { stateId: state._id, state: state._id } }
          );
          // console.log("updateCity", updateCity);
          const updateState = await Region.updateOne(
            {
              stateInternational: state.stateInternational,
              dbLangCode: code,
            },
            { $addToSet: { cities: city._id } }
          );
        }
      }
    }
  };

  addCiti();

  // const getStatesForCities = await Region.find({ dbLangCode: code });
  // const getAllCities = await City.find({ dbLangCode: "EN" });
  // let getCopyAllStates = JSON.parse(JSON.stringify(getAllCities));

  // const chengeStateId = (states, citi) => {
  //   const cities = JSON.parse(JSON.stringify(citi));
  //   for (const state of states) {
  //     for (const city of cities) {
  //       if (state.stateCode === city.stateCode) {
  //         city.state = state._id;
  //         city.stateId = state._id;
  //         city.dbLangCode = code;
  //         // city.__v = 0;
  //         delete city._id;
  //       }
  //     }
  //   }
  //   return cities;
  // };

  // const copyAllCities = await City.insertMany(
  //   chengeStateId(getStatesForCities, getAllCities)
  // );
  /////////////////////////////////////////////////////////////////////////////
  const addDistict = async () => {
    const getAllDistricts = await District.find({ dbLangCode: "EN" });
    const districts = JSON.parse(JSON.stringify(getAllDistricts));

    for (const district of districts) {
      delete district._id;
      const newDistrict = await District.create({
        ...district,
        dbLangCode: code,
      });
      // console.log("newDistrict", newDistrict);
    }
    addDistrictToCity();
  };

  const addDistrictToCity = async () => {
    const getAllCities = await City.find({ dbLangCode: code });
    const cities = JSON.parse(JSON.stringify(getAllCities));
    console.log("cities", cities);

    const getAllDistrict = await District.find({ dbLangCode: code });
    const districts = JSON.parse(JSON.stringify(getAllDistrict));
    console.log("districts", districts);

    for (const city of cities) {
      for (const district of districts) {
        if (city.cityInternational === district.cityInternational) {
          const updateDistrict = await District.updateOne(
            {
              cityInternational: city.cityInternational,
              dbLangCode: code,
            },
            { $set: { cityId: city._id, stateId: city.stateId } }
          );
          // console.log("updateDistrict", updateDistrict);
          const updateCity = await City.updateOne(
            {
              dbLangCode: code,
              cityInternational: city.cityInternational,
            },
            { $addToSet: { districts: district._id } }
          );

          console.log("updateCity", updateCity);
        }
      }
    }
  };

  addDistict();
  // const getCityForDistricts = await City.find({ dbLangCode: code });
  // // console.log("city", getCityForDistricts);
  // const getAllDistrict = await District.find({ dbLangCode: "EN" });
  // const getCopyAllDistircts = JSON.parse(JSON.stringify(getAllDistrict));

  // const chengeDistricId = (citis, district) => {
  //   const cities = JSON.parse(JSON.stringify(citis));
  //   const districs = JSON.parse(JSON.stringify(district));
  //   // console.log("cities", cities);
  //   // console.log("district", districs);
  //   for (const city of cities) {
  //     for (const distric of districs) {
  //       console.log("ID", distric._id);
  //       if (city._id === distric.cityId) {
  //         distric.stateId = city.stateId;
  //         distric.cityId = city._id;
  //         distric.city = city._id;
  //         distric.dbLangCode = code;
  //         // distric.__v = 0;
  //         delete distric._id;
  //       }
  //     }
  //   }
  //   // console.log("result", districs);
  //   return districs;
  // };

  // const copyAllDistritcs = await District.insertMany(
  //   chengeDistricId(getCityForDistricts, getCopyAllDistircts)
  // );
  /////////////////////////////////////////////////////////////////////
  // const languages = await Language.create({
  //   lang: req.body.lang,
  //   code: req.body.code,
  //   countries: [...countries],
  //   // states: [...getCopyStates],
  //   // distric: [...copyAllDistritcs],
  // });
  // if (!languages) {
  //   throw new BadRequest("object doesn`t create");
  // }

  const language = await Language.find({ code: code }).populate({
    path: "countries",
    model: "country",
    populate: {
      path: "states",
      model: "regionLoc3",
      populate: {
        path: "cities",
        model: "cityLoc2",
        populate: { path: "districts", model: "districtLoc1" },
      },
    },
  });
  // const state = await Region.find({ dbLangCode: code }).populate({
  //   path: "cities",
  //   model: "cityLoc2",
  //   populate: { path: "districts", model: "districtLoc1" },
  // });

  res.status(201).json({
    status: "success",
    message: "language create",
    code: 201,
    data: {
      language,
      // state,
    },
  });
};

module.exports = addLanguage;
