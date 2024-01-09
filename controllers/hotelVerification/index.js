const startVerification = require("./startVerification");
const getDocumentForHotel = require("./getDocumentForHotel");
const translateDescription = require("./translateDescription");
const addPointOnTheMap = require("./addPointOnTheMap");
const finishVerification = require("./finishVerification");
const getLocation = require("./getLocation");
const addYouTubeLink = require("./addYouTubeLink.js");
const updateDocument = require("./updateDocument.js");
const deleteObjectAndDocuments = require("./deleteObjectandDocuments.js");
const deleteAddedObject = require("./deleteAddedObject.js");

module.exports = {
  startVerification,
  getDocumentForHotel,
  translateDescription,
  addPointOnTheMap,
  finishVerification,
  getLocation,
  addYouTubeLink,
  updateDocument,
  deleteObjectAndDocuments,
  deleteAddedObject,
};
