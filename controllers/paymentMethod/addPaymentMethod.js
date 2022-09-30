const { Payments } = require("../../models");
const { NotImplemented } = require("http-errors");

const addPaymentMethod = async (req, res) => {
  const payments = await Payments.create({ ...req.body });

  if (!payments) {
    throw new NotImplemented("payments doesn`t create");
  }

  res.status(201).json({
    status: "success",
    message: "payments created",
    code: 201,
    data: {
      payments,
    },
  });
};

module.exports = addPaymentMethod;
