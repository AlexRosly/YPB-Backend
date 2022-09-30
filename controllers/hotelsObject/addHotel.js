const { Hotels } = require("../../models");
const { NotImplemented } = require("http-errors");

const addHotel = async (req, res) => {
  const hotel = await Hotels.create({ ...req.body });

  if (!hotel) {
    throw new NotImplemented("hotels doesn`t create");
  }

  res.status(201).json({
    status: "success",
    message: "hotel created",
    code: 201,
    data: {
      hotel,
    },
  });
};

module.exports = addHotel;
