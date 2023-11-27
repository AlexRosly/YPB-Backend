const addHotel = require("./addHotel");
const updateHotel = require("./updateHotel");
const getAllHotels = require("./getAllHotels");
const getHotelById = require("./getHotelById");
const hotelsFinder = require("./hotelsFinder");
const startVerification = require("./startVerification");
const getHotelsByHotelierId = require("./getHotelsByHotelierId");
const addPhoneAndDateVerification = require("./addPhoneAndDateVerification");
const translateDescription = require("./translateDescription");

module.exports = {
  addHotel,
  updateHotel,
  getAllHotels,
  getHotelById,
  hotelsFinder,
  startVerification,
  getHotelsByHotelierId,
  addPhoneAndDateVerification,
  translateDescription,
};
