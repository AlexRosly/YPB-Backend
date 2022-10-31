const { BookingOption } = require("../../models");

const getBookingOption = async (req, res) => {
  const bookingOption = await BookingOption.find({});

  res.json({
    status: "success",
    code: 200,
    data: {
      bookingOption,
    },
  });
};

module.exports = getBookingOption;
