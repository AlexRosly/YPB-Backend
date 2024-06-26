const { Hotelier } = require("../../models/hoteliers");

const addBonus = async (req, res) => {
  const { id, amount } = req.body;
  const findHotelier = await Hotelier.findById(id);
  const { finances } = findHotelier;

  if (!findHotelier) {
    return res
      .status(409)
      .json({
        status: "error",
        code: 409,
        message: `The user with id ${id} does not exist in Hoteliers collection`,
      })
      .end();
  }

  if (amount < 0) {
    return res
      .status(409)
      .json({
        status: "error",
        code: 409,
        message: `The amount should be more`,
      })
      .end();
  }

  const bonus = finances.bonus + amount;
  const money = finances.money;
  const total = bonus + money;
  const currency1 = { bonus, money, total };

  const _id = id;

  if (total >= -20) {
    await Hotelier.updateOne(
      { _id },
      {
        $set: { finances: currency1, status: "active" },
      }
    );
  }

  await Hotelier.updateOne(
    { _id },
    {
      $set: { finances: currency1 },
    }
  );

  const result = await Hotelier.findById(id);

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

module.exports = addBonus;
