const { Language } = require("../../models");

const getAllLanguages = async (req, res) => {
  const { code } = req.params;

  const languages = await Language.find({}).populate({
    path: "countries",
    model: "country",
    populate: {
      path: "states",
      model: "regionLoc3",
      populate: {
        path: "cities",
        model: "cityLoc2",
        populate: { path: "districts", model: "districtLoc1" },
      },
    },
  });

  res.json({
    status: "success",
    code: 200,
    data: {
      languages,
    },
  });
};

module.exports = getAllLanguages;
