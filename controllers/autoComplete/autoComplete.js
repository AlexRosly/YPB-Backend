const { Country, Region, City, District } = require("../../models");

const autoComplete = async ({ query: { search, limit = 10 } }, res) => {
  const searchToArr = search.split("");
  const fistLetter = searchToArr[0].toUpperCase();
  searchToArr.shift();
  searchToArr.unshift(fistLetter);
  const searchToStr = searchToArr.join("");
  const searchFromUrl = decodeURI(searchToStr).trim();

  const countries = await Country.find({
    country: { $regex: searchFromUrl },
  })
    .populate("states")
    .limit(limit);

  const state = await Region.find({
    stateName: { $regex: searchFromUrl },
  }).limit(limit);

  const cities = await City.find({
    cityName: { $regex: searchFromUrl },
  }).limit(limit);

  const district = await District.find({
    districtName: { $regex: searchFromUrl },
  }).limit(limit);

  if (!countries || !state || !cities || !district) {
    const error = new Error(`${search} not found`);
    error.status = 404;
    throw error;
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      countries,
      state,
      cities,
      district,
    },
  });
};

module.exports = autoComplete;
