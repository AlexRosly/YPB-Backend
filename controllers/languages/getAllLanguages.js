const { Language } = require("../../models");

const getAllLanguages = async (req, res, next) => {
  const result = await Language.find({});
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAllLanguages;
