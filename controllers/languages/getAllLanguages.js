const { Language } = require("../../models");
// const { Country } = require("../../models");

const getAllLanguages = async (req, res) => {
  const { code } = req.params;

  const languages = await Language.find({}).populate("countries");
  res.json({
    status: "success",
    code: 200,
    data: {
      languages,
    },
  });
};

module.exports = getAllLanguages;
