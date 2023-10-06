const { BookingOptionBed } = require("../../models");

const updateBookingOptionBed = async (req, res) => {
  console.log("object", req.body);

  res.status(422).json({
    status: "error",
    message: "booking option doesn`t create",
  });
};

module.exports = updateBookingOptionBed;
