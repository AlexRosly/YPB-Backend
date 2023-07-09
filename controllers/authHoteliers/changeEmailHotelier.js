const { Hotelier } = require("../../models");

const changeEmailHotelier = async (req, res) => {
  const { id, email, secretCode } = req.body;

  const findhotelier = await Hotelier.findById(id);

  if (!findhotelier) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: `This email  ${email} does not exist in Hoteliers collection`,
    });
  }

  if (secretCode !== findhotelier.secretCode) {
    return res.status(435).json({
      status: "error",
      code: 435,
      message: "Code is wrong",
    });
  }

  const date = new Date();

  if (findhotelier.validCode < date) {
    return res.status(436).json({
      status: "error",
      code: 436,
      message: "Code is invalid",
    });
  }
  const filter = { _id: id };
  const update = { email };

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

module.exports = changeEmailHotelier;
