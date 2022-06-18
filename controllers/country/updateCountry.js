const { Country } = require("../../models");
const { Language } = require("../../models");

const { NotFound } = require("http-errors");

const updateCoutry = async (req, res) => {
  const { id } = req.params;
  const { international, country, langCode } = req.body;
  const result = await Country.findByIdAndUpdate(id, req.body, { new: true });
  const launguage = await Language.find({ code: `${langCode}` });
  // const launguage = await Language.find({
  //   "launguage.0": id,
  // });
  // console.log("laund", launguage);
  // console.log("array cuntry", launguage[0].countries);
  const countryArrays = JSON.parse(JSON.stringify(launguage[0].countries));
  // console.log("countryArrays", countryArrays);

  const changeCountry = (arr) => {
    for (const countryArray of arr) {
      if (countryArray._id === id) {
        console.log(countryArray._id);
        countryArray.international = international;
        countryArray.country = country;
        countryArray.langCode = country;
      }
      return arr;
    }
  };
  console.log(changeCountry(countryArrays));
  // const madeCountriesArray = JSON.parse(
  //   JSON.stringify(laulaunguage[0].countriesnguage)
  // );

  // const

  // console.log(launguage.countries);
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
