const { Services } = require("../../models");

const getAllServices = async ({ query: { search } }, res) => {
  const services = await Services.find({ langCode: search });

  res.json({
    status: "success",
    code: 200,
    data: {
      services,
    },
  });
};

module.exports = getAllServices;
