const { BookingOptionHsBed } = require("../../models");

const addBookingOptionHsBed = async (req, res) => {
  const result = await BookingOptionHsBed.create({ ...req.body });

  if (!result) {
    res.status(422).json({
      status: "error",
      message: "booking option doesn`t create",
    });
  }

  res.status(201).json({
    status: "success",
    message: "booking option created",
    code: 201,
    result,
  });
};

module.exports = addBookingOptionHsBed;
