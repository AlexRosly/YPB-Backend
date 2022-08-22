const { Language } = require("../../models");
const { NotFound } = require("http-errors");

const updateLanguage = async (req, res) => {
  const { id } = req.params;
  const language = await Language.findByIdAndUpdate(id, req.body, {
    new: true,
  });
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

module.exports = updateLanguage;
