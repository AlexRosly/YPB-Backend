const addHotel = require("./addHotel");
const updateHotel = require("./updateHotel");
const getAllHotels = require("./getAllHotels");
const getHotelById = require("./getHotelById");
const hotelsFinder = require("./hotelsFinder");
const hotelsVerificationVideo = require("./hotelsVerificationVideo");
const getHotelsByHotelierId = require("./getHotelsByHotelierId");
const addPhoneAndDateVerification = require("./addPhoneAndDateVerification");
const translateDescription = require("./translateDescription");

module.exports = {
  addHotel,
  updateHotel,
  getAllHotels,
  getHotelById,
  hotelsFinder,
  hotelsVerificationVideo,
  getHotelsByHotelierId,
  addPhoneAndDateVerification,
  translateDescription,
};
