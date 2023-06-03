const {
  UaCatalogForHotelier,
  RuCatalogForHotelier,
  PlCatalogForHotelier,
  EnCatalogForHotelier,
} = require("../../models");

const getPagesByThreeParams = async (
  { query: { language, description, districtInternational } },
  res
) => {
  const decodeUrl = decodeURIComponent(districtInternational);
  switch (language) {
    case "uk":
      const getAllUkPages = await UaCatalogForHotelier.find({
        description,
        districtInternational: decodeUrl,
      });
      res.status(200).json({
        status: "success",
        code: 200,
        getAllUkPages,
      });
      break;
    case "ru":
      const getAllRuPages = await RuCatalogForHotelier.find({
        description,
        districtInternational: decodeUrl,
      });
      res.status(200).json({
        status: "success",
        code: 200,
        getAllRuPages,
      });

      break;
    case "pl":
      const getAllPlPages = await PlCatalogForHotelier.find({
        description,
        districtInternational: decodeUrl,
      });
      res.status(200).json({
        status: "success",
        code: 200,
        getAllPlPages,
      });

      break;
    case "en":
      const getAllEnPages = await EnCatalogForHotelier.find({
        description,
        districtInternational: decodeUrl,
      });
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

module.exports = getPagesByThreeParams;
