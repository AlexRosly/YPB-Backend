const {
  // Country,
  // Region,
  // City,
  // District,
  UaCatalogForHotelier,
  RuCatalogForHotelier,
  PlCatalogForHotelier,
  EnCatalogForHotelier,
} = require("../../models");

const autoCompleteForCatalogHotelier = async (req, res) => {
  const { search, typeOfPage } = req.query;
  const searchFromUrl = decodeURI(search).trim();

  // //find country, state, cities and district by query string, default limit = 8
  // const countries = await Country.find({
  //   country: { $regex: searchFromUrl, $options: "i" },
  // }).limit(limit);

  // const states = await Region.find({
  //   stateName: { $regex: searchFromUrl, $options: "i" },
  // }).limit(limit);

  // const cities = await City.find({
  //   cityName: { $regex: searchFromUrl, $options: "i" },
  // }).limit(limit);

  // const districts = await District.find({
  //   districtName: { $regex: searchFromUrl, $options: "i" },
  // }).limit(limit);

  // //check response from DB
  // const statment =
  //   (countries.length === 0) &
  //   (states.length === 0) &
  //   (cities.length === 0) &
  //   (districts.length === 0);

  // //if statment true (not found in DB) return error
  // if (statment) {
  //   // const error = new Error(`${search} not found`);
  //   // error.status = 404;
  //   // throw error;
  //   return res
  //     .json({
  //       status: "error",
  //       code: 404,
  //       message: `${search} not found in DB`,
  //     })
  //     .end();
  // }

  // //create response
  // //create response for district
  // let district = [];
  // if (districts.length > 0) {
  //   for (const iterator of districts) {
  //     switch (iterator.dbLangCode) {
  //       case "uk":
  //         const findPageUa = await UaCatalogForHotelier.find({
  //           district: iterator.districtName,
  //         });
  //         if (findPageUa.length > 0) {
  //           let tempObj = {};
  //           tempObj.id = iterator._id;
  //           tempObj.districtName = iterator.districtName;
  //           tempObj.locationName = iterator.districtPhotoAlt;
  //           district.push(tempObj);
  //         }

  //         break;
  //       case "ru":
  //         const findPageRu = await RuCatalogForHotelier.find({
  //           district: iterator.districtName,
  //         });
  //         if (findPageRu.length > 0) {
  //           let tempObj = {};
  //           tempObj.id = iterator._id;
  //           tempObj.districtName = iterator.districtName;
  //           tempObj.locationName = iterator.districtPhotoAlt;
  //           district.push(tempObj);
  //         }

  //         break;
  //       case "pl":
  //         const findPagePl = await PlCatalogForHotelier.find({
  //           district: iterator.districtName,
  //         });
  //         if (findPagePl.length > 0) {
  //           let tempObj = {};
  //           tempObj.id = iterator._id;
  //           tempObj.districtName = iterator.districtName;
  //           tempObj.locationName = iterator.districtPhotoAlt;
  //           district.push(tempObj);
  //         }
  //         break;
  //       case "en":
  //         const findPageEn = await EnCatalogForHotelier.find({
  //           district: iterator.districtName,
  //         });
  //         if (findPageEn.length > 0) {
  //           let tempObj = {};
  //           tempObj.id = iterator._id;
  //           tempObj.districtName = iterator.districtName;
  //           tempObj.locationName = iterator.districtPhotoAlt;
  //           district.push(tempObj);
  //         }

  //         break;

  //       default:
  //         break;
  //     }
  //   }
  // }
  // //create response for city
  // let city = [];
  // if (cities.length > 0) {
  //   for (const iterator of cities) {
  //     console.log("code", iterator.dbLangCode);
  //     switch (iterator.dbLangCode) {
  //       case "uk":
  //         const findPageUa = await UaCatalogForHotelier.find({
  //           city: iterator.cityName,
  //         });
  //         if (findPageUa.length > 0) {
  //           let tempObj = {};
  //           tempObj.id = iterator._id;
  //           tempObj.cityName = iterator.cityName;
  //           tempObj.locationName = iterator.cityPhotoAlt;
  //           city.push(tempObj);
  //         }

  //         break;
  //       case "ru":
  //         const findPageRu = await RuCatalogForHotelier.find({
  //           city: iterator.cityName,
  //         });
  //         if (findPageRu.length > 0) {
  //           let tempObj = {};
  //           tempObj.id = iterator._id;
  //           tempObj.cityName = iterator.cityName;
  //           tempObj.locationName = iterator.cityPhotoAlt;
  //           city.push(tempObj);
  //         }

  //         break;
  //       case "pl":
  //         const findPagePl = await PlCatalogForHotelier.find({
  //           city: iterator.cityName,
  //         });
  //         if (findPagePl.length > 0) {
  //           let tempObj = {};
  //           tempObj.id = iterator._id;
  //           tempObj.cityName = iterator.cityName;
  //           tempObj.locationName = iterator.cityPhotoAlt;
  //           city.push(tempObj);
  //         }
  //         break;
  //       case "en":
  //         const findPageEn = await EnCatalogForHotelier.find({
  //           city: iterator.cityName,
  //         });
  //         if (findPageEn.length > 0) {
  //           let tempObj = {};
  //           tempObj.id = iterator._id;
  //           tempObj.cityName = iterator.cityName;
  //           tempObj.locationName = iterator.cityPhotoAlt;
  //           city.push(tempObj);
  //         }

  //         break;

  //       default:
  //         break;
  //     }
  //   }
  // }
  // //create response for state
  // let staties = [];
  // if (states.length > 0) {
  //   for (const iterator of states) {
  //     switch (iterator.dbLangCode) {
  //       case "uk":
  //         const findPageUa = await UaCatalogForHotelier.find({
  //           state: iterator.stateName,
  //         });
  //         if (findPageUa.length > 0) {
  //           let tempObj = {};
  //           tempObj.id = iterator._id;
  //           tempObj.stateName = iterator.stateName;
  //           tempObj.locationName = iterator.statePhotoAlt;
  //           staties.push(tempObj);
  //         }

  //         break;
  //       case "ru":
  //         const findPageRu = await RuCatalogForHotelier.find({
  //           state: iterator.stateName,
  //         });
  //         if (findPageRu.length > 0) {
  //           let tempObj = {};
  //           tempObj.id = iterator._id;
  //           tempObj.stateName = iterator.stateName;
  //           tempObj.locationName = iterator.statePhotoAlt;
  //           staties.push(tempObj);
  //         }

  //         break;
  //       case "pl":
  //         const findPagePl = await PlCatalogForHotelier.find({
  //           state: iterator.stateName,
  //         });
  //         if (findPagePl.length > 0) {
  //           let tempObj = {};
  //           tempObj.id = iterator._id;
  //           tempObj.stateName = iterator.stateName;
  //           tempObj.locationName = iterator.statePhotoAlt;
  //           staties.push(tempObj);
  //         }

  //         break;
  //       case "en":
  //         const findPageEn = await EnCatalogForHotelier.find({
  //           state: iterator.stateName,
  //         });
  //         if (findPageEn.length > 0) {
  //           let tempObj = {};
  //           tempObj.id = iterator._id;
  //           tempObj.stateName = iterator.stateName;
  //           tempObj.locationName = iterator.statePhotoAlt;
  //           staties.push(tempObj);
  //         }
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // }

  // //create response for country
  // let countri = [];
  // if (countries.length > 0) {
  //   for (const iterator of countries) {
  //     switch (iterator.dbLangCode) {
  //       case "uk":
  //         const findPageUa = await UaCatalogForHotelier.find({
  //           country: iterator.country,
  //         });
  //         if (findPageUa.length > 0) {
  //           let tempObj = {};
  //           tempObj.id = iterator._id;
  //           tempObj.country = iterator.country;
  //           countri.push(tempObj);
  //         }
  //         break;
  //       case "ru":
  //         const findPageRu = await RuCatalogForHotelier.find({
  //           country: iterator.country,
  //         });
  //         if (findPageRu.length > 0) {
  //           let tempObj = {};
  //           tempObj.id = iterator._id;
  //           tempObj.country = iterator.country;
  //           countri.push(tempObj);
  //         }
  //         break;
  //       case "pl":
  //         console.log("poland");
  //         const findPagePl = await PlCatalogForHotelier.find({
  //           country: iterator.country,
  //         });
  //         if (findPagePl.length > 0) {
  //           let tempObj = {};
  //           tempObj.id = iterator._id;
  //           tempObj.country = iterator.country;
  //           console.log("poland", tempObj);
  //           countri.push(tempObj);
  //         }
  //         break;
  //       case "en":
  //         console.log("english");
  //         const findPageEn = await EnCatalogForHotelier.find({
  //           country: iterator.country,
  //         });
  //         if (findPageEn.length > 0) {
  //           let tempObj = {};
  //           tempObj.id = iterator._id;
  //           tempObj.country = iterator.country;
  //           console.log("english", tempObj);
  //           countri.push(tempObj);
  //         }
  //         break;

  //       default:
  //         break;
  //     }
  //   }
  // }
  let result = [];
  //find pages for location 1 and 2 level (distric and city) for UA
  const findUaPagesDistrict = await UaCatalogForHotelier.find(
    {
      district: { $regex: searchFromUrl, $options: "i" },
      typeOfPage,
    },
    { district: 1, city: 1, state: 1, country: 1, url: 1 }
  );
  const findUaPagesCity = await UaCatalogForHotelier.find(
    {
      city: { $regex: searchFromUrl, $options: "i" },
      typeOfPage,
    },
    { district: 1, city: 1, state: 1, country: 1, url: 1 }
  );
  //find pages for location 1 and 2 level (distric and city) for RU
  const findRuPagesDistrict = await RuCatalogForHotelier.find(
    {
      district: { $regex: searchFromUrl, $options: "i" },
      typeOfPage,
    },
    { district: 1, city: 1, state: 1, country: 1, url: 1 }
  );
  const findRuPagesCity = await RuCatalogForHotelier.find(
    {
      city: { $regex: searchFromUrl, $options: "i" },
      typeOfPage,
    },
    { district: 1, city: 1, state: 1, country: 1, url: 1 }
  );
  //find pages for location 1 and 2 level (distric and city) for PL
  const findPlPagesDistrict = await PlCatalogForHotelier.find(
    {
      district: { $regex: searchFromUrl, $options: "i" },
      typeOfPage,
    },
    { district: 1, city: 1, state: 1, country: 1, url: 1 }
  );
  const findPlPagesCity = await PlCatalogForHotelier.find(
    {
      city: { $regex: searchFromUrl, $options: "i" },
      typeOfPage,
    },
    { district: 1, city: 1, state: 1, country: 1, url: 1 }
  );
  //find pages for location 1 and 2 level (distric and city) for EN
  const findEnPagesDistrict = await EnCatalogForHotelier.find(
    {
      district: { $regex: searchFromUrl, $options: "i" },
      typeOfPage,
    },
    { district: 1, city: 1, state: 1, country: 1, url: 1 }
  );
  const findEnPagesCity = await EnCatalogForHotelier.find(
    {
      city: { $regex: searchFromUrl, $options: "i" },
      typeOfPage,
    },
    { district: 1, city: 1, state: 1, country: 1, url: 1 }
  );

  result = [
    ...findUaPagesDistrict,
    ...findUaPagesCity,
    ...findRuPagesDistrict,
    ...findRuPagesCity,
    ...findPlPagesDistrict,
    ...findPlPagesCity,
    ...findEnPagesDistrict,
    ...findEnPagesCity,
  ];
  //if pagies don't found in db return response with error
  if (result.length === 0) {
    return res
      .json({
        code: 404,
        status: "error",
        message: "pagies don't found in DB",
      })
      .end();
  }
  //response
  res
    .json({
      code: 200,
      status: "success",
      result,
      // district,
      // city,
      // staties,
      // countri,
    })
    .end();
};

module.exports = autoCompleteForCatalogHotelier;
