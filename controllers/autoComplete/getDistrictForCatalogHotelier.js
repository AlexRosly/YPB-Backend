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
  const districts = await District.find({
    dbLangCode: language,
    districtPhotoAlt: { $regex: searchFromUrl, $options: "i" },
  });

  console.log(districts.length);

  //create array for response
  const result = [];

  if (districts.length === 0) {
    return res.json({
      code: 404,
      status: "error",
      message: "districts not found in DB",
    });
  }

  //find pages for language
  switch (language) {
    case "uk":
      for (const district of districts) {
        //find page of catalog for diastrict
        const findPage = await UaCatalogForHotelier.find({
          district: district.districtName,
        });
        //if page was found create object and push to array
        if (findPage.length > 0) {
          let tempObj = {};
          tempObj.id = district._id;
          tempObj.districtName = district.districtName;
          tempObj.locationName = district.districtPhotoAlt;
          result.push(tempObj);
        }
      }
      // if array empty return responde
      if (!result.length === 0) {
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
      for (const district of districts) {
        //find page of catalog for diastrict
        const findPage = await RuCatalogForHotelier.find({
          district: district.districtName,
        });
        //if page was found create object and push to array
        if (findPage.length > 0) {
          let tempObj = {};
          tempObj.id = district._id;
          tempObj.districtName = district.districtName;
          tempObj.locationName = district.districtPhotoAlt;
          result.push(tempObj);
        }
      }
      // if array empty return responde
      if (!result.length === 0) {
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
      for (const district of districts) {
        //find page of catalog for diastrict
        const findPage = await PlCatalogForHotelier.find({
          district: district.districtName,
        });
        //if page was found create object and push to array
        if (findPage.length > 0) {
          let tempObj = {};
          tempObj.id = district._id;
          tempObj.districtName = district.districtName;
          tempObj.locationName = district.districtPhotoAlt;
          result.push(tempObj);
        }
      }
      // if array empty return responde
      if (!result.length === 0) {
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
      for (const district of districts) {
        //find page of catalog for diastrict
        const findPage = await EnCatalogForHotelier.find({
          district: district.districtName,
        });
        //if page was found create object and push to array

        if (findPage.length > 0) {
          let tempObj = {};
          tempObj.id = district._id;
          tempObj.districtName = district.districtName;
          tempObj.locationName = district.districtPhotoAlt;
          result.push(tempObj);
        }
      }
      // if array empty return responde
      if (!result.length === 0) {
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
