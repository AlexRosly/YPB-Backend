const { Language } = require("../../models");

const addLanguage = async (req, res) => {
  const result = await Language.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addLanguage;
