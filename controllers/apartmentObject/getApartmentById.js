const { Apartment } = require("../../models");
const { NotFound } = require("http-errors");

const getApartmentById = async (req, res) => {
  const { id } = req.params;

  const apartment = await Apartment.findById(id);

  if (!apartment) {
    throw new NotFound("Apartment not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      apartment,
    },
  });
};

module.exports = getApartmentById;
