const { Hotels } = require("../../models");

const getAllHotels = async (req, res) => {
  const hotels = await Hotels.find({});

  res.json({
    status: "success",
    code: 200,
    data: {
      hotels,
    },
  });
};
module.exports = getAllHotels;
