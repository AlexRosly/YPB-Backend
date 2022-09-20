const { Apartment } = require("../../models");
const { NotFound } = require("http-errors");

const updateApartment = async (req, res) => {
  const { id } = req.params;

  const apartment = await Apartment.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!apartment) {
    throw new NotFound("apartment not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      apartment,
    },
  });
};

module.exports = updateApartment;
