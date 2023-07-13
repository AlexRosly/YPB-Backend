const { Hotelier } = require("../../models/hoteliers");

const addBonus = async (req, res) => {
  const { id, amount } = req.body;
  //   console.log({ id });
  //   console.log({ amount });
  const findHotelier = await Hotelier.findById(id);
  //   console.log({ findHotelier });
  const { currency } = findHotelier;
  //   console.log({ currency });

  if (!findHotelier) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: `The user with id ${id} does not exist in Hoteliers collection`,
    });
  }

  const bonus = currency.bonus + amount;
  const money = currency.money;
  const total = bonus + money;
  const currency1 = { bonus, money, total };

  //   console.log("1", currency.bonus);
  console.log({ bonus });
  console.log({ total });
  console.log({ currency1 });

  //   const filter = { _id: id };
  //   const update = { bonus, total };

  //   const result = await Hotelier.findOneAndUpdate(filter, update, {
  //     new: true,
  //   });
  const _id = id;

  await Hotelier.updateOne(
    { _id },
    {
      $set: { currency: currency1 },
    }
  );

  const result = await Hotelier.findById(id);

  console.log({ result });

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = addBonus;
