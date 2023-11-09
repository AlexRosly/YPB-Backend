const {
  UaCatalogForHotelier,
  RuCatalogForHotelier,
  PlCatalogForHotelier,
  EnCatalogForHotelier,
} = require("../../models");

const getAllByLanguageAndQueryString = async (
  { query: { language, url } },
  res
) => {
  const decodeUrl = decodeURIComponent(url);
  let getAllPages = [];

  switch (language) {
    case "uk":
      const getAllUkPages = await UaCatalogForHotelier.find({
        language,
        url: decodeUrl,
      });

      if (getAllUkPages.length === 0) {
        return res.status(406).json({
          status: "error",
          message: `page not found`,
          code: 406,
        });
      }
      getAllPages = [...getAllUkPages];
      res.status(200).json({
        status: "success",
        code: 200,
        getAllPages,
      });
      break;

    case "ru":
      const getAllRuPages = await RuCatalogForHotelier.find({
        language,
        url: decodeUrl,
      });

      if (getAllRuPages.length === 0) {
        return res.status(406).json({
          status: "error",
          message: `page not found`,
          code: 406,
        });
      }
      getAllPages = [...getAllRuPages];

      res.status(200).json({
        status: "success",
        code: 200,
        getAllPages,
      });

      break;
    case "pl":
      const getAllPlPages = await PlCatalogForHotelier.find({
        language,
        url: decodeUrl,
      });

      if (getAllPlPages.length === 0) {
        return res.status(406).json({
          status: "error",
          message: `page not found`,
          code: 406,
        });
      }
      getAllPages = [...getAllPlPages];

      res.status(200).json({
        status: "success",
        code: 200,
        getAllPages,
      });

      break;

    case "en":
      const getAllEnPages = await EnCatalogForHotelier.find({
        language,
        url: decodeUrl,
      });

      if (getAllEnPages.length === 0) {
        return res.status(406).json({
          status: "error",
          message: `page not found`,
          code: 406,
        });
      }
      getAllPages = [...getAllEnPages];
      res.status(200).json({
        status: "success",
        code: 200,
        getAllPages,
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

module.exports = getAllByLanguageAndQueryString;
