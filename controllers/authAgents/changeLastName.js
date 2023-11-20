const { Agent } = require("../../models");

const changeLastName = async (req, res) => {
  const { id, lastName } = req.body;

  const findAgent = await Agent.findById(id);

  if (!findAgent) {
    return res
      .status(409)
      .json({
        status: "error",
        code: 409,
        message: `The user with first name  ${lastName} does not exist in Hoteliers collection`,
      })
      .end();
  }

  const filter = { _id: id };
  const update = { lastName };

  const result = await Agent.findOneAndUpdate(filter, update, {
    new: true,
  });

  res
    .json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    })
    .end();
};

module.exports = changeLastName;
