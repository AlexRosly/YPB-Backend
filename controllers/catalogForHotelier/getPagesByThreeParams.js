const {
  UaCatalogForHotelier,
  RuCatalogForHotelier,
  PlCatalogForHotelier,
  EnCatalogForHotelier,
} = require("../../models");

const getPagesByThreeParams = async (
  { query: { language, typeOfPage, districtInternational } },
  res
) => {
  const decodeUrl = decodeURIComponent(districtInternational);

  let getPage = [];

  switch (language) {
    case "uk":
      const getAllUkPages = await UaCatalogForHotelier.find({
        typeOfPage,
        districtInternational: decodeUrl,
      });

      if (getAllUkPages.length === 0) {
        return res.status(406).json({
          status: "error",
          message: `page not found`,
          code: 406,
        });
      }
      getPage = [...getAllUkPages];
      res.status(200).json({
        status: "success",
        code: 200,
        getPage,
      });
      break;

    case "ru":
      const getAllRuPages = await RuCatalogForHotelier.find({
        typeOfPage,
        districtInternational: decodeUrl,
      });

      if (getAllRuPages.length === 0) {
        return res.status(406).json({
          status: "error",
          message: `page not found`,
          code: 406,
        });
      }
      getPage = [...getAllRuPages];

      res.status(200).json({
        status: "success",
        code: 200,
        getPage,
      });

      break;

    case "pl":
      const getAllPlPages = await PlCatalogForHotelier.find({
        typeOfPage,
        districtInternational: decodeUrl,
      });

      if (getAllPlPages.length === 0) {
        return res.status(406).json({
          status: "error",
          message: `page not found`,
          code: 406,
        });
      }
      getPage = [...getAllPlPages];

      res.status(200).json({
        status: "success",
        code: 200,
        getPage,
      });

      break;

    case "en":
      const getAllEnPages = await EnCatalogForHotelier.find({
        typeOfPage,
        districtInternational: decodeUrl,
      });

      if (getAllEnPages.length === 0) {
        return res.status(406).json({
          status: "error",
          message: `page not found`,
          code: 406,
        });
      }
      getPage = [...getAllEnPages];

      res.status(200).json({
        status: "success",
        code: 200,
        getPage,
      });

      break;

    default:
      res.status(400).json({
        status: "error",
        message: `The language "${language}" isn't in our DB`,
        code: 400,
      });
      break;
  }
};

module.exports = getPagesByThreeParams;
