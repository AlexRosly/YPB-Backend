const { Hotels } = require("../../models");

const hotelsFinder = async ({ query: { search, limit = 10 } }, res) => {
  const searchHotels = decodeURI(search).trim();
  const hotels = await Hotels.find({
    $or: [
      { district: { $regex: searchHotels, $options: "i" } },
      { city: { $regex: searchHotels, $options: "i" } },
      { state: { $regex: searchHotels, $options: "i" } },
      { country: { $regex: searchHotels, $options: "i" } },
    ],
  }).limit(limit);

  if (!hotels) {
    const error = new Error(`${search} not found`);
    error.status = 404;
    throw error;
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      hotels,
    },
  });
};

module.exports = hotelsFinder;
