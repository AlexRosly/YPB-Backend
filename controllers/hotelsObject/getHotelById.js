const { Hotels } = require("../../models");
const { NotFound } = require("http-errors");

const getHotelById = async (req, res) => {
  const { id } = req.params;

  const hotel = await Hotels.findById(id);

  if (!hotel) {
    throw new NotFound("hotel not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      hotel,
    },
  });
};

module.exports = getHotelById;
