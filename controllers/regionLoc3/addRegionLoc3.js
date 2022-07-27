const { Region, Country } = require("../../models");
const { NotImplemented } = require("http-errors");

const addRegionLoc3 = async (req, res) => {
  const { countryId, stateCode, international } = req.body;
  const state = await Region.create(req.body);
  if (!state) {
    throw new NotImplemented("state doesn`t created");
  }

  const updateCountry = await Country.updateOne(
    { _id: countryId },
    { $push: { states: state._id } }
  );

  const makeCopyState = async () => {
    const countries = await Country.find({ international });

    const { dbLangCode, countryId, country } = req.body;
    for (const countr of countries) {
      if (countr._id != countryId) {
        const newState = await Region.create({
          ...req.body,
          dbLangCode: countr.dbLangCode,
          countryId: countr._id,
          country: countr._id,
        });
        if (!newState) {
          throw new NotImplemented("states don`t created");
        }
        stateToCountry();
      }
    }
  };

  makeCopyState();

  const stateToCountry = async () => {
    const countriesCopy = await Country.find({ international });
    const countries = JSON.parse(JSON.stringify(countriesCopy));

    const statesCopy = await Region.find({ stateCode });
    const states = JSON.parse(JSON.stringify(statesCopy));

    for (const country of countries) {
      for (const state of states) {
        if (country._id === state.countryId) {
          const addToCountry = await Country.updateOne(
            { _id: country._id },
            { $addToSet: { states: state._id } }
          );
        }
      }
    }
  };

  // const state = await Region.find().populate({
  //   path: "cities",
  //   model: "cityLoc2",
  //   populate: { path: "districts", model: "districtLoc1" },
  // });

  res.status(201).json({
    status: "success",
    message: "created state and added to all languages",
    code: 201,
    data: {
      state,
    },
  });
};

module.exports = addRegionLoc3;
