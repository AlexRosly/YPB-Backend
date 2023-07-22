const { BookingOption } = require("../../models");

const getBookingOptionByObjectId = async (req, res) => {
  const { id } = req.params;

  const result = await BookingOption.find({ objectId: id });

  if (!result) {
    return res.status(406).json({
      status: "error",
      message: `booking option not found`,
      code: 406,
    });
  }

  if (result.length === 0) {
    return res.status(406).json({
      status: "error",
      message: `booking option not found`,
      code: 406,
    });
  }

  res.json({
    status: "success",
    code: 200,
    result,
  });
};

module.exports = getBookingOptionByObjectId;
