const { Language, Country, Region, City } = require("../../models");
// const { Country } = require("../../models");

const addLanguage = async (req, res) => {
  const { code } = req.body;

  const countrys = await Country.find({ dbLangCode: "EN" });
  let countriesArray = JSON.parse(JSON.stringify(countrys));

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
  let statesArray = JSON.parse(JSON.stringify(getAllstates));

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
    // for (let i = 0; i < array1.length; i++) {
    //   for (let j = 0; j < array3.length; j++) {
    //     if (array1[i].stateCode === array3[j].stateCode) {
    //       array3[j].state = array1[i]._id;
    //       array3[j].dbLangCode = code;
    //       delete array3[j]._id;
    //     }
    //   }
    // }
    // return array3;
    for (const firstIterator of array1) {
      for (const secondIterator of array3) {
        if (firstIterator.stateCode === secondIterator.stateCode) {
          secondIterator.state = firstIterator._id;
          secondIterator.stateId = firstIterator._id;
          secondIterator.dbLangCode = "BR";
          delete secondIterator._id;
        }
      }
    }
    return array3;
  };

  chengeStateId(getStatesForCities, getCopyAllStates);

  const copyAllCities = await City.insertMany(
    chengeStateId(getStatesForCities, getAllCities)
  );

  const getAllDistrict = await District.find({ dbLangCode: "EN" });

  const languages = await Language.create({
    lang: req.body.lang,
    code: req.body.code,
    // countries: { $ref: "countries", $id: country.map((el) => el._id) },
    // countries: { $ref: "countries", $id: country[0]._id },
    countries: [...countries],
    states: [...getCopyStates],
  });
  //   .populate({
  //   path: "cities",
  //   model: "cityLoc2",
  //   populate: { path: "districts", model: "districtLoc1" },
  // });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      languages,
      // states,
    },
  });
};

module.exports = addLanguage;
