const checkAdmin = require("./checkAdmin");
const addAdmin = require("./addAdmin");
const logInAdmin = require("./logInAdmin");
const logOutAdmin = require("./logOutAdmin");
const addNewEmail = require("./addNewEmail");
const changeStatus = require("./changeStatus");
const changeAccess = require("./changeAccess");
const addBonus = require("./addBonus");
const getStatistic = require("./getStatistic");
const statistic = require("./statistic");
const getAllAdmin = require("./getAllAdmin");
const getAllUsers = require("./getAllUsers");
const getAmountObjectInCountry = require("./getAmountObjectInCountry");
const getFirstObject = require("./getFirstObject");
const getFirstAddedObject = require("./getFirstAddedObject");
const getAllTitleAndDescription = require("./getAllTitleAndDescription");

module.exports = {
  checkAdmin,
  addAdmin,
  addNewEmail,
  logInAdmin,
  logOutAdmin,
  changeStatus,
  changeAccess,
  addBonus,
  getStatistic,
  statistic,
  getAllAdmin,
  getAllUsers,
  getAmountObjectInCountry,
  getFirstObject,
  getFirstAddedObject,
  getAllTitleAndDescription,
};
