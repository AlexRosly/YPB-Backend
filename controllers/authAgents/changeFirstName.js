const { Agent } = require("../../models");

const changeFirstName = async (req, res) => {
  const { id, firstName } = req.body;

  const findAgent = await Agent.findById(id);

  if (!findAgent) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: `The user with first name  ${firstName} does not exist in Hoteliers collection`,
    });
  }

  const filter = { _id: id };
  const update = { firstName };

  const result = await Agent.findOneAndUpdate(filter, update, {
    new: true,
  });

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = changeFirstName;
