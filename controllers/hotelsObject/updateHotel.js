const { Hotels } = require("../../models");
const { NotFound } = require("http-errors");

const updateHotel = async (req, res) => {
  const { id } = req.params;

  const hotel = await Hotels.findByIdAndUpdate(id, req.body, {
    new: true,
  });
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

module.exports = updateHotel;
