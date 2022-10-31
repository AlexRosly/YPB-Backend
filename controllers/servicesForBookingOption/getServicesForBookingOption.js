const { BookingServices } = require("../../models");

const getServicesForBookingOption = async (req, res) => {
  const bookingServices = await BookingServices.find({});

  res.json({
    status: "success",
    code: 200,
    data: {
      bookingServices,
    },
  });
};

module.exports = getServicesForBookingOption;
