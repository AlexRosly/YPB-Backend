const {
  UaCatalogForHotelier,
  RuCatalogForHotelier,
  PlCatalogForHotelier,
  EnCatalogForHotelier,
} = require("../../models");

const getPageBySixParams = async (req, res) => {
  const {
    language,
    districtInternational = null,
    cityInternational,
    stateInternational,
    countryInternational,
    typeOfPage,
  } = req.body;

  let result;

  switch (language) {
    case "uk":
      const findUa = await UaCatalogForHotelier.find(
        {
          language,
          districtInternational,
          cityInternational,
          stateInternational,
          countryInternational,
          typeOfPage,
        },
        { url: 1, _id: 0 }
      );

      if (findUa.length === 0) {
        return res.json({
          code: 404,
          message: "Page doesn't exist in DB",
        });
      }

      result = findUa;

      res
        .json({
          code: 200,
          message: "success",
          result,
        })
        .end();

      break;
    case "ru":
      const findRu = await RuCatalogForHotelier.find(
        {
          language,
          districtInternational,
          cityInternational,
          stateInternational,
          countryInternational,
          typeOfPage,
        },
        { url: 1, _id: 0 }
      );

      if (findRu.length === 0) {
        return res.json({
          code: 404,
          message: "Page doesn't exist in DB",
        });
      }

      result = findRu;

      res
        .json({
          code: 200,
          message: "success",
          result,
        })
        .end();

      break;
    case "pl":
      const findPl = await PlCatalogForHotelier.find(
        {
          language,
          districtInternational,
          cityInternational,
          stateInternational,
          countryInternational,
          typeOfPage,
        },
        { url: 1, _id: 0 }
      );

      if (findPl.length === 0) {
        return res.json({
          code: 404,
          message: "Page doesn't exist in DB",
        });
      }

      result = findPl;

      res
        .json({
          code: 200,
          message: "success",
          result,
        })
        .end();

      break;
    case "en":
      const findEn = await EnCatalogForHotelier.find(
        {
          language,
          districtInternational,
          cityInternational,
          stateInternational,
          countryInternational,
          typeOfPage,
        },
        { url: 1, _id: 0 }
      );

      if (findEn.length === 0) {
        return res.json({
          code: 404,
          message: "Page doesn't exist in DB",
        });
      }

      result = findEn;

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
        .status(404)
        .json({
          status: "error",
          message: `The language "${language}" isn't in our DB`,
          code: 404,
        })
        .end();

      break;
  }
};

module.exports = getPageBySixParams;
