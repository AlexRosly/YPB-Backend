const { Admin, AcsessToAdmin } = require("../models");

const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const authAdmin = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const superAdmin = await Admin.findById(id);
    const admin = await AcsessToAdmin.findById(id);

    if (superAdmin) {
      if (!superAdmin || !superAdmin.token) {
        throw new Unauthorized("Not authorized");
      }
    }

    if (admin) {
      if (!admin || !admin.token) {
        throw new Unauthorized("Not authorized");
      }
    }

    req.superAdmin = superAdmin;
    req.admin = admin;

    next();
  } catch (error) {
    if (error.message === "Invalid sugnature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = authAdmin;
