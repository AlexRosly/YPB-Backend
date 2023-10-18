const { BookingOptionBed } = require("../../models");

const updateBookingOptionBed = async (req, res) => {
  const { id } = req.body;

  const result = await BookingOptionBed.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!result) {
    res
      .status(422)
      .json({
        status: "error",
        message: "booking option doesn`t create",
      })
      .end();
  }

  res
    .json({
      status: "success",
      message: "booking option update",
      code: 200,
      result,
    })
    .end();
};

module.exports = updateBookingOptionBed;
