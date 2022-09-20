const { Apartment } = require("../../models");
const { NotImplemented } = require("http-errors");

const addApartment = async (req, res) => {
  const apartment = await Apartment.create({ ...req.body });

  if (!apartment) {
    throw new NotImplemented("district doesn`t create");
  }

  res.status(201).json({
    status: "success",
    message: "apartment created",
    code: 201,
    data: {
      apartment,
    },
  });
};

module.exports = addApartment;
