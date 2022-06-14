const { Language } = require("../../models");
// const { Country } = require("../../models");

const getAllLanguages = async (req, res) => {
  const { code } = req.params;
  // const countries = await Country.find({ langCode: code });
  // const languages = await Language.find({ codes: code });

  const languages = await Language.find({});
  res.json({
    status: "success",
    code: 200,
    data: {
      languages,
      // countries: [...countries],
    },
  });
};

module.exports = getAllLanguages;
