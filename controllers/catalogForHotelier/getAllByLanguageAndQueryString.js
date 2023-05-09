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
  switch (language) {
    case "uk":
      const getAllUkPages = await UaCatalogForHotelier.find({ language, url });
      res.status(200).json({
        status: "success",
        code: 200,
        getAllUkPages,
      });
      break;
    case "ru":
      const getAllRuPages = await RuCatalogForHotelier.find({ language, url });
      res.status(200).json({
        status: "success",
        code: 200,
        getAllRuPages,
      });

      break;
    case "pl":
      const getAllPlPages = await PlCatalogForHotelier.find({ language, url });
      res.status(200).json({
        status: "success",
        code: 200,
        getAllPlPages,
      });

      break;
    case "en":
      const getAllEnPages = await EnCatalogForHotelier.find({ language });
      res.status(200).json({
        status: "success",
        code: 200,
        getAllEnPages,
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
