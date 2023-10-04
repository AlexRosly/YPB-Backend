const { BookingOptionBed } = require("../../models");

const addBookingOptionBed = async (req, res) => {
  console.log("req", req.body);

  const result = await BookingOptionBed.create({ ...req.body });

  if (!result) {
    throw new NotImplemented("booking option doesn`t create");
  }

  res.status(201).json({
    status: "success",
    message: "booking option created",
    code: 201,
    result,
  });
};

module.exports = addBookingOptionBed;
