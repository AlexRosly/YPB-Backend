const { Services } = require("../../models");
const { NotImplemented } = require("http-errors");
const { model } = require("mongoose");

const addServices = async (req, res) => {
  const services = await Services.create({ ...req.body });

  if (!services) {
    throw new NotImplemented("services doesn`t create");
  }

  res.status(201).json({
    status: "success",
    message: "services created",
    code: 201,
    data: {
      services,
    },
  });
};

module.exports = addServices;
