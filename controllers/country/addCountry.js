const { Country } = require("../../models");
const { Language } = require("../../models");

const addCoutry = async (req, res) => {
  const { langCode } = req.body;
  const dbLangCode = langCode;

  const country = await Country.create({
    country: req.body.country,
    international: req.body.international,
    langCode: req.body.langCode,
    dbLangCode,
  });

  const language = await Language.updateOne(
    { code: `${langCode}` },
    { $push: { countries: country } }
  );

  if (!language) {
    throw new NotFound("Country not found");
  }

  const addCoutryToLanguages = async () => {
    const languages = await Language.find({ code: { $ne: `${langCode}` } });
    for (let i = 0; i < languages.length; i++) {
      if (languages[i].code !== langCode) {
        const country = await Country.create({
          country: req.body.country,
          international: req.body.international,
          langCode: req.body.langCode,
          dbLangCode: languages[i].code,
        });
        if (!country) {
          throw new NotFound("Can not add country");
        }
        const addCoutryToLanguage = await Language.updateOne(
          { code: languages[i].code },
          { $push: { countries: country } }
        );
        // console.log(addCoutryToLanguage);
      }
    }
  };

  addCoutryToLanguages();

  /////////////////////////
  //work
  // const languages = await Language.updateMany(
  //   { code: { $ne: `${langCode}` } },
  //   { $push: { countries: country } }
  // );

  // if (!languages) {
  //   throw new NotFound("Country not found");
  // }
  // console.log(languages);
  ////////////////////////////////
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      country,
    },
  });
};

module.exports = addCoutry;
