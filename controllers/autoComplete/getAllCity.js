const { City } = require("../../models");

const getAllCity = async ({ query: { language } }, res) => {
  const result = await City.find({ langCode: language });

  if (!result) {
    res.status(422).json({
      status: "error",
      message: "doesn't get all cities",
    });
  }

  res.status(200).json({
    status: "success",
    code: 200,
    result,
  });
  res.end();
};

module.exports = getAllCity;
