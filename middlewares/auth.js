// const { Agent, Hotelier, User } = require("../models");
const { Unauthorized } = require("http-errors");
const { getFromCache } = require("./authCacheService");

const auth = async (req, res, next) => {
  const sessionIDFromCookie = req.signedCookies["_sid"]; //sessionID
  const userId = req.signedCookies["user"];
  const auth = req.signedCookies["auth"];

  try {
    const checkUserInCache = await getFromCache(`${sessionIDFromCookie}`);

    if (checkUserInCache !== userId) {
      throw new Unauthorized("Not authorized");
    }

    if (!req.session.authenticated && !auth) {
      throw new Unauthorized("Not authorized");
    }
    next();
  } catch (error) {
    if ((error.message = "Invalid signature")) {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
