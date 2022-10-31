const { BookingOptionHs } = require("../../models");

const getBookingOptionHs = async (req, res) => {
  const bookingOption = await BookingOptionHs.find({});

  res.json({
    status: "success",
    code: 200,
    data: {
      bookingOption,
    },
  });
};

module.exports = getBookingOptionHs;
