const { Hotels } = require("../../models");

const getHotelsByHotelierId = async (req, res) => {
  const { id } = req.params;
  const result = await Hotels.find({ owner: id });
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getHotelsByHotelierId;
