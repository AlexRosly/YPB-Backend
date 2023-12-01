const addHotel = require("./addHotel");
const updateHotel = require("./updateHotel");
const getAllHotels = require("./getAllHotels");
const getHotelById = require("./getHotelById");
const hotelsFinder = require("./hotelsFinder");
const getHotelsByHotelierId = require("./getHotelsByHotelierId");
const addPhoneAndDateVerification = require("./addPhoneAndDateVerification");

module.exports = {
  addHotel,
  updateHotel,
  getAllHotels,
  getHotelById,
  hotelsFinder,
  getHotelsByHotelierId,
  addPhoneAndDateVerification,
};
