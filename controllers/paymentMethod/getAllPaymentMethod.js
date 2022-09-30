const { Payments } = require("../../models");

const getAllPaymentMethod = async ({ query: { search } }, res) => {
  console.log({ search });
  const payment = await Payments.find({ langCode: search });

  res.json({
    status: "success",
    code: 200,
    data: {
      payment,
    },
  });
};

module.exports = getAllPaymentMethod;
