const { BookingServices } = require("../../models");

const addServicesForBookingOption = async (req, res) => {
  const bookingServices = await BookingServices.create({ ...req.body });

  if (!bookingServices) {
    throw new NotImplemented("services for booking option doesn`t create");
  }

  res.status(201).json({
    status: "success",
    message: "services for booking option created",
    code: 201,
    data: {
      bookingServices,
    },
  });
};

module.exports = addServicesForBookingOption;
