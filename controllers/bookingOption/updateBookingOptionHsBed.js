const { BookingOptionHsBed } = require("../../models");

const updateBookingOptionHsBed = async (req, res) => {
  console.log("object");
  const { id } = req.body;

  const result = await BookingOptionHsBed.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!result) {
    return res
      .status(422)
      .json({
        status: "error",
        message: "booking option doesn`t create",
      })
      .end();
  }

  res
    .json({
      status: "success",
      message: "booking option update",
      code: 200,
      result,
    })
    .end();
};

module.exports = updateBookingOptionHsBed;
