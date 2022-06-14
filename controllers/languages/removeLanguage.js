const { Language } = require("../../models");
const { NotFound } = require("http-errors");

const removeLanguage = async (req, res) => {
  const { id } = req.params;
  const languages = await Language.findByIdAndRemove(id);
  if (!languages) {
    throw new NotFound("Language not found");
  }
  res.json({
    status: "succes",
    code: 200,
    message: "contact deleted",
    data: {
      languages,
    },
  });
};

module.exports = removeLanguage;
