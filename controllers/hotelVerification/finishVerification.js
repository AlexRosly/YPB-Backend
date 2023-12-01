const { Hotels } = require("../../models");

const finishVerification = async (req, res) => {
  const { id } = req.query;

  const result = await Hotels.findByIdAndUpdate(
    id,
    { status: "active" },
    {
      new: true,
    }
  );

  if (!result) {
    return res.json({
      code: 404,
      status: "error",
    });
  }

  res.json({
    code: 201,
    status: "success",
  });
};

module.exports = finishVerification;
