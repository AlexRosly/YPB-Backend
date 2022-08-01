const { City, Region } = require("../../models");
const { NotImplemented } = require("http-errors");

const addCityAllloc2 = async (req, res) => {
  const { stateId, stateInternational, cityCode } = req.body;
  const city = await City.create({ ...req.body, state: stateId });
  if (!city) {
    throw new NotImplemented("city doesn`t create");
  }
  const updateState = await Region.updateOne(
    { _id: stateId },
    { $push: { cities: city._id } }
  );

  const makeCopyCities = async (stateInternational) => {
    const states = await Region.find({ stateInternational });
    for (const state of states) {
      if (state._id != stateId) {
        const newCity = await City.create({
          ...req.body,
          dbLangCode: state.dbLangCode,
          stateId: state._id,
          state: state._id,
        });
        if (!newCity) {
          throw new NotImplemented("cities don`t created");
        }
        addCityToStates(stateInternational);
      }
    }
  };

  makeCopyCities(stateInternational);

  const addCityToStates = async () => {
    const copyOfStates = await Region.find({ stateInternational });
    const states = JSON.parse(JSON.stringify(copyOfStates));

    // const copyOfCities = await City.find({ cityCode });
    const copyOfCities = await City.find({ cityCode });
    const cities = JSON.parse(JSON.stringify(copyOfCities));

    for (const state of states) {
      for (const city of cities) {
        if (state._id === city.stateId) {
          const addToState = await Region.updateOne(
            { _id: state._id },
            { $addToSet: { cities: city._id } }
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
    message: "city created and added to all languages",
    code: 201,
    data: {
      city,
    },
  });
};

module.exports = addCityAllloc2;
