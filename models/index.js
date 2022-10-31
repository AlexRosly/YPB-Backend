const { Language } = require("./language");
const { Country } = require("./country");
const { Region } = require("./regionLoc3");
const { City } = require("./cityLoc2");
const { District } = require("./districtLoc1");
const { Hotels } = require("./hotelsObject");
const { ObjectType } = require("./objectType");
const { Payments } = require("./paymentMethod");
const { Services } = require("./services");
const { BookingOption } = require("./bookingOption");
const { BookingOptionHs } = require("./bookingOptionHs");
const { BookingServices } = require("./servicesForBookingOption");

module.exports = {
  Language,
  Country,
  Region,
  City,
  District,
  Hotels,
  ObjectType,
  Payments,
  Services,
  BookingOption,
  BookingOptionHs,
  BookingServices,
};
