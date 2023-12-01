const { Verification } = require("../../models");

const getDocumentForHotel = async (req, res) => {
  const { hotelsId } = req.query;
  const result = await Verification.find({ hotels: hotelsId }).populate({
    path: "hotels",
    populate: { path: "owner" },
  });

  if (!result) {
    return res
      .json({
        code: 404,
        status: "error",
        message: "Verification document not found. Try later",
      })
      .end();
  }

  res
    .json({
      code: 200,
      message: "success",
      result,
    })
    .end();
};

module.exports = getDocumentForHotel;
