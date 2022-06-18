const { Language } = require("../../models");
const { Country } = require("../../models");

const addLanguage = async (req, res) => {
  const { code } = req.body;
  const countrys = await Country.find({ dbLangCode: "EN" });
  let countriesArray = JSON.parse(JSON.stringify(countrys));

  const deleteIdCountry = (arr) => {
    for (const count of arr) {
      delete count._id;
      delete count.__v;
      count.dbLangCode = code;
    }
    return arr;
  };

  const countries = await Country.insertMany(deleteIdCountry(countriesArray));

  const languages = await Language.create({
    lang: req.body.lang,
    code: req.body.code,
    // countries: { $ref: "countries", $id: country.map((el) => el._id) },
    // countries: { $ref: "countries", $id: country[0]._id },
    countries: [...countries],
  });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      languages,
    },
  });
};

module.exports = addLanguage;
