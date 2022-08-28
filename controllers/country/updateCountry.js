const { Country, Language } = require("../../models");

const { NotFound } = require("http-errors");

const updateCoutry = async (req, res) => {
  const { id } = req.params;
  const { langCode } = req.body;

  const country = await Country.findByIdAndUpdate(id, req.body, { new: true });
  const launguage = await Language.find({ code: `${langCode}` });
  const countryArrays = JSON.parse(JSON.stringify(launguage[0].countries));

  const changeCountry = (arr) => {
    const { international, country, langCode } = req.body;

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
  if (!country) {
    throw new NotFound("Country not found");
  }
  res.json({
    status: "succes",
    code: 200,
    data: {
      country,
    },
  });
};

module.exports = updateCoutry;
