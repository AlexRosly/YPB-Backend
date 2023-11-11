const { Hotels } = require("../../models");

const getFirstObject = async (req, res) => {
  const { country } = req.query;
  const result = await Hotels.find({
    status: "on verification",
    "location.international": country,
  }).sort({
    createdAt: 1,
  });

  if (!result) {
    return res.json({
      code: 404,
      status: "error",
    });
  }

  res.json({
    code: 200,
    status: "success",
    result,
  });
};

module.exports = getFirstObject;
