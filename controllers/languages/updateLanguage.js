const { Language } = require("../../models");
const { NotFound } = require("http-errors");

const updateLanguage = async (req, res) => {
  const { id } = req.params;
  const result = await Language.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw new NotFound("Language not found");
  }
  res.json({
    status: "succes",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateLanguage;
