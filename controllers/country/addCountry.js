const { Country } = require("../../models");

const addCoutry = async (req, res) => {
  const result = await Country.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addCoutry;
