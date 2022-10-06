const { Country, Region, City, District } = require("../../models");

const autoComplete = async ({ query: { search, limit = 10 } }, res) => {
  const searchFromUrl = decodeURI(search).trim();

  const countries = await Country.find({
    country: { $regex: searchFromUrl, $options: "i" },
  })
    .populate("states")
    .limit(limit);

  const states = await Region.find({
    stateName: { $regex: searchFromUrl, $options: "i" },
  })
    .populate("cities")
    .limit(limit);

  const cities = await City.find({
    cityName: { $regex: searchFromUrl, $options: "i" },
  })
    .populate("districts")
    .limit(limit);

  const districts = await District.find({
    districtName: { $regex: searchFromUrl, $options: "i" },
  }).limit(limit);

  if (!countries || !states || !cities || !districts) {
    const error = new Error(`${search} not found`);
    error.status = 404;
    throw error;
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      countries,
      states,
      cities,
      districts,
    },
  });
};

module.exports = autoComplete;
