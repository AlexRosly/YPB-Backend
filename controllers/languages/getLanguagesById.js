const { Language } = require("../../models");

const getLanguagesById = async (req, res) => {
  const { id } = req.params;

  const language = await Language.findById(id);

  if (!language) {
    throw new NotFound("Language not found");
  }

  res.json({
    status: "succes",
    code: 200,
    data: {
      language,
    },
  });
};

module.exports = getLanguagesById;
