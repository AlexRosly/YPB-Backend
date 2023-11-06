const { Hotels } = require("../../models");
const translate = require("translate-google");

const translateDescription = async (req, res) => {
  const { id, description, languages } = req.body;

  //detect description language

  //make object for update hotel
  const translateObject = {};

  //make translation. In case get array languges form FE more than 4 lagguages, BE crate translation
  try {
    for (const language of languages) {
      const translatedText = await translate(description, { to: language });
      translateObject[language] = translatedText;
    }
  } catch (error) {
    res
      .json({
        code: 404,
        message: "translation doesn't created",
      })
      .end();
  }

  //find hotel and add translation
  const findHotels = await Hotels.findByIdAndUpdate(
    id,
    {
      translation: translateObject,
    },
    {
      new: true,
    }
  );

  if (!findHotels) {
    return res
      .json({
        code: 404,
        message: "translation doesn't created",
      })
      .end();
  }

  res
    .json({
      code: 200,
      message: "success",
      translate: findHotels.translation,
    })
    .end();
};

module.exports = translateDescription;
