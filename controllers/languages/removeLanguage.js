const { Language } = require("../../models");
const { NotFound } = require("http-errors");

const removeLanguage = async (req, res) => {
  const { id } = req.params;
  const result = await Language.findByIdAndRemove(id);
  if (!result) {
    throw new NotFound("Language not found");
  }
  res.json({
    status: "succes",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
};

module.exports = removeLanguage;
