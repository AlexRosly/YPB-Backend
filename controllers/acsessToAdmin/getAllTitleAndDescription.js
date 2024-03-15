const {
  UaCatalogForHotelier,
  RuCatalogForHotelier,
  PlCatalogForHotelier,
  EnCatalogForHotelier,
} = require("../../models");

const getAllTitleAndDescription = async (req, res) => {
  const uaCatalog = await UaCatalogForHotelier.find(
    {},
    {
      title: 1,
      description: 1,
    }
  );

  const ruCatalog = await RuCatalogForHotelier.find(
    {},
    {
      title: 1,
      description: 1,
    }
  );

  const plCatalog = await PlCatalogForHotelier.find(
    {},
    {
      title: 1,
      description: 1,
    }
  );

  const enCatalog = await EnCatalogForHotelier.find(
    {},
    {
      title: 1,
      description: 1,
    }
  );

  const result = [...uaCatalog, ...ruCatalog, ...plCatalog, ...enCatalog];

  if (!result) {
    return res
      .json({
        status: "error",
        code: 404,
        message: "Something wrong, try later",
      })
      .end();
  }

  res
    .json({
      code: 200,
      status: "success",
      result,
    })
    .end();
};

module.exports = getAllTitleAndDescription;
