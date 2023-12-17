const { Hotels } = require("../../models");

const getAmountObjectInCountry = async (req, res) => {
  //find in USA
  const findUsaInEN = await Hotels.find({
    status: "on verification",
    "location.international": "USA",
  });

  const findAddedInUsa = await Hotels.find({
    status: "added",
    "location.international": "USA",
  });

  //find in Ukraine
  const findUaInEN = await Hotels.find({
    status: "on verification",
    "location.international": "Ukraine",
  });

  const findAddedInUaEN = await Hotels.find({
    status: "added",
    "location.international": "Ukraine",
  });

  //find in Poland
  const findPlInEN = await Hotels.find({
    status: "on verification",
    "location.international": "Poland",
  });

  const findAddedInPlEN = await Hotels.find({
    status: "added",
    "location.international": "Poland",
  });

  // const USA = findUsaInEN.length;
  // const Ukraine = findUaInEN.length;
  // const Poland = findPlInEN.length;
  const onVerification = {
    USA: findUsaInEN.length,
    Ukraine: findUaInEN.length,
    Poland: findPlInEN.length,
  };

  const amountOnVerification =
    findUsaInEN.length + findUaInEN.length + findPlInEN.length;

  const added = {
    USA: findAddedInUsa.length,
    Ukraine: findAddedInUaEN.length,
    Poland: findAddedInPlEN.length,
  };
  const amountOfAdded =
    findAddedInUsa.length + findAddedInUaEN.length + findAddedInPlEN.length;

  res.json({
    code: 200,
    status: "success",
    // onVerification: {
    //   USA,
    //   Ukraine,
    //   Poland,
    // },
    onVerification,
    amountOnVerification,
    added,
    amountOfAdded,
  });
};

module.exports = getAmountObjectInCountry;
