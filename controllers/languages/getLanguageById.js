const { Language } = require("../../models");
const { NotFound } = require("http-errors");

const getLanguageById = async (req, res) => {
  const { id } = req.params;

  const language = await Language.findById(id);

  if (!language) {
    throw new NotFound("Language not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      language,
    },
  });
};

module.exports = getLanguageById;
