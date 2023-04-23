const {
  UaCatalogForHotelier,
  RuCatalogForHotelier,
  PlCatalogForHotelier,
  EnCatalogForHotelier,
} = require("../../models");

const getAllHoteilerPages = async ({ query: { language } }, res) => {
  switch (language) {
    case "uk":
      const getAllUkPages = await UaCatalogForHotelier.find({ language });
      res.status(200).json({
        status: "success",
        code: 200,
        data: {
          getAllUkPages,
        },
      });
      break;
    case "ru":
      const getAllRuPages = await RuCatalogForHotelier.find({ language });
      res.status(200).json({
        status: "success",
        code: 200,
        data: {
          getAllRuPages,
        },
      });

      break;
    case "pl":
      const getAllPlPages = await PlCatalogForHotelier.find({ language });
      res.status(200).json({
        status: "success",
        code: 200,
        data: {
          getAllPlPages,
        },
      });

      break;
    case "en":
      const getAllEnPages = await EnCatalogForHotelier.find({ language });
      res.status(200).json({
        status: "success",
        code: 200,
        data: {
          getAllEnPages,
        },
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

module.exports = getAllHoteilerPages;
