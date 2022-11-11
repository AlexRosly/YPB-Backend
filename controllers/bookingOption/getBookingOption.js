const { BookingOption } = require("../../models");

const getBookingOption = async (req, res) => {
  const bookingHotel = await BookingOption.find({});

  res.json({
    status: "success",
    code: 200,
    data: {
      bookingHotel,
    },
  });
};

module.exports = getBookingOption;
