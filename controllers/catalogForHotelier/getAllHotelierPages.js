const {
  UaCatalogForHotelier,
  RuCatalogForHotelier,
  PlCatalogForHotelier,
  EnCatalogForHotelier,
} = require("../../models");

const getAllHoteilerPages = async ({ query: { language } }, res) => {
  let getAllPages = [];
  switch (language) {
    case "uk":
      const getAllUkPages = await UaCatalogForHotelier.find({ language });
      if (!getAllUkPages) {
        return res
          .status(200)
          .json({
            // status: "error",
            // message: `page not found`,
            // code: 406,
            status: "success",
            pages: "false",
          })
          .end();
      }

      (getAllPages = [...getAllUkPages]),
        res
          .status(200)
          .json({
            status: "success",
            code: 200,
            pages: "true",
            // getAllPages,
          })
          .end();
      break;

    case "ru":
      const getAllRuPages = await RuCatalogForHotelier.find({ language });

      if (!getAllRuPages) {
        return res
          .status(200)
          .json({
            // status: "error",
            // message: `page not found`,
            // code: 406,
            status: "success",
            pages: "false",
          })
          .end();
      }

      (getAllPages = [...getAllRuPages]),
        res
          .status(200)
          .json({
            status: "success",
            code: 200,
            pages: "true",
            // getAllPages,
          })
          .end();

      break;

    case "pl":
      const getAllPlPages = await PlCatalogForHotelier.find({ language });

      if (!getAllPlPages) {
        return res
          .status(200)
          .json({
            // status: "error",
            // message: `page not found`,
            // code: 406,
            status: "success",
            pages: "false",
          })
          .end();
      }

      (getAllPages = [...getAllPlPages]),
        res
          .status(200)
          .json({
            status: "success",
            code: 200,
            pages: "true",
            // getAllPages,
          })
          .end();

      break;
    case "en":
      const getAllEnPages = await EnCatalogForHotelier.find({ language });

      if (!getAllEnPages) {
        return res
          .status(200)
          .json({
            // status: "error",
            // message: `page not found`,
            // code: 406,
            status: "success",
            pages: "false",
          })
          .end();
      }

      (getAllPages = [...getAllEnPages]),
        res
          .status(200)
          .json({
            status: "success",
            code: 200,
            pages: "true",
            // getAllPages,
          })
          .end();

      break;

    default:
      res
        .status(400)
        .json({
          status: "error",
          message: `The language "${language}" isn't in our DB`,
          code: 400,
        })
        .end();
      break;
  }
};

module.exports = getAllHoteilerPages;
