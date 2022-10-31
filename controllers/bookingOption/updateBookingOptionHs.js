const { BookingOptionHs } = require("../../models");

const updateBookingOptionHs = async (req, res) => {
  const { id } = req.params;
  const bookingOption = await BookingOptionHs.findByIdAndUpdate(id, req.body, {
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

module.exports = updateBookingOptionHs;
