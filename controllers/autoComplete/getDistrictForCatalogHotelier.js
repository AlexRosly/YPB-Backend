const {
  District,
  UaCatalogForHotelier,
  RuCatalogForHotelier,
  PlCatalogForHotelier,
  EnCatalogForHotelier,
} = require("../../models");

const getDistrictForCatalogHotelier = async (req, res) => {
  const { language, city } = req.query;
  const searchFromUrl = decodeURI(city).trim();

  //find district  in DB
  // const districts = await District.find({
  //   dbLangCode: language,
  //   districtPhotoAlt: { $regex: searchFromUrl, $options: "i" },
  // });

  //create array for response
  let result = [];

  // if (districts.length === 0) {
  //   return res.json({
  //     code: 404,
  //     status: "error",
  //     message: "districts not found in DB",
  //   });
  // }

  //find pages for language
  switch (language) {
    case "uk":
      // for (const district of districts) {
      //find page of catalog for diastrict
      const findPageUa = await UaCatalogForHotelier.find(
        {
          city: searchFromUrl,
          district: { $exists: true },
        },
        { district: 1, city: 1, state: 1, country: 1, url: 1 }
      );
      //if page was found create object and push to array
      if (findPageUa.length > 0) {
        // let tempObj = {};
        // tempObj.id = district._id;
        // tempObj.districtName = district.districtName;
        // tempObj.locationName = district.districtPhotoAlt;
        // result.push(tempObj);
        // result.push(findPageUa);
        result = [...findPageUa];
      }
      // }
      // if array empty return responde
      if (result.length === 0) {
        res
          .json({
            code: 404,
            message: "districts doesn't found in DB",
          })
          .end();
      }
      // if district was found and create array return response
      res
        .json({
          code: 200,
          message: "success",
          result,
        })
        .end();

      break;

    case "ru":
      // for (const district of districts) {
      //find page of catalog for diastrict
      const findPageRu = await RuCatalogForHotelier.find(
        {
          city: searchFromUrl,
          district: { $exists: true },
        },
        { district: 1, city: 1, state: 1, country: 1, url: 1 }
      );

      //if page was found create object and push to array
      if (findPageRu.length > 0) {
        // let tempObj = {};
        // tempObj.id = district._id;
        // tempObj.districtName = district.districtName;
        // tempObj.locationName = district.districtPhotoAlt;
        // result.push(findPageRu);
        result = [...findPageRu];
      }
      // console.log({ findPage });
      // }
      // if array empty return responde
      if (result.length === 0) {
        res
          .json({
            code: 404,
            message: "districts doesn't found in DB",
          })
          .end();
      }
      // if district was found and create array return response
      res
        .json({
          code: 200,
          message: "success",
          result,
        })
        .end();

      break;

    case "pl":
      // for (const district of districts) {
      //find page of catalog for diastrict
      const findPagePl = await PlCatalogForHotelier.find(
        {
          city: searchFromUrl,
          district: { $exists: true },
        },
        { district: 1, city: 1, state: 1, country: 1, url: 1 }
      );
      //if page was found create object and push to array
      if (findPagePl.length > 0) {
        // let tempObj = {};
        // tempObj.id = district._id;
        // tempObj.districtName = district.districtName;
        // tempObj.locationName = district.districtPhotoAlt;
        // result.push(findPagePl);
        result = [...findPagePl];
      }
      // }
      // if array empty return responde
      if (result.length === 0) {
        res
          .json({
            code: 404,
            message: "districts doesn't found in DB",
          })
          .end();
      }
      // if district was found and create array return response
      res
        .json({
          code: 200,
          message: "success",
          result,
        })
        .end();

      break;

    case "en":
      // for (const district of districts) {
      //find page of catalog for diastrict
      const findPageEn = await EnCatalogForHotelier.find(
        {
          city: searchFromUrl,
          district: { $exists: true },
        },
        { district: 1, city: 1, state: 1, country: 1, url: 1 }
      );
      //if page was found create object and push to array

      if (findPageEn.length > 0) {
        // let tempObj = {};
        // tempObj.id = district._id;
        // tempObj.districtName = district.districtName;
        // tempObj.locationName = district.districtPhotoAlt;
        // result.push(findPageEn);
        result = [...findPageEn];
      }
      // }
      // if array empty return responde
      if (result.length === 0) {
        res
          .json({
            code: 404,
            message: "districts doesn't found in DB",
          })
          .end();
      }
      // if district was found and create array return response
      res
        .json({
          code: 200,
          message: "success",
          result,
        })
        .end();

      break;

    default:
      //if front send wrong language
      res
        .json({
          code: 404,
          message: `This language ${language} doesn't exist in DB`,
        })
        .end();
      break;
  }
};

module.exports = getDistrictForCatalogHotelier;
