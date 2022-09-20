const { Apartment } = require("../../models");

const getAllApartment = async (req, res) => {
  const apartment = await Apartment.find({});

  res.json({
    status: "success",
    code: 200,
    data: {
      apartment,
    },
  });
};
module.exports = getAllApartment;
