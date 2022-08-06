const { Country } = require("../../models");
const { Language } = require("../../models");

const { NotFound } = require("http-errors");

const updateCoutry = async (req, res) => {
  const { id } = req.params;
  const { international, country, langCode } = req.body;
  const result = await Country.findByIdAndUpdate(id, req.body, { new: true });
  const launguage = await Language.find({ code: `${langCode}` });
  const countryArrays = JSON.parse(JSON.stringify(launguage[0].countries));
  const changeCountry = (arr) => {
    for (const countryArray of arr) {
      if (countryArray._id === id) {
        countryArray.international = international;
        countryArray.country = country;
        countryArray.langCode = langCode;
      }
    }
    return arr;
  };

  const updateLanguageCountry = await Language.updateOne(
    {
      code: `${langCode}`,
    },
    { $set: { countries: changeCountry(countryArrays) } }
  );
  if (!result) {
    throw new NotFound("Country not found");
  }
  res.json({
    status: "succes",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateCoutry;
