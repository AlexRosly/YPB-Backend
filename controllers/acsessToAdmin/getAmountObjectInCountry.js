const { Hotels } = require("../../models");

const getAmountObjectInCountry = async (req, res) => {
  //find in USA
  const findUsaInEN = await Hotels.find({
    status: "on verification",
    "location.international": "USA",
  });

  //find in Ukraine
  const findUaInEN = await Hotels.find({
    status: "on verification",
    "location.international": "Ukraine",
  });

  //find in Poland
  const findPlInEN = await Hotels.find({
    status: "on verification",
    "location.international": "Poland",
  });

  const USA = findUsaInEN.length;
  const Ukraine = findUaInEN.length;
  const Poland = findPlInEN.length;

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
