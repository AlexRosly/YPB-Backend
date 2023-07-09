const { Hotelier } = require("../../models");

const changeLastName = async (req, res) => {
  const { id, lastName } = req.body;

  const findHotelier = await Hotelier.findById(id);

  if (!findHotelier) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: `The user with first name  ${lastName} does not exist in Hoteliers collection`,
    });
  }

  const filter = { _id: id };
  const update = { lastName };

  const result = await Hotelier.findOneAndUpdate(filter, update, {
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

module.exports = changeLastName;
