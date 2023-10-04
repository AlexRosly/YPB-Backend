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
const { Agent } = require("./agents");
const { Hotelier } = require("./hoteliers");
const { User } = require("./users");
const { Candidate } = require("./candidate");
const { UaCatalogForHotelier } = require("./uaCatalogForHotelier");
const { RuCatalogForHotelier } = require("./ruCatalogForHotelier");
const { PlCatalogForHotelier } = require("./plCatalogForHotelier");
const { EnCatalogForHotelier } = require("./enCatalogForHotelier");
const { Admin } = require("./addAdmin");
const { AcsessToAdmin } = require("./acsessToAdmin");
const { Currency } = require("./currency");
const { BookingOptionHsBed } = require("./bookingOptionHsBed");
const { BookingOptionBed } = require("./bookingOptionBed");

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
  Agent,
  Hotelier,
  User,
  Candidate,
  UaCatalogForHotelier,
  RuCatalogForHotelier,
  PlCatalogForHotelier,
  EnCatalogForHotelier,
  Admin,
  AcsessToAdmin,
  Currency,
  BookingOptionHsBed,
  BookingOptionBed,
};
