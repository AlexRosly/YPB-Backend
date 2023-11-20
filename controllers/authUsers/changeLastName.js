const { User } = require("../../models");

const changeLastName = async (req, res) => {
  const { id, lastName } = req.body;

  const findUser = await User.findById(id);

  if (!findUser) {
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

  const result = await User.findOneAndUpdate(filter, update, {
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
