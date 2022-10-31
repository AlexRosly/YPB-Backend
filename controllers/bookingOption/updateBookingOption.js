const { BookingOption } = require("../../models");

const updateBookingOption = async (req, res) => {
  const { id } = req.params;
  const bookingOption = await BookingOption.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!bookingOption) {
    throw new NotFound("booking option not found");
  }

  res.json({
    status: "success",
    message: "booking option update",
    code: 200,
    data: {
      bookingOption,
    },
  });
};

module.exports = updateBookingOption;
