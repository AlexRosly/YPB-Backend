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
};
