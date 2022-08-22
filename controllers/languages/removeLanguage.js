const { Language } = require("../../models");
const { NotFound } = require("http-errors");

const removeLanguage = async (req, res) => {
  const { id } = req.params;
  const language = await Language.findByIdAndRemove(id);
  if (!language) {
    throw new NotFound("Language not found");
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      language,
    },
  });
};

module.exports = removeLanguage;
