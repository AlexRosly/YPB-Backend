const {
  City,
  UaCatalogForHotelier,
  RuCatalogForHotelier,
  PlCatalogForHotelier,
  EnCatalogForHotelier,
} = require("../../models");

const cyrillicToTranslit = require("cyrillic-to-translit-js");
// const cyrillicToTranslit = new CyrillicToTranslit();

const getCityForMainForHotelier = async ({ query: { language } }, res) => {
  const cities = await City.find({
    dbLangCode: language.toLowerCase(),
  }).populate({
    path: "state",
    populate: { path: "country" },
  });

  //if city not found return error
  // if (!cities) {
  //   res
  //     .status(422)
  //     .json({
  //       status: "error",
  //       message: "doesn't get all cities",
  //     })
  //     .end();
  // }
  // const translit = cyrillicToTranslit.transform(getString, "-").toLowerCase();

  const result = [];

  // //create array of city
  // for (const city of cities) {
  //   let tempObj = {};
  //   tempObj.id = city._id;
  //   tempObj.city = city.cityName;
  //   tempObj.cityInternational = city.cityInternational;
  //   tempObj.state = city.state.stateName;
  //   tempObj.stateInternational = city.stateInternational;
  //   tempObj.country = city.state.country?.country;
  //   tempObj.countryInternational = city.state.international;
  //   tempObj.photoUrl = city.cityPhotoURL;
  //   result.push(tempObj);
  // }

  switch (language) {
    case "pl":
      for (const city of cities) {
        const findPage = await PlCatalogForHotelier.find({
          city: city.cityName,
        });
        if (findPage.length > 0) {
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
      }

      if (result.length === 0) {
        res
          .json({
            code: 404,
            message: "city doesn't found in DB",
          })
          .end();
      }

      res
        .json({
          code: 200,
          message: "success",
          result,
        })
        .end();

      break;

    case "en":
      for (const city of cities) {
        const findPage = await EnCatalogForHotelier.find({
          city: city.cityName,
        });
        if (findPage.length > 0) {
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
      }

      if (result.length === 0) {
        res
          .json({
            code: 404,
            message: "city doesn't found in DB",
          })
          .end();
      }

      res
        .json({
          code: 200,
          message: "success",
          result,
        })
        .end();

      break;

    case "ru":
      console.log({ cities });
      for (const city of cities) {
        const findPage = await RuCatalogForHotelier.find({
          city: city.cityName,
        });
        if (findPage.length > 0) {
          let tempObj = {};
          tempObj.id = city._id;
          tempObj.city = city.cityName;
          tempObj.cityTransliteration = cyrillicToTranslit({
            preset: language,
          }).transform(city.cityName);
          tempObj.cityInternational = city.cityInternational;
          tempObj.state = city.state.stateName;
          tempObj.stateTransliteration = cyrillicToTranslit({
            preset: language,
          }).transform(city.state.stateName);
          tempObj.stateInternational = city.stateInternational;
          tempObj.country = city.state.country?.country;
          tempObj.countryTransliteration = cyrillicToTranslit({
            preset: language,
          }).transform(city.state.country.country);
          tempObj.countryInternational = city.state.international;
          tempObj.photoUrl = city.cityPhotoURL;
          result.push(tempObj);
        }
      }

      if (result.length === 0) {
        res
          .json({
            code: 404,
            message: "city doesn't found in DB",
          })
          .end();
      }

      res
        .json({
          code: 200,
          message: "success",
          result,
        })
        .end();

      break;

    case "uk":
      for (const city of cities) {
        const findPage = await UaCatalogForHotelier.find({
          city: city.cityName,
        });
        if (findPage.length > 0) {
          let tempObj = {};
          tempObj.id = city._id;
          tempObj.city = city.cityName;
          tempObj.cityTransliteration = cyrillicToTranslit({
            preset: language,
          }).transform(city.cityName);
          tempObj.cityInternational = city.cityInternational;
          tempObj.state = city.state.stateName;
          tempObj.stateTransliteration = cyrillicToTranslit({
            preset: language,
          }).transform(city.state.stateName);
          tempObj.stateInternational = city.stateInternational;
          tempObj.country = city.state.country?.country;
          tempObj.countryTransliteration = cyrillicToTranslit({
            preset: language,
          }).transform(city.state.country.country);
          tempObj.countryInternational = city.state.international;
          tempObj.photoUrl = city.cityPhotoURL;
          result.push(tempObj);
        }
      }

      if (result.length === 0) {
        res
          .json({
            code: 404,
            message: "city doesn't found in DB",
          })
          .end();
      }

      res
        .json({
          code: 200,
          message: "success",
          result,
        })
        .end();

      break;

    default:
      res
        .json({
          code: 404,
          message: `This language ${language} doesn't exist in DB`,
        })
        .end();

      break;
  }

  // res
  //   .json({
  //     code: 200,
  //     message: "success",
  //     cities,
  //   })
  //   .end();
};

module.exports = getCityForMainForHotelier;
