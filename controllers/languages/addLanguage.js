const { Language, Country, Region, City, District } = require("../../models");
const { BadRequest } = require("http-errors");

const addLanguage = async (req, res) => {
  const { code } = req.body;

  const countrys = await Country.find({ dbLangCode: "EN" });
  const countriesArray = JSON.parse(JSON.stringify(countrys));

  const deleteIdCountry = (arr) => {
    for (const count of arr) {
      delete count._id;
      delete count.__v;
      count.dbLangCode = code;
    }
    return arr;
  };

  const countries = await Country.insertMany(deleteIdCountry(countriesArray));

  const getAllstates = await Region.find({ dbLangCode: "EN" });
  const statesArray = JSON.parse(JSON.stringify(getAllstates));

  const deleteStatesId = (array) => {
    for (const count of array) {
      delete count._id;
      count.dbLangCode = code;
    }
    return array;
  };

  const getCopyStates = await Region.insertMany(deleteStatesId(statesArray));
  const getStatesForCities = await Region.find({ dbLangCode: code });

  const getAllCities = await City.find({ dbLangCode: "EN" });
  let getCopyAllStates = JSON.parse(JSON.stringify(getAllCities));

  const chengeStateId = (array1, array2) => {
    const array3 = JSON.parse(JSON.stringify(array2));
    for (const firstIterator of array1) {
      for (const secondIterator of array3) {
        if (firstIterator.stateCode === secondIterator.stateCode) {
          secondIterator.state = firstIterator._id;
          secondIterator.stateId = firstIterator._id;
          secondIterator.dbLangCode = code;
          secondIterator.__v = 0;
          delete secondIterator._id;
        }
      }
    }
    return array3;
  };

  const copyAllCities = await City.insertMany(
    chengeStateId(getStatesForCities, getAllCities)
  );

  const getCityForDistricts = await City.find({ dbLangCode: code });
  const getAllDistrict = await District.find({ dbLangCode: "EN" });
  const getCopyAllDistircts = JSON.parse(JSON.stringify(getAllDistrict));

  const chengeDistricId = (city, district) => {
    const distr = JSON.parse(JSON.stringify(district));
    for (const firstIterator of city) {
      for (const secondIterator of distr) {
        if (firstIterator.cityCode === secondIterator.cityCode) {
          secondIterator.stateId = firstIterator.stateId;
          secondIterator.cityId = firstIterator._id;
          secondIterator.city = firstIterator._id;
          secondIterator.dbLangCode = code;
          secondIterator.__v = 0;
          delete secondIterator._id;
        }
      }
    }
    return distr;
  };

  // console.log(chengeDistricId(getCityForDistricts, getCopyAllDistircts));
  const copyAllDistritcs = await District.insertMany(
    chengeDistricId(getCityForDistricts, getCopyAllDistircts)
  );

  const languages = await Language.create({
    lang: req.body.lang,
    code: req.body.code,
    // countries: { $ref: "countries", $id: country.map((el) => el._id) },
    // countries: { $ref: "countries", $id: country[0]._id },
    countries: [...countries],
    states: [...getCopyStates],
    distric: [...copyAllDistritcs],
  });
  //   .populate({
  // path: "cities",
  // model: "cityLoc2",
  // populate: { path: "districts", model: "districtLoc1" },
  // });
  if (!languages) {
    throw new BadRequest("object doesn`t create");
  }
  // const language = await Language.find({ dbLangCode: code }).populate({
  //   path: "countries",
  //   model: "country",
  //   populate: {
  //     path: "states",
  //     model: "regionLoc3",
  //     populate: {
  //       path: "cities",
  //       model: "cityLoc2",
  //       populate: { path: "districts", model: "districtLoc1" },
  //     },
  //   },
  // });

  const language = await Language.find({ code: code }).populate("countries");
  const state = await Region.find({ dbLangCode: code }).populate({
    path: "cities",
    model: "cityLoc2",
    populate: { path: "districts", model: "districtLoc1" },
  });

  // console.log("language", language);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      language,
      state,
    },
  });
};

module.exports = addLanguage;
