const { Country } = require("../../models");
const { NotFound } = require("http-errors");

const updateCoutry = async (req, res) => {
  const { id } = req.params;
  const result = await Country.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw new NotFound("Country not found");
  }
  res.json({
    status: "succes",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateCoutry;
