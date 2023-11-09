const { Hotels } = require("../../models");

const getAmountObjectInCountry = async (req, res) => {
  //find in USA
  const findUsaInEN = await Hotels.find({
    "location.country": "USA",
  });
  const findUsaInKR = await Hotels.find({
    "location.country": "США",
  });

  //find in Ukraine
  const findUaInEN = await Hotels.find({
    "location.country": "Ukraine",
  });
  const findUaInUR = await Hotels.find({
    "location.country": "Україна",
  });

  const findUaInRu = await Hotels.find({
    "location.country": "Украина",
  });

  //find in Poland
  const findPlInEN = await Hotels.find({
    "location.country": "Poland",
  });
  const findPlInPL = await Hotels.find({
    "location.country": "Polska",
  });

  const findPlInKr = await Hotels.find({
    "location.country": "Польша",
  });

  const USA = findUsaInEN.length + findUsaInKR.length;
  const Ukraine = findUaInEN.length + findUaInUR.length + findUaInRu.length;
  const Poland = findPlInEN.length + findPlInPL.length + findPlInKr.length;

  res.json({
    code: 200,
    status: "success",
    result: {
      USA,
      Ukraine,
      Poland,
    },
  });
};

module.exports = getAmountObjectInCountry;
